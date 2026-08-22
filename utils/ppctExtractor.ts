import { ManualNLSEntry } from '../types';
import { 
  NLS_COMPONENT_OPTIONS, 
  NLS_LEVEL_DETAILS, 
  AI_COMPONENT_OPTIONS, 
  AI_LEVEL_DETAILS, 
  AI_ALL_GRADE_REQUIREMENTS 
} from '../constants';

export interface ExtractedPPCTResult {
  nlsEntries: ManualNLSEntry[];
  aiEntries: ManualNLSEntry[];
  matchedLessonTitle?: string;
  totalCodesFound: number;
}

// Helper lookup to find official NLS code across all domains and levels
export const findNLSCodeInfo = (codeStr: string) => {
  const cleanCode = codeStr.trim().toLowerCase();
  if (!cleanCode) return null;

  for (const [domCode, levels] of Object.entries(NLS_LEVEL_DETAILS)) {
    const found = levels.find(l => l.code.toLowerCase() === cleanCode);
    if (found) {
      const compOption = NLS_COMPONENT_OPTIONS.find(opt => opt.code === domCode);
      return {
        code: found.code,
        desc: found.desc,
        domainCode: domCode,
        domainLabel: compOption ? compOption.label : `Miền ${domCode}`
      };
    }
  }
  return null;
};

// Helper lookup to find official AI code across all levels and grade requirements
export const findAICodeInfo = (codeStr: string) => {
  const cleanCode = codeStr.trim().toLowerCase();
  if (!cleanCode) return null;

  // Check AI_LEVEL_DETAILS
  for (const [domCode, levels] of Object.entries(AI_LEVEL_DETAILS)) {
    const found = levels.find(l => l.code.toLowerCase() === cleanCode);
    if (found) {
      const compOption = AI_COMPONENT_OPTIONS.find(opt => opt.code === domCode);
      return {
        code: found.code,
        desc: found.desc,
        domainCode: domCode,
        domainLabel: compOption ? compOption.label : `Mạch ${domCode}`
      };
    }
  }

  // Check AI_ALL_GRADE_REQUIREMENTS
  for (const reqs of Object.values(AI_ALL_GRADE_REQUIREMENTS)) {
    const found = reqs.find(r => r.code.toLowerCase() === cleanCode);
    if (found) {
      return {
        code: found.code,
        desc: found.desc,
        domainCode: found.domainCode,
        domainLabel: found.domainLabel
      };
    }
  }

  return null;
};

/**
 * Extracts lesson title keywords from the lesson content (e.g., "Bài 4: Sắp xếp dữ liệu", "Tiết 45", "Bài 1", "Chủ đề 2")
 */
function extractLessonKeywords(lessonContent?: string): { titles: string[], numbers: string[], periods: string[] } {
  if (!lessonContent) return { titles: [], numbers: [], periods: [] };
  const titles: string[] = [];
  const numbers: string[] = [];
  const periods: string[] = [];

  // Match "Bài X: Tên bài" or "BÀI X. TÊN BÀI"
  const lessonPatterns = [
    /(?:bài|chủ đề)\s+(\d+[a-zA-Z]?|\w+)(?:\s*[:\.\-–]\s*([^\n\r<]{3,60}))?/gi,
    /tên\s+bài(?:\s+dạy)?\s*[:\.\-–]\s*([^\n\r<]{3,60})/gi
  ];

  for (const pattern of lessonPatterns) {
    let match;
    while ((match = pattern.exec(lessonContent)) !== null) {
      if (match[1] && !isNaN(Number(match[1]))) {
        numbers.push(match[1].trim());
      }
      if (match[2] && match[2].trim().length > 3) {
        titles.push(match[2].trim().toLowerCase());
      }
    }
  }

  // Match "Tiết X", "Tiết: X", "Tiết X - Y", "Tiết X, Y"
  const periodPattern = /(?:tiết|tiết\s*học|tiết\s*ppct)\s*[:\.\-]?\s*(\d+(?:\s*[-–,]\s*\d+)?)/gi;
  let pMatch;
  while ((pMatch = periodPattern.exec(lessonContent)) !== null) {
    if (pMatch[1]) {
      periods.push(pMatch[1].trim());
    }
  }

  return { titles, numbers, periods };
}

/**
 * Automatically extracts NLS and AI codes from PPCT content and synchronizes with the lesson
 */
export function extractCodesFromPPCT(
  ppctContent: string, 
  lessonContent?: string,
  _grade?: number
): ExtractedPPCTResult {
  if (!ppctContent || !ppctContent.trim()) {
    return { nlsEntries: [], aiEntries: [], totalCodesFound: 0 };
  }

  const nlsMap = new Map<string, ManualNLSEntry>();
  const aiMap = new Map<string, ManualNLSEntry>();

  // If lesson content is provided, try to find the section/table row corresponding to this lesson in PPCT
  const { titles, numbers, periods } = extractLessonKeywords(lessonContent);
  let targetedRowsText = "";

  if (titles.length > 0 || numbers.length > 0 || periods.length > 0) {
    // Split PPCT into table rows or lines
    const rows = ppctContent.split(/<\/tr>|<tr[^>]*>|[\r\n]{2,}/i);
    const matchedRows: string[] = [];

    for (const row of rows) {
      const lowerRow = row.toLowerCase();
      
      // Match by title
      const titleMatch = titles.some(t => t.length > 3 && lowerRow.includes(t));
      
      // Match by lesson number (e.g. "bài 4" or "bài: 4")
      const numMatch = numbers.some(n => {
        const numRegex = new RegExp(`\\bbài\\s*(?:số)?\\s*[:\\.\\-]?\\s*${n}\\b`, 'i');
        return numRegex.test(row);
      });

      // Match by period (e.g. "tiết 45")
      const periodMatch = periods.some(p => {
        return lowerRow.includes(`tiết ${p}`) || lowerRow.includes(`tiết: ${p}`) || lowerRow.includes(`tiết ${p.split(/[-–,]/)[0].trim()}`);
      });

      if (titleMatch || numMatch || periodMatch) {
        matchedRows.push(row);
      }
    }

    if (matchedRows.length > 0) {
      targetedRowsText = matchedRows.join("\n");
    }
  }

  // Use targeted rows if found, otherwise fallback to entire PPCT
  const textToScan = targetedRowsText.trim().length > 0 ? targetedRowsText : ppctContent;

  // Regex patterns to capture NLS and AI codes:
  // 1. e.g., 1.1.TC2a, 1.1.TC1a, 1.3.CB1a, 2.1.NC1b, 6.2.TC2a, 5.3.CB2
  // 2. e.g., 6.1.B1, 6.2.B3, 6.3.B5, 1.1.B3
  // 3. e.g., NLa.TC1, NLb.TC2, NLc.CB1, NLd.NC2
  // 4. e.g., A1.L6.1, B2.L7.1, C5.L8.1, D2.L9.1
  const nlsRegex = /\b([1-6]\.[1-6]\.(?:CB|TC|NC)[1-2][a-c]?|[1-5]\.[1-6]\.B[1-8])\b/gi;
  const aiSpecificRegex = /\b(NL[a-d]\.(?:CB|TC|NC)[1-2]|[A-D][1-5]\.L(?:[1-9]|1[0-2])\.[1-9]|6\.[1-3]\.B[1-8]|6\.[1-3]\.(?:CB|TC|NC)[1-2][a-c]?)\b/gi;

  // 1. Scan AI codes
  let aiMatch;
  while ((aiMatch = aiSpecificRegex.exec(textToScan)) !== null) {
    const rawCode = aiMatch[1];
    const upperCode = rawCode.toUpperCase();
    
    // Normalize format
    const info = findAICodeInfo(rawCode) || findAICodeInfo(upperCode);
    const finalCode = info ? info.code : rawCode;
    const finalKey = finalCode.toLowerCase();

    if (!aiMap.has(finalKey)) {
      aiMap.set(finalKey, {
        id: `ppct_ai_${Date.now()}_${aiMap.size}`,
        code: finalCode,
        name: info ? info.domainLabel : "Năng lực AI (Trích xuất từ PPCT)",
        description: info ? info.desc : `Yêu cầu cần đạt Năng lực AI theo đúng Phân phối chương trình [${finalCode}]`,
        category: 'AI'
      });
    }
  }

  // 2. Scan NLS codes
  let nlsMatch;
  while ((nlsMatch = nlsRegex.exec(textToScan)) !== null) {
    const rawCode = nlsMatch[1];
    const upperCode = rawCode.toUpperCase();
    
    // Check if it's already an AI code in category 6
    if (rawCode.startsWith('6.') && aiMap.has(rawCode.toLowerCase())) {
      continue;
    }

    const info = findNLSCodeInfo(rawCode) || findNLSCodeInfo(upperCode);
    const finalCode = info ? info.code : rawCode;
    const finalKey = finalCode.toLowerCase();

    if (!nlsMap.has(finalKey) && !aiMap.has(finalKey)) {
      nlsMap.set(finalKey, {
        id: `ppct_nls_${Date.now()}_${nlsMap.size}`,
        code: finalCode,
        name: info ? info.domainLabel : "Năng lực số (Trích xuất từ PPCT)",
        description: info ? info.desc : `Yêu cầu cần đạt Năng lực số theo đúng Phân phối chương trình [${finalCode}]`,
        category: 'NLS'
      });
    }
  }

  const nlsEntries = Array.from(nlsMap.values());
  const aiEntries = Array.from(aiMap.values());

  return {
    nlsEntries,
    aiEntries,
    totalCodesFound: nlsEntries.length + aiEntries.length
  };
}
