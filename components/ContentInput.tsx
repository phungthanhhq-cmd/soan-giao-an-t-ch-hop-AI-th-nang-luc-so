import React, { useRef, useState } from 'react';
import { Loader2, CheckCircle2, FileText, Upload, AlertTriangle, FileBarChart, RefreshCw, Trash2, Database, BookmarkCheck } from 'lucide-react';
import JSZip from 'jszip';
import { Subject } from '../types';

export interface PPCTSessionItem {
  content: string;
  fileName: string;
  subject: Subject;
  grade: number;
  updatedAt: number;
}

interface ContentInputProps {
  lessonContent: string;
  setLessonContent: (val: string) => void;
  distributionContent: string;
  setDistributionContent: (val: string) => void;
  setMathMap: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  currentSubject: Subject;
  currentGrade: number;
  distFileName: string | null;
  setDistFileName: (name: string | null) => void;
  onClearCurrentPPCT: () => void;
  cachedPPCTs: Record<string, PPCTSessionItem>;
  onSelectCachedPPCT?: (key: string) => void;
}

// Khai báo thư viện ngoại
declare const mammoth: any;
declare const pdfjsLib: any;

const ContentInput: React.FC<ContentInputProps> = ({ 
  lessonContent, 
  setLessonContent,
  distributionContent,
  setDistributionContent,
  setMathMap,
  currentSubject,
  currentGrade,
  distFileName,
  setDistFileName,
  onClearCurrentPPCT,
  cachedPPCTs,
  onSelectCachedPPCT
}) => {
  const lessonInputRef = useRef<HTMLInputElement>(null);
  const distInputRef = useRef<HTMLInputElement>(null);
  
  const [processingLesson, setProcessingLesson] = useState(false);
  const [processingDist, setProcessingDist] = useState(false);
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);

  const processFile = async (file: File, isLesson: boolean) => {
    const setProcessing = isLesson ? setProcessingLesson : setProcessingDist;
    const setContent = isLesson ? setLessonContent : setDistributionContent;
    const setFileName = isLesson ? setLessonFileName : setDistFileName;

    setProcessing(true);
    setFileName(file.name);
    
    // Clear math map when a new lesson file is uploaded
    if (isLesson) {
      setMathMap({});
    }
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      let text = "";

      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        text = await extractTextFromPDF(arrayBuffer);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        file.name.endsWith(".docx")
      ) {
        text = await extractTextFromDOCX(arrayBuffer);
      } else {
        alert("Định dạng file không được hỗ trợ. Vui lòng chọn PDF hoặc DOCX.");
        setFileName(null);
        setProcessing(false);
        return;
      }

      if (!text.trim()) {
        alert("Không thể đọc được nội dung văn bản từ file này. Có thể file chứa ảnh scan?");
        setFileName(null);
      } else {
        setContent(text);
      }

    } catch (error) {
      console.error("Error processing file:", error);
      alert("Có lỗi xảy ra khi đọc file.");
      setFileName(null);
    } finally {
      setProcessing(false);
    }
  };

  const preprocessDOCXMath = async (arrayBuffer: ArrayBuffer): Promise<ArrayBuffer> => {
    try {
      const zip = await JSZip.loadAsync(arrayBuffer);
      const docXmlFile = zip.file("word/document.xml");
      if (!docXmlFile) return arrayBuffer;

      let xml = await docXmlFile.async("string");
      let mathCounter = 0;
      const timestamp = Date.now();
      const newMathMap: Record<string, string> = {};

      // Replace OMML math blocks with plain text wrapped in [MATH_ID_X]
      xml = xml.replace(/<m:oMath[^>]*>([\s\S]*?)<\/m:oMath>/g, (match) => {
        const mathId = `MATH_ID_${timestamp}_${mathCounter++}`;
        newMathMap[mathId] = match; // Store the original OMML XML
        return `<w:r><w:t xml:space="preserve">[${mathId}]</w:t></w:r>`;
      });

      if (Object.keys(newMathMap).length > 0) {
        setMathMap(prev => ({ ...prev, ...newMathMap }));
      }

      zip.file("word/document.xml", xml);
      return await zip.generateAsync({ type: "arraybuffer" });
    } catch (e) {
      console.error("Error preprocessing DOCX math:", e);
      return arrayBuffer; // fallback to original if error
    }
  };

  const extractTextFromDOCX = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    if (typeof mammoth === 'undefined') return "";
    try {
        // Preprocess to extract math formulas before mammoth ignores them
        const processedBuffer = await preprocessDOCXMath(arrayBuffer);

        // Use convertToHtml to preserve structure (tables, headers) instead of raw text
        const result = await mammoth.convertToHtml({ arrayBuffer: processedBuffer });
        let html = result.value;
        
        // Remove heavy base64 images to prevent context overload/lag for the AI
        html = html.replace(/<img[^>]*src="data:image\/[^;]+;base64,[^"]+"[^>]*>/g, ' [HÌNH ẢNH ĐÃ LƯỢC BỎ] ');
        
        // Clean weird symbols, Wingdings / Private Use Area glyphs, square boxes (□, ■, etc.)
        html = html.replace(/[\uF000-\uF8FF]/g, '');
        html = html.replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD]/g, '- ');
        html = html.replace(/&lt;([a-zA-Z0-9_\-]+)&gt;/g, '<$1>');
        html = html.replace(/&lt;\/([a-zA-Z0-9_\-]+)&gt;/g, '</$1>');
        
        return html;
    } catch (e) {
        console.error("Mammoth error", e);
        return "";
    }
  };

  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    if (typeof pdfjsLib === 'undefined') return "";
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n\n";
    }
    // Clean weird symbols
    fullText = fullText.replace(/[\uF000-\uF8FF]/g, '');
    fullText = fullText.replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD]/g, '- ');
    return fullText;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isLesson: boolean) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, isLesson);
    e.target.value = '';
  };

  // List of cached items in session
  const cachedList = Object.entries(cachedPPCTs);
  const currentKey = `${currentSubject}_${currentGrade}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 border border-white/50 backdrop-blur-sm mt-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-50 rounded-lg mr-3">
              <Upload size={20} className="text-indigo-600"/>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tài liệu đầu vào</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Đang chọn: <span className="font-semibold text-indigo-700">{currentSubject} - Lớp {currentGrade}</span>
            </p>
          </div>
        </div>

        {cachedList.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium">
            <BookmarkCheck size={16} className="text-emerald-600 shrink-0" />
            <span>Phiên này đã lưu PPCT của <strong>{cachedList.length} môn</strong></span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ô Upload Giáo án */}
        <div className="flex flex-col h-full">
          <div 
            onClick={() => lessonInputRef.current?.click()}
            className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-7 transition-all duration-300 cursor-pointer text-center flex-1 flex flex-col justify-center
              ${lessonContent 
                  ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50' 
                  : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/30'
              }
            `}
          >
            <input 
              type="file" 
              ref={lessonInputRef}
              onChange={(e) => handleFileChange(e, true)}
              accept=".pdf,.docx" 
              className="hidden" 
            />
            
            <div className="flex flex-col items-center justify-center relative z-10">
              {processingLesson ? (
                 <div className="p-4 bg-white rounded-full shadow-lg mb-3">
                     <Loader2 className="text-indigo-600 animate-spin" size={32} />
                 </div>
              ) : lessonContent ? (
                 <div className="p-4 bg-white rounded-full shadow-lg shadow-emerald-200 mb-3">
                   <CheckCircle2 className="text-emerald-500" size={32} />
                 </div>
              ) : (
                <div className="p-4 rounded-full shadow-lg mb-4 transition-transform group-hover:-translate-y-1 bg-indigo-600 text-white shadow-indigo-200">
                   <FileText size={28} />
                </div>
              )}

              {processingLesson ? (
                   <p className="text-sm font-semibold text-slate-600 animate-pulse">Đang phân tích...</p>
              ) : lessonContent ? (
                  <>
                      <p className="text-sm font-bold text-emerald-800 break-all px-2 line-clamp-1">{lessonFileName || 'Giáo án đã tải lên'}</p>
                      <p className="text-xs font-medium text-emerald-600 mt-1 bg-emerald-100 px-3 py-1 rounded-full">Đã sẵn sàng để tích hợp</p>
                      <span className="text-[11px] text-indigo-600 underline mt-2">Bấm để thay đổi file khác</span>
                  </>
              ) : (
                  <>
                      <p className="text-base font-bold text-slate-700">Tải lên Giáo án chưa tích hợp</p>
                      <p className="text-xs text-slate-500 mt-2 max-w-[220px] mx-auto leading-relaxed">
                        Hỗ trợ file Word (.docx) hoặc PDF. Bản đẹp, không phải scan.
                      </p>
                      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={13} />
                          <span>Bấm để chọn file giáo án</span>
                      </div>
                  </>
              )}
            </div>
          </div>

          {!lessonContent && (
              <div className="flex items-center justify-center mt-3 text-rose-500 text-xs font-medium">
                  <AlertTriangle size={12} className="mr-1.5"/>
                  <span>Yêu cầu bắt buộc</span>
              </div>
          )}
        </div>

        {/* Ô Upload PPCT (Lưu 1 lần trong phiên) */}
        <div className="flex flex-col h-full">
          <div 
            className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-7 transition-all duration-300 text-center flex-1 flex flex-col justify-center
              ${distributionContent 
                  ? 'border-emerald-300 bg-emerald-50/50' 
                  : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/30 cursor-pointer'
              }
            `}
            onClick={() => {
              if (!distributionContent) {
                distInputRef.current?.click();
              }
            }}
          >
            <input 
              type="file" 
              ref={distInputRef}
              onChange={(e) => handleFileChange(e, false)}
              accept=".pdf,.docx" 
              className="hidden" 
            />
            
            <div className="flex flex-col items-center justify-center relative z-10">
              {processingDist ? (
                 <div className="p-4 bg-white rounded-full shadow-lg mb-3">
                     <Loader2 className="text-emerald-600 animate-spin" size={32} />
                 </div>
              ) : distributionContent ? (
                 <div className="p-4 bg-white rounded-full shadow-lg shadow-emerald-200 mb-3">
                   <CheckCircle2 className="text-emerald-500" size={32} />
                 </div>
              ) : (
                <div className="p-4 rounded-full shadow-lg mb-4 transition-transform group-hover:-translate-y-1 bg-white text-slate-400 border border-slate-100">
                   <FileBarChart size={28} />
                </div>
              )}

              {processingDist ? (
                   <p className="text-sm font-semibold text-slate-600 animate-pulse">Đang phân tích PPCT...</p>
              ) : distributionContent ? (
                  <>
                      <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                        <Database size={11} />
                        <span>Đã lưu PPCT cho: {currentSubject} - Lớp {currentGrade}</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-900 break-all px-2 line-clamp-1">{distFileName || 'Phân phối chương trình'}</p>
                      <p className="text-xs text-emerald-700 mt-1 max-w-[260px] mx-auto leading-relaxed">
                        Tải 1 lần - Tự động áp dụng cho mọi bài dạy của môn này trong phiên.
                      </p>

                      {/* Action buttons when PPCT is loaded */}
                      <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            distInputRef.current?.click();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-xl shadow-xs transition-colors"
                          title="Tải file PPCT khác để thay thế cho môn này"
                        >
                          <RefreshCw size={12} />
                          <span>Đổi file PPCT khác</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClearCurrentPPCT();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl shadow-xs transition-colors"
                          title="Xóa PPCT của môn này khỏi phiên"
                        >
                          <Trash2 size={12} />
                          <span>Xóa PPCT môn này</span>
                        </button>
                      </div>
                  </>
              ) : (
                  <>
                      <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                        ✨ Chỉ cần tải 1 lần / môn
                      </div>
                      <p className="text-base font-bold text-slate-700">Tải lên PPCT {currentSubject} (Lớp {currentGrade})</p>
                      <p className="text-xs text-slate-500 mt-2 max-w-[240px] mx-auto leading-relaxed">
                        Tự động trích xuất đúng mã năng lực theo quy định. Không cần tải lại cho các bài học tiếp theo của môn này.
                      </p>
                      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={13} />
                          <span>Bấm để chọn file PPCT</span>
                      </div>
                  </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cached PPCTs switcher footer */}
      {cachedList.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <BookmarkCheck size={15} className="text-indigo-600" />
            <span className="font-semibold">PPCT đã lưu trong phiên:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {cachedList.map(([key, item]) => {
              const isActive = key === currentKey && !!distributionContent;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectCachedPPCT && onSelectCachedPPCT(key)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={`File: ${item.fileName} - Bấm để chuyển`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-emerald-500'}`}></span>
                  <span>{item.subject} (Lớp {item.grade})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentInput;