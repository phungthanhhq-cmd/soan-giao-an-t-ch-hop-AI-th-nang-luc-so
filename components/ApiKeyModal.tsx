import React, { useState } from 'react';
import { KeyRound, ExternalLink, Copy, Check, X, Sparkles, Share2, Info, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cleanApiKey, testGeminiApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; model?: string } | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      const current = apiKey || localStorage.getItem("USER_GEMINI_API_KEY") || "";
      setInputKey(current);
      setTestResult(null);
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    const keyToTest = cleanApiKey(inputKey);
    if (!keyToTest) {
      setTestResult({ success: false, message: "Vui lòng nhập hoặc dán API Key trước khi kiểm tra." });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await testGeminiApiKey(keyToTest);
      setTestResult(result);
    } catch (e: any) {
      setTestResult({ success: false, message: e?.message || "Lỗi kiểm tra kết nối." });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const cleaned = cleanApiKey(inputKey);
    onSaveApiKey(cleaned);
    onClose();
  };

  const handleClear = () => {
    setInputKey('');
    setTestResult(null);
    onSaveApiKey('');
  };

  const generateShareLink = () => {
    const keyToUse = cleanApiKey(inputKey) || cleanApiKey(apiKey);
    if (!keyToUse) return window.location.origin + window.location.pathname;
    
    const baseUrl = window.location.origin + window.location.pathname;
    const url = new URL(baseUrl);
    url.searchParams.set('apiKey', keyToUse);
    return url.toString();
  };

  const handleCopyShareLink = () => {
    const shareUrl = generateShareLink();
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer"
            title="Đóng"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-amber-400 text-slate-900 rounded-2xl shadow-md font-bold text-lg">
              🔑
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Cấu hình API Key Gemini</h2>
              <p className="text-xs text-blue-100 mt-0.5">Tự động tương thích với mọi cấu hình máy tính &amp; đường truyền mạng</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Step 1: Get API Key */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-500 shrink-0" />
                Chưa có API Key? Lấy miễn phí từ Google
              </h3>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                Google AI Studio cung cấp API Key miễn phí cho giáo viên và người dùng (không mất phí).
              </p>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 shrink-0 active:scale-95"
            >
              <span>LẤY API KEY NGAY</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Step 2: Input API Key */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Nhập hoặc dán Gemini API Key của bạn:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setTestResult(null);
                }}
                placeholder="Dán Gemini API Key của bạn (ví dụ: AIzaSy... hoặc AQ...)"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-800"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !inputKey.trim()}
                className="px-3.5 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Kiểm tra kết nối"
              >
                {isTesting ? <Loader2 size={14} className="animate-spin" /> : <KeyRound size={14} />}
                <span>{isTesting ? "Đang kiểm tra..." : "Kiểm tra"}</span>
              </button>
              {inputKey.trim() && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-3 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0"
                  title="Xóa khóa"
                >
                  Xóa
                </button>
              )}
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  testResult.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{testResult.message}</p>
                </div>
              </div>
            )}

            {inputKey.trim() && (cleanApiKey(inputKey).startsWith('AIzaSy') || cleanApiKey(inputKey).startsWith('AQ')) && !testResult && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
                <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                <span>Định dạng API Key Gemini hợp lệ (Hệ thống đã tự động lọc sạch khoảng trắng thừa và ký tự ẩn).</span>
              </div>
            )}

            <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1 leading-relaxed">
              <Info size={13} className="text-indigo-500 shrink-0" />
              API Key được lưu trực tiếp trên trình duyệt của bạn — tương thích tự động với mọi máy tính, máy tính bảng và điện thoại.
            </p>
          </div>

          {/* Step 3: Create & Share Link containing API Key */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                <Share2 size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Tự động cấu hình qua Link chia sẻ</h4>
                <p className="text-[11px] text-slate-500">
                  Tạo liên kết chứa sẵn API Key để gửi cho đồng nghiệp. Khi họ mở link, ứng dụng sẽ <strong>tự động nhận diện và lưu API Key</strong> mà họ không cần phải thao tác gì thêm!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyShareLink}
                disabled={!inputKey.trim() && !apiKey.trim()}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-95 cursor-pointer ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check size={14} />
                    <span>ĐÃ SAO CHÉP LINK TỰ ĐỘNG CẬP NHẬT API KEY!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>SAO CHÉP LINK CHIA SẺ KÈM API KEY</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Trạng thái: {apiKey.trim() ? <span className="text-emerald-600 font-bold">Đã lưu API Key</span> : <span className="text-amber-600 font-bold">Chưa có API Key</span>}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              ĐÓNG
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              LƯU CẤU HÌNH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
