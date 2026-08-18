import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Target, Info, Zap, ChevronDown, Search } from 'lucide-react';
import { NLS_COMPONENT_OPTIONS, NLS_LEVEL_DETAILS } from '../constants';
import { ManualNLSEntry, SchoolLevel } from '../types';

interface ManualNLSInputProps {
  entries: ManualNLSEntry[];
  setEntries: (entries: ManualNLSEntry[]) => void;
  schoolLevel: SchoolLevel;
  grade: number;
}

const ManualNLSInput: React.FC<ManualNLSInputProps> = ({ entries, setEntries, schoolLevel, grade }) => {
  // Helper to determine suggested default proficiency level from school level & grade
  const getSuggestedDefaultLevel = (sLevel: SchoolLevel, gr: number): number => {
    if (sLevel === SchoolLevel.TH || (gr >= 1 && gr <= 5)) {
      return gr >= 4 ? 2 : 1;
    }
    if (sLevel === SchoolLevel.THCS || (gr >= 6 && gr <= 9)) {
      return gr >= 8 ? 4 : 3;
    }
    return gr >= 12 ? 6 : 5;
  };

  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [targetProficiencyLevel, setTargetProficiencyLevel] = useState<number>(() => getSuggestedDefaultLevel(schoolLevel, grade));
  const [description, setDescription] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Update level selection when schoolLevel or grade changes
  useEffect(() => {
    const defaultLevel = getSuggestedDefaultLevel(schoolLevel, grade);
    setTargetProficiencyLevel(defaultLevel);
  }, [schoolLevel, grade]);

  // Reset description when domain or level changes
  useEffect(() => {
    setDescription("");
  }, [selectedDomain, targetProficiencyLevel]);

  const handleAddCustom = () => {
    if (!description.trim()) {
      alert("Vui lòng nhập nội dung năng lực.");
      return;
    }

    const domainCode = selectedDomain === "ALL" ? "NLS.TUYCHINH" : selectedDomain;
    const component = NLS_COMPONENT_OPTIONS.find(opt => opt.code === domainCode);
    const newEntry: ManualNLSEntry = {
      id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
      code: domainCode,
      name: component ? component.label : "Năng lực số tùy chỉnh",
      description: description.trim()
    };

    setEntries([...entries, newEntry]);
    setDescription(""); 
  };

  const handleRemove = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  // Map numbers to desired display codes
  const proficiencyLabels: Record<number, { code: string; name: string }> = {
    1: { code: "CB1", name: "Cơ bản 1 (Lớp 1-3)" },
    2: { code: "CB2", name: "Cơ bản 2 (Lớp 4-5)" },
    3: { code: "TC1", name: "Trung cấp 1 (Lớp 6-7)" },
    4: { code: "TC2", name: "Trung cấp 2 (Lớp 8-9)" },
    5: { code: "NC1", name: "Nâng cao 1 (Lớp 10-11)" },
    6: { code: "NC2", name: "Nâng cao 2 (Lớp 12)" }
  };

  // Suggested levels display logic based on school level
  const suggestedLevels = schoolLevel === SchoolLevel.TH ? [1, 2] : 
                         schoolLevel === SchoolLevel.THCS ? [3, 4] : [5, 6];

  // Build full available codes list based on selectedDomain and targetProficiencyLevel
  const availableCodesList: { code: string; desc: string; domainCode: string; domainLabel: string }[] = [];

  const componentsToScan = selectedDomain === "ALL" 
    ? NLS_COMPONENT_OPTIONS.map(opt => opt.code)
    : [selectedDomain];

  componentsToScan.forEach(compCode => {
    const compOption = NLS_COMPONENT_OPTIONS.find(opt => opt.code === compCode);
    const compLabel = compOption ? compOption.label : compCode;
    const levels = NLS_LEVEL_DETAILS[compCode] || [];

    // Filter by target proficiency level
    const matched = levels.filter(lvl => lvl.level === targetProficiencyLevel);
    matched.forEach(lvl => {
      if (!availableCodesList.some(item => item.code === lvl.code)) {
        availableCodesList.push({
          code: lvl.code,
          desc: lvl.desc,
          domainCode: compCode,
          domainLabel: compLabel
        });
      }
    });
  });

  // Filter list by search term
  const filteredCodesList = availableCodesList.filter(item => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return item.code.toLowerCase().includes(term) || 
           item.desc.toLowerCase().includes(term) || 
           item.domainLabel.toLowerCase().includes(term);
  });

  const isCodeChecked = (code: string) => entries.some(e => e.code === code);

  const toggleCode = (codeItem: { code: string; desc: string; domainCode: string; domainLabel: string }) => {
    if (isCodeChecked(codeItem.code)) {
      setEntries(entries.filter(e => e.code !== codeItem.code));
    } else {
      const newEntry: ManualNLSEntry = {
        id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
        code: codeItem.code,
        name: codeItem.domainLabel,
        description: codeItem.desc
      };
      setEntries([...entries, newEntry]);
      setDescription(codeItem.desc);
    }
  };

  const handleSelectAll = () => {
    const updatedEntries = [...entries];
    filteredCodesList.forEach(item => {
      if (!updatedEntries.some(e => e.code === item.code)) {
        updatedEntries.push({
          id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
          code: item.code,
          name: item.domainLabel,
          description: item.desc
        });
      }
    });
    setEntries(updatedEntries);
  };

  const handleDeselectAll = () => {
    const codeSet = new Set(filteredCodesList.map(c => c.code));
    setEntries(entries.filter(e => !codeSet.has(e.code)));
  };

  const checkedCountInCurrent = availableCodesList.filter(item => isCodeChecked(item.code)).length;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-6 border border-indigo-100/80 backdrop-blur-sm relative">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center">
          <div className="p-2.5 bg-indigo-100 rounded-2xl mr-3 text-indigo-600">
            <Target size={22} />
          </div>
          <div>
             <div className="flex items-center gap-2">
               <h2 className="text-lg font-bold text-slate-800">Yêu cầu Năng lực số áp dụng</h2>
               <span className="bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                 TT 02/2025
               </span>
             </div>
             <p className="text-[11px] text-slate-500 mt-0.5">
               Khung NLS: <span className="font-semibold text-indigo-700">{schoolLevel} - Lớp {grade}</span> (Gợi ý: <span className="font-bold text-indigo-700">{proficiencyLabels[targetProficiencyLevel]?.code}</span>)
             </p>
          </div>
        </div>

        {entries.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-xl">
              Đã chọn <span className="font-bold text-indigo-800">{entries.length}</span> mã
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
        
        {/* Dropdown 1: Miền năng lực */}
        <div>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1">1. Miền Năng lực</label>
           <select
             value={selectedDomain}
             onChange={(e) => setSelectedDomain(e.target.value)}
             className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs font-medium transition-shadow cursor-pointer hover:bg-slate-100"
           >
             <option value="ALL">-- Tất cả 6 miền NLS --</option>
             {NLS_COMPONENT_OPTIONS.map((opt) => (
               <option key={opt.code} value={opt.code}>{opt.label}</option>
             ))}
           </select>
        </div>

        {/* Dropdown 2: Mức độ (Bậc) */}
        <div>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1">2. Mức độ (Bậc NLS)</label>
           <select
             value={targetProficiencyLevel}
             onChange={(e) => setTargetProficiencyLevel(parseInt(e.target.value))}
             className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs font-medium transition-shadow cursor-pointer hover:bg-slate-100 font-semibold"
           >
             {[1, 2, 3, 4, 5, 6].map(b => (
               <option key={b} value={b}>
                 {proficiencyLabels[b].code} - {proficiencyLabels[b].name} { suggestedLevels.includes(b) ? " ⭐" : "" }
               </option>
             ))}
           </select>
        </div>

        {/* Multi-Select Dropdown 3: Mã tích hợp */}
        <div className="relative" ref={dropdownRef}>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1 flex justify-between items-center">
             <span>3. Mã Tích hợp</span>
             {checkedCountInCurrent > 0 && (
               <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full">
                 {checkedCountInCurrent}/{availableCodesList.length}
               </span>
             )}
           </label>

           <button
             type="button"
             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
             className={`w-full rounded-xl border-0 bg-slate-50 py-2.5 px-3 text-slate-700 ring-1 ring-inset ${
               isDropdownOpen ? 'ring-2 ring-indigo-600 bg-indigo-50/40' : 'ring-slate-200 hover:bg-slate-100'
             } text-xs font-medium transition-all flex items-center justify-between cursor-pointer`}
           >
             <span className="truncate text-left font-medium">
               {availableCodesList.length === 0
                 ? "Không có mã"
                 : checkedCountInCurrent === 0
                 ? `-- Chọn mã [${proficiencyLabels[targetProficiencyLevel]?.code}] (${availableCodesList.length} mã) --`
                 : `Đã tích ${checkedCountInCurrent} mã [${proficiencyLabels[targetProficiencyLevel]?.code}]`}
             </span>
             <ChevronDown size={14} className={`text-slate-400 transition-transform flex-shrink-0 ml-1 ${isDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
           </button>

           {/* Popup menu with checkboxes */}
           {isDropdownOpen && (
             <div className="absolute z-30 top-full left-0 mt-1.5 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-3.5 text-xs space-y-2.5 max-h-80 overflow-y-auto">
               <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                 <div>
                   <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                     Chuẩn NLS [{proficiencyLabels[targetProficiencyLevel]?.code}]
                   </span>
                   <span className="text-[10px] text-slate-500">
                     {selectedDomain === "ALL" ? `Tất cả 6 miền (${availableCodesList.length} mã)` : `${availableCodesList.length} mã trong miền`}
                   </span>
                 </div>
                 <div className="flex gap-1.5">
                   <button
                     type="button"
                     onClick={handleSelectAll}
                     className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg transition-colors"
                   >
                     Chọn tất cả
                   </button>
                   <button
                     type="button"
                     onClick={handleDeselectAll}
                     className="text-[10px] font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                   >
                     Bỏ chọn
                   </button>
                 </div>
               </div>

               {/* Quick Search */}
               <div className="relative">
                 <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                   type="text"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Tìm mã hoặc từ khóa (ví dụ: 1.1, AI, tìm kiếm...)"
                   className="w-full bg-slate-50 rounded-xl py-1.5 pl-8 pr-2.5 text-[11px] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 placeholder:text-slate-400"
                 />
               </div>

               {filteredCodesList.length === 0 ? (
                 <p className="text-slate-400 italic py-4 text-center text-xs">
                   {searchTerm ? "Không tìm thấy mã phù hợp với từ khóa" : "Không có mã nào ở mức độ này"}
                 </p>
               ) : (
                 <div className="space-y-2 pr-1">
                   {filteredCodesList.map((item) => {
                     const checked = isCodeChecked(item.code);
                     return (
                       <label
                         key={item.code}
                         className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                           checked 
                             ? 'bg-indigo-50/80 border border-indigo-200 shadow-sm' 
                             : 'bg-white hover:bg-slate-50 border border-slate-100'
                         }`}
                       >
                         <input
                           type="checkbox"
                           checked={checked}
                           onChange={() => toggleCode(item)}
                           className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 flex-shrink-0"
                         />
                         <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-1 flex-wrap">
                             <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] tracking-wide inline-block ${
                               checked ? 'bg-indigo-600 text-white shadow-xs' : 'bg-indigo-100 text-indigo-700'
                             }`}>
                               {item.code}
                             </span>
                             <span className="text-[11px] text-slate-500 font-normal truncate" title={item.domainLabel}>
                               {item.domainLabel}
                             </span>
                           </div>
                           <p className="text-xs text-slate-700 leading-snug font-normal">
                             {item.desc}
                           </p>
                         </div>
                       </label>
                     );
                   })}
                 </div>
               )}
             </div>
           )}
        </div>

        {/* Input Description & Add Button */}
        <div>
           <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase ml-1">4. Nội dung cụ thể (tùy chỉnh)</label>
           <div className="flex gap-2">
             <textarea
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Mô tả cụ thể hoặc chọn Mã ở trên..."
               rows={1}
               className="block w-full rounded-xl border-0 bg-slate-50 py-2 px-3 text-slate-700 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs transition-shadow resize-none h-[38px] flex items-center"
             />
             <button
               onClick={handleAddCustom}
               disabled={!description.trim()}
               className="bg-indigo-600 text-white w-[38px] h-[38px] rounded-xl hover:bg-indigo-700 transition-colors shadow-md disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center flex-shrink-0"
               title="Thêm yêu cầu tùy chỉnh"
             >
               <Plus size={18} />
             </button>
           </div>
        </div>

      </div>

      {/* Selected Items List */}
      <div className="mt-8 space-y-3">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
             <Info className="text-slate-300 mb-2" size={24} />
             <p className="text-slate-500 text-sm font-medium">Chưa chọn yêu cầu NLS cụ thể.</p>
             <p className="text-slate-400 text-xs mt-1">Bấm vào ô <strong>"3. Mã Tích hợp"</strong> ở trên để sổ danh sách đầy đủ các mã của mức độ và tích chọn.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Danh sách mã NLS đã tích chọn ({entries.length})
              </span>
              <button
                type="button"
                onClick={() => setEntries([])}
                className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 transition-colors"
              >
                Xóa tất cả
              </button>
            </div>
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="group flex items-start justify-between bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-100/80 p-3.5 rounded-2xl transition-all duration-200"
              >
                <div className="flex items-start flex-1 min-w-0">
                  <div className="mt-0.5 p-1 bg-indigo-600 rounded-lg mr-3 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                     <Zap className="text-white fill-current" size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md tracking-wider">
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
                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-xl transition-all ml-3 flex-shrink-0"
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

export default ManualNLSInput;
