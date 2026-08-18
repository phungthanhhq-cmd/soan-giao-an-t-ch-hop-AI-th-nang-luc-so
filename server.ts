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

      // Determine Mode-specific instructions
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
        
        YÊU CẦU VỀ ĐỊNH DẠNG (BẮT BUỘC):
        1. ĐỊNH DẠNG ĐẦU VÀO: Nội dung giáo án gốc bên dưới có thể là HTML (được chuyển từ DOCX). Các công thức toán học đã được thay thế bằng các mã giữ chỗ có dạng [MATH_ID_...].
        2. NHIỆM VỤ: Bạn phải chuyển đổi nội dung này sang MARKDOWN, đồng thời TÍCH HỢP nội dung theo đúng chế độ được chọn.
        3. BẢO TOÀN CẤU TRÚC: 
           - Giữ nguyên tất cả các Bảng (Table) của giáo án gốc (chuyển sang Markdown Table). KHÔNG ĐƯỢC làm mất bảng hoặc biến bảng thành văn bản thường.
           - Giữ nguyên các tiêu đề, danh sách.
           - Giữ nguyên các đoạn in đậm/nghiêng.
        4. BẢO TOÀN CÔNG THỨC TOÁN HỌC VÀ HÓA HỌC (QUAN TRỌNG NHẤT): 
           - Bạn TUYỆT ĐỐI KHÔNG ĐƯỢC thay đổi, dịch, hay xóa các mã giữ chỗ [MATH_ID_...]. Phải giữ nguyên vẹn các mã này trong văn bản đầu ra.
           - KHÔNG ĐƯỢC đặt các mã này bên trong các thẻ định dạng như in đậm (**), in nghiêng (*), gạch chân (<u>).
           - TUYỆT ĐỐI KHÔNG SỬ DỤNG LATEX (DẤU $ HOẶC $$) TRONG TOÀN BỘ VĂN BẢN ĐẦU RA.
           - Đối với các công thức hóa học hoặc các chữ có chỉ số dưới/chỉ số trên (ví dụ: C<sub>15</sub>H<sub>31</sub>COOH, m<sup>2</sup>), hãy giữ nguyên thẻ HTML <sub> và <sup>. KHÔNG chuyển thành dạng $C_{15}H_{31}COOH$.
        5. ĐÁNH DẤU BÔI ĐỎ TOÀN BỘ NỘI DUNG TÍCH HỢP (QUAN TRỌNG): 
           ${enableNLS ? "- TẤT CẢ các nội dung tích hợp Năng lực số (cả mục tiêu 'c. Năng lực số' và các hoạt động học tập, hướng dẫn số bổ sung trong Tiến trình dạy học/Bảng biểu) BẮT BUỘC phải được bao bọc bằng thẻ <nls>...</nls>." : ""}
           ${enableAI ? "- TẤT CẢ các nội dung tích hợp Năng lực AI (cả mục tiêu AI và các hoạt động AI bổ sung trong Tiến trình dạy học/Bảng biểu) BẮT BUỘC phải được bao bọc bằng thẻ <ai>...</ai>." : ""}
           (Hệ thống sẽ tự động bôi màu ĐỎ cho toàn bộ các phần nằm trong thẻ này trên bản xem trước và khi xuất file Word DOCX).
        
        ĐỊNH DẠNG ĐẦU RA (NGHIÊM NGẶT):
        - Trả về toàn bộ nội dung giáo án dưới dạng Markdown.
        - Cấu trúc mục TIÊU BÀI HỌC bắt buộc:
${structureGoalRequirement}
        - Trong phần TIẾN TRÌNH DẠY HỌC: Lồng ghép tự nhiên các hoạt động tương ứng với chế độ đã chọn, bao bọc TOÀN BỘ phần bổ sung bằng thẻ <nls>...</nls> hoặc <ai>...</ai>.
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
