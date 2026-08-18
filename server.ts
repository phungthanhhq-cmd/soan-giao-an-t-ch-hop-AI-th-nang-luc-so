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

      // Danh sách các mô hình chuẩn @google/genai theo thứ tự ưu tiên (loại bỏ hoàn toàn model cũ đã bị deprecate)
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

      let integrationStrategyDirective = "";
      let modeDirective = "";
      let structureGoalRequirement = "";

      if (hasPPCT) {
        integrationStrategyDirective = `
        =============================================================================
        🚨 TRƯỜNG HỢP 1: NGƯỜI DÙNG CUNG CẤP PHÂN PHỐI CHƯƠNG TRÌNH (PPCT / PHỤ LỤC 3) - NGUỒN CHUẨN MỰC PHÁP QUY TỐI THƯỢNG:
        Trong Phân phối chương trình / Phụ lục 3 ĐÃ CÓ SẴN bảng phân phối cho từng bài học/tiết học cụ thể (gồm các cột: TT, Bài học, Số tiết, Thời điểm, Thiết bị, Địa điểm, Ghi chú / Năng lực số / AI).
        
        🎯 QUY TRÌNH ĐỐI CHIẾU VÀ TRÍCH XUẤT 100% CHÍNH XÁC:
        1. ĐỌC GIÁO ÁN GỐC: Nhận diện Tên bài học và Số tiết dạy (Ví dụ: "Tiết 9, 10, 11 - VIẾT BÀI VĂN KỂ LẠI MỘT CHUYẾN ĐI..." hoặc "Tiết 1, 2, 3 - Lá cờ thêu sáu chữ vàng"...).
        2. QUÉT BẢNG PPCT: Tìm đúng hàng (row / <tr>) trong Bảng Phân phối chương trình bên dưới có Cột "Bài học" hoặc Cột "Số tiết" tương ứng với bài/tiết của giáo án gốc.
        3. ĐỌC KỸ CỘT "GHI CHÚ" / CỘT "NĂNG LỰC SỐ / AI" CỦA ĐÚNG HÀNG ĐÓ:
           - 📌 NẾU HÀNG ĐÓ TRONG PPCT CÓ GHI MÃ NLS (Ví dụ: "NLS (Tiết 3) – 1.3.TC2a: Tìm kiếm và sắp xếp hình ảnh..." hoặc "1.3.TC2a: ..."):
             + BẮT BUỘC TRÍCH XUẤT NGUYÊN VĂN 100% mã số và nội dung YCCĐ được ghi trong ô đó của PPCT vào mục "c. Năng lực số" (bọc trong <nls>...</nls>).
             + ĐỒNG BỘ 100% mã số này vào đúng tiết/hoạt động trong Tiến trình dạy học (ghi rõ [1.3.TC2a] và bọc hoạt động số trong <nls>...</nls>).
             + ⛔ CẤM TUYỆT ĐỐI không được tự ý đổi thành mã khác (như 1.1.TC2b, 2.1.TC2a...), CẤM lấy mã từ bài học khác trong PPCT.
           - 📌 NẾU HÀNG ĐÓ TRONG PPCT CÓ GHI MÃ AI (Ví dụ: "NLb.TC2: ...", "6.2.TC2a: ..."):
             + BẮT BUỘC TRÍCH XUẤT NGUYÊN VĂN 100% mã số và nội dung YCCĐ AI từ ô đó của PPCT vào mục "d. Năng lực Trí tuệ Nhân tạo (AI)" (bọc trong <ai>...</ai>).
             + ĐỒNG BỘ 100% mã số này vào Tiến trình dạy học (ghi rõ [NLb.TC2] và bọc hoạt động AI trong <ai>...</ai>).
           - 📌 NẾU HÀNG ĐÓ TRONG PPCT KHÔNG GHI MÃ NLS HAY AI NÀO (Ô cột Ghi chú / NLS để trống hoặc chỉ ghi nội dung khác như "Tích hợp GD QP-AN", "Tích hợp GD địa phương"):
             + ⛔ TUYỆT ĐỐI CẤM TÍCH HỢP NLS HAY AI CHO BÀI NÀY!
             + ⛔ CẤM TUYỆT ĐỐI việc tự ý bịa mã (như 1.1.TC2b, 2.1.TC2a...) để nhét vào giáo án khi dòng PPCT của bài đó không có!
        
        ⛔ NGUYÊN TẮC BẤT DI BẤT DỊCH:
        - "PHÂN PHỐI CHƯƠNG TRÌNH GHI MÃ NÀO THÌ GIÁO ÁN GHI ĐÚNG MÃ ĐÓ - PPCT KHÔNG CÓ MÃ THÌ GIÁO ÁN KHÔNG ĐƯỢC TỰ BỊA MÃ".
        - TUYỆT ĐỐI KHÔNG ĐỂ XẢY RA TÌNH TRẠNG "PHÂN PHỐI CHƯƠNG TRÌNH MỘT MÃ, GIÁO ÁN MỘT MÃ"!
        
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

        if (hasManualNLS && hasManualAI) {
          modeDirective = `🚨 CHẾ ĐỘ: TÍCH HỢP CẢ NLS VÀ AI THEO DANH SÁCH NGƯỜI DÙNG ĐÃ CHỌN.`;
          structureGoalRequirement = `
           1. Về kiến thức
           2. Về năng lực:
              a. Năng lực chung
              b. Năng lực đặc thù môn học
              c. Năng lực số (bắt buộc bao bọc bằng <nls>...</nls> để bôi đỏ):
                 <nls>c. Năng lực số
                 - [Mã NLS chi tiết] (Tên miền): [Yêu cầu cần đạt NLS theo đúng mã đã chọn]
                 </nls>
              d. Năng lực Trí tuệ Nhân tạo (AI) (bắt buộc bao bọc bằng <ai>...</ai> để bôi đỏ):
                 <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
                 - [Mã AI chi tiết] (Tên miền): [Yêu cầu cần đạt AI theo đúng mã đã chọn]
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
                 - [Mã NLS chi tiết] (Tên miền): [Yêu cầu cần đạt NLS theo đúng mã đã chọn]
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
                 - [Mã AI chi tiết] (Tên miền): [Yêu cầu cần đạt AI theo đúng mã đã chọn]
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

        YÊU CẦU XỬ LÝ NỘI DUNG:
        ${options.analyzeOnly ? "- Chỉ phân tích, không chỉnh sửa chi tiết." : "- Chỉnh sửa giáo án và TÍCH HỢP NĂNG LỰC theo đúng chế độ đã chọn ở trên vào các hoạt động dạy học."}
        ${options.detailedReport ? "- Kèm theo bảng giải thích chi tiết mã năng lực đã chọn ở cuối bài." : ""}
        
        YÊU CẦU VỀ ĐỊNH DẠNG & NGUYÊN TẮC BẢO TOÀN (BẮT BUỘC):
        1. 🚨 NGUYÊN TẮC TỐI THƯỢNG - BẢO TOÀN 100% NGUYÊN VẸN NỘI DUNG GIÁO ÁN GỐC:
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

        return text;
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
