import React, { useState } from 'react';
import { Download, CheckCircle, FileText, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { 
  Document, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Packer, 
  UnderlineType, 
  Table, 
  TableRow, 
  TableCell, 
  BorderStyle,
  WidthType,
  AlignmentType,
  TableLayoutType,
  LineRuleType,
  PageOrientation,
  ImportedXmlComponent
} from 'docx';
import FileSaver from 'file-saver';

interface ResultDisplayProps {
  result: string | null;
  loading: boolean;
  mathMap: Record<string, string>;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, loading, mathMap }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);

  // Helper: Clean raw AI result to remove conversational filler and specific artifacts
  const cleanResultText = (text: string): string => {
    if (!text) return "";
    
    // 1. Remove markdown code blocks
    let clean = text.replace(/^```markdown\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
    
    // 2. Remove HTML Anchors (Bookmarks artifacts from Word conversion) e.g., <a id="_Hlk147258080"></a>
    clean = clean.replace(/<a\s+id="[^"]*"><\/a>/gi, "");

    // 3. Convert basic HTML formatting tags to markdown/clean format so they never leak as raw text
    clean = clean
      .replace(/<\/?strong>/gi, "**")
      .replace(/<\/?b>/gi, "**")
      .replace(/<\/?em>/gi, "*")
      .replace(/<\/?i>/gi, "*")
      .replace(/&lt;strong&gt;/gi, "**")
      .replace(/&lt;\/strong&gt;/gi, "**")
      .replace(/&lt;b&gt;/gi, "**")
      .replace(/&lt;\/b&gt;/gi, "**")
      .replace(/&lt;em&gt;/gi, "*")
      .replace(/&lt;\/em&gt;/gi, "*")
      .replace(/&lt;i&gt;/gi, "*")
      .replace(/&lt;\/i&gt;/gi, "*");

    // 4. Decode any escaped HTML tags for nls / ai / formatting so they parse properly
    clean = clean
      .replace(/&lt;nls&gt;/gi, "<nls>")
      .replace(/&lt;\/nls&gt;/gi, "</nls>")
      .replace(/&lt;ai&gt;/gi, "<ai>")
      .replace(/&lt;\/ai&gt;/gi, "</ai>")
      .replace(/&lt;u&gt;/gi, "<u>")
      .replace(/&lt;\/u&gt;/gi, "</u>")
      .replace(/&lt;sub&gt;/gi, "<sub>")
      .replace(/&lt;\/sub&gt;/gi, "</sub>")
      .replace(/&lt;sup&gt;/gi, "<sup>")
      .replace(/&lt;\/sup&gt;/gi, "</sup>");

    // 5. Clean weird symbols, Wingdings / Private Use Area glyphs, square box bullets (□, ■, etc.)
    clean = clean.replace(/[\uF000-\uF8FF]/g, "");
    clean = clean.replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD\u25A0\u25A1\u25AA\u25AB\u25FE\u25FD]/g, "- ");
    
    // 6. Clean stray slashes '/', '\/', '//', and escaped backslashes
    clean = clean
      .replace(/\\([*#_>\-\+\[\]])/g, "$1") // unescape markdown backslashes
      .replace(/\\\//g, "/") // unescape \/
      .replace(/(^|\n)\s*\/+\s*(?=[A-Za-z0-9#\*\-\+IÀ-ỹ])/g, "$1") // remove leading slash before letters/headings
      .replace(/(^|\n)(\s*[-*+]\s*)\/+\s*/g, "$1$2") // remove slash right after bullet list markers
      .replace(/\s*\/+\s*(\n|$)/g, "$1") // remove trailing slashes at line ends
      .replace(/(^|\n)\s*\/+\s*(\n|$)/g, "$1$2") // remove lines containing only slashes
      .replace(/([^\w\d\s\/])\s*\/+\s*([^\w\d\s\/])/g, "$1 $2"); // remove stray isolated slashes between symbols

    // 7. Remove common AI intros
    const lines = clean.split('\n');
    if (lines.length > 0) {
        const firstLine = lines[0].trim().toLowerCase();
        const introPatterns = [
            "dưới đây là", "sau đây là", "đây là", "kết quả", 
            "here is", "sure, here", "giáo án đã được", 
            "bản giáo án", "nội dung giáo án", "chào bạn"
        ];
        
        if (firstLine.length < 100 && introPatterns.some(p => firstLine.includes(p))) {
             lines.shift(); 
             if (lines.length > 0 && lines[0].trim() === "") lines.shift(); 
        }
    }
    return lines.join('\n').trim();
  };

  const safeResult = result ? cleanResultText(result) : null;

  // Interface to track active formatting state across lines and tokens
  interface FormatState {
    isRed: boolean;
    isBold: boolean;
    isItalic: boolean;
    isSub: boolean;
    isSup: boolean;
  }

  // Helper: Token-based parser for text formatting (bold, italic, red highlight for NLS/AI/underline, sub, sup, math)
  const parseTextWithFormatting = (
    text: string, 
    inheritedState?: Partial<FormatState>
  ): { runs: any[]; endState: FormatState } => {
    const runs: any[] = [];
    const state: FormatState = {
      isRed: inheritedState?.isRed ?? false,
      isBold: inheritedState?.isBold ?? false,
      isItalic: inheritedState?.isItalic ?? false,
      isSub: inheritedState?.isSub ?? false,
      isSup: inheritedState?.isSup ?? false,
    };

    // Pre-normalize text to decode any escaped formatting tags and remove weird glyphs
    const normalizedText = text
      .replace(/&lt;nls&gt;/gi, '<nls>')
      .replace(/&lt;\/nls&gt;/gi, '</nls>')
      .replace(/&lt;ai&gt;/gi, '<ai>')
      .replace(/&lt;\/ai&gt;/gi, '</ai>')
      .replace(/&lt;u&gt;/gi, '<u>')
      .replace(/&lt;\/u&gt;/gi, '</u>')
      .replace(/&lt;strong&gt;/gi, '<strong>')
      .replace(/&lt;\/strong&gt;/gi, '</strong>')
      .replace(/&lt;b&gt;/gi, '<b>')
      .replace(/&lt;\/b&gt;/gi, '</b>')
      .replace(/&lt;em&gt;/gi, '<em>')
      .replace(/&lt;\/em&gt;/gi, '</em>')
      .replace(/&lt;i&gt;/gi, '<i>')
      .replace(/&lt;\/i&gt;/gi, '</i>')
      .replace(/[\uF000-\uF8FF]/g, '')
      .replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD\u25A0\u25A1\u25AA\u25AB\u25FE\u25FD]/g, '- ');

    // Regex matching all formatting tags, markdown symbols, math placeholders, and linebreaks
    const tokenRegex = /(<nls\b[^>]*>|<\/nls>|<ai\b[^>]*>|<\/ai>|<strong>|<\/strong>|<b>|<\/b>|<em>|<\/em>|<i>|<\/i>|<u>|<\/u>|<span\b[^>]*>|<\/span>|<font\b[^>]*>|<\/font>|<sub>|<\/sub>|<sup>|<\/sup>|<p\b[^>]*>|<\/p>|<div\b[^>]*>|<\/div>|<br\s*\/?>|\*\*|\*|_|\[MATH_ID_\d+_\d+\])/gi;

    const parts = normalizedText.split(tokenRegex);

    const pushText = (str: string) => {
      if (!str) return;
      // Clean HTML entities if present and strip any unhandled HTML tags so they NEVER leak as text
      const cleanStr = str
        .replace(/<[^>]+>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      if (!cleanStr) return;

      runs.push(new TextRun({
        text: cleanStr,
        bold: state.isBold,
        italics: state.isItalic,
        color: state.isRed ? "FF0000" : "000000",
        font: "Times New Roman",
        size: 28, // 14pt
        subScript: state.isSub,
        superScript: state.isSup,
      }));
    };

    for (const part of parts) {
      if (!part) continue;

      const lower = part.toLowerCase();

      if (part.startsWith('[MATH_ID_') && part.endsWith(']')) {
        const mathId = part.slice(1, -1);
        const omml = mathMap[mathId];
        if (omml) {
          try {
            runs.push(ImportedXmlComponent.fromXmlString(omml));
          } catch (e) {
            console.error("Error parsing OMML:", e);
            pushText(part);
          }
        } else {
          pushText(part);
        }
      } else if (lower.startsWith('<nls')) {
        state.isRed = true;
      } else if (lower === '</nls>') {
        state.isRed = false;
      } else if (lower.startsWith('<ai')) {
        state.isRed = true;
      } else if (lower === '</ai>') {
        state.isRed = false;
      } else if (lower.startsWith('<strong>') || lower.startsWith('<b>')) {
        state.isBold = true;
      } else if (lower === '</strong>' || lower === '</b>') {
        state.isBold = false;
      } else if (lower.startsWith('<em>') || lower.startsWith('<i>')) {
        state.isItalic = true;
      } else if (lower === '</em>' || lower === '</i>') {
        state.isItalic = false;
      } else if (lower === '<u>' || lower.includes('color="red"') || lower.includes('color:red') || lower.includes('color: red')) {
        state.isRed = true;
      } else if (lower === '</u>' || (state.isRed && (lower === '</span>' || lower === '</font>'))) {
        state.isRed = false;
      } else if (lower === '<sub>') {
        state.isSub = true;
      } else if (lower === '</sub>') {
        state.isSub = false;
      } else if (lower === '<sup>') {
        state.isSup = true;
      } else if (lower === '</sup>') {
        state.isSup = false;
      } else if (part === '**') {
        state.isBold = !state.isBold;
      } else if (part === '*' || part === '_') {
        state.isItalic = !state.isItalic;
      } else if (lower === '<br>' || lower === '<br/>' || lower === '<br />' || lower === '<p>' || lower === '</p>' || lower === '<div>' || lower === '</div>') {
        runs.push(new TextRun({ text: "", break: 1 }));
      } else {
        pushText(part);
      }
    }

    return { runs, endState: state };
  };

  // Helper: Create Docx Table from Markdown lines
  const createTableFromMarkdown = (tableLines: string[]): Table | null => {
    try {
      const validLines = tableLines.filter(line => !line.match(/^\|?\s*[-:]+[-|\s:]*\|?\s*$/));
      
      // Parse raw cells for each row
      const parsedRows = validLines.map(line => {
        const cells = line.split('|');
        if (line.trim().startsWith('|') && cells.length > 0 && cells[0].trim() === '') cells.shift();
        if (line.trim().endsWith('|') && cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();
        return cells;
      });

      if (parsedRows.length === 0) return null;

      // Determine standard column count from first row (typically the header)
      const hdrCount = Math.max(parsedRows[0].length, 1);

      const getColumnWidth = (colIndex: number, totalCols: number): number => {
        if (totalCols === 2) {
          // Proportions for 2-column teacher lesson plans
          return colIndex === 0 ? 35 : 65;
        }
        if (totalCols === 3) {
          if (colIndex === 0) return 25;
          if (colIndex === 1) return 35;
          return 40;
        }
        return Math.floor(100 / totalCols);
      };

      const rows = parsedRows.map((cells) => {
        let normalizedCells: string[] = [];
        if (cells.length === hdrCount) {
          normalizedCells = cells;
        } else if (cells.length > hdrCount) {
          normalizedCells = cells.slice(0, hdrCount - 1);
          const extraCells = cells.slice(hdrCount - 1);
          const mergedContent = extraCells.map(c => c.trim()).filter(Boolean).join("<br>");
          normalizedCells.push(mergedContent);
        } else {
          normalizedCells = [...cells];
          while (normalizedCells.length < hdrCount) {
            normalizedCells.push("");
          }
        }

        return new TableRow({
          children: normalizedCells.map((cellContent, cellIndex) => {
            let cellText = cellContent.trim();
            cellText = cellText.replace(/^\\\*\s*/, "").replace(/^\\\s+/, "");

            const cellW = getColumnWidth(cellIndex, hdrCount);
            const { runs } = parseTextWithFormatting(cellText);

            return new TableCell({
              children: [new Paragraph({
                children: runs.length > 0 ? runs : [new TextRun({ text: "" })],
                spacing: { before: 120, after: 0, line: 240, lineRule: LineRuleType.AUTO },
                indent: { firstLine: 0, left: 0, right: 0 },
                alignment: AlignmentType.LEFT
              })],
              width: {
                size: cellW,
                type: WidthType.PERCENTAGE,
              },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
              },
            });
          })
        });
      });

      return new Table({
        rows: rows,
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
      });
    } catch (e) {
      console.error("Lỗi parse table:", e);
      return null;
    }
  };

  const generateDocx = async () => {
    if (!safeResult) return;
    setIsGeneratingDoc(true);

    try {
      const lines = safeResult.split('\n');
      const children: (Paragraph | Table)[] = [];
      let tableBuffer: string[] = [];
      let inTable = false;
      let currentFormatState: FormatState = {
        isRed: false,
        isBold: false,
        isItalic: false,
        isSub: false,
        isSup: false,
      };

      // === CONSTANTS FOR FORMATTING ===
      const FIRST_LINE_INDENT = 720; // 1.27cm
      const PARAGRAPH_SPACING = { before: 120, after: 0, line: 240, lineRule: LineRuleType.AUTO };

      for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i].trimEnd();
        let trimmed = rawLine.trim();

        // 1. Remove leftover HTML anchors if any
        trimmed = trimmed.replace(/<a\s+id="[^"]*"><\/a>/gi, "");
        
        // 2. Remove escaped asterisk/spaces
        trimmed = trimmed.replace(/^\\\*\s*/, "").replace(/^\\\s+/, "");
        trimmed = trimmed.trim();

        // Check if line starts with NLS / AI section header or has NLS codes to auto-enable red highlight
        const lowerTrimmed = trimmed.toLowerCase();
        const strippedPrefix = lowerTrimmed.replace(/^[#\*\-+\s>]+/, '');

        if (
          strippedPrefix.startsWith('c. năng lực số') || 
          strippedPrefix.startsWith('c) năng lực số') || 
          strippedPrefix.startsWith('năng lực số') || 
          strippedPrefix.startsWith('d. năng lực trí tuệ nhân tạo') ||
          strippedPrefix.startsWith('d) năng lực trí tuệ nhân tạo') ||
          strippedPrefix.startsWith('c. năng lực trí tuệ nhân tạo') ||
          strippedPrefix.startsWith('c) năng lực trí tuệ nhân tạo') ||
          lowerTrimmed.includes('<nls>') ||
          lowerTrimmed.includes('<ai>') ||
          lowerTrimmed.startsWith('- nls') ||
          lowerTrimmed.startsWith('* nls') ||
          lowerTrimmed.startsWith('+ nls') ||
          lowerTrimmed.startsWith('nls ') ||
          (lowerTrimmed.includes('(bậc ') && (lowerTrimmed.includes('nls') || lowerTrimmed.includes('ai') || lowerTrimmed.includes('.tc')))
        ) {
          currentFormatState.isRed = true;
        } else if (
          strippedPrefix.startsWith('3. về phẩm chất') ||
          strippedPrefix.startsWith('3. phẩm chất') ||
          strippedPrefix.startsWith('3) phẩm chất') ||
          strippedPrefix.startsWith('iii. tiến trình') ||
          strippedPrefix.startsWith('ii. tiến trình') ||
          strippedPrefix.startsWith('ii. thiết bị') ||
          strippedPrefix.startsWith('b. năng lực đặc thù') ||
          strippedPrefix.startsWith('a. năng lực chung')
        ) {
          currentFormatState.isRed = false;
        }

        // Table Handling
        if (trimmed.startsWith('|')) {
          inTable = true;
          tableBuffer.push(rawLine);
          continue;
        } else if (inTable) {
          if (tableBuffer.length > 0) {
            const tableNode = createTableFromMarkdown(tableBuffer);
            if (tableNode) {
              children.push(tableNode);
            }
            tableBuffer = [];
          }
          inTable = false;
        }

        // Empty Line Handling
        if (!trimmed) {
          continue;
        }

        // Check standalone open/close tags
        if (trimmed === '<nls>' || trimmed === '<ai>') {
          currentFormatState.isRed = true;
          continue;
        }
        if (trimmed === '</nls>' || trimmed === '</ai>') {
          currentFormatState.isRed = false;
          continue;
        }

        // Parse formatted runs with state inheritance
        const { runs, endState } = parseTextWithFormatting(trimmed, currentFormatState);
        currentFormatState = endState;

        // If line contains no displayable runs (e.g. only stripped tags)
        if (runs.length === 0) {
          continue;
        }

        // Headings
        if (trimmed.startsWith('## ')) {
          children.push(new Paragraph({
            children: runs,
            heading: HeadingLevel.HEADING_1,
            spacing: PARAGRAPH_SPACING,
            indent: { firstLine: FIRST_LINE_INDENT },
            alignment: AlignmentType.JUSTIFIED
          }));
        } 
        else if (trimmed.startsWith('### ')) {
          children.push(new Paragraph({
            children: runs,
            heading: HeadingLevel.HEADING_2,
            spacing: PARAGRAPH_SPACING,
            indent: { firstLine: FIRST_LINE_INDENT },
            alignment: AlignmentType.JUSTIFIED
          }));
        }
        else if (trimmed.startsWith('#### ')) {
          children.push(new Paragraph({
            children: runs,
            heading: HeadingLevel.HEADING_3,
            spacing: PARAGRAPH_SPACING,
            indent: { firstLine: FIRST_LINE_INDENT },
            alignment: AlignmentType.JUSTIFIED
          }));
        }
        // List items or regular paragraphs
        else {
          children.push(new Paragraph({
            children: runs,
            spacing: PARAGRAPH_SPACING,
            indent: { firstLine: FIRST_LINE_INDENT },
            alignment: AlignmentType.JUSTIFIED
          }));
        }
      }

      // Flush remaining table
      if (tableBuffer.length > 0) {
        const tableNode = createTableFromMarkdown(tableBuffer);
        if (tableNode) children.push(tableNode);
      }

      // === PAGE MARGINS ===
      const doc = new Document({
        styles: {
          default: {
            document: {
              run: {
                size: 28, // 14pt
                font: "Times New Roman",
                color: "000000"
              },
              paragraph: {
                spacing: { line: 240, before: 120, after: 0 },
              }
            },
            heading1: {
                run: { size: 28, bold: true, font: "Times New Roman", color: "000000" },
                paragraph: { spacing: { before: 120, after: 0 }, indent: { firstLine: FIRST_LINE_INDENT } }
            },
            heading2: {
                run: { size: 28, bold: true, font: "Times New Roman", color: "000000" },
                paragraph: { spacing: { before: 120, after: 0 }, indent: { firstLine: FIRST_LINE_INDENT } }
            },
            heading3: {
                run: { size: 28, bold: true, font: "Times New Roman", color: "000000" },
                paragraph: { spacing: { before: 120, after: 0 }, indent: { firstLine: FIRST_LINE_INDENT } }
            }
          }
        },
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1134, // 2.0 cm
                bottom: 1134, // 2.0 cm
                left: 1701, // 3.0 cm chuẩn thể thức văn bản
                right: 1134, // 2.0 cm
              },
            },
          },
          children: children,
        }],
      });

      const blob = await Packer.toBlob(doc);
      FileSaver.saveAs(blob, "Giao_an_NLS_Chuan.docx");
    } catch (error) {
      console.error("Lỗi tạo docx:", error);
      alert("Lỗi khi tạo file DOCX. Đang tải xuống file văn bản thay thế.");
      handleDownloadTxt();
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!safeResult) return;
    const txtResult = safeResult.replace(/\[MATH_ID_\d+_\d+\]/g, '[Công thức Toán học]');
    const blob = new Blob([txtResult], { type: 'text/plain' });
    FileSaver.saveAs(blob, 'Giao_an_NLS.txt');
  };

  const formatResultForPreview = (text: string): string => {
    let formatted = text.replace(/\[MATH_ID_\d+_\d+\]/g, '[Công thức Toán học]');
    
    // Ensure "c. Năng lực số" subsection is rendered in red if not already wrapped
    if (!formatted.includes('<nls>') && (formatted.includes('Năng lực số') || formatted.includes('năng lực số'))) {
      try {
        const nlsRegex = new RegExp("([#*\\s]*[cC][.)]\\s*Năng lực số[\\s\\S]*?)(?=(?:[#*\\s]*(?:[dD][.)]|[3-9][.)]|II|III)\\s*|\\n\\n#|$)", "gi");
        formatted = formatted.replace(nlsRegex, '<nls>$1</nls>');
      } catch (e) {
        console.error("Error formatting preview:", e);
      }
    }
    return formatted;
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-16 rounded-3xl shadow-xl border border-indigo-100 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative">
             <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
             <div className="relative p-6 bg-white rounded-full shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600"></div>
             </div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mt-8">Đang xử lý thông minh</h3>
        <p className="text-slate-500 mt-2 text-center max-w-xs">AI đang đọc hiểu cấu trúc file và tích hợp năng lực số...</p>
      </div>
    );
  }

  if (!safeResult) return null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-indigo-50 overflow-hidden animate-fade-in-up">
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 px-6 py-12 flex flex-col items-center justify-center text-center space-y-4 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
           <Sparkles className="text-yellow-300" size={32} />
        </div>
        
        <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Xử lý thành công!</h2>
            <p className="text-indigo-100 mt-2 max-w-lg mx-auto text-lg font-light">
                Giáo án đã được chuẩn hóa định dạng và tích hợp năng lực số (Font Times New Roman 14pt chuẩn).
            </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md relative z-10">
          <button 
            onClick={generateDocx}
            disabled={isGeneratingDoc}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-white text-indigo-700 rounded-2xl text-lg font-bold hover:bg-indigo-50 transition-all shadow-lg transform hover:-translate-y-1 active:scale-95"
          >
             {isGeneratingDoc ? (
                 <span className="animate-pulse">Đang tạo file DOCX...</span>
             ) : (
                 <>
                    <Download size={22} />
                    <span>Tải về DOCX (Chuẩn Times New Roman 14)</span>
                 </>
             )}
          </button>
        </div>
      </div>
      
      <div className="bg-slate-50 border-t border-slate-200">
        <button 
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-center text-slate-500 text-sm font-semibold uppercase tracking-wider py-4 hover:bg-slate-100 transition-colors"
        >
            {showPreview ? (
                <>Thu gọn <ChevronUp size={16} className="ml-2" /></>
            ) : (
                <>Xem trước nội dung (Font Times New Roman 14) <ChevronDown size={16} className="ml-2" /></>
            )}
        </button>
      </div>

      {showPreview && (
        <div className="p-8 sm:p-12 border-t border-slate-200 bg-white font-['Times_New_Roman',Times,serif] text-[14pt] leading-[1.6] text-slate-900 text-justify">
            <div className="prose max-w-none prose-headings:font-['Times_New_Roman',Times,serif] prose-p:font-['Times_New_Roman',Times,serif] prose-li:font-['Times_New_Roman',Times,serif] prose-strong:font-['Times_New_Roman',Times,serif] prose-p:my-2 prose-headings:my-3">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {formatResultForPreview(safeResult)}
              </ReactMarkdown>
            </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;