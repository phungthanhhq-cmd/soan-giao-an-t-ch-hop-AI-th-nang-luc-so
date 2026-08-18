import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LessonForm from './components/LessonForm';
import ContentInput from './components/ContentInput';
import ManualNLSInput from './components/ManualNLSInput';
import ManualAIInput from './components/ManualAIInput';
import ResultDisplay from './components/ResultDisplay';
import { Subject, Textbook, ManualNLSEntry, SchoolLevel } from './types';
import { generateNLSLessonPlan } from './services/geminiService';
import { 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  Info, 
  LogOut, 
  CheckCircle2, 
  ShieldAlert, 
  KeyRound, 
  Settings,
  Share2,
  Check,
  Bot
} from 'lucide-react';
import { 
  subscribeToAuth, 
  logout, 
  fetchInviteLink, 
  bindEmailToLink, 
  checkEmailBinding, 
  isSimulationMode 
} from './services/firebase';
import LoginPanel from './components/LoginPanel';
import AdminPanel from './components/AdminPanel';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  // Authentication State (Bypassed - Direct Access for All Users)
  const [user, setUser] = useState<any>({
    email: 'Sử dụng trực tiếp (Mở tự do)',
    displayName: 'Người dùng',
  });
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // State for Form
  const [textbook, setTextbook] = useState<Textbook>(Textbook.KNTT);
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>(SchoolLevel.THCS);
  const [subject, setSubject] = useState<Subject>(Subject.TIN);
  const [grade, setGrade] = useState<number>(6);
  
  // Content States
  const [lessonContent, setLessonContent] = useState<string>('');
  const [distributionContent, setDistributionContent] = useState<string>('');
  const [mathMap, setMathMap] = useState<Record<string, string>>({});
  
  // Independent Integration Modes: NLS and AI
  const [enableNLS, setEnableNLS] = useState<boolean>(true);
  const [enableAI, setEnableAI] = useState<boolean>(true);

  // New State for Manual NLS & AI Input
  const [manualNLSEntries, setManualNLSEntries] = useState<ManualNLSEntry[]>([]);
  const [manualAIEntries, setManualAIEntries] = useState<ManualNLSEntry[]>([]);
  
  // State for Options
  const [analyzeOnly, setAnalyzeOnly] = useState(false);
  const [detailedReport, setDetailedReport] = useState(false);

  // State for direct Gemini API Key configuration
  const [apiKeyInput, setApiKeyInput] = useState<string>(() => {
    return localStorage.getItem("USER_GEMINI_API_KEY") || "";
  });
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [autoKeyNotice, setAutoKeyNotice] = useState<string | null>(null);

  // Auto detect API key from URL parameter when user opens a link
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      let keyFromUrl = searchParams.get('apiKey') || 
                        searchParams.get('key') || 
                        searchParams.get('gemini_key') || 
                        searchParams.get('api_key') ||
                        searchParams.get('geminiKey');

      if (!keyFromUrl && window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        keyFromUrl = hashParams.get('apiKey') || hashParams.get('key') || hashParams.get('api_key');
      }

      if (keyFromUrl && keyFromUrl.trim().length > 0) {
        const cleanKey = keyFromUrl.trim();
        setApiKeyInput(cleanKey);
        localStorage.setItem("USER_GEMINI_API_KEY", cleanKey);
        setAutoKeyNotice(`🎉 Hệ thống đã tự động cập nhật và áp dụng API Key từ liên kết! (Mã API Key: ${cleanKey.slice(0, 6)}...${cleanKey.slice(-4)})`);
        
        // Clean URL parameter to keep URL tidy & private
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (err) {
      console.error("Lỗi khi tự động trích xuất API Key từ URL:", err);
    }
  }, []);

  const handleSaveApiKey = (val: string) => {
    const trimmed = val.trim();
    setApiKeyInput(trimmed);
    localStorage.setItem("USER_GEMINI_API_KEY", trimmed);
  };

  // App State
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to Authentication state on mount
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProcess = async () => {
    if (!lessonContent || lessonContent.trim().length === 0) {
      setError("Vui lòng tải lên file giáo án (Giáo án trống hoặc chưa được tải).");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Pass contents, integration modes, and manual entries to service
      const generatedText = await generateNLSLessonPlan(
        { 
            textbook, 
            schoolLevel,
            subject, 
            grade, 
            content: lessonContent,
            distributionContent: distributionContent,
            manualNLS: enableNLS ? manualNLSEntries : [],
            manualAI: enableAI ? manualAIEntries : [],
            integrationModes: { enableNLS, enableAI }
        },
        { analyzeOnly, detailedReport, comparisonExport: false }
      );

      if (!generatedText || generatedText.trim().length === 0) {
          throw new Error("AI trả về kết quả rỗng. Vui lòng thử lại với file giáo án rõ ràng hơn.");
      }

      setResult(generatedText);
    } catch (err: any) {
      console.error("Process Error:", err);
      const msg = err.message || "Đã xảy ra lỗi không xác định khi kết nối với AI.";
      setError(msg);
      if (msg.includes("API Key") || msg.includes("API") || msg.includes("AI") || msg.includes("chưa được cấu hình")) {
        setShowKeyInput(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualLogout = async () => {
    try {
      setAuthLoading(true);
      await logout();
      localStorage.removeItem('activeInviteCode');
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    } finally {
      setAuthLoading(false);
    }
  };
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4 font-sans">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-slate-500 font-bold text-sm tracking-wide">ĐANG TẢI DỮ LIỆU HỆ THỐNG...</p>
      </div>
    );
  }

  // 2. Unauthenticated state
  if (!user) {
    return (
      <LoginPanel 
        onLoginSuccess={(u) => setUser(u)} 
        isLoading={authLoading} 
        setIsLoading={setAuthLoading} 
      />
    );
  }

  // 3. Main Authorized Access view
  return (
    <div className="min-h-screen font-sans pb-20 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70"></div>
         <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-200/30 rounded-full blur-[100px] mix-blend-multiply filter opacity-70"></div>
      </div>

      <Header 
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        apiKeySet={Boolean(apiKeyInput.trim())}
      />

      {autoKeyNotice && (
        <div className="bg-emerald-600 text-white px-6 py-3.5 shadow-md flex items-center justify-between text-xs sm:text-sm font-bold relative z-20 animate-in slide-in-from-top-2 duration-300">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base shrink-0">🎉</span>
              <span>{autoKeyNotice}</span>
            </div>
            <button 
              onClick={() => setAutoKeyNotice(null)}
              className="ml-4 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-xl text-xs shrink-0 transition-colors"
            >
              Đóng thông báo
            </button>
          </div>
        </div>
      )}


      
      <main className="max-w-6xl mx-auto px-6 mt-10 relative z-10">
        {/* Original App content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: Inputs */}
          <div className="lg:col-span-8 space-y-8">
            <LessonForm 
              textbook={textbook} setTextbook={setTextbook}
              schoolLevel={schoolLevel} setSchoolLevel={setSchoolLevel}
              subject={subject} setSubject={setSubject}
              grade={grade} setGrade={setGrade}
            />

            {/* Independent Integration Modes Selector - Placed directly below Lesson Info */}
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-6 sm:p-7 border border-white/50 backdrop-blur-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center">
                    <Sparkles className="mr-2 text-indigo-600 shrink-0" size={22} />
                    Tùy chọn Chế độ Tích hợp
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    2 chức năng hoạt động độc lập. Chọn tích hợp NLS, AI hoặc cả 2 tùy theo mục tiêu bài dạy.
                  </p>
                </div>
                {/* Quick action buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => { setEnableNLS(true); setEnableAI(true); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      enableNLS && enableAI 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Cả 2 (NLS + AI)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEnableNLS(true); setEnableAI(false); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      enableNLS && !enableAI 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Chỉ NLS
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEnableNLS(false); setEnableAI(true); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      !enableNLS && enableAI 
                        ? 'bg-purple-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Chỉ AI
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Option 1: Tích hợp Năng lực số (NLS) */}
                <div 
                  onClick={() => setEnableNLS(!enableNLS)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex items-start space-x-3.5 ${
                    enableNLS 
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20' 
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    enableNLS 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-slate-300 text-transparent'
                  }`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">Tích hợp Năng lực số (NLS)</h3>
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 shrink-0">
                        TT 02/2025
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Trích xuất PPCT hoặc chỉ định mã NLS (D1-D6) vào Mục tiêu I.2 và Tiến trình dạy học chuẩn.
                    </p>
                  </div>
                </div>

                {/* Option 2: Tích hợp Trí tuệ Nhân tạo (AI) */}
                <div 
                  onClick={() => setEnableAI(!enableAI)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex items-start space-x-3.5 ${
                    enableAI 
                      ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-500/20' 
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    enableAI 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-white border-slate-300 text-transparent'
                  }`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">Tích hợp Trí tuệ Nhân tạo (AI)</h3>
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 shrink-0">
                        QĐ 3439 & TT 02
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Tích hợp năng lực AI (AI.1-AI.5), ứng dụng công cụ AI, câu lệnh prompt & đạo đức học thuật.
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Mode Badge */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium">Trạng thái tích hợp áp dụng:</span>
                <span className={`font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                  enableNLS && enableAI 
                    ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 border border-indigo-200' 
                    : enableNLS 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : enableAI 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-slate-100 text-slate-600'
                }`}>
                  {enableNLS && enableAI 
                    ? '✨ Tích hợp đồng thời Cả NLS & AI' 
                    : enableNLS 
                      ? '⚡ Chỉ tích hợp Năng lực số (NLS)' 
                      : enableAI 
                        ? '🤖 Chỉ tích hợp Trí tuệ Nhân tạo (AI)' 
                        : '📄 Chuẩn hóa giáo án gốc (Không tích hợp thêm)'}
                </span>
              </div>
            </div>

            {/* Smart PPCT & Integration Helper Banner */}
            {distributionContent && distributionContent.trim().length > 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs flex items-start space-x-3 shadow-sm">
                <Sparkles className="shrink-0 text-emerald-600 mt-0.5" size={18} />
                <div className="flex-1">
                  <p className="font-bold text-emerald-950 text-sm">🌟 Đã nhận diện Phân phối chương trình (PPCT):</p>
                  <p className="mt-1 text-emerald-800 leading-relaxed">
                    Hệ thống sẽ tự động quét, đối chiếu đúng bài học trong PPCT và trích xuất nguyên văn các mã NLS / AI có sẵn để tích hợp đồng bộ vào giáo án (tất cả phần tích hợp được <strong>đánh dấu bằng màu đỏ</strong>). Thầy/cô <strong>không cần phải lựa chọn mã thủ công</strong> bên dưới.
                  </p>
                </div>
              </div>
            ) : (
              (enableNLS || enableAI) && (
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 text-indigo-900 text-xs flex items-center space-x-2.5">
                  <Info className="shrink-0 text-indigo-600" size={16} />
                  <span>
                    💡 <strong>Lưu ý:</strong> Trường hợp chỉ tải giáo án lên (không có PPCT), hệ thống sẽ tích hợp theo đúng các mã thầy/cô tích chọn bên dưới và đánh dấu màu đỏ (tuyệt đối không tự ý thêm mã ngoài).
                  </span>
                </div>
              )
            )}

            {/* Horizontal Input Row for NLS and AI */}
            {(enableNLS || enableAI) && (
              <div className={`grid gap-6 ${enableNLS && enableAI ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                {/* Manual NLS Input Section (Conditional) */}
                {enableNLS && (
                  <ManualNLSInput 
                      entries={manualNLSEntries}
                      setEntries={setManualNLSEntries}
                      schoolLevel={schoolLevel}
                      grade={grade}
                  />
                )}

                {/* Manual AI Input Section (Conditional - Theo TT 02 & QĐ 3439) */}
                {enableAI && (
                  <ManualAIInput 
                      entries={manualAIEntries}
                      setEntries={setManualAIEntries}
                      schoolLevel={schoolLevel}
                      grade={grade}
                  />
                )}
              </div>
            )}

            {!enableNLS && !enableAI && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-xs flex items-center space-x-3">
                <Info className="shrink-0 text-amber-600" size={18} />
                <span>
                  Bạn đang chọn <strong>không tích hợp NLS và AI</strong>. Hệ thống sẽ chuẩn hóa bố cục, bảng biểu và công thức toán/hóa học từ giáo án gốc mà không bổ sung mục năng lực mới.
                </span>
              </div>
            )}
            
            {/* Content Input (Upload Lesson Plan & Syllabus) */}
            <ContentInput 
                lessonContent={lessonContent} 
                setLessonContent={setLessonContent}
                distributionContent={distributionContent}
                setDistributionContent={setDistributionContent}
                setMathMap={setMathMap}
            />
            
            {/* Options Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div className="flex items-center">
                <div className="p-2 bg-slate-100 rounded-lg mr-3">
                    <Sliders className="text-slate-600" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Cấu hình xử lý</h3>
                    <p className="text-xs text-slate-500">Tùy chỉnh cách AI làm việc</p>
                </div>
              </div>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${analyzeOnly ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                    {analyzeOnly && <Check className="text-white w-3 h-3" />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={analyzeOnly}
                    onChange={(e) => setAnalyzeOnly(e.target.checked)}
                    className="hidden" 
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Chỉ phân tích</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${detailedReport ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                    {detailedReport && <Check className="text-white w-3 h-3" />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={detailedReport}
                    onChange={(e) => setDetailedReport(e.target.checked)}
                    className="hidden" 
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Báo cáo chi tiết</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 px-6 py-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-shake">
                <div className="flex items-start space-x-3">
                  <ShieldAlert className="mr-2 shrink-0 text-rose-500 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-rose-900">Thông báo từ Hệ thống AI</h4>
                    <p className="text-xs font-medium text-rose-700 mt-1 leading-relaxed">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center shrink-0 self-end sm:self-center"
                >
                  <KeyRound size={14} className="mr-1.5" />
                  DÁN / ĐỔI API KEY NGAY
                </button>
              </div>
            )}
            
            <button
              onClick={handleProcess}
              disabled={loading}
              className={`w-full py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 text-white font-bold text-lg tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/40 ${
                loading 
                  ? 'bg-slate-400 cursor-not-allowed shadow-none translate-y-0' 
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right'
              }`}
            >
              {loading ? (
                <span>Hệ thống đang xử lý...</span>
              ) : (
                <>
                  <Zap size={24} className="fill-current" />
                  <span>KÍCH HOẠT XỬ LÝ AI</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Info */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="font-bold text-xl mb-6 flex items-center">
                 <ShieldCheck className="mr-2 text-emerald-400" />
                 Quy trình chuẩn
              </h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm border border-white/20 mr-4">1</div>
                   <div>
                       <p className="font-semibold text-white">Thiết lập thông tin</p>
                       <p className="text-indigo-200 text-xs mt-1">Chọn đúng bộ sách và lớp để AI hiểu ngữ cảnh.</p>
                   </div>
                </li>
                <li className="flex">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm border border-white/20 mr-4">2</div>
                   <div>
                       <p className="font-semibold text-white">Upload tài liệu</p>
                       <p className="text-indigo-200 text-xs mt-1">Hệ thống ưu tiên file .docx để giữ định dạng tốt nhất.</p>
                   </div>
                </li>
                 <li className="flex">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-sm border border-emerald-400/50 mr-4 text-emerald-300">3</div>
                   <div>
                       <p className="font-semibold text-emerald-300">Nhập yêu cầu NLS</p>
                       <p className="text-indigo-200 text-xs mt-1">Nếu có yêu cầu riêng, hãy nhập thủ công để AI thực hiện chính xác.</p>
                   </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Khung năng lực số</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Khai thác dữ liệu", color: "bg-blue-500" },
                  { name: "Giao tiếp & Hợp tác", color: "bg-purple-500" },
                  { name: "Sáng tạo nội dung", color: "bg-pink-500" },
                  { name: "An toàn số", color: "bg-red-500" },
                  { name: "Giải quyết vấn đề", color: "bg-amber-500" },
                  { name: "Ứng dụng AI", color: "bg-indigo-500" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center p-2 rounded-xl hover:bg-white transition-colors cursor-default group">
                    <div className={`w-2 h-8 ${item.color} rounded-full mr-3 group-hover:scale-y-125 transition-transform`}></div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Result Section */}
      <div className="mt-12 mb-20">
         <ResultDisplay result={result} loading={loading} mathMap={mathMap} />
      </div>

      <footer className="mt-12 text-center text-slate-400 text-sm py-8 border-t border-slate-200/50 bg-slate-50">
        <p className="font-medium">@phungthanhAI</p>
      </footer>

      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKeyInput}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
};

// Simple Icon component for Checkbox
const CheckCheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default App;
