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
 * Extracts lesson title keywords from the lesson content (e.g., "Bài 4: Sắp xếp dữ liệu", "Tiết 45")
 */
function extractLessonKeywords(lessonContent?: string): string[] {
  if (!lessonContent) return [];
  const keywords: string[] = [];

  // Match "Bài X", "Bài số X", "Chủ đề X", "Tiết X"
  const patterns = [
    /bài\s+(\d+[a-zA-Z]?|\w+)(?:\s*[:\.\-]\s*([^\n\r<]{3,40}))?/gi,
    /chủ\s+đề\s+(\d+[a-zA-Z]?|\w+)(?:\s*[:\.\-]\s*([^\n\r<]{3,40}))?/gi,
    /tiết\s+(\d+(?:\s*[-–,]\s*\d+)?)/gi
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(lessonContent)) !== null) {
      if (match[0]) {
        keywords.push(match[0].trim().toLowerCase());
      }
      if (match[2]) {
        keywords.push(match[2].trim().toLowerCase());
      }
    }
  }

  return keywords;
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
  const keywords = extractLessonKeywords(lessonContent);
  let relevantText = ppctContent;

  if (keywords.length > 0) {
    // Try to find lines or rows in PPCT matching the lesson title/number
    const lines = ppctContent.split(/[\r\n]+|<tr[^>]*>|<\/tr>/i);
    const matchedLines: string[] = [];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      const isMatch = keywords.some(kw => kw.length > 2 && lowerLine.includes(kw));
      if (isMatch) {
        matchedLines.push(line);
      }
    }

    if (matchedLines.length > 0) {
      // Prioritize matched rows, but also include all if matched lines have few codes
      relevantText = matchedLines.join("\n") + "\n\n" + ppctContent;
    }
  }

  // Regex patterns to capture NLS codes:
  // 1. e.g., 1.1.TC2a, 1.3.CB1a, 2.1.NC1b, 6.2.TC2a, 5.3.CB2
  // 2. e.g., 6.1.B1, 6.2.B3, 6.3.B5
  // 3. e.g., NLa.TC1, NLb.TC2, NLc.CB1, NLd.NC2
  // 4. e.g., A1.L6.1, B2.L7.1, C5.L8.1, D2.L9.1
  const nlsRegex = /\b([1-6]\.[1-6]\.(?:CB|TC|NC)[1-2][a-c]?|[1-5]\.[1-6]\.B[1-8])\b/gi;
  const aiSpecificRegex = /\b(NL[a-d]\.(?:CB|TC|NC)[1-2]|[A-D][1-5]\.L(?:[1-9]|1[0-2])\.[1-9]|6\.[1-3]\.B[1-8]|6\.[1-3]\.(?:CB|TC|NC)[1-2][a-c]?)\b/gi;

  // 1. Scan AI codes
  let aiMatch;
  while ((aiMatch = aiSpecificRegex.exec(relevantText)) !== null) {
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
  while ((nlsMatch = nlsRegex.exec(relevantText)) !== null) {
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
