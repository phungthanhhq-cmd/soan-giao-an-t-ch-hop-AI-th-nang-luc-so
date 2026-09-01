import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, NLS_FRAMEWORK_DATA } from "./constants";
import { LessonInfo, ProcessingOptions } from "./types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON and URL-encoded body parsers with generous limits for large documents
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API route for generating lesson plans runs server-side to hide the API Key
  app.post("/api/generate-lesson-plan", async (req, res, next) => {
    try {
      const { info, options } = req.body as { info: LessonInfo; options: ProcessingOptions };
      if (!info || !options) {
        return res.status(400).json({ error: "Thiếu dữ liệu đầu vào để tạo giáo án." });
      }

      const rawKey = (req.headers["x-api-key"] as string) ||
                     process.env.GEMINI_API_KEY || 
                     process.env.API_KEY || 
                     process.env.KAY_API_GEMINI || 
                     process.env.KEY_API_GEMINI || 
                     process.env.GEMINI_KEY || 
                     process.env.GEMINI_API;
      const apiKey = rawKey ? rawKey.trim().replace(/^["']|["']$/g, '') : '';
      if (!apiKey) {
        return res.status(400).json({
          error: "Chưa thiết lập Gemini API Key. Vui lòng nhấn nút 'CẤU HÌNH API KEY' ở thanh trên cùng để dán API Key của bạn.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Danh sách các mô hình chuẩn @google/genai theo thứ tự ưu tiên (loại bỏ hoàn toàn model cũ đã bị deprecate)
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
             ${info.manualNLS?.map(item => `- [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n             ") || "- [1.1.TC1a] (Browsing, searching and filtering data, information and digital content): Students can use digital search engines and online dictionaries to find vocabulary and grammar explanations."}
           </nls>` : ""}
           ${hasManualAI ? `* THẺ AI (BẮT BUỘC BỌC TRONG <ai>...</ai>):
           <ai>
           - ${hasManualNLS ? "d." : "c."} Artificial Intelligence (AI) Competence:
             ${info.manualAI?.map(item => `- [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n             ") || "- [NLb.TC1] (AI Ethics & Critical Thinking): Students can interact responsibly with AI tools (ChatGPT/Copilot) and cross-check AI-generated sentences with the textbook."}
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

        structureGoalRequirement = `
           1. Về kiến thức
           2. Về năng lực:
              a. Năng lực chung
              b. Năng lực đặc thù môn học
              (DỰA VÀO KẾT QUẢ ĐỐI CHIẾU TỪ PPCT / PHỤ LỤC 3 CỦA ĐÚNG BÀI HỌC/TIẾT NÀY):
              * NẾU BÀI CÓ NĂNG LỰC SỐ (NLS) TRONG PPCT:
                <nls>c. Năng lực số
                - [Mã NLS nguyên văn từ PPCT, ví dụ 1.3.TC2a] (Tên miền): [Yêu cầu cần đạt NLS theo đúng dòng PPCT của bài này]
                </nls>
              * NẾU BÀI CÓ NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) TRONG PPCT:
                <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
                - [Mã AI nguyên văn từ PPCT, ví dụ NLb.TC2] (Tên miền): [Yêu cầu cần đạt AI theo đúng dòng PPCT của bài này]
                </ai>
              * NẾU BÀI KHÔNG CÓ MÃ NLS HAY AI TRONG PPCT:
                (Giữ nguyên mục tiêu gốc, tuyệt đối không thêm mục c/d về NLS/AI)
           3. Về phẩm chất`;
      } else if (hasManualNLS || hasManualAI) {
        const manualItems: string[] = [];
        if (hasManualNLS && info.manualNLS) {
          const nlsList = info.manualNLS
            .map(item => `- [${item.code}] (${item.name}): ${item.description}`)
            .join("\n");
          manualItems.push(`### CÁC MÃ NĂNG LỰC SỐ (NLS) ĐƯỢC CHỌN (BẮT BUỘC GHI ĐỦ MÃ ${info.manualNLS.map(i => i.code).join(", ")} VÀO GIÁO ÁN):\n${nlsList}`);
        }
        if (hasManualAI && info.manualAI) {
          const aiList = info.manualAI
            .map(item => `- [${item.code}] (${item.name}): ${item.description}`)
            .join("\n");
          manualItems.push(`### CÁC MÃ NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) ĐƯỢC CHỌN (BẮT BUỘC GHI ĐỦ MÃ ${info.manualAI.map(i => i.code).join(", ")} VÀO GIÁO ÁN):\n${aiList}`);
        }

        integrationStrategyDirective = `
        =============================================================================
        🚨 TRƯỜNG HỢP 2: KHÔNG CÓ PPCT - TÍCH HỢP THEO ĐÚNG CÁC MÃ NGƯỜI DÙNG TÍCH CHỌN THỦ CÔNG:
        Người dùng không tải PPCT lên, nhưng đã tích chọn cụ thể các mã năng lực sau:
        
        ${manualItems.join("\n\n")}
        
        NHIỆM VỤ BẮT BUỘC:
        1. Tích hợp CHÍNH XÁC VÀ ĐẦY ĐỦ các mã năng lực người dùng đã chọn ở trên vào:
           - Phần I.2 (Mục tiêu năng lực): GHI ĐẦY ĐỦ MÃ TIÊU CHÍ (Ví dụ: 1.1.TC2a, 2.1.TC2b, NLb.TC2, NLc.TC2...) cùng tên miền và mô tả yêu cầu cần đạt.
           - Phần II (Tiến trình dạy học): Ở các bước có tích hợp, ghi rõ mã trong ngoặc vuông (Ví dụ: [2.1.TC2b], [NLb.TC2]...) gắn liền với hoạt động của GV và HS.
        2. ĐÁNH DẤU MÀU ĐỎ TOÀN BỘ PHẦN TÍCH HỢP:
           ${hasManualNLS ? "- Mục tiêu NLS và hoạt động NLS bổ sung PHẢI BAO BỌC BẰNG THẺ <nls>...</nls>." : ""}
           ${hasManualAI ? "- Mục tiêu AI và hoạt động AI bổ sung PHẢI BAO BỌC BẰNG THẺ <ai>...</ai>." : ""}
        
        ⛔ NGUYÊN TẮC CẤM (STRICTLY PROHIBITED):
        ${hasManualNLS && !hasManualAI ? "- Người dùng CHỈ CHỌN NĂNG LỰC SỐ (NLS). TUYỆT ĐỐI CẤM TỰ Ý THÊM MỤC NĂNG LỰC AI, KHÔNG THÊM HOẠT ĐỘNG AI, KHÔNG CÓ THẺ <ai>." : ""}
        ${!hasManualNLS && hasManualAI ? "- Người dùng CHỈ CHỌN NĂNG LỰC AI. TUYỆT ĐỐI CẤM TỰ Ý THÊM MỤC NĂNG LỰC SỐ, KHÔNG THÊM HOẠT ĐỘNG NLS, KHÔNG CÓ THẺ <nls>." : ""}
        - TUYỆT ĐỐI KHÔNG tự ý tích hợp thêm bất kỳ mã nào khác ngoài danh sách người dùng đã chọn ở trên.
        =============================================================================
        `;

        if (isEnglishSubject) {
          if (hasManualNLS && hasManualAI) {
            modeDirective = `🚨 MODE: INTEGRATE BOTH DIGITAL COMPETENCE (NLS) AND AI COMPETENCE FOR ENGLISH LESSON PLAN.`;
            structureGoalRequirement = `
           - KEEP 100% OF THE ORIGINAL OBJECTIVES (Knowledge, General/Specific Competences, Attitude/Personal Qualities).
           - ONLY INJECT THE DIGITAL & AI COMPETENCES UNDER COMPETENCES:
              <nls>
              - c. Digital Competence:
${info.manualNLS?.map(item => `                - [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n")}
              </nls>
              <ai>
              - d. Artificial Intelligence (AI) Competence:
${info.manualAI?.map(item => `                - [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n")}
              </ai>`;
          } else if (hasManualNLS) {
            modeDirective = `🚨 MODE: INTEGRATE DIGITAL COMPETENCE (NLS) ONLY FOR ENGLISH LESSON PLAN.`;
            structureGoalRequirement = `
           - KEEP 100% OF THE ORIGINAL OBJECTIVES.
           - ONLY INJECT DIGITAL COMPETENCE UNDER COMPETENCES:
              <nls>
              - c. Digital Competence:
${info.manualNLS?.map(item => `                - [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n")}
              </nls>`;
          } else {
            modeDirective = `🚨 MODE: INTEGRATE AI COMPETENCE ONLY FOR ENGLISH LESSON PLAN.`;
            structureGoalRequirement = `
           - KEEP 100% OF THE ORIGINAL OBJECTIVES.
           - ONLY INJECT AI COMPETENCE UNDER COMPETENCES:
              <ai>
              - c. Artificial Intelligence (AI) Competence:
${info.manualAI?.map(item => `                - [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n")}
              </ai>`;
          }
        } else {
          if (hasManualNLS && hasManualAI) {
            modeDirective = `🚨 CHẾ ĐỘ: TÍCH HỢP CẢ NLS VÀ AI THEO DANH SÁCH NGƯỜI DÙNG ĐÃ CHỌN.`;
            structureGoalRequirement = `
             - GIỮ NGUYÊN 100% CẤU TRÚC VÀ NỘI DUNG MỤC TIÊU CỦA GIÁO ÁN GỐC (Kiến thức, Năng lực chung, Năng lực đặc thù, Phẩm chất - chữ màu đen).
             - CHỈ CHÈN THÊM MỤC NĂNG LỰC SỐ VÀ AI VÀO PHẦN NĂNG LỰC:
               <nls>
               c. Năng lực số:
               - [Mã NLS chi tiết] (Tên miền): [Yêu cầu cần đạt NLS theo đúng mã đã chọn]
               </nls>
               <ai>
               d. Năng lực Trí tuệ Nhân tạo (AI):
               - [Mã AI chi tiết] (Tên miền): [Yêu cầu cần đạt AI theo đúng mã đã chọn]
               </ai>`;
          } else if (hasManualNLS) {
            modeDirective = `🚨 CHẾ ĐỘ: CHỈ TÍCH HỢP NĂNG LỰC SỐ (NLS) - TUYỆT ĐỐI KHÔNG TÍCH HỢP AI.`;
            structureGoalRequirement = `
             - GIỮ NGUYÊN 100% CẤU TRÚC VÀ NỘI DUNG MỤC TIÊU CỦA GIÁO ÁN GỐC (chữ màu đen).
             - CHỈ CHÈN THÊM MỤC NĂNG LỰC SỐ VÀO PHẦN NĂNG LỰC:
               <nls>
               c. Năng lực số:
               - [Mã NLS chi tiết] (Tên miền): [Yêu cầu cần đạt NLS theo đúng mã đã chọn]
               </nls>
               (⛔ CẤM TUYỆT ĐỐI KHÔNG ĐƯỢC THÊM MỤC NĂNG LỰC AI)`;
          } else {
            modeDirective = `🚨 CHẾ ĐỘ: CHỈ TÍCH HỢP TRÍ TUỆ NHÂN TẠO (AI) - TUYỆT ĐỐI KHÔNG TÍCH HỢP NLS.`;
            structureGoalRequirement = `
             - GIỮ NGUYÊN 100% CẤU TRÚC VÀ NỘI DUNG MỤC TIÊU CỦA GIÁO ÁN GỐC (chữ màu đen).
             - CHỈ CHÈN THÊM MỤC NĂNG LỰC AI VÀO PHẦN NĂNG LỰC:
               <ai>
               c. Năng lực Trí tuệ Nhân tạo (AI):
               - [Mã AI chi tiết] (Tên miền): [Yêu cầu cần đạt AI theo đúng mã đã chọn]
               </ai>
               (⛔ CẤM TUYỆT ĐỐI KHÔNG ĐƯỢC THÊM MỤC NĂNG LỰC SỐ)`;
          }
        }
      } else {
        integrationStrategyDirective = `
        =============================================================================
        🚨 TRƯỜNG HỢP 3: KHÔNG CÓ PPCT VÀ NGƯỜI DÙNG KHÔNG CHỌN MÃ TÍCH HỢP NÀO:
        - Giữ nguyên 100% nguyên văn toàn bộ cấu trúc và nội dung giáo án gốc.
        - ⛔ TUYỆT ĐỐI KHÔNG tự ý thêm các mục NLS hay AI mới vào giáo án.
        =============================================================================
        `;
        modeDirective = `🚨 CHẾ ĐỘ: GIỮ NGUYÊN GIÁO ÁN GỐC (KHÔNG TÍCH HỢP NLS VÀ KHÔNG TÍCH HỢP AI).`;
        structureGoalRequirement = `
           - Giữ nguyên 100% toàn bộ mục tiêu gốc của giáo án.`;
      }

      const userPrompt = `
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
        1. 🚨 NGUYÊN TẮC TỐI THƯỢNG - BẢO TOÀN 100% NGUYÊN VẸN NỘI DUNG VÀ CẤU TRÚC GIÁO ÁN GỐC (CHẾ ĐỘ CHÈN NỘI DUNG - INJECTION ONLY):
           - ⛔ CẤM TUYỆT ĐỐI VIẾT CÁC DÒNG RÚT GỌN NHƯ: "(Các tiết học tiếp theo 45-53 giữ nguyên cấu trúc...)", "(Tương tự như trên...)", "(Các tiết còn lại giữ nguyên...)".
           - BẢO TOÀN 100% TOÀN BỘ CẤU TRÚC, ĐỀ MỤC, TIỂU MỤC (ví dụ: 1.1, 1.2, 2.1, 2.2, 2.3...), CÂU CHỮ, ĐOẠN VĂN, BÀI THƠ TRÍCH DẪN, CÂU HỎI, ĐÁP ÁN, SẢN PHẨM HỌC TẬP VÀ BẢNG BIỂU TỪ GIÁO ÁN GỐC NGƯỜI DÙNG TẢI LÊN.
           - BẠN LÀ CÔNG CỤ CHÈN THÊM (INJECTION): Giữ nguyên 100% lời văn gốc (màu đen), chỉ chèn thêm các nhiệm vụ/sản phẩm NLS/AI tích hợp màu đỏ vào vị trí thích hợp.
           - NGUYÊN TẮC VÀNG: CHỈ THÊM PHẦN TÍCH HỢP VÀO - TUYỆT ĐỐI KHÔNG ĐƯỢC XÓA, THAY ĐỔI, VIẾT LẠI HAY RÚT GỌN NỘI DUNG GỐC DÙ CHỈ 1 CÂU.
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
        
        7. 🎯 NGUYÊN TẮC CHÈN NHIỆM VỤ TÍCH HỢP VÀO TIẾN TRÌNH DẠY HỌC:
           - GIỮ NGUYÊN 100% toàn bộ các hoạt động, tiểu mục (2.1, 2.2...), các bước và lời văn gốc của giáo viên và học sinh (MÀU ĐEN).
           - TẠI CÁC BƯỚC THỰC HIỆN CỦA GV VÀ HS (hoặc trong bảng 2 cột): Chèn thêm các dòng nhiệm vụ/hướng dẫn số & AI (bọc trong thẻ <nls>...</nls> hoặc <ai>...</ai>):
             + BƯỚC 1 (Chuyển giao nhiệm vụ): GV giao nhiệm vụ bài học gốc (MÀU ĐEN) + giao nhiệm vụ số/AI (công cụ, prompt mẫu, yêu cầu kiểm chứng - MÀU ĐỎ trong thẻ <nls>/<ai>).
             + BƯỚC 2 (Thực hiện nhiệm vụ): HS làm bài tập gốc (MÀU ĐEN) + thao tác công cụ số/AI, đối chiếu kết quả với SGK (MÀU ĐỎ trong thẻ <nls>/<ai>).
             + BƯỚC 3 (Báo cáo, thảo luận): HS trình bày bài làm gốc (MÀU ĐEN) + chia sẻ kết quả số/AI và phản biện (MÀU ĐỎ trong thẻ <nls>/<ai>).
             + BƯỚC 4 (Đánh giá, kết luận): GV nhận xét kiến thức gốc (MÀU ĐEN) + nhận xét kỹ năng số/AI và liêm chính học thuật (MÀU ĐỎ trong thẻ <nls>/<ai>).
             + MỤC SẢN PHẨM: Giữ nguyên 100% tất cả nội dung sản phẩm gốc của bài học, chỉ chèn thêm dòng sản phẩm số/AI tương ứng (MÀU ĐỎ trong thẻ <nls>/<ai>).

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
        - Cấu trúc mục TIÊU BÀI HỌC:
${structureGoalRequirement}
        - Trong phần TIẾN TRÌNH DẠY HỌC: Giữ nguyên toàn bộ nội dung từng hoạt động gốc, chỉ chèn thêm các hoạt động tích hợp đồng bộ cả hoạt động của GV và HS được bao bọc bằng thẻ <nls>...</nls> hoặc <ai>...</ai>.
        - KHÔNG ĐƯỢC CÓ LỜI DẪN NGOÀI LỀ.
        - Bắt đầu ngay bằng nội dung giáo án.
        
        NỘI DUNG GIÁO ÁN GỐC (CÓ THỂ LÀ HTML):
        ${info.content}
      `;

      const sanitizeAndNormalizeLessonOutput = (rawText: string, lessonInfo: LessonInfo): string => {
        let text = rawText;

        // Post-processing to fix LaTeX equations or subscripts formatting
        text = text.replace(/\$\$?([^$]+)\$\$?/g, (match, content) => {
          if (content.includes("MATH_ID")) return match;

          let fixed = content;
          fixed = fixed.replace(/_\{([^}]+)\}/g, "<sub>$1</sub>");
          fixed = fixed.replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>");
          fixed = fixed.replace(/_([a-zA-Z0-9])/g, "<sub>$1</sub>");
          fixed = fixed.replace(/\^([a-zA-Z0-9])/g, "<sup>$1</sup>");
          fixed = fixed.replace(/([A-Za-z])\{([0-9]+)\}/g, "$1<sub>$2</sub>");
          return fixed;
        });

        text = text.replace(/_\{([^}]+)\}/g, "<sub>$1</sub>");
        text = text.replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>");
        text = text.replace(/([A-Za-z])\{([0-9]+)\}/g, "$1<sub>$2</sub>");

        // Convert html styling tags to markdown so they never leak as raw html tags
        text = text
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
        text = text.replace(/[\uF000-\uF8FF]/g, "");
        text = text.replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD\u25A0\u25A1\u25AA\u25AB\u25FE\u25FD]/g, "- ");

        // Clean stray slashes, hashes, and escaped markdown artifacts
        text = text
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
        text = text
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
        text = text.replace(/\s*\(\s*(?:Bậc|Mức|Cấp độ|Level|Cơ bản|Trung cấp|Nâng cao|Chuyên sâu)[^\)]*\)/gi, "");
        text = text.replace(/\s*\[\s*(?:Bậc|Mức|Cấp độ|Level|Cơ bản|Trung cấp|Nâng cao|Chuyên sâu)[^\]]*\]/gi, "");

        // Normalize prefix "NLS " or "AI " when placed directly before codes
        text = text.replace(/\bNLS\s+(\d+\.\d+\.TC\w+)/gi, "$1");
        text = text.replace(/\bNLS\s+(\d+\.\d+\.CB\w+)/gi, "$1");
        text = text.replace(/\bNLS\s+(\d+\.\d+\.NC\w+)/gi, "$1");
        text = text.replace(/\bAI\s+(NL[a-d]\.TC\w+)/gi, "$1");
        text = text.replace(/\bAI\s+(NL[a-d]\.CB\w+)/gi, "$1");
        text = text.replace(/\bAI\s+(NL[a-d]\.NC\w+)/gi, "$1");
        text = text.replace(/\bAI\s+(\d+\.[A-D]\d+\.\d+)/gi, "$1");

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
              text = text.replace(reg1, item.code);
              const reg2 = new RegExp(`\\[\\s*NLS\\s*${prefix}[^\\]]*\\]`, 'gi');
              text = text.replace(reg2, `[${item.code}]`);
            }
          });

          const primaryNLS = chosenNLS[0];
          text = text.replace(/\bNLS\s*1\.[1-3]\b/gi, primaryNLS.code);
          text = text.replace(/\[\s*NLS\s*1\.[1-3][^\]]*\]/gi, `[${primaryNLS.code}]`);
        } else {
          text = text.replace(/\bNLS\s*1\.1\b/gi, "1.1.TC1a");
          text = text.replace(/\bNLS\s*1\.2\b/gi, "1.2.TC1a");
          text = text.replace(/\bNLS\s*1\.3\b/gi, "1.3.TC1a");
        }

        // Replace any AI domain codes (like "NLa", "NLb", "AI.1", "AI 1") with actual selected codes
        if (chosenAI.length > 0) {
          chosenAI.forEach(item => {
            const codeBase = item.code.split('.')[0];
            if (codeBase.startsWith("NL")) {
              const reg = new RegExp(`\\bAI\\s*(${codeBase})\\b`, 'gi');
              text = text.replace(reg, item.code);
            }
          });

          const primaryAI = chosenAI[0];
          text = text.replace(/\bAI\.[1-4]\b/gi, primaryAI.code);
          text = text.replace(/\[\s*AI\.[1-4][^\]]*\]/gi, `[${primaryAI.code}]`);
          text = text.replace(/\bAI\s+([A-D]|NL[a-d])\b/gi, primaryAI.code);
        } else {
          text = text.replace(/\bAI\.4\b/gi, "NLb.TC1");
          text = text.replace(/\bAI\.2\b/gi, "NLc.TC1");
          text = text.replace(/\bAI\.1\b/gi, "NLa.TC1");
          text = text.replace(/\bAI\.3\b/gi, "NLd.TC1");
        }

        // Final cleanup of standalone "NLS" or "AI" prefixes before bullet dashes
        text = text.replace(/-\s*NLS\s+(\d+\.\d+)/gi, "- $1");
        text = text.replace(/-\s*AI\s+(NL[a-d]|\d+\.[A-D])/gi, "- $1");

        // 2. PREVENT RED COLOR LEAK:
        // Ensure that section headings and original steps are NEVER wrapped in <nls> or <ai>
        text = text.replace(/<nls>(\s*(?:[3-9]\.\s*Phẩm chất|[3-9]\.\s*Về phẩm chất|[3-9]\.\s*Qualities|[3-9]\.\s*Attitudes|II\.\s*TIẾN TRÌNH|II\.\s*LESSON PROCEDURE|II\.\s*PROCEDURES|III\.\s*TIẾN TRÌNH|\d+\.\s*Hoạt động|\d+\.\s*Activity|\bBước\s*[1-4]\b|\bStep\s*[1-4]\b|[a-d]\)\s*Mục tiêu|[a-d]\)\s*Objectives|[a-d]\)\s*Nội dung|[a-d]\)\s*Content|[a-d]\)\s*Sản phẩm|[a-d]\)\s*Products|[a-d]\)\s*Tổ chức|[a-d]\)\s*Implementation))/gi, "</nls>\n$1");
        text = text.replace(/<ai>(\s*(?:[3-9]\.\s*Phẩm chất|[3-9]\.\s*Về phẩm chất|[3-9]\.\s*Qualities|[3-9]\.\s*Attitudes|II\.\s*TIẾN TRÌNH|II\.\s*LESSON PROCEDURE|II\.\s*PROCEDURES|III\.\s*TIẾN TRÌNH|\d+\.\s*Hoạt động|\d+\.\s*Activity|\bBước\s*[1-4]\b|\bStep\s*[1-4]\b|[a-d]\)\s*Mục tiêu|[a-d]\)\s*Objectives|[a-d]\)\s*Nội dung|[a-d]\)\s*Content|[a-d]\)\s*Sản phẩm|[a-d]\)\s*Products|[a-d]\)\s*Tổ chức|[a-d]\)\s*Implementation))/gi, "</ai>\n$1");

        // Remove redundant empty <nls></nls> or <ai></ai>
        text = text.replace(/<nls>\s*<\/nls>/gi, "");
        text = text.replace(/<ai>\s*<\/ai>/gi, "");

        return text;
      };

      const callModel = async (modelId: string) => {
        const response = await ai.models.generateContent({
          model: modelId,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.1,
            maxOutputTokens: 65536,
          },
          contents: userPrompt,
        });

        const rawText = response.text || "";
        return sanitizeAndNormalizeLessonOutput(rawText, info);
      };

      // Hàm làm sạch và trích xuất thông điệp lỗi dạng văn bản rõ ràng, loại bỏ chuỗi JSON thô
      const extractCleanErrorMessage = (err: any): string => {
        if (!err) return "Lỗi không xác định";
        let msg = err?.message || String(err);
        
        for (let i = 0; i < 3; i++) {
          if (typeof msg === "string" && (msg.trim().startsWith("{") || msg.trim().startsWith("["))) {
            try {
              const parsed = JSON.parse(msg.trim());
              if (parsed?.error?.message) {
                msg = parsed.error.message;
              } else if (parsed?.message) {
                msg = parsed.message;
              } else {
                break;
              }
            } catch (_) {
              break;
            }
          }
        }

        if (typeof msg === "object" && msg !== null) {
          if ((msg as any).error?.message) msg = (msg as any).error.message;
          else if ((msg as any).message) msg = (msg as any).message;
          else msg = JSON.stringify(msg);
        }

        return String(msg);
      };

      let lastErrorMessage = "";
      for (const modelName of modelsToTry) {
        try {
          console.log(`[Server] Đang kết nối với model: ${modelName}...`);
          const resultText = await callModel(modelName);
          if (resultText && resultText.trim().length > 0) {
            return res.json({ text: resultText });
          }
        } catch (err: any) {
          lastErrorMessage = extractCleanErrorMessage(err);
          console.warn(`[Server] Model ${modelName} bị lỗi: ${lastErrorMessage}. Chuyển sang model tiếp theo...`);
        }
      }

      console.error(`[Server] Tất cả các mô hình AI đều thất bại. Chi tiết lỗi cuối:`, lastErrorMessage);

      if (lastErrorMessage.includes("API_KEY_INVALID") || lastErrorMessage.includes("API key not valid") || lastErrorMessage.includes("403") || lastErrorMessage.includes("401") || lastErrorMessage.includes("invalid API key")) {
        return res.status(401).json({
          error: "Mã API Key chưa hợp lệ hoặc đang chờ Google kích hoạt. (Lưu ý: API Key vừa tạo trên Google AI Studio có thể cần 1-2 phút để kích hoạt hoàn toàn). Vui lòng thử lại sau giây lát.",
        });
      }
      if (lastErrorMessage.includes("429") || lastErrorMessage.includes("RESOURCE_EXHAUSTED") || lastErrorMessage.includes("Quota exceeded") || lastErrorMessage.includes("quota")) {
        return res.status(429).json({
          error: "Mã API Key này đã hết lượt gọi miễn phí trong phút này (Quota Exceeded). Vui lòng đợi 1-2 phút hoặc dán API Key Gemini khác.",
        });
      }

      return res.status(500).json({
        error: `Thông báo từ AI: ${lastErrorMessage}. Vui lòng thử lại hoặc bấm 'CẤU HÌNH API KEY' để kiểm tra lại chìa khóa.`,
      });
    } catch (err: any) {
      console.error("[Server API Error]:", err);
      return res.status(500).json({ error: err.message || "Lỗi xử lý yêu cầu soạn giáo án từ AI." });
    }
  });

  // Middleware xử lý lỗi tập trung cho toàn bộ API (đảm bảo luôn phản hồi dạng JSON)
  app.use("/api", (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("[API Error Handler]:", err);
    if (err.type === 'entity.too.large') {
      return res.status(413).json({ error: "Dung lượng giáo án quá lớn (vượt quá giới hạn 50MB). Vui lòng rút ngắn nội dung file." });
    }
    return res.status(err.status || 500).json({
      error: err.message || "Đã xảy ra lỗi kết nối với API máy chủ."
    });
  });

  // Vite development integration or production static files serving
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Đang khởi chạy Vite ở chế độ development...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Đang khởi chạy ở chế độ production...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Server fullstack đang chạy cực kì mượt mà tại http://0.0.0.0:${PORT}`);
  });
}

startServer();
