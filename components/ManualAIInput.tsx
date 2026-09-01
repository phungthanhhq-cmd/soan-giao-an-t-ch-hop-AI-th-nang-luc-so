import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Bot, Info, Sparkles, ChevronDown, Search, Check, X, Edit3, ListFilter } from 'lucide-react';
import { AI_COMPONENT_OPTIONS, AI_LEVEL_DETAILS, AI_ALL_GRADE_REQUIREMENTS } from '../constants';
import { ManualNLSEntry, SchoolLevel } from '../types';

interface ManualAIInputProps {
  entries: ManualNLSEntry[];
  setEntries: (entries: ManualNLSEntry[]) => void;
  schoolLevel: SchoolLevel;
  grade: number;
  enabled?: boolean;
  onToggleEnabled?: () => void;
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

const ManualAIInput: React.FC<ManualAIInputProps> = ({ 
  entries, 
  setEntries, 
  schoolLevel, 
  grade,
  enabled = true,
  onToggleEnabled
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>(() => grade.toString());
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'select' | 'manual'>('select');

  // Quick direct input state for Column 4
  const [quickInputCode, setQuickInputCode] = useState<string>('');

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

  // Suggest 2 AI codes for current grade
  const handleSuggestAIMappings = () => {
    const gradeReqs = AI_ALL_GRADE_REQUIREMENTS[grade] || AI_ALL_GRADE_REQUIREMENTS[6] || [];
    if (gradeReqs.length >= 2) {
      const toAdd = gradeReqs.slice(0, 2);
      const newEntries = [...entries];
      toAdd.forEach(item => {
        if (!newEntries.some(e => e.code.toLowerCase() === item.code.toLowerCase())) {
          newEntries.push({
            id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
            code: item.code,
            name: item.domainLabel,
            description: item.desc,
            category: 'AI'
          });
        }
      });
      setEntries(newEntries);
    }
  };

  // Add custom AI code directly
  const handleAddCustomCode = (codeToAdd?: string, descToAdd?: string) => {
    const finalCode = (codeToAdd || customCode).trim();
    if (!finalCode) {
      alert("Vui lòng nhập mã năng lực AI (ví dụ: 6.A1.1, 6.A1.2, 6.B1.1...).");
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

  const isSpecificLevelDomain = selectedDomain.startsWith("NL") || selectedDomain.startsWith("6.");

  if (selectedGradeFilter === "QD3439" || (selectedGradeFilter === "LEVEL" && isSpecificLevelDomain)) {
    const qd3439Domains = selectedDomain === "ALL" 
      ? ["NLa", "NLb", "NLc", "NLd"]
      : (selectedDomain.startsWith("NL") ? [selectedDomain] : ["NLa", "NLb", "NLc", "NLd"]);

    qd3439Domains.forEach(domCode => {
      const domOption = AI_COMPONENT_OPTIONS.find(opt => opt.code === domCode);
      const domLabel = domOption ? domOption.label : `Khung QĐ 3439 - ${domCode}`;
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
  } else if (selectedGradeFilter === "QD2422_LEVEL" || (selectedGradeFilter === "LEVEL" && !isSpecificLevelDomain)) {
    const qd2422Domains = selectedDomain === "ALL" 
      ? ["A", "B", "C", "D"]
      : (["A", "B", "C", "D"].includes(selectedDomain) ? [selectedDomain] : ["A", "B", "C", "D"]);

    qd2422Domains.forEach(domCode => {
      const domOption = AI_COMPONENT_OPTIONS.find(opt => opt.code === domCode);
      const domLabel = domOption ? domOption.label : `Mạch ${domCode} (QĐ 2422)`;
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
  } else if (selectedGradeFilter === "TT02" || selectedDomain.startsWith("6.")) {
    const tt02Domains = selectedDomain === "ALL" 
      ? ["6.1", "6.2", "6.3"]
      : (selectedDomain.startsWith("6.") ? [selectedDomain] : ["6.1", "6.2", "6.3"]);

    tt02Domains.forEach(domCode => {
      const domOption = AI_COMPONENT_OPTIONS.find(opt => opt.code === domCode);
      const domLabel = domOption ? domOption.label : `Miền ${domCode} (TT 02)`;
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
  } else if (isSpecificLevelDomain) {
    const domOption = AI_COMPONENT_OPTIONS.find(opt => opt.code === selectedDomain);
    const domLabel = domOption ? domOption.label : selectedDomain;
    const levels = AI_LEVEL_DETAILS[selectedDomain] || [];

    levels.forEach(lvl => {
      if (!availableCodesList.some(item => item.code === lvl.code)) {
        availableCodesList.push({
          code: lvl.code,
          desc: lvl.desc,
          domainCode: selectedDomain,
          domainLabel: domLabel
        });
      }
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
    <div className={`bg-white rounded-3xl shadow-xl shadow-purple-100/50 p-6 sm:p-7 border border-purple-100/80 backdrop-blur-sm relative transition-all ${isDropdownOpen ? 'z-50' : 'z-10'} ${!enabled ? 'opacity-75' : ''}`}>
      {/* Header with Title, Badge & Toggle Switch */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center">
          <div className="p-2.5 bg-purple-100 text-purple-600 rounded-2xl mr-3.5 flex items-center justify-center shrink-0">
            <Bot size={22} />
          </div>
          <div>
             <div className="flex items-center gap-2 flex-wrap">
               <h2 className="text-lg sm:text-xl font-bold text-slate-800">Tích hợp Năng lực Trí tuệ nhân tạo (AI)</h2>
               <span className="bg-purple-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                 QĐ 2422/QĐ-BGDĐT
               </span>
             </div>
             <p className="text-xs text-slate-500 mt-0.5">
               Khung năng lực AI trong trường học: <span className="font-semibold text-purple-700">{schoolLevel} - Lớp {grade}</span>
             </p>
          </div>
        </div>

        {/* Right Action: Toggle Switch */}
        <div className="flex items-center gap-3">
          {onToggleEnabled && (
            <div 
              onClick={onToggleEnabled}
              className="flex items-center gap-2.5 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-2xl transition-colors"
              title="Bật/Tắt tích hợp Năng lực AI"
            >
              <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${enabled ? 'bg-purple-600' : 'bg-slate-300'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              <span className="font-bold text-xs text-slate-700">
                {enabled ? 'Đang bật AI' : 'Đã tắt AI'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4-Column Horizontal Controls Layout */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end ${!enabled ? 'pointer-events-none opacity-50' : ''}`}>
        
        {/* Column 1: Mạch nội dung AI */}
        <div>
           <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase ml-0.5">1. MẠCH NỘI DUNG AI</label>
           <select
             value={selectedDomain}
             onChange={(e) => setSelectedDomain(e.target.value)}
             className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-purple-600 text-xs font-medium transition-shadow cursor-pointer hover:bg-slate-100 truncate"
           >
             <option value="ALL">-- Tất cả 4 mạch --</option>
             
             <optgroup label="🌟 Mạch QĐ 2422 (Khung mới nhất)">
               {AI_COMPONENT_OPTIONS.filter(opt => opt.group === "QĐ 2422").map((opt) => (
                 <option key={opt.code} value={opt.code}>{opt.label}</option>
               ))}
             </optgroup>

             <optgroup label="🏛️ Khung 6 Bậc (QĐ 3439)">
               {AI_COMPONENT_OPTIONS.filter(opt => opt.group === "QĐ 3439").map((opt) => (
                 <option key={opt.code} value={opt.code}>{opt.label}</option>
               ))}
             </optgroup>
           </select>
        </div>

        {/* Column 2: Chủ đề AI (QĐ 2422) / Khối lớp */}
        <div>
           <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase ml-0.5">2. CHỦ ĐỀ AI (QĐ 2422)</label>
           <select
             value={selectedGradeFilter}
             onChange={(e) => setSelectedGradeFilter(e.target.value)}
             className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-purple-600 text-xs font-semibold transition-shadow cursor-pointer hover:bg-slate-100 truncate"
           >
             <option value={grade.toString()}>-- Lớp {grade} (Hiện tại: {grade}.A1.1...) --</option>
             <option value="ALL">-- Tất cả chủ đề & lớp (1-12) --</option>
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(g => g !== grade).map(g => (
               <option key={g} value={g.toString()}>Khối Lớp {g} (QĐ 2422)</option>
             ))}
             <option value="QD3439">Khung 6 Bậc QĐ 3439 (NLa-NLd)</option>
             <option value="QD2422_LEVEL">Khung 6 Bậc Mạch A-D</option>
           </select>
        </div>

        {/* Column 3: Chọn mã AI (Lớp X) Multi-select dropdown */}
        <div className="relative" ref={dropdownRef}>
           <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase ml-0.5 flex justify-between items-center">
             <span>3. CHỌN MÃ AI (LỚP {selectedGradeFilter === "ALL" ? "1-12" : selectedGradeFilter})</span>
             {entries.length > 0 && (
               <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded-full">
                 {entries.length} mã
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
                 <span className="text-slate-500 font-medium truncate">
                   -- Tích chọn ... --
                 </span>
               ) : (
                 <div className="flex items-center gap-1 flex-wrap truncate">
                   <span className="font-bold text-purple-700">{entries.length} mã:</span>
                   {entries.slice(0, 2).map(e => (
                     <span key={e.id} className="bg-purple-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded">
                       {e.code}
                     </span>
                   ))}
                   {entries.length > 2 && (
                     <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-1 py-0.5 rounded">
                       +{entries.length - 2}
                     </span>
                   )}
                 </div>
               )}
             </div>
             <ChevronDown size={15} className={`text-slate-400 transition-transform shrink-0 ml-1.5 ${isDropdownOpen ? 'rotate-180 text-purple-600' : ''}`} />
           </button>

           {/* Popup menu with Checkboxes & Custom Input */}
           {isDropdownOpen && (
             <div className="absolute z-[100] top-full right-0 sm:right-0 md:left-auto md:right-0 mt-2 w-[340px] sm:w-[450px] md:w-[480px] max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-2xl border border-purple-200 p-4 text-xs space-y-3 max-h-[460px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 ring-1 ring-slate-900/10">
               
               {/* Mode Switch Tabs */}
               <div className="flex items-center justify-between border-b border-purple-50 pb-2.5">
                 <div className="flex gap-1.5">
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
                     Danh mục ({availableCodesList.length} mã)
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
                     Nhập mã tùy chỉnh
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
                         placeholder="🔍 Tìm kiếm hoặc gõ mã AI (VD: 6.A1.1, 6.A1.2...)"
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

                     {/* Quick Selection Buttons */}
                     <div className="flex items-center justify-between px-1 text-[11px]">
                       <span className="text-slate-500 font-semibold">
                         {filteredCodesList.length} mã AI khả dụng
                       </span>
                       <div className="flex gap-2">
                         <button
                           type="button"
                           onClick={handleSelectAll}
                           className="font-bold text-purple-600 hover:text-purple-800 hover:underline"
                         >
                           Chọn tất cả
                         </button>
                         <span className="text-slate-300">|</span>
                         <button
                           type="button"
                           onClick={handleDeselectAll}
                           className="font-bold text-slate-500 hover:text-slate-700 hover:underline"
                         >
                           Bỏ chọn
                         </button>
                       </div>
                     </div>
                   </div>

                   {/* Checkboxes List */}
                   {filteredCodesList.length === 0 ? (
                     <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                       <p className="text-slate-500 font-medium text-xs">Không tìm thấy mã AI trong danh mục này.</p>
                       {searchTerm.trim() && (
                         <button
                           type="button"
                           onClick={() => handleAddCustomCode(searchTerm.trim())}
                           className="mt-2 text-xs font-bold text-purple-600 hover:text-purple-800 bg-white border border-purple-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-xs"
                         >
                           <Plus size={13} /> Thêm mã AI <strong>[{searchTerm.trim()}]</strong>
                         </button>
                       )}
                     </div>
                   ) : (
                     <div className="space-y-1.5 pr-1 max-h-52 overflow-y-auto">
                       {filteredCodesList.map((item) => {
                         const checked = isCodeChecked(item.code);
                         return (
                           <div
                             key={item.code}
                             onClick={() => toggleCode(item)}
                             className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                               checked 
                                 ? 'bg-purple-50/90 border-purple-300 shadow-2xs' 
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
                               <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                                 <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] tracking-wide inline-block ${
                                   checked ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'
                                 }`}>
                                   {item.code}
                                 </span>
                                 <span className="text-[10px] text-slate-500 font-medium truncate" title={item.domainLabel}>
                                   {item.domainLabel}
                                 </span>
                               </div>
                               <p className="text-[11px] text-slate-700 leading-tight font-normal">
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
                 <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 space-y-2.5">
                   <div className="flex items-center gap-2">
                     <Edit3 size={14} className="text-purple-600" />
                     <h3 className="font-bold text-slate-800 text-xs">Nhập mã năng lực AI theo yêu cầu</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                     <div>
                       <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mã AI</label>
                       <input
                         type="text"
                         value={customCode}
                         onChange={(e) => handleCustomCodeChange(e.target.value)}
                         placeholder="VD: 6.A1.1"
                         className="w-full bg-white rounded-xl py-1.5 px-2.5 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-bold text-purple-700 placeholder:text-slate-400"
                       />
                     </div>
                     <div className="sm:col-span-2">
                       <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mạch AI</label>
                       <select
                         value={customDomain}
                         onChange={(e) => setCustomDomain(e.target.value)}
                         className="w-full bg-white rounded-xl py-1.5 px-2 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-medium text-slate-700"
                       >
                         {AI_COMPONENT_OPTIONS.map((opt) => (
                           <option key={opt.code} value={opt.code}>{opt.label}</option>
                         ))}
                         <option value="AI.TUYCHINH">Năng lực AI tùy chỉnh khác</option>
                       </select>
                     </div>
                   </div>

                   <div>
                     <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Yêu cầu cần đạt AI</label>
                     <textarea
                       value={customDesc}
                       onChange={(e) => setCustomDesc(e.target.value)}
                       placeholder="Nhập yêu cầu cần đạt AI..."
                       rows={2}
                       className="w-full bg-white rounded-xl py-1.5 px-2.5 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-normal text-slate-700 placeholder:text-slate-400 resize-none"
                     />
                   </div>

                   <button
                     type="button"
                     onClick={() => handleAddCustomCode()}
                     disabled={!customCode.trim()}
                     className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-1.5"
                   >
                     <Plus size={14} /> Thêm mã AI này
                   </button>
                 </div>
               )}

             </div>
           )}
        </div>

        {/* Column 4: Nhập mã AI / Đồng bộ phụ lục */}
        <div>
           <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase ml-0.5 flex items-center justify-between flex-wrap">
             <span>4. NHẬP MÃ AI / ĐỒNG BỘ PHỤ LỤC</span>
             <span className="text-purple-600 font-medium text-[9px] lowercase">gõ mã (vd: 6.a3.1, 6.b2.1)</span>
           </label>
           <div className="flex items-center gap-1.5">
             <input
               type="text"
               value={quickInputCode}
               onChange={(e) => setQuickInputCode(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && quickInputCode.trim()) {
                   e.preventDefault();
                   handleAddCustomCode(quickInputCode.trim());
                   setQuickInputCode('');
                 }
               }}
               placeholder="Nhập mã (vd: 6.A3.1, 6.B2.1)"
               className="flex-1 min-w-0 rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-purple-600 text-xs font-semibold placeholder:text-slate-400 placeholder:font-normal"
             />
             <button
               type="button"
               onClick={() => {
                 if (quickInputCode.trim()) {
                   handleAddCustomCode(quickInputCode.trim());
                   setQuickInputCode('');
                 }
               }}
               disabled={!quickInputCode.trim()}
               className="inline-flex items-center gap-1 px-3 py-2.5 bg-slate-200 hover:bg-purple-600 hover:text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-700 font-bold rounded-xl text-xs transition-colors shrink-0"
             >
               <Plus size={14} />
               <span>Thêm</span>
             </button>
           </div>
        </div>

      </div>

      {/* Selected Items List or Empty Notification */}
      <div className="mt-4">
        {entries.length === 0 ? (
          <div className="bg-purple-50/60 border border-purple-100/90 rounded-2xl py-2.5 px-4 text-xs text-purple-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
             <div className="flex items-center space-x-2.5">
               <Info className="text-purple-600 shrink-0" size={16} />
               <span>Chưa chọn mã AI nào. Hãy mở <strong>"3. Chọn mã AI"</strong> để tích các mã phù hợp với bài học.</span>
             </div>
             <button
               type="button"
               onClick={handleSuggestAIMappings}
               className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-purple-100/80 text-purple-700 border border-purple-200/80 font-bold rounded-xl text-xs shadow-2xs hover:shadow-xs transition-all shrink-0 self-start sm:self-auto cursor-pointer"
             >
               <Sparkles size={13} className="text-purple-600" />
               <span>Gợi ý 2 mã Lớp {grade}</span>
             </button>
          </div>
        ) : (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Danh sách mã AI đã chọn ({entries.length})
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSuggestAIMappings}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Gợi ý thêm mã</span>
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setEntries([])}
                  className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                >
                  Xóa tất cả ({entries.length})
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {entries.map((entry) => (
                <div 
                  key={entry.id} 
                  className="group flex items-start justify-between bg-purple-50/50 hover:bg-purple-50 border border-purple-100 p-2.5 rounded-2xl transition-all duration-200"
                >
                  <div className="flex items-start flex-1 min-w-0">
                    <div className="mt-0.5 p-1 bg-purple-600 rounded-lg mr-2.5 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                       <Sparkles className="text-white fill-current" size={12} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-bold bg-purple-600 text-white px-1.5 py-0.2 rounded tracking-wider">
                            {entry.code}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 truncate">
                            {entry.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-snug font-normal line-clamp-2">{entry.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemove(entry.id)}
                    className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-xl transition-all ml-2 shrink-0 cursor-pointer"
                    title="Xóa mã này"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualAIInput;
