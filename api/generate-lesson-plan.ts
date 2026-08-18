import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { LessonInfo, ProcessingOptions } from "../types";

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
      🚨 QUY TẮC TỐI THƯỢNG (KHI CÓ PPCT - STRICT MODE):
      Người dùng ĐÃ CUNG CẤP nội dung Phân phối chương trình (PPCT).
      Đây là văn bản pháp quy, bạn phải tuân thủ TUYỆT ĐỐI các yêu cầu sau:

      1. Đọc tên bài học trong "NỘI DUNG GIÁO ÁN GỐC".
      2. Tìm bài học tương ứng trong nội dung PPCT.
      3. Trích xuất NGUYÊN VĂN, CHÍNH XÁC nội dung cột "Năng lực số" (hoặc YCCĐ năng lực số) của bài học đó.
      4. Đưa nội dung trích xuất đó vào phần Mục tiêu Năng lực số.
      
      ⛔ CÁC ĐIỀU CẤM (STRICTLY PROHIBITED):
      - CẤM TUYỆT ĐỐI việc tự ý thêm bất kỳ năng lực số nào khác không có trong PPCT của bài học này (Trừ khi có YÊU CẦU THỦ CÔNG bên dưới).
      - CẤM tự ý nâng cao hay thay đổi cấp độ nếu PPCT không yêu cầu.
      - CẤM dùng Khung năng lực số tham chiếu để bịa thêm mục tiêu. CHỈ dùng những gì PPCT ghi.
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
      🚨 CHẾ ĐỘ TÍCH HỢP: CHỈ TÍCH HỢP NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) - HOÀN TOÀN ĐỘC LẬP.
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
    }

    const userPrompt = `
      HÃY TÍCH HỢP NĂNG LỰC VÀO GIÁO ÁN THEO THÔNG TIN SAU:

      THÔNG TIN CƠ BẢN:
      - Bộ sách: ${info.textbook}
      - Môn học: ${info.subject}
      - Khối lớp: ${info.grade}
      - Cấp học: ${info.schoolLevel || "THCS"}
      - Loại giáo án: ${info.isStem ? "Giáo án STEM" : "Giáo án thường"}

      ${modeDirective}

      ${distributionContext}

      ${manualContext}

      ${
        options.analyzeOnly
          ? "LƯU Ý ĐẶC BIỆT: Người dùng chọn chế độ 'Chỉ gợi ý mục tiêu và hoạt động'. Bạn hãy phân tích và đưa ra các đề xuất tích hợp phù hợp nhất mà KHÔNG CẦN viết lại toàn bộ giáo án."
          : `LƯU Ý QUAN TRỌNG VỀ ĐỊNH DẠNG ĐẦU RA:
         - Bạn PHẢI XUẤT TOÀN BỘ GIÁO ÁN HOÀN CHỈNH từ đầu đến cuối dưới dạng văn bản có cấu trúc chuẩn Công văn 5512/BGDĐT.
         - GIỮ NGUYÊN 100% CÁC CÔNG THỨC TOÁN DẠNG [MATH_ID_...] nếu có trong giáo án gốc.
         - Cấu trúc mục tiêu:
           I. MỤC TIÊU
           ${structureGoalRequirement}
         - TIẾN TRÌNH DẠY HỌC: Giữ nguyên bảng 2 cột hoặc cấu trúc 4 hoạt động chuẩn 5512, tích hợp chi tiết vào hoạt động phù hợp.`
      }

      NỘI DUNG GIÁO ÁN GỐC:
      ${info.content}
    `;

    const callModel = async (modelId: string) => {
      const response = await ai.models.generateContent({
        model: modelId,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.1,
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

      // Clean weird Unicode glyphs and square bullet boxes
      text = text.replace(/[\uF000-\uF8FF]/g, "");
      text = text.replace(/[□■▢▣▤▥▦▧▨▩▪▫▬▭▮▯▲▼◆◇◈◉◊○●✦✧❖\uFFFD]/g, "- ");

      // Normalize escaped HTML tags
      text = text
        .replace(/&lt;nls&gt;/gi, "<nls>")
        .replace(/&lt;\/nls&gt;/gi, "</nls>")
        .replace(/&lt;ai&gt;/gi, "<ai>")
        .replace(/&lt;\/ai&gt;/gi, "</ai>")
        .replace(/&lt;u&gt;/gi, "<u>")
        .replace(/&lt;\/u&gt;/gi, "</u>");

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
