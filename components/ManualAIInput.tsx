import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Bot, Info, Sparkles, ChevronDown, Search, Check, X, Edit3, ListFilter } from 'lucide-react';
import { AI_COMPONENT_OPTIONS, AI_LEVEL_DETAILS, AI_ALL_GRADE_REQUIREMENTS } from '../constants';
import { ManualNLSEntry, SchoolLevel } from '../types';

interface ManualAIInputProps {
  entries: ManualNLSEntry[];
  setEntries: (entries: ManualNLSEntry[]) => void;
  schoolLevel: SchoolLevel;
  grade: number;
}

// Helper lookup to find official AI code across all levels and grade requirements
const findAICodeInfo = (codeStr: string) => {
  const cleanCode = codeStr.trim().toLowerCase();
  if (!cleanCode) return null;

  // 1. Check AI_ALL_GRADE_REQUIREMENTS first (e.g. 6.A1.1, 6.A1.2, 6.A1.3...)
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

  // 2. Check AI_LEVEL_DETAILS (e.g. A.TC1, B.TC2...)
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

  return null;
};

const ManualAIInput: React.FC<ManualAIInputProps> = ({ entries, setEntries, schoolLevel, grade }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>(() => grade.toString());
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'select' | 'manual'>('select');

  // Custom manual input state inside dropdown
  const [customCode, setCustomCode] = useState<string>('');
  const [customDesc, setCustomDesc] = useState<string>('');
  const [customDomain, setCustomDomain] = useState<string>('AI.TUYCHINH');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update grade selection when grade prop changes
  useEffect(() => {
    setSelectedGradeFilter(grade.toString());
  }, [grade]);

  // When customCode changes, try to auto-fill official description if matching code exists
  const handleCustomCodeChange = (val: string) => {
    setCustomCode(val);
    const matched = findAICodeInfo(val);
    if (matched) {
      setCustomDesc(matched.desc);
      setCustomDomain(matched.domainCode);
    }
  };

  // Add custom AI code directly
  const handleAddCustomCode = (codeToAdd?: string, descToAdd?: string) => {
    const finalCode = (codeToAdd || customCode).trim();
    if (!finalCode) {
      alert("Vui lòng nhập mã năng lực AI (ví dụ: 6.A1.1, 6.A1.2, 6.A1.3).");
      return;
    }

    // Lookup description if not provided
    const lookup = findAICodeInfo(finalCode);
    const finalDesc = (descToAdd || customDesc || lookup?.desc || `Yêu cầu cần đạt Năng lực Trí tuệ Nhân tạo (AI) theo mã [${finalCode}]`).trim();
    const finalDomainLabel = lookup ? lookup.domainLabel : (AI_COMPONENT_OPTIONS.find(o => o.code === customDomain)?.label || "Năng lực AI");

    // Check if already in entries
    if (entries.some(e => e.code.toLowerCase() === finalCode.toLowerCase())) {
      alert(`Mã AI [${finalCode}] đã có trong danh sách được chọn.`);
      return;
    }

    const newEntry: ManualNLSEntry = {
      id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
      code: lookup?.code || finalCode,
      name: finalDomainLabel,
      description: finalDesc,
      category: 'AI'
    };

    setEntries([...entries, newEntry]);
    setCustomCode('');
    setCustomDesc('');
    setSearchTerm('');
  };

  const handleRemove = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  // Build full available concrete codes list based on selectedGradeFilter and selectedDomain
  const availableCodesList: { code: string; desc: string; domainCode: string; domainLabel: string }[] = [];

  if (selectedGradeFilter === "LEVEL") {
    // Show high-level Bậc (A.CB1, B.TC1...) if explicitly chosen
    const domainsToScan = selectedDomain === "ALL" 
      ? AI_COMPONENT_OPTIONS.map(opt => opt.code)
      : [selectedDomain];

    domainsToScan.forEach(domCode => {
      const domOption = AI_COMPONENT_OPTIONS.find(opt => opt.code === domCode);
      const domLabel = domOption ? domOption.label : domCode;
      const levels = AI_LEVEL_DETAILS[domCode] || [];

      levels.forEach(lvl => {
        if (!availableCodesList.some(item => item.code === lvl.code)) {
          availableCodesList.push({
            code: lvl.code,
            desc: lvl.desc,
            domainCode: domCode,
            domainLabel: domLabel
          });
        }
      });
    });
  } else {
    // Concrete Grade Requirements according to QĐ 2422 (e.g. 6.A1.1, 6.A1.2, 6.A1.3...)
    const gradesToScan: number[] = selectedGradeFilter === "ALL" 
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      : [parseInt(selectedGradeFilter) || grade];

    gradesToScan.forEach(gr => {
      const reqs = AI_ALL_GRADE_REQUIREMENTS[gr] || [];
      reqs.forEach(req => {
        if (selectedDomain === "ALL" || selectedDomain === req.domainCode || (selectedDomain.length === 1 && req.domainCode.startsWith(selectedDomain))) {
          if (!availableCodesList.some(item => item.code === req.code)) {
            availableCodesList.push({
              code: req.code,
              desc: req.desc,
              domainCode: req.domainCode,
              domainLabel: req.domainLabel
            });
          }
        }
      });
    });
  }

  // Filter list by search term
  const filteredCodesList = availableCodesList.filter(item => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return item.code.toLowerCase().includes(term) || 
           item.desc.toLowerCase().includes(term) || 
           item.domainLabel.toLowerCase().includes(term);
  });

  const isCodeChecked = (code: string) => entries.some(e => e.code.toLowerCase() === code.toLowerCase());

  const toggleCode = (codeItem: { code: string; desc: string; domainCode: string; domainLabel: string }) => {
    if (isCodeChecked(codeItem.code)) {
      setEntries(entries.filter(e => e.code.toLowerCase() !== codeItem.code.toLowerCase()));
    } else {
      const newEntry: ManualNLSEntry = {
        id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
        code: codeItem.code,
        name: codeItem.domainLabel,
        description: codeItem.desc,
        category: 'AI'
      };
      setEntries([...entries, newEntry]);
    }
  };

  const handleSelectAll = () => {
    const updatedEntries = [...entries];
    filteredCodesList.forEach(item => {
      if (!updatedEntries.some(e => e.code.toLowerCase() === item.code.toLowerCase())) {
        updatedEntries.push({
          id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
          code: item.code,
          name: item.domainLabel,
          description: item.desc,
          category: 'AI'
        });
      }
    });
    setEntries(updatedEntries);
  };

  const handleDeselectAll = () => {
    const codeSet = new Set(filteredCodesList.map(c => c.code.toLowerCase()));
    setEntries(entries.filter(e => !codeSet.has(e.code.toLowerCase())));
  };

  // Search term lookup check
  const searchedLookup = searchTerm.trim() ? findAICodeInfo(searchTerm.trim()) : null;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-purple-100/50 p-6 border border-purple-100/80 backdrop-blur-sm relative">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center">
          <div className="p-2.5 bg-purple-100 rounded-2xl mr-3 text-purple-600">
            <Bot size={22} />
          </div>
          <div>
             <div className="flex items-center gap-2">
               <h2 className="text-lg font-bold text-slate-800">Yêu cầu Năng lực Trí tuệ Nhân tạo (AI)</h2>
               <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                 QĐ 2422 / QĐ 3439
               </span>
             </div>
             <p className="text-[11px] text-slate-500 mt-0.5">
               Mã cụ thể theo QĐ 2422: <span className="font-semibold text-purple-700">{schoolLevel} - Lớp {grade}</span> (Ví dụ: <span className="font-bold text-purple-700">{grade}.A1.1, {grade}.A1.2, {grade}.A1.3</span>)
             </p>
          </div>
        </div>

        {entries.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-xl">
              Đã chọn <span className="font-bold text-purple-800">{entries.length}</span> mã AI
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
        
        {/* Dropdown 1: Mạch năng lực AI */}
        <div>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1">1. Mạch Năng lực AI (QĐ 2422)</label>
           <select
             value={selectedDomain}
             onChange={(e) => setSelectedDomain(e.target.value)}
             className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-purple-600 text-xs font-medium transition-shadow cursor-pointer hover:bg-slate-100"
           >
             <option value="ALL">-- Tất cả các mạch năng lực AI (A, B, C, D) --</option>
             {AI_COMPONENT_OPTIONS.map((opt) => (
               <option key={opt.code} value={opt.code}>{opt.label}</option>
             ))}
           </select>
        </div>

        {/* Dropdown 2: Khối Lớp (QĐ 2422) */}
        <div>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1">2. Khối Lớp Cụ thể (QĐ 2422)</label>
           <select
             value={selectedGradeFilter}
             onChange={(e) => setSelectedGradeFilter(e.target.value)}
             className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-purple-600 text-xs font-semibold transition-shadow cursor-pointer hover:bg-slate-100"
           >
             <option value={grade.toString()}>⭐ Lớp {grade} (Theo bài dạy hiện tại)</option>
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(g => (
               <option key={g} value={g.toString()}>Khối Lớp {g} (Chuẩn QĐ 2422: {g}.A1.1, {g}.A1.2...)</option>
             ))}
             <option value="ALL">🌐 Tất cả các khối lớp (Lớp 1 - 12)</option>
             <option value="LEVEL">📋 Khung 6 Bậc tổng quát (CB1 - NC2)</option>
           </select>
        </div>

        {/* Multi-Select & Input Dropdown 3: Mã tích hợp AI */}
        <div className="sm:col-span-2 relative" ref={dropdownRef}>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1 flex justify-between items-center">
             <span className="flex items-center gap-1.5">
               <span>3. Mã Tích hợp AI Cụ thể (Chuẩn {selectedGradeFilter === "ALL" ? "Lớp 1-12" : selectedGradeFilter === "LEVEL" ? "Bậc" : `Lớp ${selectedGradeFilter}`})</span>
               <span className="text-purple-600 font-normal lowercase">(tích chọn danh sách hoặc gõ mã)</span>
             </span>
             {entries.length > 0 && (
               <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                 Đã chọn {entries.length} mã AI
               </span>
             )}
           </label>

           {/* Trigger Button with live selected codes preview */}
           <button
             type="button"
             onClick={() => {
               setIsDropdownOpen(!isDropdownOpen);
               if (!isDropdownOpen) {
                 setTimeout(() => searchInputRef.current?.focus(), 50);
               }
             }}
             className={`w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ${
               isDropdownOpen ? 'ring-2 ring-purple-600 bg-purple-50/40 shadow-sm' : 'ring-slate-200 hover:bg-slate-100'
             } text-xs font-medium transition-all flex items-center justify-between cursor-pointer min-h-[42px]`}
           >
             <div className="truncate text-left flex-1 flex items-center gap-1.5 flex-wrap">
               {entries.length === 0 ? (
                 <span className="text-slate-500 font-medium">
                   -- Tích chọn mã AI cụ thể ({availableCodesList.length} mã khả dụng: {selectedGradeFilter !== "LEVEL" ? `${selectedGradeFilter === "ALL" ? "1-12" : selectedGradeFilter}.A1.1, ...` : "A.TC1, ..."}) hoặc gõ mã --
                 </span>
               ) : (
                 <div className="flex items-center gap-1.5 flex-wrap">
                   <span className="font-bold text-purple-700">Đã tích {entries.length} mã AI:</span>
                   {entries.slice(0, 5).map(e => (
                     <span key={e.id} className="bg-purple-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                       {e.code}
                     </span>
                   ))}
                   {entries.length > 5 && (
                     <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-md">
                       +{entries.length - 5} mã khác
                     </span>
                   )}
                 </div>
               )}
             </div>
             <ChevronDown size={16} className={`text-slate-400 transition-transform shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180 text-purple-600' : ''}`} />
           </button>

           {/* Popup menu with Checkboxes & Custom Input */}
           {isDropdownOpen && (
             <div className="absolute z-40 top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-purple-100 p-4 text-xs space-y-3 max-h-96 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
               
               {/* Mode Switch Tabs */}
               <div className="flex items-center justify-between border-b border-purple-50 pb-2.5">
                 <div className="flex gap-2">
                   <button
                     type="button"
                     onClick={() => setActiveTab('select')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                       activeTab === 'select' 
                         ? 'bg-purple-600 text-white shadow-xs' 
                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                     }`}
                   >
                     <ListFilter size={13} />
                     Danh mục mã AI cụ thể ({availableCodesList.length})
                   </button>
                   <button
                     type="button"
                     onClick={() => setActiveTab('manual')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                       activeTab === 'manual' 
                         ? 'bg-purple-600 text-white shadow-xs' 
                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                     }`}
                   >
                     <Edit3 size={13} />
                     Gõ mã AI trực tiếp
                   </button>
                 </div>

                 <button
                   type="button"
                   onClick={() => setIsDropdownOpen(false)}
                   className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                   title="Đóng bảng chọn"
                 >
                   <X size={16} />
                 </button>
               </div>

               {activeTab === 'select' ? (
                 <>
                   {/* Search & Quick Add Header */}
                   <div className="space-y-2">
                     <div className="relative">
                       <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input
                         ref={searchInputRef}
                         type="text"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter' && searchTerm.trim()) {
                             e.preventDefault();
                             handleAddCustomCode(searchTerm.trim());
                           }
                         }}
                         placeholder="🔍 Tìm kiếm hoặc gõ mã AI (VD: 6.A1.1, 6.A1.2, 6.A1.3...)"
                         className="w-full bg-slate-50 rounded-xl py-2 pl-9 pr-8 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-800 placeholder:text-slate-400 font-medium"
                       />
                       {searchTerm && (
                         <button
                           type="button"
                           onClick={() => setSearchTerm('')}
                           className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                         >
                           <X size={13} />
                         </button>
                       )}
                     </div>

                     {/* Quick Action: Add typed AI code immediately */}
                     {searchTerm.trim().length > 0 && (
                       <div className="bg-purple-50/80 border border-purple-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
                         <div className="min-w-0 flex-1">
                           <span className="text-[10px] text-purple-700 font-bold uppercase block">Nhận diện mã AI:</span>
                           <p className="text-xs font-bold text-purple-950 truncate">
                             [{searchTerm.trim()}] {searchedLookup ? `- ${searchedLookup.desc}` : "(Mã AI theo nhu cầu)"}
                           </p>
                         </div>
                         <button
                           type="button"
                           onClick={() => handleAddCustomCode(searchTerm.trim())}
                           className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 shadow-xs transition-colors"
                         >
                           <Plus size={13} />
                           Tích chọn ngay
                         </button>
                       </div>
                     )}

                     {/* Quick Selection Buttons */}
                     <div className="flex items-center justify-between px-1 text-[11px]">
                       <span className="text-slate-500 font-semibold">
                         {filteredCodesList.length} mã AI khả dụng {selectedDomain !== "ALL" ? `(${selectedDomain})` : `(Tất cả mạch)`}
                       </span>
                       <div className="flex gap-2">
                         <button
                           type="button"
                           onClick={handleSelectAll}
                           className="font-bold text-purple-600 hover:text-purple-800 hover:underline"
                         >
                           Tích chọn tất cả ({filteredCodesList.length})
                         </button>
                         <span className="text-slate-300">|</span>
                         <button
                           type="button"
                           onClick={handleDeselectAll}
                           className="font-bold text-slate-500 hover:text-slate-700 hover:underline"
                         >
                           Bỏ tích
                         </button>
                       </div>
                     </div>
                   </div>

                   {/* Checkboxes List */}
                   {filteredCodesList.length === 0 ? (
                     <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                       <p className="text-slate-500 font-medium text-xs">Không tìm thấy mã AI trong danh mục hiện tại.</p>
                       {searchTerm.trim() && (
                         <button
                           type="button"
                           onClick={() => handleAddCustomCode(searchTerm.trim())}
                           className="mt-2 text-xs font-bold text-purple-600 hover:text-purple-800 bg-white border border-purple-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-xs"
                         >
                           <Plus size={13} /> Thêm & tích chọn mã <strong>[{searchTerm.trim()}]</strong>
                         </button>
                       )}
                     </div>
                   ) : (
                     <div className="space-y-2 pr-1 max-h-56 overflow-y-auto">
                       {filteredCodesList.map((item) => {
                         const checked = isCodeChecked(item.code);
                         return (
                           <div
                             key={item.code}
                             onClick={() => toggleCode(item)}
                             className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${
                               checked 
                                 ? 'bg-purple-50/90 border-purple-300 shadow-xs' 
                                 : 'bg-white hover:bg-slate-50 border-slate-100'
                             }`}
                           >
                             <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                               checked 
                                 ? 'bg-purple-600 border-purple-600 text-white' 
                                 : 'bg-white border-slate-300 text-transparent'
                             }`}>
                               <Check size={12} strokeWidth={3} />
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2 mb-1 flex-wrap">
                                 <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] tracking-wide inline-block ${
                                   checked ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-100 text-purple-700'
                                 }`}>
                                   {item.code}
                                 </span>
                                 <span className="text-[11px] text-slate-500 font-medium truncate" title={item.domainLabel}>
                                   {item.domainLabel}
                                 </span>
                               </div>
                               <p className="text-xs text-slate-700 leading-snug font-normal">
                                 {item.desc}
                               </p>
                             </div>
                           </div>
                         );
                       })}
                     </div>
                   )}
                 </>
               ) : (
                 /* Manual Direct Input Form */
                 <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5 space-y-3">
                   <div className="flex items-center gap-2">
                     <Edit3 size={15} className="text-purple-600" />
                     <h3 className="font-bold text-slate-800 text-xs">Nhập mã năng lực AI theo nhu cầu</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                     <div>
                       <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mã AI (Bắt buộc)</label>
                       <input
                         type="text"
                         value={customCode}
                         onChange={(e) => handleCustomCodeChange(e.target.value)}
                         placeholder="VD: 6.A1.1, 6.A1.2, 6.A1.3"
                         className="w-full bg-white rounded-xl py-2 px-3 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-bold text-purple-700 placeholder:text-slate-400"
                       />
                     </div>
                     <div className="sm:col-span-2">
                       <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mạch Năng lực AI</label>
                       <select
                         value={customDomain}
                         onChange={(e) => setCustomDomain(e.target.value)}
                         className="w-full bg-white rounded-xl py-2 px-3 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-medium text-slate-700"
                       >
                         {AI_COMPONENT_OPTIONS.map((opt) => (
                           <option key={opt.code} value={opt.code}>{opt.label}</option>
                         ))}
                         <option value="AI.TUYCHINH">Năng lực AI tùy chỉnh khác</option>
                       </select>
                     </div>
                   </div>

                   <div>
                     <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mô tả / Yêu cầu cần đạt AI</label>
                     <textarea
                       value={customDesc}
                       onChange={(e) => setCustomDesc(e.target.value)}
                       placeholder="Nhập yêu cầu cần đạt AI hoặc hệ thống tự động nhận diện theo mã..."
                       rows={2}
                       className="w-full bg-white rounded-xl py-2 px-3 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-normal text-slate-700 placeholder:text-slate-400 resize-none"
                     />
                   </div>

                   <button
                     type="button"
                     onClick={() => handleAddCustomCode()}
                     disabled={!customCode.trim()}
                     className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-1.5"
                   >
                     <Plus size={15} /> Thêm & Tích chọn mã AI này ngay
                   </button>
                 </div>
               )}

             </div>
           )}
        </div>

      </div>

      {/* Selected Items List */}
      <div className="mt-6 space-y-3">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-7 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
             <Info className="text-slate-300 mb-2" size={24} />
             <p className="text-slate-500 text-sm font-medium">Chưa có mã AI nào được tích chọn.</p>
             <p className="text-slate-400 text-xs mt-1">Bấm vào ô <strong>"3. Mã Tích hợp AI Cụ thể"</strong> ở trên để tích chọn mã (như 6.A1.1, 6.A1.2, 6.A1.3...) hoặc gõ nhập mã tùy ý.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Danh sách mã AI đã tích chọn ({entries.length})
              </span>
              <button
                type="button"
                onClick={() => setEntries([])}
                className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 transition-colors"
              >
                Xóa tất cả ({entries.length})
              </button>
            </div>
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="group flex items-start justify-between bg-purple-50/40 hover:bg-purple-50 border border-purple-100/80 p-3.5 rounded-2xl transition-all duration-200"
              >
                <div className="flex items-start flex-1 min-w-0">
                  <div className="mt-0.5 p-1 bg-purple-600 rounded-lg mr-3 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                     <Sparkles className="text-white fill-current" size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-md tracking-wider">
                          {entry.code}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 truncate">
                          {entry.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">{entry.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemove(entry.id)}
                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-xl transition-all ml-3 shrink-0"
                  title="Xóa mã này"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualAIInput;
