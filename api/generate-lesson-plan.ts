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

    const apiKey = (req.headers["x-api-key"] as string) ||
                   process.env.GEMINI_API_KEY || 
                   process.env.API_KEY || 
                   process.env.KAY_API_GEMINI || 
                   process.env.KEY_API_GEMINI || 
                   process.env.GEMINI_KEY || 
                   process.env.GEMINI_API;

    if (!apiKey || !apiKey.trim()) {
      return res.status(400).json({
        error: "Chưa thiết lập Gemini API Key. Vui lòng nhấn nút 'CẤU HÌNH API KEY' ở thanh trên cùng để dán API Key của bạn.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const modelsToTry = [
      "gemini-3.6-flash",
      "gemini-2.5-flash",
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
    🚨 ĐẶC QUY TẮC BẮT BUỘC RIÊNG CHO MÔN TIẾNG ANH (ENGLISH SUBJECT DIRECTIVE):
    Vì đây là môn TIẾNG ANH (ENGLISH):
    1. MÃ NĂNG LỰC: Bắt buộc dùng đúng chuẩn mã gốc (Ví dụ: [1.1.TC1a], [1.3.TC2a], [NLb.TC1], [6.A1.2]...).
    2. MỤC TIÊU NĂNG LỰC TÍCH HỢP (TRONG MỤC 2. VỀ NĂNG LỰC): BẮT BUỘC VIẾT BẰNG TIẾNG ANH:
       - Thẻ NLS: <nls>c. Digital Competence:
         - [Mã chuẩn, ví dụ 1.1.TC1a] (Browsing, searching and filtering data, information and digital content): [Mô tả YCCĐ bằng Tiếng Anh]
       </nls>
       - Thẻ AI: <ai>d. Artificial Intelligence (AI) Competence:
         - [Mã chuẩn, ví dụ NLb.TC1 / 6.A1.2] (AI Ethics / AI Literacy): [Mô tả YCCĐ bằng Tiếng Anh]
       </ai>
    3. TIẾN TRÌNH DẠY HỌC (PROCEDURES / ACTIVITIES):
       - Mọi câu lệnh, nhiệm vụ số, nhiệm vụ AI, prompt mẫu, câu hỏi hướng dẫn bọc trong <nls>...</nls> và <ai>...</ai> BẮT BUỘC PHẢI VIẾT BẰNG TIẾNG ANH 100% (Ví dụ: "<nls>- Digital task [1.1.TC1a]: Students use digital search tools (Google, Cambridge Dictionary) to search for new vocabulary and sample sentences...</nls>", "<ai>- AI task [NLb.TC1]: Students use ChatGPT/Copilot with prompt: '...' and verify the output with the textbook.</ai>").
    4. CÁC MÔN HỌC KHÁC: Giữ nguyên tiếng Việt như bình thường.
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
