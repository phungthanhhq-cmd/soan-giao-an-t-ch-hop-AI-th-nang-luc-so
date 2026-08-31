import { GoogleGenAI } from "@google/genai";
import { LessonInfo, ProcessingOptions } from "../types";
import { SYSTEM_INSTRUCTION, NLS_FRAMEWORK_DATA } from "../constants";

const buildUserPrompt = (info: LessonInfo, options: ProcessingOptions): string => {
  const enableNLS = info.integrationModes ? info.integrationModes.enableNLS : true;
  const enableAI = info.integrationModes ? info.integrationModes.enableAI : false;

  const hasPPCT = Boolean(info.distributionContent && info.distributionContent.trim().length > 0);
  const hasManualNLS = Boolean(enableNLS && info.manualNLS && info.manualNLS.length > 0);
  const hasManualAI = Boolean(enableAI && info.manualAI && info.manualAI.length > 0);
  const isEnglishSubject = info.subject === "Tiếng Anh" || info.subject?.toLowerCase().includes("tiếng anh") || info.subject?.toLowerCase().includes("english");

  const englishDirective = isEnglishSubject ? `
  =============================================================================
  🚨 ĐẶC QUY TẮC BẮT BUỘC RIÊNG CHO MÔN TIẾNG ANH (ENGLISH LESSON PLAN INTEGRATION MANDATE):
  Giáo án môn TIẾNG ANH (ENGLISH SUBJECT):
  1. MỤC TIÊU BÀI HỌC (I. OBJECTIVES):
     - BẮT BUỘC chèn thêm mục Năng lực số (Digital Competence) và Năng lực AI (AI Competence) vào ngay dưới mục "2. Competence" (sau "a. General competences" và "b. Specific competences"):
       ${hasManualNLS ? `* THẺ NLS (BẮT BUỘC BỌC TRONG <nls>...</nls>):
       <nls>
       - c. Digital Competence:
         ${info.manualNLS?.map(item => `- [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n         ") || "- [1.1.TC1a] (Browsing, searching and filtering data, information and digital content): Students can use digital search engines and online dictionaries to find vocabulary and grammar explanations."}
       </nls>` : ""}
       ${hasManualAI ? `* THẺ AI (BẮT BUỘC BỌC TRONG <ai>...</ai>):
       <ai>
       - ${hasManualNLS ? "d." : "c."} Artificial Intelligence (AI) Competence:
         ${info.manualAI?.map(item => `- [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n         ") || "- [NLb.TC1] (AI Ethics & Critical Thinking): Students can interact responsibly with AI tools (ChatGPT/Copilot) and cross-check AI-generated sentences with the textbook."}
       </ai>` : ""}

  2. THIẾT BỊ DẠY HỌC (II. TEACHING AIDS / MATERIALS):
     - Bổ sung công cụ số và AI vào danh sách thiết bị dạy học bằng Tiếng Anh:
       ${hasManualNLS ? `<nls>- Digital tools: [Online dictionaries (Cambridge/Oxford), search engines, Quizlet, Padlet, Google Slides, projector...]</nls>` : ""}
       ${hasManualAI ? `<ai>- AI tools: [Generative AI assistants (ChatGPT, Copilot), AI pronunciation checkers...]</ai>` : ""}

  3. TIẾN TRÌNH DẠY HỌC (III. TEACHING PROCEDURES / LESSON PROCEDURES):
     - 🚨 BẮT BUỘC TÍCH HỢP ĐẦY ĐỦ CÁC HOẠT ĐỘNG DẠY HỌC (Activity 1: Warm-up, Activity 2: Knowledge Formation / Presentation, Activity 3: Practice, Activity 4: Production / Application):
     - Tại TẤT CẢ các hoạt động, trong cả hoạt động của Giáo viên (Teacher's activities / Step 1 & 4) và hoạt động của Học sinh (Students' activities / Step 2 & 3), BẮT BUỘC phải chèn các nhiệm vụ số và nhiệm vụ AI bằng Tiếng Anh 100%, được bọc trong thẻ <nls>...</nls> và <ai>...</ai>:
       Ví dụ mẫu:
       <nls>- Digital task [1.1.TC1a]: Teacher instructs students to use digital devices to search for words/images related to the topic on Google / Cambridge Dictionary.</nls>
       <nls>- Students search on their tablets/smartphones, take notes of pronunciation and sample sentences, and share findings on Padlet.</nls>
       <ai>- AI task [NLb.TC1]: Teacher guides students to use an AI assistant with the prompt: 'Give 3 example sentences using...' and requires them to cross-check grammar with textbook rules.</ai>
       <ai>- Students run the AI prompt, review the generated sentences, and critically evaluate the accuracy.</ai>
     - Trong mục sản phẩm (c. Outcome / Products): Bổ sung sản phẩm số và AI (ví dụ: "<nls>- Digital product: Online vocabulary notes, Padlet sticky notes</nls>", "<ai>- AI product: AI-generated practice sentences verified and corrected by students</ai>").

  4. MÃ NĂNG LỰC: Bắt buộc dùng đúng mã số chuẩn quốc gia ([1.1.TC1a], [1.3.TC2a], [NLb.TC1], [6.A1.2]...).
  =============================================================================
  ` : "";

  let integrationStrategyDirective = "";
  let modeDirective = "";
  let structureGoalRequirement = "";

  if (hasPPCT) {
    const syncedItems: string[] = [];
    if (hasManualNLS && info.manualNLS) {
      const nlsList = info.manualNLS
        .map(item => `- [${item.code}] (${item.name}): ${item.description}`)
        .join("\n");
      syncedItems.push(`### CÁC MÃ NĂNG LỰC SỐ (NLS) ĐÃ ĐỒNG BỘ TỪ PPCT (BẮT BUỘC TÍCH HỢP ĐÚNG MÃ ${info.manualNLS.map(i => i.code).join(", ")}):\n${nlsList}`);
    }
    if (hasManualAI && info.manualAI) {
      const aiList = info.manualAI
        .map(item => `- [${item.code}] (${item.name}): ${item.description}`)
        .join("\n");
      syncedItems.push(`### CÁC MÃ NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) ĐÃ ĐỒNG BỘ TỪ PPCT (BẮT BUỘC TÍCH HỢP ĐÚNG MÃ ${info.manualAI.map(i => i.code).join(", ")}):\n${aiList}`);
    }

    integrationStrategyDirective = `
    =============================================================================
    🚨 TRƯỜNG HỢP 1: NGƯỜI DÙNG CUNG CẤP PHÂN PHỐI CHƯƠNG TRÌNH (PPCT / BẢN PHỤ LỤC) - NGUỒN CHUẨN MỰC PHÁP QUY TỐI THƯỢNG:
    Trong Phân phối chương trình / Bản Phụ lục ĐÃ CÓ SẴN bảng phân phối cho từng bài học/tiết học cụ thể (gồm các cột: TT, Bài học, Số tiết, Thời điểm, Thiết bị, Địa điểm, Ghi chú / Năng lực số / AI).
    
    ${syncedItems.length > 0 ? syncedItems.join("\n\n") + "\n\n" : ""}
    🎯 5 NGUYÊN TẮC BẮT BUỘC KHI CÓ PHỤ LỤC:
    1. 📌 ĐỒNG BỘ ĐÚNG SỐ TIẾT VÀ ĐÚNG CHUẨN MÃ 100%: 
       - Đối chiếu chính xác từng tiết của giáo án với từng hàng trong bảng Phụ lục (PPCT).
       - Tiết nào trong Phụ lục CÓ ghi mã NLS/AI (ví dụ: Tiết 44 có mã 1.3.TC2a, Tiết 47 có mã 6.A1.2 hoặc NLb.TC2) -> BẮT BUỘC tích hợp ĐÚNG MÃ ĐÓ vào ĐÚNG TIẾT ĐÓ.
       - Tiết nào trong Phụ lục KHÔNG ghi mã NLS/AI (ô để trống) -> TUYỆT ĐỐI KHÔNG tích hợp NLS/AI vào tiết đó!
    2. ⛔ NGHIÊM CẤM TỰ Ý PHÁT SINH, THAY ĐỔI, THÊM BỚT MÃ: Tuyệt đối không tự bịa mã, không đổi mã, không thêm mã cho những tiết mà Phụ lục không yêu cầu. Chuẩn mã 100%.
    3. ⛔ BẢO TOÀN CẤU TRÚC VÀ NỘI DUNG GIÁO ÁN GỐC 100%: Giữ nguyên toàn bộ cấu trúc giáo án đã code, không cắt xén, không dùng dấu '...', không tóm tắt các tiết tiếp theo, bảo toàn 100% nội dung gốc của giáo viên.
    4. 🔴 CHỈ BÔI ĐỎ NỘI DUNG BỔ SUNG DO TÍCH HỢP: Nội dung gốc giữ màu đen mặc định (không bọc trong thẻ <nls>/<ai>); CHỈ bọc các nhiệm vụ, câu lệnh, prompt bổ sung do tích hợp trong thẻ <nls>...</nls> hoặc <ai>...</ai>.
    5. ✨ GIÁO ÁN TRẢ VỀ SẠCH ĐẸP: Trình bày chuẩn thể thức Times New Roman 14pt, sạch sẽ, không ký tự rác, không dấu gạch chéo thừa, không lời dẫn ngoài lề.
    
    NỘI DUNG PHÂN PHỐI CHƯƠNG TRÌNH / PHỤ LỤC 3:
    ${info.distributionContent}
    =============================================================================
    `;

    modeDirective = `
    🚨 CHẾ ĐỘ: TỰ ĐỘNG ĐỒNG BỘ VÀ TÍCH HỢP THEO ĐÚNG PHÂN PHỐI CHƯƠNG TRÌNH / BẢN PHỤ LỤC.
    - Căn cứ 100% vào bảng PPCT/Bản Phụ lục ở trên của đúng bài học và từng tiết dạy cụ thể.
    - Đồng bộ đúng số tiết có tích hợp: Tiết nào trong phụ lục có mã thì tích hợp đúng tiết đó và đúng mã 100%.
    - Nếu tiết nào trong PPCT không có mã NLS/AI -> Tuyệt đối không tích hợp NLS/AI, không tự bịa mã.
    `;

    const syncedNLS = info.syncedIntegrations?.filter(i => i.category === 'NLS') || [];
    const syncedAI = info.syncedIntegrations?.filter(i => i.category === 'AI') || [];
    const syncedNLSFormatted = syncedNLS.length > 0
      ? syncedNLS.map(i => `                  - ${i.code} (${i.name}): ${i.description}`).join("\n")
      : `                  - [Mã NLS nguyên văn từ PPCT, ví dụ 1.1.TC1a, 1.3.TC2a]: [YCCĐ theo PPCT]`;
    const syncedAIFormatted = syncedAI.length > 0
      ? syncedAI.map(i => `                  - ${i.code} (${i.name}): ${i.description}`).join("\n")
      : `                  - [Mã AI nguyên văn từ PPCT, ví dụ NLb.TC1, 6.A1.2]: [YCCĐ theo PPCT]`;

    structureGoalRequirement = `
           1. Về kiến thức
           2. Về năng lực:
              a. Năng lực chung
              b. Năng lực đặc thù môn học
              (DỰA VÀO KẾT QUẢ ĐỐI CHIẾU TỪ PPCT / PHỤ LỤC CỦA ĐÚNG BÀI HỌC/TIẾT NÀY):
              * NẾU BÀI CÓ NĂNG LỰC SỐ (NLS) TRONG PPCT:
                <nls>c. Năng lực số
${syncedNLSFormatted}
                </nls>
              * NẾU BÀI CÓ NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) TRONG PPCT:
                <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
${syncedAIFormatted}
                </ai>
              * NẾU BÀI KHÔNG CÓ MÃ NLS HAY AI TRONG PPCT:
                (Giữ nguyên mục tiêu gốc, tuyệt đối không thêm mục c/d về NLS/AI)
           3. Về phẩm chất`;
  } else if (hasManualNLS || hasManualAI) {
    const manualItems: string[] = [];
    if (hasManualNLS && info.manualNLS) {
      const nlsList = info.manualNLS
        .map(item => `- ${item.code} (${item.name}): ${item.description}`)
        .join("\n");
      manualItems.push(`### CÁC MÃ NĂNG LỰC SỐ (NLS) ĐƯỢC CHỌN (BẮT BUỘC DÙNG ĐÚNG CHÍNH XÁC MÃ NGUYÊN BẢN 100%, KHÔNG BIẾN ĐỔI MÃ):\n${nlsList}`);
    }
    if (hasManualAI && info.manualAI) {
      const aiList = info.manualAI
        .map(item => `- ${item.code} (${item.name}): ${item.description}`)
        .join("\n");
      manualItems.push(`### CÁC MÃ NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) ĐƯỢC CHỌN (BẮT BUỘC DÙNG ĐÚNG CHÍNH XÁC MÃ NGUYÊN BẢN 100%, KHÔNG BIẾN ĐỔI MÃ):\n${aiList}`);
    }

    integrationStrategyDirective = `
    =============================================================================
    🚨 TRƯỜNG HỢP 2: KHÔNG CÓ PPCT - TÍCH HỢP THEO ĐÚNG CÁC MÃ NGƯỜI DÙNG TÍCH CHỌN THỦ CÔNG:
    Người dùng không tải PPCT lên, nhưng đã tích chọn cụ thể các mã năng lực sau:
    
    ${manualItems.join("\n\n")}
    
    NHIỆM VỤ BẮT BUỘC:
    1. Tích hợp CHÍNH XÁC VÀ ĐẦY ĐỦ các mã năng lực người dùng đã chọn ở trên vào:
       - Phần I.2 (Mục tiêu năng lực): BẮT BUỘC DÙNG ĐÚNG MÃ GỐC (Ví dụ: 1.1.TC1a, 1.1.TC2a, 1.3.TC2a, NLb.TC1, NLb.TC2, 6.A1.1, 6.A1.2...) cùng tên miền và mô tả yêu cầu cần đạt.
       - Phần II (Tiến trình dạy học): Ở các bước có tích hợp, ghi rõ mã trong ngoặc vuông (Ví dụ: [1.1.TC1a], [NLb.TC1], [6.A1.2]...) gắn liền với hoạt động của GV và HS.
    2. ĐÁNH DẤU MÀU ĐỎ TOÀN BỘ PHẦN TÍCH HỢP:
       ${hasManualNLS ? "- Mục tiêu NLS và hoạt động NLS bổ sung PHẢI BAO BỌC BẰNG THẺ <nls>...</nls>." : ""}
       ${hasManualAI ? "- Mục tiêu AI và hoạt động AI bổ sung PHẢI BAO BỌC BẰNG THẺ <ai>...</ai>." : ""}
    
    ⛔ NGUYÊN TẮC CẤM TUYỆT ĐỐI (STRICTLY PROHIBITED):
    - ❌ CẤM BIẾN ĐỔI MÃ: Tuyệt đối không được viết tắt hoặc tự bịa dạng mã như "NLS 1.1 (Bậc 3)", "AI.4 (Bậc 3 - Trung cấp)", "NLS 1.2", "AI.1"...
    -  BẮT BUỘC DÙNG ĐÚNG MÃ GỐC ĐẦY ĐỦ 100%: 1.1.TC1a, 1.1.TC2a, NLb.TC1, NLb.TC2, 6.A1.1, 6.A1.2...
    ${hasManualNLS && !hasManualAI ? "- Người dùng CHỈ CHỌN NĂNG LỰC SỐ (NLS). TUYỆT ĐỐI CẤM TỰ Ý THÊM MỤC NĂNG LỰC AI, KHÔNG THÊM HOẠT ĐỘNG AI, KHÔNG CÓ THẺ <ai>." : ""}
    ${!hasManualNLS && hasManualAI ? "- Người dùng CHỈ CHỌN NĂNG LỰC AI. TUYỆT ĐỐI CẤM TỰ Ý THÊM MỤC NĂNG LỰC SỐ, KHÔNG THÊM HOẠT ĐỘNG NLS, KHÔNG CÓ THẺ <nls>." : ""}
    - TUYỆT ĐỐI KHÔNG tự ý tích hợp thêm bất kỳ mã nào khác ngoài danh sách người dùng đã chọn ở trên.
    =============================================================================
    `;

    const nlsFormattedLines = (hasManualNLS && info.manualNLS)
      ? info.manualNLS.map(item => `                  - ${item.code} (${item.name}): ${item.description}`).join("\n")
      : "";
    const aiFormattedLines = (hasManualAI && info.manualAI)
      ? info.manualAI.map(item => `                  - ${item.code} (${item.name}): ${item.description}`).join("\n")
      : "";

    if (isEnglishSubject) {
      if (hasManualNLS && hasManualAI) {
        modeDirective = `🚨 MODE: INTEGRATE BOTH DIGITAL COMPETENCE (NLS) AND AI COMPETENCE FOR ENGLISH LESSON PLAN.`;
        structureGoalRequirement = `
           I. OBJECTIVES
           1. Knowledge: [Keep original]
           2. Competence:
              - a. General competences: [Keep original]
              - b. Specific competences: [Keep original]
              <nls>
              - c. Digital Competence:
${info.manualNLS?.map(item => `                - [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n")}
              </nls>
              <ai>
              - d. Artificial Intelligence (AI) Competence:
${info.manualAI?.map(item => `                - [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n")}
              </ai>
           3. Attitude & Personal qualities: [Keep original]`;
      } else if (hasManualNLS) {
        modeDirective = `🚨 MODE: INTEGRATE DIGITAL COMPETENCE (NLS) ONLY FOR ENGLISH LESSON PLAN.`;
        structureGoalRequirement = `
           I. OBJECTIVES
           1. Knowledge: [Keep original]
           2. Competence:
              - a. General competences: [Keep original]
              - b. Specific competences: [Keep original]
              <nls>
              - c. Digital Competence:
${info.manualNLS?.map(item => `                - [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n")}
              </nls>
           3. Attitude & Personal qualities: [Keep original]`;
      } else {
        modeDirective = `🚨 MODE: INTEGRATE AI COMPETENCE ONLY FOR ENGLISH LESSON PLAN.`;
        structureGoalRequirement = `
           I. OBJECTIVES
           1. Knowledge: [Keep original]
           2. Competence:
              - a. General competences: [Keep original]
              - b. Specific competences: [Keep original]
              <ai>
              - c. Artificial Intelligence (AI) Competence:
${info.manualAI?.map(item => `                - [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n")}
              </ai>
           3. Attitude & Personal qualities: [Keep original]`;
      }
    } else {
      if (hasManualNLS && hasManualAI) {
        modeDirective = `🚨 CHẾ ĐỘ: TÍCH HỢP CẢ NLS VÀ AI THEO DANH SÁCH NGƯỜI DÙNG ĐÃ CHỌN.`;
        structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
                c. Năng lực số (bắt buộc bao bọc bằng <nls>...</nls> để bôi đỏ):
                   <nls>c. Năng lực số
  ${nlsFormattedLines}
                   </nls>
                d. Năng lực Trí tuệ Nhân tạo (AI) (bắt buộc bao bọc bằng <ai>...</ai> để bôi đỏ):
                   <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
  ${aiFormattedLines}
                   </ai>
             3. Về phẩm chất`;
      } else if (hasManualNLS) {
        modeDirective = `🚨 CHẾ ĐỘ: CHỈ TÍCH HỢP NĂNG LỰC SỐ (NLS) - TUYỆT ĐỐI KHÔNG TÍCH HỢP AI.`;
        structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
                c. Năng lực số (bắt buộc bao bọc bằng <nls>...</nls> để bôi đỏ):
                   <nls>c. Năng lực số
  ${nlsFormattedLines}
                   </nls>
                   (⛔ CẤM TUYỆT ĐỐI KHÔNG ĐƯỢC THÊM MỤC NĂNG LỰC AI)
             3. Về phẩm chất`;
      } else {
        modeDirective = `🚨 CHẾ ĐỘ: CHỈ TÍCH HỢP TRÍ TUỆ NHÂN TẠO (AI) - TUYỆT ĐỐI KHÔNG TÍCH HỢP NLS.`;
        structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
                c. Năng lực Trí tuệ Nhân tạo (AI) (bắt buộc bao bọc bằng <ai>...</ai> để bôi đỏ):
                   <ai>c. Năng lực Trí tuệ Nhân tạo (AI)
  ${aiFormattedLines}
                   </ai>
                   (⛔ CẤM TUYỆT ĐỐI KHÔNG ĐƯỢC THÊM MỤC NĂNG LỰC SỐ)
             3. Về phẩm chất`;
      }
    }
  } else {
    integrationStrategyDirective = `
    =============================================================================
    🚨 TRƯỜNG HỢP 3: KHÔNG CÓ PPCT VÀ NGƯỜI DÙNG KHÔNG CHỌN MÃ TÍCH HỢP NÀO:
    - Chuẩn hóa cấu trúc giáo án gốc theo 4 bước rõ ràng, giữ nguyên 100% kiến thức và bài tập gốc.
    - ⛔ TUYỆT ĐỐI KHÔNG tự ý thêm các mục NLS hay AI mới vào giáo án.
    =============================================================================
    `;
    modeDirective = `🚨 CHẾ ĐỘ: CHUẨN HÓA GIÁO ÁN GỐC (KHÔNG TÍCH HỢP NLS VÀ KHÔNG TÍCH HỢP AI).`;
    structureGoalRequirement = `
           1. Về kiến thức
           2. Về năng lực:
              a. Năng lực chung
              b. Năng lực đặc thù môn học
           3. Về phẩm chất`;
  }

  return `
    DỮ LIỆU THAM CHIẾU KHUNG NĂNG LỰC SỐ & KHUNG NĂNG LỰC AI:
    (LƯU Ý: Đây chỉ là dữ liệu từ điển tham chiếu tổng thể. Khi người dùng đã cung cấp Phân phối chương trình (PPCT) ở trên, bạn BẮT BUỘC dùng đúng mã trong PPCT của đúng bài đó. CẤM TUYỆT ĐỐI không được tự ý nhặt mã trong khung này để gán vào bài học nếu bài đó trong PPCT không có hoặc có mã khác).
    ${NLS_FRAMEWORK_DATA}

    THÔNG TIN GIÁO ÁN ĐẦU VÀO:
    - Bộ sách: ${info.textbook}
    - Cấp học: ${info.schoolLevel}
    - Môn học: ${info.subject}
    - Khối lớp: ${info.grade}
    
    ${modeDirective}

    ${integrationStrategyDirective}

    ${englishDirective}

    YÊU CẦU XỬ LÝ NỘI DUNG:
    ${options.analyzeOnly ? "- Chỉ phân tích, không chỉnh sửa chi tiết." : "- Chỉnh sửa giáo án và TÍCH HỢP NĂNG LỰC theo đúng chế độ đã chọn ở trên vào các hoạt động dạy học."}
    ${options.detailedReport ? "- Kèm theo bảng giải thích chi tiết mã năng lực đã chọn ở cuối bài." : ""}
    
    YÊU CẦU VỀ ĐỊNH DẠNG & NGUYÊN TẮC BẢO TOÀN (BẮT BUỘC):
    1. 🚨 NGUYÊN TẮC TỐI THƯỢNG - BẢO TOÀN 100% NGUYÊN VẸN NỘI DUNG GIÁO ÁN GỐC & CẤM TUYỆT ĐỐI TÓM TẮT TIẾT HỌC:
       - ⛔ CẤM TUYỆT ĐỐI VIẾT CÁC DÒNG RÚT GỌN NHƯ: "(Các tiết học tiếp theo 45-53 giữ nguyên cấu trúc...)", "(Tương tự như trên...)", "(Các tiết còn lại giữ nguyên...)".
       - KHI GIÁO ÁN GỒM NHIỀU TIẾT (Ví dụ: Bài 4 gồm 12 tiết, Tiết 42-53): BẮT BUỘC phải xuất đầy đủ 100% chi tiết TẤT CẢ các tiết học (Tiết 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53...), từng hoạt động, từng bước, từng câu hỏi và đáp án từ đầu đến cuối mà KHÔNG ĐƯỢC BỎ BẤT KỲ MỘT TIẾT NÀO!
       - Bạn PHẢI GIỮ NGUYÊN 100% TẤT CẢ NỘI DUNG, TỪ NGỮ, CÂU HỎI, ĐÁP ÁN, SẢN PHẨM HỌC TẬP, CÁC BƯỚC THỰC HIỆN CỦA GIÁO VIÊN TRONG BẢN GỐC.
       - CẤM TUYỆT ĐỐI việc viết tắt hay thay thế nội dung gốc bằng dấu ba chấm ('...'), ('[Nội dung như SGK]'), ('[Giữ nguyên...]').
       - TRONG CÁC BẢNG BIỂU (ví dụ bảng: Tổ chức thực hiện | Sản phẩm): BẠN PHẢI GIỮ LẠI TOÀN BỘ CHỮ trong cột "Tổ chức thực hiện" và cột "Sản phẩm", chỉ chèn thêm các nhiệm vụ/câu hỏi NLS/AI tích hợp màu đỏ vào vị trí thích hợp.
       - NGUYÊN TẮC VÀNG: CHỈ THÊM PHẦN TÍCH HỢP VÀO - TUYỆT ĐỐI KHÔNG ĐƯỢC XÓA HAY RÚT GỌN NỘI DUNG GỐC DÙ CHỈ 1 CÂU.
    2. ĐỊNH DẠNG ĐẦU VÀO: Nội dung giáo án gốc bên dưới có thể là HTML (được chuyển từ DOCX). Các công thức toán học đã được thay thế bằng các mã giữ chỗ có dạng [MATH_ID_...].
    3. NHIỆM VỤ: Bạn phải chuyển đổi nội dung này sang MARKDOWN, đồng thời TÍCH HỢP nội dung theo đúng chế độ được chọn.
    4. BẢO TOÀN CẤU TRÚC BẢNG: 
       - Giữ nguyên tất cả các Bảng (Table) của giáo án gốc (chuyển sang Markdown Table). KHÔNG ĐƯỢC làm mất bảng hoặc biến bảng thành văn bản thường.
       - Giữ nguyên các tiêu đề, danh sách.
       - Giữ nguyên các đoạn in đậm/nghiêng.
    5. BẢO TOÀN CÔNG THỨC TOÁN HỌC VÀ HÓA HỌC (QUAN TRỌNG NHẤT): 
       - Bạn TUYỆT ĐỐI KHÔNG ĐƯỢC thay đổi, dịch, hay xóa các mã giữ chỗ [MATH_ID_...]. Phải giữ nguyên vẹn các mã này trong văn bản đầu ra.
       - KHÔNG ĐƯỢC đặt các mã này bên trong các thẻ định dạng như in đậm (**), in nghiêng (*), gạch chân (<u>).
       - TUYỆT ĐỐI KHÔNG SỬ DỤNG LATEX (DẤU $ HOẶC $$) TRONG TOÀN BỘ VĂN BẢN ĐẦU RA.
       - Đối với các công thức hóa học hoặc các chữ có chỉ số dưới/chỉ số trên (ví dụ: C<sub>15</sub>H<sub>31</sub>COOH, m<sup>2</sup>), hãy giữ nguyên thẻ HTML <sub> và <sup>. KHÔNG chuyển thành dạng $C_{15}H_{31}COOH$.
    6. ĐÁNH DẤU BÔI ĐỎ TOÀN BỘ NỘI DUNG TÍCH HỢP (QUAN TRỌNG): 
       ${enableNLS ? "- TẤT CẢ các nội dung tích hợp Năng lực số (cả mục tiêu 'c. Năng lực số' và các hoạt động học tập, hướng dẫn số bổ sung trong Tiến trình dạy học/Bảng biểu) BẮT BUỘC phải được bao bọc bằng thẻ <nls>...</nls>." : ""}
       ${enableAI ? "- TẤT CẢ các nội dung tích hợp Năng lực AI (cả mục tiêu AI và các hoạt động AI bổ sung trong Tiến trình dạy học/Bảng biểu) BẮT BUỘC phải được bao bọc bằng thẻ <ai>...</ai>." : ""}
       (Hệ thống sẽ tự động bôi màu ĐỎ cho toàn bộ các phần nằm trong thẻ này trên bản xem trước và khi xuất file Word DOCX).
    
    7. 🎯 QUY TẮC HOÀN THIỆN ĐỒNG BỘ ĐẦY ĐỦ 4 BƯỚC CHO TẤT CẢ CÁC HOẠT ĐỘNG (BẮT BUỘC):
       - MỌI HOẠT ĐỘNG trong tiến trình dạy học:
         + Hoạt động 1: Khởi động / Mở đầu
         + Hoạt động 2: Hình thành kiến thức / Khám phá
         + Hoạt động 3: Luyện tập (BẮT BUỘC PHẢI CHIA ĐỦ 4 BƯỚC VÀ GIỮ NGUYÊN 100% CÂU HỎI TRẮC NGHIỆM/BÀI TẬP)
         + Hoạt động 4: Vận dụng (BẮT BUỘC PHẢI CHIA ĐỦ 4 BƯỚC)
       - Trong mục **d. Tổ chức thực hiện** (hoặc bảng 2 cột Tổ chức thực hiện | Sản phẩm), BẮT BUỘC PHẢI CÓ ĐỦ 4 BƯỚC RÕ RÀNG:
         + BƯỚC 1 (Chuyển giao nhiệm vụ): Nêu rõ GV giao nhiệm vụ bài học gốc + giao nhiệm vụ số/AI (công cụ số/AI, câu lệnh prompt cụ thể, tiêu chuẩn kiểm chứng). (Bọc phần tích hợp trong thẻ màu đỏ)
         + BƯỚC 2 (Thực hiện nhiệm vụ - BẮT BUỘC PHẢI CÓ HOẠT ĐỘNG CỦA HS): Nêu rõ HS làm gì tương ứng (làm bài tập gốc, mở máy/điện thoại, thao tác công cụ số/AI, nhập prompt, tra cứu, đối chiếu kết quả với SGK để nhận diện tính chính xác/ảo giác AI, ghi nhận vào vở/phiếu học tập). (Bọc phần tích hợp trong thẻ màu đỏ)
         + BƯỚC 3 (Báo cáo, thảo luận): Nêu rõ HS trình bày kết quả bài học và kết quả số/AI, chia sẻ link/màn hình, phản biện và trao đổi. (Bọc phần tích hợp trong thẻ màu đỏ)
         + BƯỚC 4 (Đánh giá, kết luận): Nêu rõ GV nhận xét bài làm, đánh giá kết quả làm việc số/kỹ năng tương tác AI của HS, giáo dục liêm chính học thuật và chốt kiến thức chuẩn. (Bọc phần tích hợp trong thẻ màu đỏ)
         + 🚨 YÊU CẦU ĐẶC BIỆT CHI TIẾT HÓA MỤC SẢN PHẨM HỌC TẬP (Mục 'b. Sản phẩm' hoặc Cột Sản phẩm):
           * TUYỆT ĐỐI KHÔNG dùng câu mô tả chung chung, hình thức như: "Học sinh nêu được các ý chính về...", "Học sinh trả lời được câu hỏi...", "Biết cách sử dụng AI...", "Hoàn thành các bài tập 1, 2, 3...".
           * BẠN BẮT BUỘC PHẢI GHI CỤ THỂ VÀ ĐẦY ĐỦ TỪNG Ý CHÍNH ĐÓ LÀ GÌ:
             - Ghi rõ nội dung câu trả lời chuẩn, lời giải chi tiết, đáp án của từng bài tập/câu hỏi trong bài học gốc.
             - Liệt kê cụ thể từng ý chính, định nghĩa, khái niệm, công thức, số liệu, bảng biểu mà học sinh cần đạt được (Ví dụ: thay vì ghi "Nêu đặc điểm...", phải ghi rõ: 1. Đặc điểm A: ... 2. Đặc điểm B: ...).
             - Đối với sản phẩm tích hợp NLS/AI (bọc trong thẻ <nls> hoặc <ai>): Ghi rõ nội dung sản phẩm số cụ thể (ví dụ: Bản tóm tắt/so sánh cụ thể gồm những ý gì; Câu trả lời đã được đối chiếu/kiểm chứng từ ChatGPT với SGK; File trình chiếu hoặc sơ đồ tư duy trên Canva/Mindmeister với các nhánh nội dung cụ thể; Kết quả tra cứu cụ thể; Prompt cụ thể học sinh đã thực hiện và kết quả kiểm duyệt...).
       - ⛔ CẤM TUYỆT ĐỐI việc viết tắt hoặc bỏ sót bước ở Hoạt động 3 và 4 như "... (Các câu hỏi trắc nghiệm giữ nguyên) ..." hoặc chỉ ghi dấu gạch đầu dòng mà không chia đủ 4 bước!

    8. ĐỊNH DẠNG VÀ THỂ THỨC VĂN BẢN (NGHIÊM NGẶT 100%):
       - BẢO TOÀN 100% THỂ THỨC VĂN BẢN CỦA GIÁO ÁN GỐC:
         + Font chữ chuẩn: Times New Roman, cỡ 14 (14pt).
         + Thể thức văn bản chuẩn: Căn đều 2 bên (Justified), lùi đầu dòng 1.27cm, giãn dòng 1.15 - 1.2, bảo toàn toàn bộ cấu trúc, đề mục và câu hỏi bài tập của giáo án cũ.
       - LOẠI BỎ TRIỆT ĐỂ KÝ TỰ RÁC VÀ DẤU GẠCH CHÉO '/' THỪA:
         + TUYỆT ĐỐI KHÔNG để xuất hiện các ký tự thừa như dấu gạch chéo '/', '\/', '//' vô nghĩa ở đầu dòng, cuối dòng hoặc xen kẽ đề mục, các dấu escape '\', hoặc ký tự lạ không thuộc nội dung bài dạy.
         + TUYỆT ĐỐI KHÔNG xuất các thẻ HTML như <strong>, <b>, <em>, <i>, <p>, <div> ra văn bản. Hãy dùng Markdown chuẩn (**in đậm**, *in nghiêng*).
         + Loại bỏ toàn bộ các ký tự ô vuông rỗng (□, ■).

    ĐỊNH DẠNG ĐẦU RA (NGHIÊM NGẶT):
    - Trả về toàn bộ nội dung giáo án dưới dạng Markdown.
    - Cấu trúc mục TIÊU BÀI HỌC bắt buộc:
${structureGoalRequirement}
    - Trong phần TIẾN TRÌNH DẠY HỌC: Giữ nguyên toàn bộ nội dung từng hoạt động gốc, chỉ chèn thêm các hoạt động tích hợp đồng bộ cả hoạt động của GV và HS được bao bọc bằng thẻ <nls>...</nls> hoặc <ai>...</ai>.
    - KHÔNG ĐƯỢC CÓ LỜI DẪN NGOÀI LỀ.
    - Bắt đầu ngay bằng nội dung giáo án.
    
    NỘI DUNG GIÁO ÁN GỐC (CÓ THỂ LÀ HTML):
    ${info.content}
  `;
};

const postProcessResult = (text: string, lessonInfo?: LessonInfo): string => {
  let fixed = text.replace(/\$\$?([^$]+)\$\$?/g, (match, content) => {
    if (content.includes("MATH_ID")) return match;
    let f = content;
    f = f.replace(/_\{([^}]+)\}/g, "<sub>$1</sub>");
    f = f.replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>");
    f = f.replace(/_([a-zA-Z0-9])/g, "<sub>$1</sub>");
    f = f.replace(/\^([a-zA-Z0-9])/g, "<sup>$1</sup>");
    f = f.replace(/([A-Za-z])\{([0-9]+)\}/g, "$1<sub>$2</sub>");
    return f;
  });

  fixed = fixed.replace(/_\{([^}]+)\}/g, "<sub>$1</sub>");
  fixed = fixed.replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>");
  fixed = fixed.replace(/([A-Za-z])\{([0-9]+)\}/g, "$1<sub>$2</sub>");

  // Convert html styling tags to markdown so they never leak as raw html tags
  fixed = fixed
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

  // Clean weird Unicode glyphs and square bullet boxes
  fixed = fixed.replace(/[\uF000-\uF8FF]/g, "");
  fixed = fixed.replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD\u25A0\u25A1\u25AA\u25AB\u25FE\u25FD]/g, "- ");

  // Clean stray slashes, hashes, and escaped markdown artifacts
  fixed = fixed
    .replace(/\\([*#_>\-\+\[\]])/g, "$1") // unescape markdown backslashes
    .replace(/\\\//g, "/") // unescape \/
    .replace(/(^|\n)\s*\/+\s*(?=[^\n\r])/g, "$1") // remove leading slashes at the start of lines
    .replace(/(\s)\/+\s*(?=[A-Za-z0-9\u00C0-\u1EF9#\*\-\+I])/g, "$1") // remove isolated slashes before words
    .replace(/\|\s*\/+\s*/g, "| ") // remove stray slash at start of table cells
    .replace(/\|\s*#{1,6}\s*/g, "| ") // remove stray markdown headings inside table cells
    .replace(/(^|\n)(\s*[-*+]\s*)\/+\s*/g, "$1$2") // remove stray slashes after bullet points
    .replace(/(^|\n)(\s*[-*+]\s*)#{1,6}\s*/g, "$1$2") // remove stray hashes after bullet points
    .replace(/\s*\/+\s*$/gm, ""); // remove stray trailing slashes on lines

  // Normalize escaped HTML tags
  fixed = fixed
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

  // 1. AUTO-FIX BASTARDIZED / HALLUCINATED CODES TO MATCH OFFICIAL CODES
  // Strip any hallucinated level/tier descriptions like (Bậc 3), (Bậc 3 - Trung cấp), (Bậc 4 - Nâng cao), (Mức Trung cấp), (Level 3), [Bậc 3 - Trung cấp], etc.
  fixed = fixed.replace(/\s*\(\s*(?:Bậc|Mức|Cấp độ|Level|Cơ bản|Trung cấp|Nâng cao|Chuyên sâu)[^\)]*\)/gi, "");
  fixed = fixed.replace(/\s*\[\s*(?:Bậc|Mức|Cấp độ|Level|Cơ bản|Trung cấp|Nâng cao|Chuyên sâu)[^\]]*\]/gi, "");

  // Normalize prefix "NLS " or "AI " when placed directly before codes
  fixed = fixed.replace(/\bNLS\s+(\d+\.\d+\.TC\w+)/gi, "$1");
  fixed = fixed.replace(/\bNLS\s+(\d+\.\d+\.CB\w+)/gi, "$1");
  fixed = fixed.replace(/\bNLS\s+(\d+\.\d+\.NC\w+)/gi, "$1");
  fixed = fixed.replace(/\bAI\s+(NL[a-d]\.TC\w+)/gi, "$1");
  fixed = fixed.replace(/\bAI\s+(NL[a-d]\.CB\w+)/gi, "$1");
  fixed = fixed.replace(/\bAI\s+(NL[a-d]\.NC\w+)/gi, "$1");
  fixed = fixed.replace(/\bAI\s+(\d+\.[A-D]\d+\.\d+)/gi, "$1");

  const chosenNLS = (lessonInfo?.manualNLS && lessonInfo.manualNLS.length > 0)
    ? lessonInfo.manualNLS
    : (lessonInfo?.syncedIntegrations?.filter(i => i.category === 'NLS') || []);

  const chosenAI = (lessonInfo?.manualAI && lessonInfo.manualAI.length > 0)
    ? lessonInfo.manualAI
    : (lessonInfo?.syncedIntegrations?.filter(i => i.category === 'AI') || []);

  // Replace any simplified domain codes (like "NLS 1.1", "- NLS 1.1:", "- 1.1:") with actual selected codes
  if (chosenNLS.length > 0) {
    chosenNLS.forEach(item => {
      const prefixMatch = item.code.match(/^(\d+\.\d+)/);
      if (prefixMatch) {
        const prefix = prefixMatch[1].replace(".", "\\.");
        const reg1 = new RegExp(`\\bNLS\\s*${prefix}\\b`, 'gi');
        fixed = fixed.replace(reg1, item.code);
        const reg2 = new RegExp(`\\[\\s*NLS\\s*${prefix}[^\\]]*\\]`, 'gi');
        fixed = fixed.replace(reg2, `[${item.code}]`);
      }
    });

    const primaryNLS = chosenNLS[0];
    fixed = fixed.replace(/\bNLS\s*1\.[1-3]\b/gi, primaryNLS.code);
    fixed = fixed.replace(/\[\s*NLS\s*1\.[1-3][^\]]*\]/gi, `[${primaryNLS.code}]`);
  } else {
    fixed = fixed.replace(/\bNLS\s*1\.1\b/gi, "1.1.TC1a");
    fixed = fixed.replace(/\bNLS\s*1\.2\b/gi, "1.2.TC1a");
    fixed = fixed.replace(/\bNLS\s*1\.3\b/gi, "1.3.TC1a");
  }

  // Replace any AI domain codes (like "NLa", "NLb", "AI.1", "AI 1") with actual selected codes
  if (chosenAI.length > 0) {
    chosenAI.forEach(item => {
      const codeBase = item.code.split('.')[0];
      if (codeBase.startsWith("NL")) {
        const reg = new RegExp(`\\bAI\\s*(${codeBase})\\b`, 'gi');
        fixed = fixed.replace(reg, item.code);
      }
    });

    const primaryAI = chosenAI[0];
    fixed = fixed.replace(/\bAI\.[1-4]\b/gi, primaryAI.code);
    fixed = fixed.replace(/\[\s*AI\.[1-4][^\]]*\]/gi, `[${primaryAI.code}]`);
    fixed = fixed.replace(/\bAI\s+([A-D]|NL[a-d])\b/gi, primaryAI.code);
  } else {
    fixed = fixed.replace(/\bAI\.4\b/gi, "NLb.TC1");
    fixed = fixed.replace(/\bAI\.2\b/gi, "NLc.TC1");
    fixed = fixed.replace(/\bAI\.1\b/gi, "NLa.TC1");
    fixed = fixed.replace(/\bAI\.3\b/gi, "NLd.TC1");
  }

  // Final cleanup of standalone "NLS" or "AI" prefixes before bullet dashes
  fixed = fixed.replace(/-\s*NLS\s+(\d+\.\d+)/gi, "- $1");
  fixed = fixed.replace(/-\s*AI\s+(NL[a-d]|\d+\.[A-D])/gi, "- $1");

  // 2. PREVENT RED COLOR LEAK:
  fixed = fixed.replace(/<nls>(\s*(?:[3-9]\.\s*Phẩm chất|[3-9]\.\s*Về phẩm chất|[3-9]\.\s*Qualities|[3-9]\.\s*Attitudes|II\.\s*TIẾN TRÌNH|II\.\s*LESSON PROCEDURE|II\.\s*PROCEDURES|III\.\s*TIẾN TRÌNH|\d+\.\s*Hoạt động|\d+\.\s*Activity|\bBước\s*[1-4]\b|\bStep\s*[1-4]\b|[a-d]\)\s*Mục tiêu|[a-d]\)\s*Objectives|[a-d]\)\s*Nội dung|[a-d]\)\s*Content|[a-d]\)\s*Sản phẩm|[a-d]\)\s*Products|[a-d]\)\s*Tổ chức|[a-d]\)\s*Implementation))/gi, "</nls>\n$1");
  fixed = fixed.replace(/<ai>(\s*(?:[3-9]\.\s*Phẩm chất|[3-9]\.\s*Về phẩm chất|[3-9]\.\s*Qualities|[3-9]\.\s*Attitudes|II\.\s*TIẾN TRÌNH|II\.\s*LESSON PROCEDURE|II\.\s*PROCEDURES|III\.\s*TIẾN TRÌNH|\d+\.\s*Hoạt động|\d+\.\s*Activity|\bBước\s*[1-4]\b|\bStep\s*[1-4]\b|[a-d]\)\s*Mục tiêu|[a-d]\)\s*Objectives|[a-d]\)\s*Nội dung|[a-d]\)\s*Content|[a-d]\)\s*Sản phẩm|[a-d]\)\s*Products|[a-d]\)\s*Tổ chức|[a-d]\)\s*Implementation))/gi, "</ai>\n$1");

  fixed = fixed.replace(/<nls>\s*<\/nls>/gi, "");
  fixed = fixed.replace(/<ai>\s*<\/ai>/gi, "");

  return fixed;
};

async function generateLessonPlanClientSide(
  info: LessonInfo,
  options: ProcessingOptions,
  apiKey: string
): Promise<string> {
  const cleanApiKey = apiKey ? apiKey.trim().replace(/^["']|["']$/g, '') : '';
  if (!cleanApiKey) {
    throw new Error("Trang web đang chạy trên Netlify/Web tĩnh. Vui lòng bấm nút 'CẤU HÌNH API KEY' ở góc trên để dán API Key Gemini của bạn để ứng dụng hoạt động!");
  }

  const ai = new GoogleGenAI({ apiKey: cleanApiKey });
  const userPrompt = buildUserPrompt(info, options);

  const modelsToTry = [
    "gemini-3.6-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-2.0-flash-lite",
    "gemini-3.7-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
  ];

  const callModel = async (modelId: string) => {
    const res = await ai.models.generateContent({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
        maxOutputTokens: 65536,
      },
      contents: userPrompt,
    });
    return res.text || "";
  };

  let lastClientErr = "";
  for (const modelId of modelsToTry) {
    try {
      const resText = await callModel(modelId);
      if (resText && resText.trim().length > 0) {
        return postProcessResult(resText, info);
      }
    } catch (err: any) {
      lastClientErr = String(err?.message || err);
      console.warn(`[Client AI] Model ${modelId} error:`, lastClientErr);
    }
  }

  if (lastClientErr.includes("API_KEY_INVALID") || lastClientErr.includes("API key not valid") || lastClientErr.includes("403") || lastClientErr.includes("401")) {
    throw new Error("Mã API Key chưa hợp lệ hoặc đang chờ Google kích hoạt (Lưu ý: API Key mới tạo trên Google AI Studio có thể mất 1-2 phút để hệ thống Google đồng bộ). Vui lòng đợi ít phút rồi thử lại.");
  }
  if (lastClientErr.includes("429") || lastClientErr.includes("RESOURCE_EXHAUSTED") || lastClientErr.includes("quota")) {
    throw new Error("API Key này đã hết lượt gọi trong phút này (Quota Exceeded). Vui lòng đợi 1-2 phút hoặc đổi API Key khác.");
  }
  throw new Error(`Lỗi kết nối Gemini AI: ${lastClientErr}`);

  throw new Error("Không nhận được kết quả từ Gemini AI.");
}

export const generateNLSLessonPlan = async (
  info: LessonInfo,
  options: ProcessingOptions
): Promise<string> => {
  const userApiKey = localStorage.getItem("USER_GEMINI_API_KEY") || "";

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (userApiKey.trim()) {
      headers["x-api-key"] = userApiKey.trim();
    }

    const response = await fetch("/api/generate-lesson-plan", {
      method: "POST",
      headers,
      body: JSON.stringify({ info, options }),
    });

    // Handle Netlify / Static hosting where /api route does not exist (returns 404 or index.html)
    if (response.status === 404) {
      console.log("[GeminiService] Server /api route returned 404. Switching to client-side Gemini execution...");
      return await generateLessonPlanClientSide(info, options, userApiKey);
    }

    const responseText = await response.text();
    let data: any = {};
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error("Phản hồi không phải dạng JSON:", responseText);
      if (!response.ok) {
        if (response.status === 413) {
          throw new Error("Dung lượng giáo án quá lớn. Vui lòng rút ngắn nội dung hoặc giảm dung lượng file.");
        }
        if (response.status === 504 || response.status === 502) {
          throw new Error("Hệ thống mất quá nhiều thời gian để xử lý. Vui lòng thử lại sau ít phút.");
        }
        // Fall back to client side if HTML error page was returned
        return await generateLessonPlanClientSide(info, options, userApiKey);
      }
      throw new Error("Định dạng dữ liệu trả về từ máy chủ không hợp lệ.");
    }

    if (!response.ok) {
      // If error is 401 (Invalid API Key) or 400 with invalid key, check if user supplied key and fall back to client side to give direct feedback
      if (response.status === 401 || response.status === 403) {
        if (userApiKey.trim()) {
          return await generateLessonPlanClientSide(info, options, userApiKey);
        }
      }
      throw new Error(data.error || `Lỗi từ Server AI (${response.status})`);
    }

    if (!data.text) {
      throw new Error("Server AI trả về kết quả rỗng.");
    }

    return postProcessResult(data.text, info);
  } catch (err: any) {
    console.error("Lỗi khi kết nối API:", err);
    
    // If backend fetch completely failed (e.g., offline or host down), attempt client-side execution if user has key
    if (userApiKey.trim() && err.message?.includes("Failed to fetch")) {
      try {
        return await generateLessonPlanClientSide(info, options, userApiKey);
      } catch (clientErr: any) {
        throw clientErr;
      }
    }

    const detailMsg = err.message || (typeof err === "string" ? err : JSON.stringify(err)) || "Không thể kết nối đến máy chủ AI";
    throw new Error(detailMsg);
  }
};

