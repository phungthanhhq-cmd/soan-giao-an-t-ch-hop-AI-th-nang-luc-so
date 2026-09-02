import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, NLS_FRAMEWORK_DATA } from "../constants";
import { LessonInfo, ProcessingOptions } from "../types";

export const maxDuration = 60;

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { info, options } = (req.body || {}) as { info: LessonInfo; options: ProcessingOptions };
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

    const cleanKey = (key: string | undefined | null): string => {
      if (!key) return '';
      return key
        .replace(/[\u200B-\u200D\uFEFF\u00A0\u202F\r\n\t]/g, '')
        .trim()
        .replace(/^["'`]|["'`]$/g, '')
        .replace(/^(?:api[-_\s]?key|key|bearer)[:\s=]+/i, '')
        .trim();
    };

    const apiKey = cleanKey(rawKey);

    if (!apiKey) {
      return res.status(400).json({
        error: "Chưa cấu hình Gemini API Key. Vui lòng bấm nút 'CẤU HÌNH API KEY' ở thanh trên cùng để dán API Key của bạn.",
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

    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-2.0-flash-lite",
      "gemini-3.6-flash",
      "gemini-2.5-pro",
      "gemini-1.5-pro",
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
    Giáo án môn TIẾNG ANH (ENGLISH SUBJECT) - BẮT BUỘC TOÀN BỘ NỘI DUNG TÍCH HỢP ĐỀU BẰNG TIẾNG ANH (100% IN ENGLISH):

    1. MỤC TIÊU BÀI HỌC (I. OBJECTIVES):
       - BẮT BUỘC chèn thêm mục Năng lực số (Digital Competence) và Năng lực AI (AI Competence) vào ngay dưới mục "2. Competence" (sau "a. General competences" và "b. Specific competences"):
         ${hasManualNLS ? `* THẺ NLS (BẮT BUỘC BỌC TRONG <nls>...</nls>):
         <nls>
         - c. Digital Competence:
           ${info.manualNLS?.map(item => `- [${item.code}] (${item.name}): [Translate learning outcome to English]`).join("\n           ") || "- [1.1.TC1a] (Browsing, searching and filtering data, information and digital content): Students can use digital search engines and online dictionaries to find vocabulary and grammar explanations."}
         </nls>` : ""}
         ${hasManualAI ? `* THẺ AI (BẮT BUỘC BỌC TRONG <ai>...</ai>):
         <ai>
         - ${hasManualNLS ? "d." : "c."} Artificial Intelligence (AI) Competence:
           ${info.manualAI?.map(item => `- [${item.code}] (${item.name}): [Translate AI learning outcome to English]`).join("\n           ") || "- [NLb.TC1] (AI Ethics & Critical Thinking): Students can interact responsibly with AI tools (ChatGPT/Copilot) and cross-check AI-generated sentences with the textbook."}
         </ai>` : ""}

    2. THIẾT BỊ DẠY HỌC (II. TEACHING AIDS / MATERIALS):
       - Bổ sung công cụ số và AI vào danh sách thiết bị dạy học bằng Tiếng Anh:
         ${hasManualNLS ? `<nls>- Digital tools: [Online dictionaries (Cambridge/Oxford), search engines, Quizlet, Kahoot, Padlet, Canva, projector/interactive board...]</nls>` : ""}
         ${hasManualAI ? `<ai>- AI tools: [Generative AI assistants (ChatGPT, Copilot, Gemini), AI pronunciation apps (ELSA/Google Pronounce)...]</ai>` : ""}

    3. 🎯 TIẾN TRÌNH DẠY HỌC (III. TEACHING PROCEDURES / LESSON PROCEDURES):
       - 🚨 NGUYÊN TẮC BẢO TOÀN CẤU TRÚC GỐC 100% - NGHIÊM CẤM PHÁT SINH KÝ TỰ & TIÊU ĐỀ LẠ:
         ⛔ TUYỆT ĐỐI CẤM TỰ Ý THÊM CÁC TỪ/TIỀN TỐ/TIÊU ĐỀ NHƯ: "Step 1:", "Step 2:", "Step 3:", "Step 4:", "Step...", "Step 1: Delivering the task:", "Teacher assigns the digital task:", "Students execute the digital task:" NẾU GIÁO ÁN GỐC KHÔNG CÓ!
         - Giữ đúng 100% cấu trúc, tiêu đề và phân chia bảng cột của giáo án người dùng (dù là Bảng 2 cột Teacher's activities / Students' activities, hay dạng mục a-b-c-d, hay dạng gạch đầu dòng).
         - TẤT CẢ CÁC CÂU LỆNH TÍCH HỢP CHÈN THÊM PHẢI BẰNG TIẾNG ANH 100% VÀ ĐƯỢC BỌC TRONG THẺ <nls>...</nls> hoặc <ai>...</ai> (ĐỂ ĐƯỢC BÔI ĐỎ):
         
         * Tại phần Hoạt động của Giáo viên (Teacher's activities / Teacher's instructions):
           - Giữ nguyên 100% lời nói/hướng dẫn gốc của GV (MÀU ĐEN).
           ${hasManualNLS ? `- Chèn trực tiếp câu hành động số (không thêm chữ "Step..."): <nls>- Teacher instructs students to use digital tools (e.g. Cambridge Dictionary, Google Search, Canva, Quizlet, Padlet) with specific search queries to look up vocabulary and pronunciation [1.1.TC1a].</nls>` : ""}
           ${hasManualAI ? `- Chèn trực tiếp câu hành động AI (không thêm chữ "Step..."): <ai>- Teacher guides students to interact with an AI assistant using the prompt: '[Prompt template in English]' and reminds them to critically evaluate the generated output [NLb.TC1].</ai>` : ""}

         * Tại phần Hoạt động của Học sinh (Students' activities / Tasks):
           - Giữ nguyên 100% hoạt động bài học gốc của HS (MÀU ĐEN).
           ${hasManualNLS ? `- Chèn trực tiếp câu hành động số (không thêm chữ "Step..."): <nls>- Students open digital tools to search for words, practice pronunciation, or collaborate via online boards (Padlet/Canva).</nls>` : ""}
           ${hasManualAI ? `- Chèn trực tiếp câu hành động AI (không thêm chữ "Step..."): <ai>- Students enter the prompt into the AI tool, critically analyze and cross-check AI responses with textbook grammar rules, and refine their answers.</ai>` : ""}

         * Tại phần Nhận xét, đánh giá và kết luận (Teacher's feedback / Assessment / Conclusion):
           - Giữ nguyên 100% nhận xét bài học gốc (MÀU ĐEN).
           ${hasManualNLS ? `- Chèn trực tiếp câu đánh giá số (không thêm chữ "Step..."): <nls>- Teacher assesses students' digital information search effectiveness and collaborative skills on digital platforms.</nls>` : ""}
           ${hasManualAI ? `- Chèn trực tiếp câu đánh giá AI (không thêm chữ "Step..."): <ai>- Teacher evaluates students' critical thinking when using AI, prompt precision, and reinforces academic honesty.</ai>` : ""}

         * Trong mục Sản phẩm (Outcome / Expected products / Products):
           - Giữ nguyên 100% sản phẩm ngôn ngữ gốc (MÀU ĐEN).
           ${hasManualNLS ? `- <nls>- Digital product: Online vocabulary notes, Padlet wall submissions, or Canva slides created by students.</nls>` : ""}
           ${hasManualAI ? `- <ai>- AI product: AI-assisted practice drafts critically reviewed, verified and finalized by students.</ai>` : ""}

    4. MÃ NĂNG LỰC: Bắt buộc dùng đúng mã số chuẩn quốc gia ([1.1.TC1a], [1.3.TC2a], [NLb.TC1], [6.A1.2]...).
    =============================================================================
    ` : "";

    let integrationStrategyDirective = "";
    let modeDirective = "";
    let structureGoalRequirement = "";

    if (hasPPCT) {
      integrationStrategyDirective = `
      =============================================================================
      🚨 TRƯỜNG HỢP 1: NGƯỜI DÙNG CUNG CẤP PHÂN PHỐI CHƯƠNG TRÌNH (PPCT / PHỤ LỤC 3) - NGUỒN CHUẨN MỰC PHÁP QUY TỐI THƯỢNG:
      Trong Phân phối chương trình / Phụ lục 3 ĐÃ CÓ SẴN bảng phân phối cho từng bài học/tiết học cụ thể (gồm các cột: TT, Bài học, Số tiết, Thời điểm, Thiết bị, Địa điểm, Ghi chú / Năng lực số / AI).
      
      🎯 5 NGUYÊN TẮC BẮT BUỘC KHI CÓ PHỤ LỤC:
      1. 📌 TUÂN THỦ ĐỒNG BỘ THEO PHỤ LỤC: Đối chiếu chính xác từng tiết của giáo án với từng hàng trong bảng Phụ lục 3 (PPCT).
      2. 📌 CHỈ TÍCH HỢP ĐÚNG TIẾT VÀ MÃ CÓ TRONG PHỤ LỤC: 
         - Tiết nào trong Phụ lục CÓ ghi mã NLS/AI (ví dụ: Tiết 44 có mã 1.3.TC2a, Tiết 47 có mã NLb.TC2) -> CHỈ tích hợp đúng mã đó vào đúng tiết đó.
         - Tiết nào trong Phụ lục KHÔNG ghi mã NLS/AI (ô để trống) -> TUYỆT ĐỐI KHÔNG tích hợp NLS/AI vào tiết đó!
      3. ⛔ NGHIÊM CẤM TỰ Ý PHÁT SINH MÃ NĂNG LỰC: Tuyệt đối không tự bịa mã, không đổi mã, không thêm mã cho những tiết mà Phụ lục không yêu cầu.
      4. ⛔ KHÔNG ĐƯỢC BỚT NỘI DUNG TRONG GIÁO ÁN: Giữ nguyên 100% toàn bộ nội dung giáo án gốc, không cắt xén, không dùng dấu '...', không tóm tắt các tiết tiếp theo.
      5. 🔴 CHỈ BÔI ĐỎ NỘI DUNG ĐÃ BỔ SUNG DO TÍCH HỢP: Nội dung gốc giữ màu đen mặc định (không bọc trong thẻ <nls>/<ai>); CHỈ bọc các nhiệm vụ, câu lệnh, prompt bổ sung do tích hợp trong thẻ <nls>...</nls> hoặc <ai>...</ai>.
      
      NỘI DUNG PHÂN PHỐI CHƯƠNG TRÌNH / PHỤ LỤC 3:
      ${info.distributionContent}
      =============================================================================
      `;

      modeDirective = `
      🚨 CHẾ ĐỘ: TỰ ĐỘNG TÍCH HỢP THEO ĐÚNG PHÂN PHỐI CHƯƠNG TRÌNH / PHỤ LỤC 3.
      - Căn cứ 100% vào bảng PPCT/Phụ lục 3 ở trên của đúng bài học/tiết dạy này.
      - Nếu hàng bài này trong PPCT có mã NLS nào -> Trích xuất nguyên văn đúng mã đó.
      - Nếu hàng bài này trong PPCT không có mã NLS -> Tuyệt đối không tích hợp NLS, không tự bịa mã.
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
               ${nlsFormattedLines}
               </nls>
               <ai>
               d. Năng lực Trí tuệ Nhân tạo (AI):
               ${aiFormattedLines}
               </ai>`;
        } else if (hasManualNLS) {
          modeDirective = `🚨 CHẾ ĐỘ: CHỈ TÍCH HỢP NĂNG LỰC SỐ (NLS) - TUYỆT ĐỐI KHÔNG TÍCH HỢP AI.`;
          structureGoalRequirement = `
             - GIỮ NGUYÊN 100% CẤU TRÚC VÀ NỘI DUNG MỤC TIÊU CỦA GIÁO ÁN GỐC (chữ màu đen).
             - CHỈ CHÈN THÊM MỤC NĂNG LỰC SỐ VÀO PHẦN NĂNG LỰC:
               <nls>
               c. Năng lực số:
               ${nlsFormattedLines}
               </nls>
               (⛔ CẤM TUYỆT ĐỐI KHÔNG ĐƯỢC THÊM MỤC NĂNG LỰC AI)`;
        } else {
          modeDirective = `🚨 CHẾ ĐỘ: CHỈ TÍCH HỢP TRÍ TUỆ NHÂN TẠO (AI) - TUYỆT ĐỐI KHÔNG TÍCH HỢP NLS.`;
          structureGoalRequirement = `
             - GIỮ NGUYÊN 100% CẤU TRÚC VÀ NỘI DUNG MỤC TIÊU CỦA GIÁO ÁN GỐC (chữ màu đen).
             - CHỈ CHÈN THÊM MỤC NĂNG LỰC AI VÀO PHẦN NĂNG LỰC:
               <ai>
               c. Năng lực Trí tuệ Nhân tạo (AI):
               ${aiFormattedLines}
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
      1. 🚨 NGUYÊN TẮC TỐI THƯỢNG - BẢO TOÀN 100% NGUYÊN VẸN NỘI DUNG VÀ MẪU GIÁO ÁN GỐC CỦA NGƯỜI DÙNG (CHẾ ĐỘ CHÈN NỘI DUNG - INJECTION ONLY):
         - 📌 BẢO TOÀN 100% MẪU RIÊNG CỦA TỪNG GIÁO VIÊN: Mỗi người dùng có mẫu giáo án khác nhau (mẫu theo trường, tổ bộ môn, CV 5512, CV 2345, mẫu song ngữ, mẫu trải nghiệm...). Bạn BẮT BUỘC giữ đúng 100% cấu trúc, đề mục, thứ tự và bố cục như bản gốc họ tải lên. Tuyệt đối không áp đặt mẫu lạ lên giáo án của họ.
         - ⛔ CẤM TUYỆT ĐỐI VIẾT CÁC DÒNG RÚT GỌN NHƯ: "(Các tiết học tiếp theo 45-53 giữ nguyên cấu trúc...)", "(Tương tự như trên...)", "(Các tiết còn lại giữ nguyên...)".
         - BẢO TOÀN 100% TOÀN BỘ CẤU TRÚC, ĐỀ MỤC, TIỂU MỤC (ví dụ: 1.1, 1.2, 2.1, 2.2, 2.3...), CÂU CHỮ, ĐOẠN VĂN, BÀI THƠ TRÍCH DẪN, CÂU HỎI, ĐÁP ÁN, SẢN PHẨM HỌC TẬP VÀ BẢNG BIỂU TỪ GIÁO ÁN GỐC NGƯỜI DÙNG TẢI LÊN.
         - BẠN LÀ CÔNG CỤ CHÈN THÊM (INJECTION): Giữ nguyên 100% lời văn gốc (màu đen), chỉ chèn thêm các nhiệm vụ/sản phẩm NLS/AI tích hợp màu đỏ vào vị trí thích hợp.
         - NGUYÊN TẮC VÀNG: CHỈ THÊM PHẦN TÍCH HỢP VÀO - TUYỆT ĐỐI KHÔNG ĐƯỢC XÓA, THAY ĐỔI, VIẾT LẠI HAY RÚT GỌN NỘI DUNG GỐC DÙ CHỈ 1 CÂU.
      2. ĐỊNH DẠNG ĐẦU VÀO: Nội dung giáo án gốc bên dưới có thể là HTML (được chuyển từ DOCX). Các công thức toán học đã được thay thế bằng các mã giữ chỗ có dạng [MATH_ID_...].
      3. NHIỆM VỤ: Bạn phải chuyển đổi nội dung này sang MARKDOWN, đồng thời TÍCH HỢP nội dung theo đúng chế độ được chọn.
      4. 📊 BẢO TOÀN 100% CẤU TRÚC BẢNG BIỂU & DẠNG CHIA CỘT (TABLE PRESERVATION): 
         - Nếu giáo án gốc ở dạng BẢNG (Bảng 2 cột: Hoạt động của GV / Hoạt động của HS; Bảng 3 cột: Hoạt động - Nội dung - Phương pháp; Bảng 4 cột: Mục tiêu - Nội dung - Sản phẩm - Tổ chức thực hiện...) -> BẮT BUỘC giữ nguyên 100% dạng Bảng (chuyển sang Markdown Table chuẩn) với đúng số cột và tiêu đề cột gốc. TUYỆT ĐỐI KHÔNG phá vỡ bảng thành văn bản thường.
         - Khi chèn nội dung NLS/AI vào bảng: chèn trực tiếp vào ô tương ứng trong bảng (cột GV thì chèn nhiệm vụ GV màu đỏ, cột HS thì chèn nhiệm vụ HS màu đỏ).
         - Nếu giáo án gốc ở dạng VĂN BẢN TUẦN TỰ (không có bảng) -> Giữ nguyên dạng văn bản tuần tự, không tự ý vẽ thêm bảng nếu bản gốc không có.
         - Giữ nguyên toàn bộ các tiêu đề, danh sách, đoạn in đậm/nghiêng gốc.
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

      let text = response.text || "";

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

      // Clean stray slashes and escaped markdown artifacts
      text = text
        .replace(/\\([*#_>\-\+\[\]])/g, "$1") // unescape markdown backslashes
        .replace(/\\\//g, "/") // unescape \/
        .replace(/(^|\n)\s*\/+\s*(?=[A-Za-z0-9#\*\-\+I])/g, "$1") // remove leading slash before text/headings
        .replace(/([^\w\d\s\/])\s*\/+\s*([^\w\d\s\/])/g, "$1 $2"); // remove stray isolated slashes between symbols

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

      const chosenNLS = (info?.manualNLS && info.manualNLS.length > 0)
        ? info.manualNLS
        : (info?.syncedIntegrations?.filter(i => i.category === 'NLS') || []);

      const chosenAI = (info?.manualAI && info.manualAI.length > 0)
        ? info.manualAI
        : (info?.syncedIntegrations?.filter(i => i.category === 'AI') || []);

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
      text = text.replace(/<nls>(\s*(?:[3-9]\.\s*Phẩm chất|[3-9]\.\s*Về phẩm chất|[3-9]\.\s*Qualities|[3-9]\.\s*Attitudes|II\.\s*TIẾN TRÌNH|II\.\s*LESSON PROCEDURE|II\.\s*PROCEDURES|III\.\s*TIẾN TRÌNH|\d+\.\s*Hoạt động|\d+\.\s*Activity|\bBước\s*[1-4]\b|\bStep\s*[1-4]\b|[a-d]\)\s*Mục tiêu|[a-d]\)\s*Objectives|[a-d]\)\s*Nội dung|[a-d]\)\s*Content|[a-d]\)\s*Sản phẩm|[a-d]\)\s*Products|[a-d]\)\s*Tổ chức|[a-d]\)\s*Implementation))/gi, "</nls>\n$1");
      text = text.replace(/<ai>(\s*(?:[3-9]\.\s*Phẩm chất|[3-9]\.\s*Về phẩm chất|[3-9]\.\s*Qualities|[3-9]\.\s*Attitudes|II\.\s*TIẾN TRÌNH|II\.\s*LESSON PROCEDURE|II\.\s*PROCEDURES|III\.\s*TIẾN TRÌNH|\d+\.\s*Hoạt động|\d+\.\s*Activity|\bBước\s*[1-4]\b|\bStep\s*[1-4]\b|[a-d]\)\s*Mục tiêu|[a-d]\)\s*Objectives|[a-d]\)\s*Nội dung|[a-d]\)\s*Content|[a-d]\)\s*Sản phẩm|[a-d]\)\s*Products|[a-d]\)\s*Tổ chức|[a-d]\)\s*Implementation))/gi, "</ai>\n$1");

      // 3. CLEAN UP ROBOTIC STEP PREFIXES & PROMPT ARTIFACTS:
      text = text.replace(/<nls>\s*[-*•]?\s*Teacher assigns the digital task\s*:\s*/gi, "<nls>- Teacher instructs students to ");
      text = text.replace(/<nls>\s*[-*•]?\s*Students execute the digital task\s*:\s*/gi, "<nls>- Students ");
      text = text.replace(/<nls>\s*[-*•]?\s*Students report digital findings\s*:\s*/gi, "<nls>- Students report: ");
      text = text.replace(/<nls>\s*[-*•]?\s*Teacher assesses digital competence\s*:\s*/gi, "<nls>- Teacher evaluates: ");
      text = text.replace(/<ai>\s*[-*•]?\s*Teacher assigns the AI task\s*:\s*/gi, "<ai>- Teacher guides students to ");
      text = text.replace(/<ai>\s*[-*•]?\s*Students execute the AI task\s*:\s*/gi, "<ai>- Students ");
      text = text.replace(/<ai>\s*[-*•]?\s*Students report AI-assisted results\s*:\s*/gi, "<ai>- Students report: ");
      text = text.replace(/<ai>\s*[-*•]?\s*Teacher assesses AI competence\s*:\s*/gi, "<ai>- Teacher evaluates: ");

      text = text.replace(/<nls>\s*[-*•]?\s*Step\s*[1-4]\s*[:\.]?\s*(?:Delivering the task|Performing the task|Reporting & Discussion|Reporting and Discussion|Assessment & Conclusion|Assessment and Conclusion|Feedback)?\s*[:\.\-]?\s*/gi, "<nls>- ");
      text = text.replace(/<ai>\s*[-*•]?\s*Step\s*[1-4]\s*[:\.]?\s*(?:Delivering the task|Performing the task|Reporting & Discussion|Reporting and Discussion|Assessment & Conclusion|Assessment and Conclusion|Feedback)?\s*[:\.\-]?\s*/gi, "<ai>- ");

      text = text.replace(/<nls>\s*<\/nls>/gi, "");
      text = text.replace(/<ai>\s*<\/ai>/gi, "");

      return text;
    };

    let lastErrorMessage = "";
    for (const modelName of modelsToTry) {
      try {
        const resultText = await callModel(modelName);
        if (resultText && resultText.trim().length > 0) {
          return res.status(200).json({ text: resultText });
        }
      } catch (err: any) {
        lastErrorMessage = err?.message || String(err);
      }
    }

    return res.status(500).json({
      error: `Thông báo từ AI: ${lastErrorMessage}. Vui lòng kiểm tra lại API Key.`,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Lỗi xử lý yêu cầu soạn giáo án từ AI." });
  }
}
