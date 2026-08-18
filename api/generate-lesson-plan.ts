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
      "gemini-3.7-flash",
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-3.1-flash-lite",
    ];

    const enableNLS = info.integrationModes ? info.integrationModes.enableNLS : true;
    const enableAI = info.integrationModes ? info.integrationModes.enableAI : false;

    let distributionContext = "";
    if (enableNLS && info.distributionContent && info.distributionContent.trim().length > 0) {
      distributionContext = `
      =========================================================
      🚨 QUY TẮC TỐI THƯỢNG (KHI CÓ PPCT - STRICT MODE & ĐỒNG NHẤT 100% MÃ SỐ):
      Người dùng ĐÃ CUNG CẤP nội dung Phân phối chương trình (PPCT).
      Đây là văn bản pháp quy của nhà trường/tổ chuyên môn, bạn phải tuân thủ TUYỆT ĐỐI các yêu cầu sau:

      1. Đọc tên bài học trong "NỘI DUNG GIÁO ÁN GỐC".
      2. Tìm bài học tương ứng trong nội dung PPCT.
      3. Trích xuất NGUYÊN VĂN, CHÍNH XÁC toàn bộ Mã số Năng lực số (ví dụ: NLS 1.1, NLS 2.2, NLS.TC1...) và nội dung cột "Năng lực số" (hoặc YCCĐ năng lực số) của bài học đó.
      4. Đưa nội dung trích xuất đó vào phần Mục I.2.c (Mục tiêu Năng lực số).
      5. ĐỒNG BỘ ĐỒNG NHẤT VỚI TIẾN TRÌNH DẠY HỌC: Trong Mục II (Tiến trình dạy học), các hoạt động tích hợp của GV và HS (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng) PHẢI PHỤC VỤ VÀ GẮN CHẶT VỚI CHÍNH CÁC MÃ SỐ TRONG PPCT ĐÃ TRÍCH XUẤT.
      
      ⛔ CÁC ĐIỀU CẤM (STRICTLY PROHIBITED):
      - CẤM TUYỆT ĐỐI việc tự ý thêm bất kỳ mã năng lực số nào khác không có trong PPCT của bài học này (Trừ khi có YÊU CẦU THỦ CÔNG bên dưới).
      - CẤM TUYỆT ĐỐI việc tự ý bớt hoặc bỏ sót bất kỳ mã nào có trong PPCT.
      - CẤM tự ý nâng cao hay thay đổi cấp độ nếu PPCT không yêu cầu.
      - CẤM dùng Khung năng lực số tham chiếu bên ngoài để bịa thêm mục tiêu hay mã số. CHỈ dùng những gì PPCT ghi.
      - Nếu cột năng lực số trong PPCT để trống, thì mục tiêu NLS ghi là: "Không có (theo PPCT)".

      Đánh dấu mục tiêu này bằng dòng chữ: "(Nội dung trích xuất nguyên văn từ PPCT)".

      NỘI DUNG PPCT:
      ${info.distributionContent}
      =========================================================
      `;
    }

    let manualContext = "";
    const allManualEntries: string[] = [];

    if (enableNLS && info.manualNLS && info.manualNLS.length > 0) {
      const nlsItems = info.manualNLS
        .map((item) => `- Năng lực số [${item.code} - ${item.name}]:\n  Nội dung yêu cầu cần đạt: ${item.description}`)
        .join("\n\n");
      allManualEntries.push(`### CÁC MÃ NĂNG LỰC SỐ (NLS) ĐÃ CHỌN (Theo TT 02/2025/TT-BGDĐT):\n${nlsItems}`);
    }

    if (enableAI && info.manualAI && info.manualAI.length > 0) {
      const aiItems = info.manualAI
        .map((item) => `- Năng lực Trí tuệ Nhân tạo (AI) [${item.code} - ${item.name}]:\n  Nội dung yêu cầu cần đạt: ${item.description}`)
        .join("\n\n");
      allManualEntries.push(`### CÁC MÃ NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) ĐÃ CHỌN (Theo QĐ 3439 & TT 02):\n${aiItems}`);
    }

    if (allManualEntries.length > 0) {
      manualContext = `
      =========================================================
      🎯 YÊU CẦU TÍCH HỢP TỪ GIÁO VIÊN (MANUAL INPUT - ƯU TIÊN CAO NHẤT):
      Người dùng đã chỉ định cụ thể các mã Năng lực cần tích hợp:
      
      ${allManualEntries.join("\n\n")}
      
      NHIỆM VỤ QUAN TRỌNG:
      1. Đọc kỹ từng mã năng lực và "Nội dung yêu cầu cần đạt" ở trên.
      2. Tự động PHÂN TÍCH và XÁC ĐỊNH xem nội dung yêu cầu này phù hợp nhất để đưa vào:
         - Phần I. MỤC TIÊU -> 2. Về năng lực (nêu rõ các mã đã chọn).
         - Phần II. TIẾN TRÌNH DẠY HỌC: Tích hợp khéo léo vào hoạt động dạy học phù hợp (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng).
      3. Trình bày chi tiết nhiệm vụ học tập, công cụ số / công cụ AI sử dụng, phương thức tương tác và câu lệnh (prompt) hoặc hướng dẫn liêm chính học thuật nếu có sử dụng AI.
      =========================================================
      `;
    }

    let modeDirective = "";
    let structureGoalRequirement = "";

    if (enableNLS && enableAI) {
      modeDirective = `
      🚨 CHẾ ĐỘ TÍCH HỢP: TÍCH HỢP ĐỒNG THỜI CẢ NĂNG LỰC SỐ (NLS) VÀ TRÍ TUỆ NHÂN TẠO (AI).
      - Tích hợp cả 2 mục vào Phần I.2 (Mục tiêu năng lực) và Phần II (Tiến trình dạy học).
      - ĐÁNH DẤU BÔI ĐỎ TOÀN BỘ NỘI DUNG TÍCH HỢP: Toàn bộ mục "c. Năng lực số" và các hoạt động NLS bổ sung trong tiến trình dạy học phải bọc trong thẻ <nls>...</nls>. Toàn bộ mục "d. Năng lực Trí tuệ Nhân tạo (AI)" và các hoạt động AI bổ sung trong tiến trình dạy học phải bọc trong thẻ <ai>...</ai>.
      `;
      structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
                c. Năng lực số (bắt buộc bao bọc bằng <nls>...</nls> để bôi đỏ):
                   <nls>c. Năng lực số
                   - NLS [Mã miền] (Bậc [X]): [Yêu cầu cần đạt NLS cụ thể theo bài học]
                   ...
                   </nls>
                d. Năng lực Trí tuệ Nhân tạo (AI) (bắt buộc bao bọc bằng <ai>...</ai> để bôi đỏ):
                   <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
                   - AI.[Mã miền] (Bậc [X] - [Tên mức]): [Yêu cầu cần đạt AI cụ thể theo bài học]
                   ...
                   </ai>
             3. Về phẩm chất`;
    } else if (enableNLS && !enableAI) {
      modeDirective = `
      🚨 CHẾ ĐỘ TÍCH HỢP: CHỈ TÍCH HỢP NĂNG LỰC SỐ (NLS) - HOÀN TOÀN ĐỘC LẬP.
      - TUYỆT ĐỐI KHÔNG TÍCH HỢP NĂNG LỰC AI.
      - CẤM TỰ Ý THÊM MỤC "Năng lực Trí tuệ Nhân tạo (AI)" hoặc bất kỳ thẻ <ai>...</ai> nào vào giáo án.
      - ĐÁNH DẤU BÔI ĐỎ TOÀN BỘ NỘI DUNG TÍCH HỢP: Toàn bộ mục "c. Năng lực số" và các hoạt động NLS bổ sung trong tiến trình dạy học phải bọc trong thẻ <nls>...</nls>.
      `;
      structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
                c. Năng lực số (bắt buộc bao bọc bằng <nls>...</nls> để bôi đỏ):
                   <nls>c. Năng lực số
                   - NLS [Mã miền] (Bậc [X]): [Yêu cầu cần đạt NLS cụ thể theo bài học]
                   ...
                   </nls>
             3. Về phẩm chất`;
    } else if (!enableNLS && enableAI) {
      modeDirective = `
      🚨 CHẾ ĐỘ TÍCH HỢP: CHỈ TÍCH HỢP TRÍ TUỆ NHÂN TẠO (AI) - HOÀN TOÀN ĐỘC LẬP.
      - TUYỆT ĐỐI KHÔNG TÍCH HỢP NĂNG LỰC SỐ (NLS).
      - CẤM TỰ Ý THÊM MỤC "Năng lực số" hoặc bất kỳ thẻ <nls>...</nls> nào vào giáo án.
      - ĐÁNH DẤU BÔI ĐỎ TOÀN BỘ NỘI DUNG TÍCH HỢP: Toàn bộ mục "c. Năng lực Trí tuệ Nhân tạo (AI)" và các hoạt động AI bổ sung trong tiến trình dạy học phải bọc trong thẻ <ai>...</ai>.
      `;
      structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
                c. Năng lực Trí tuệ Nhân tạo (AI) (bắt buộc bao bọc bằng <ai>...</ai> để bôi đỏ):
                   <ai>c. Năng lực Trí tuệ Nhân tạo (AI)
                   - AI.[Mã miền] (Bậc [X] - [Tên mức]): [Yêu cầu cần đạt AI cụ thể theo bài học]
                   ...
                   </ai>
             3. Về phẩm chất`;
    } else {
      modeDirective = `
      🚨 CHẾ ĐỘ: KHÔNG TÍCH HỢP NLS VÀ KHÔNG TÍCH HỢP AI.
      - Giữ nguyên cấu trúc mục tiêu và tiến trình bài dạy gốc.
      - Chuẩn hóa bảng biểu và định dạng công thức toán/hóa, không thêm các mục NLS hay AI mới.
      `;
      structureGoalRequirement = `
             1. Về kiến thức
             2. Về năng lực:
                a. Năng lực chung
                b. Năng lực đặc thù môn học
             3. Về phẩm chất`;
    }

    const userPrompt = `
      DỮ LIỆU THAM CHIẾU KHUNG NĂNG LỰC SỐ & KHUNG NĂNG LỰC AI:
      ${NLS_FRAMEWORK_DATA}

      THÔNG TIN GIÁO ÁN ĐẦU VÀO:
      - Bộ sách: ${info.textbook}
      - Cấp học: ${info.schoolLevel}
      - Môn học: ${info.subject}
      - Khối lớp: ${info.grade}
      
      ${modeDirective}

      ${distributionContext}

      ${manualContext}

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
           + CỘT SẢN PHẨM (Nếu có bảng): Bổ sung sản phẩm số của học sinh (câu trả lời đã đối chiếu với SGK, bảng Padlet, sơ đồ tư duy số...). (Bọc phần tích hợp trong thẻ màu đỏ)
         - ⛔ CẤM TUYỆT ĐỐI việc viết tắt hoặc bỏ sót bước ở Hoạt động 3 và 4 như "... (Các câu hỏi trắc nghiệm giữ nguyên) ..." hoặc chỉ ghi dấu gạch đầu dòng mà không chia đủ 4 bước!

      8. ĐỊNH DẠNG VĂN BẢN ĐẦU RA:
         - TUYỆT ĐỐI KHÔNG xuất các thẻ HTML như <strong>, <b>, <em>, <i>, <p>, <div> ra văn bản. Hãy dùng Markdown chuẩn (**in đậm**, *in nghiêng*).
         - Loại bỏ toàn bộ các ký tự ô vuông rỗng (□, ■).

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
