
export const NLS_COMPONENT_OPTIONS = [
  { code: "1.1", label: "1.1. Duyệt, tìm kiếm và lọc dữ liệu" },
  { code: "1.2", label: "1.2. Đánh giá dữ liệu, thông tin và nội dung số" },
  { code: "1.3", label: "1.3. Quản lý dữ liệu, thông tin và nội dung số" },
  { code: "2.1", label: "2.1. Tương tác thông qua công nghệ số" },
  { code: "2.2", label: "2.2. Chia sẻ thông tin và nội dung thông qua công nghệ số" },
  { code: "2.3", label: "2.3. Sử dụng công nghệ số để thực hiện trách nhiệm công dân" },
  { code: "2.4", label: "2.4. Hợp tác thông qua công nghệ số" },
  { code: "2.5", label: "2.5. Thực hiện quy tắc ứng xử trên mạng" },
  { code: "2.6", label: "2.6. Quản lý danh tính số" },
  { code: "3.1", label: "3.1. Phát triển nội dung số" },
  { code: "3.2", label: "3.2. Tích hợp và tạo lập lại nội dung số" },
  { code: "3.3", label: "3.3. Thực thi bản quyền và giấy phép" },
  { code: "3.4", label: "3.4. Lập trình" },
  { code: "4.1", label: "4.1. Bảo vệ thiết bị" },
  { code: "4.2", label: "4.2. Bảo vệ dữ liệu cá nhân và quyền riêng tư" },
  { code: "4.3", label: "4.3. Bảo vệ sức khỏe và an sinh số" },
  { code: "4.4", label: "4.4. Bảo vệ môi trường" },
  { code: "5.1", label: "5.1. Giải quyết các vấn đề kỹ thuật" },
  { code: "5.2", label: "5.2. Xác định nhu cầu và giải pháp công nghệ" },
  { code: "5.3", label: "5.3. Sử dụng sáng tạo công nghệ số" },
  { code: "5.4", label: "5.4. Xác định các vấn đề cần cải thiện về năng lực số" },
  { code: "6.1", label: "6.1. Hiểu biết về trí tuệ nhân tạo (AI)" },
  { code: "6.2", label: "6.2. Sử dụng trí tuệ nhân tạo" },
  { code: "6.3", label: "6.3. Đánh giá trí tuệ nhân tạo" },
];

// Khung năng lực Trí tuệ Nhân tạo (AI) theo Quyết định 2422/QĐ-BGDĐT & Thông tư 02/2025/TT-BGDĐT
export const AI_COMPONENT_OPTIONS = [
  { code: "A", label: "A: Tư duy lấy con người làm trung tâm (QĐ 2422)" },
  { code: "B", label: "B: Đạo đức AI (QĐ 2422)" },
  { code: "C", label: "C: Các kĩ thuật và ứng dụng AI (QĐ 2422)" },
  { code: "D", label: "D: Thiết kế hệ thống AI (QĐ 2422)" },
  { code: "NLa", label: "NLa: Tư duy lấy con người làm trung tâm" },
  { code: "NLb", label: "NLb: Đạo đức AI" },
  { code: "NLc", label: "NLc: Các kĩ thuật và ứng dụng AI" },
  { code: "NLd", label: "NLd: Thiết kế hệ thống AI" },
  { code: "6.1", label: "6.1. Hiểu biết về trí tuệ nhân tạo (TT 02)" },
  { code: "6.2", label: "6.2. Sử dụng trí tuệ nhân tạo có đạo đức và trách nhiệm (TT 02)" },
  { code: "6.3", label: "6.3. Đánh giá các công cụ AI (TT 02)" },
];

export const AI_LEVEL_DETAILS: Record<string, { code: string; desc: string; level: number }[]> = {
  "A": [
    { code: "A.CB1", level: 1, desc: "Nhận biết AI là sản phẩm do con người tạo ra (robot, trợ lý ảo, phần mềm học tập); Biết lựa chọn, sử dụng công cụ AI phục vụ học tập, vui chơi an toàn; Nhận biết các tình huống cần con người kiểm soát (Lớp 1-3)." },
    { code: "A.CB2", level: 2, desc: "Nhận biết các tình huống nên và không nên dùng AI; Hiểu con người kiểm soát và chịu trách nhiệm khi AI làm việc; Biết AI trong gia đình và xã hội nhằm phục vụ con người (Lớp 4-5)." },
    { code: "A.TC1", level: 3, desc: "Hiểu vai trò của con người trong thiết kế, vận hành, sử dụng AI; Biết rằng con người chịu trách nhiệm với các phản hồi, tác động của AI; Phân tích tình huống sử dụng AI cho mục đích đúng đắn (Lớp 6-7)." },
    { code: "A.TC2", level: 4, desc: "Phân tích tác động của AI đến đời sống và xã hội; Nhận diện các nguy cơ thiên vị, thành kiến và kiểm soát dữ liệu; Xác lập định hướng học tập, tự học suốt đời và rèn luyện kỹ năng mềm (Lớp 8-9)." },
    { code: "A.NC1", level: 5, desc: "Phân tích ảnh hưởng của AI đến cơ hội việc làm, quyền riêng tư và tác động đến các quyết định của con người; Tích hợp yếu tố nhân văn, công bằng vào thiết kế và sử dụng các công cụ AI (Lớp 10-11)." },
    { code: "A.NC2", level: 6, desc: "Đánh giá toàn diện quyền kiểm soát của con người ở tất cả các bước quan trọng trong vòng đời AI; Thực hành xây dựng và tuân thủ bộ nguyên tắc đạo đức cá nhân và trách nhiệm công dân trong kỉ nguyên AI (Lớp 12)." }
  ],
  "B": [
    { code: "B.CB1", level: 1, desc: "Hiểu rằng AI cần được sử dụng đúng cách, không gây hại; Không chia sẻ thông tin cá nhân cho các công cụ AI chưa rõ nguồn gốc; Thực hiện hành vi có trách nhiệm khi sử dụng thiết bị có AI (Lớp 1-3)." },
    { code: "B.CB2", level: 2, desc: "Nhận biết và nêu ví dụ về việc thông tin hoặc sản phẩm do AI tạo ra có thể không đúng với sự thật (thật và giả); Cung cấp dữ liệu đúng và đa dạng để AI hoạt động công bằng (Lớp 4-5)." },
    { code: "B.TC1", level: 3, desc: "Nêu được các nguyên tắc đạo đức cơ bản của AI: không gây hại, không thiên kiến, công bằng, minh bạch; Biết áp dụng các nguyên tắc đó khi học tập, làm việc với công cụ AI (Lớp 6-7)." },
    { code: "B.TC2", level: 4, desc: "Nhận biết và phân loại các rủi ro an toàn của AI (rủi ro dữ liệu, thuật toán thiên vị, lừa đảo); Tự giác bảo vệ dữ liệu cá nhân và bản quyền; Hiểu vai trò người dùng kiểm soát và chịu trách nhiệm (Lớp 8-9)." },
    { code: "B.NC1", level: 5, desc: "Đánh giá các nguyên tắc đạo đức AI trong các tình huống thực tế; Vận dụng nguyên tắc đạo đức trong dự án học tập; Đánh giá công cụ AI vi phạm chuẩn mực đạo đức xã hội (Lớp 10-11)." },
    { code: "B.NC2", level: 6, desc: "Phân tích nguyên nhân dẫn đến các vấn đề đạo đức hoặc sai lệch của hệ thống AI; Đánh giá và xác định mức độ rủi ro vi phạm pháp luật; Trình bày quyền và trách nhiệm của người phát triển, người dùng (Lớp 12)." }
  ],
  "C": [
    { code: "C.CB1", level: 1, desc: "Làm quen với phần mềm, ứng dụng có yếu tố AI (nhận diện hình ảnh, giọng nói, trợ lý học tập); Vận dụng công cụ AI hỗ trợ học tập (vẽ, luyện đọc, học toán); Thử nghiệm tạo sản phẩm đơn giản (Lớp 1-3)." },
    { code: "C.CB2", level: 2, desc: "Hiểu khái niệm dữ liệu và học máy thông qua ví dụ; Trải nghiệm thuật toán AI dựa trên luật (nếu... thì...) và công cụ học máy trực quan (Scratch, Teachable Machine) (Lớp 4-5)." },
    { code: "C.TC1", level: 3, desc: "Hiểu được khái niệm dữ liệu, thuật toán, mô hình AI; Biết dùng công cụ AI đơn giản phục vụ học tập, dự án nhỏ; Biết kết hợp nhiều công cụ AI để tạo sản phẩm số có ý nghĩa (Lớp 6-7)." },
    { code: "C.TC2", level: 4, desc: "Phân biệt 3 phương pháp học máy (có giám sát, không giám sát, học tăng cường); Hiểu cách AI nhận diện cảm xúc (nét mặt, từ khóa, ngữ điệu); Vận dụng công cụ AI tạo sản phẩm học tập (Lớp 8-9)." },
    { code: "C.NC1", level: 5, desc: "Hiểu và trình bày quy trình phát triển AI (thu thập - xử lý dữ liệu - huấn luyện - đánh giá); Sử dụng công cụ lập trình AI tạo sản phẩm hỗ trợ học tập; Cải tiến hoặc tích hợp mô hình AI sẵn có (Lớp 10-11)." },
    { code: "C.NC2", level: 6, desc: "Nắm vững kiến thức mạng nơ-ron nhân tạo, thuật toán phân cụm/phân lớp; Tùy chỉnh các yêu cầu hệ thống AI; Thử nghiệm công cụ phát triển AI (Teachable Machine, ML5.js, TensorFlow.js) (Lớp 12)." }
  ],
  "D": [
    { code: "D.CB1", level: 1, desc: "Nhận biết hệ thống AI hoạt động dựa trên dữ liệu để đưa ra dự đoán hoặc phản hồi; Lấy ví dụ minh họa quy trình học đơn giản của AI; Nêu ý tưởng đơn giản để cải thiện khi kết quả chưa chính xác (Lớp 1-3)." },
    { code: "D.CB2", level: 2, desc: "Trình bày quá trình huấn luyện máy thông minh (thu thập ví dụ -> cho AI học); Giải thích AI cần dữ liệu tốt và có thể học sai nếu dữ liệu sai; Đề xuất ý tưởng giải quyết vấn đề (Lớp 4-5)." },
    { code: "D.TC1", level: 3, desc: "Xác định được các tình huống thực tiễn có thể và nên ứng dụng AI; Tham gia vào quá trình lập kế hoạch thiết kế hệ thống AI đơn giản thông qua việc xác định mục tiêu, lựa chọn dữ liệu (Lớp 6-7)." },
    { code: "D.TC2", level: 4, desc: "Lập kế hoạch và triển khai dự án AI đơn giản theo nhóm (chatbot, mô hình nhận dạng); Xây dựng kịch bản tương tác và trải nghiệm người dùng (UX) tốt; Thiết kế kiểm tra đánh giá (Lớp 8-9)." },
    { code: "D.NC1", level: 5, desc: "Mô tả cấu trúc tổng thể và các thành phần chính của hệ thống AI (dữ liệu, mô hình, thuật toán, đầu ra, phản hồi); Phân tích mục tiêu, thành phần và mối liên hệ trong hệ thống (Lớp 10-11)." },
    { code: "D.NC2", level: 6, desc: "Thiết kế và vận hành tổng thể hệ thống AI; Trình bày các vai trò (đề xuất ý tưởng, lập trình, huấn luyện, kiểm thử) và sự hợp tác đa ngành; Phân tích nguyên nhân vấn đề phát sinh và giải pháp tối ưu (Lớp 12)." }
  ],
  "NLa": [
    { code: "NLa.CB1", level: 1, desc: "Nhận biết AI là sản phẩm do con người tạo ra (robot, trợ lý ảo, phần mềm học tập); Biết lựa chọn, sử dụng công cụ AI phục vụ học tập, vui chơi an toàn; Nhận biết các tình huống cần con người kiểm soát." },
    { code: "NLa.CB2", level: 2, desc: "Nhận biết các tình huống nên và không nên dùng AI; Hiểu con người kiểm soát và chịu trách nhiệm khi AI làm việc; Biết AI trong gia đình và xã hội nhằm phục vụ con người." },
    { code: "NLa.TC1", level: 3, desc: "Hiểu vai trò của con người trong thiết kế, vận hành, sử dụng AI; Biết rằng con người chịu trách nhiệm với các phản hồi, tác động của AI; Phân tích tình huống sử dụng AI cho mục đích đúng đắn; Biết đề xuất cách kết hợp AI với yếu tố con người để giải quyết vấn đề xã hội." },
    { code: "NLa.TC2", level: 4, desc: "Phân tích tác động của AI đến đời sống và xã hội; Nhận diện các nguy cơ thiên vị, thành kiến và kiểm soát dữ liệu; Xác lập định hướng học tập, tự học suốt đời và rèn luyện kỹ năng mềm mà AI không thể thay thế." },
    { code: "NLa.NC1", level: 5, desc: "Phân tích ảnh hưởng của AI đến cơ hội việc làm, quyền riêng tư và tác động đến các quyết định của con người; Tích hợp yếu tố nhân văn, công bằng vào thiết kế và sử dụng các công cụ AI; Thiết kế giải pháp AI thúc đẩy phát triển bền vững." },
    { code: "NLa.NC2", level: 6, desc: "Đánh giá toàn diện quyền kiểm soát của con người ở tất cả các bước quan trọng trong vòng đời AI; Thực hành xây dựng và tuân thủ bộ nguyên tắc đạo đức cá nhân và trách nhiệm công dân trong kỉ nguyên AI." }
  ],
  "NLb": [
    { code: "NLb.CB1", level: 1, desc: "Hiểu rằng AI cần được sử dụng đúng cách, không gây hại; Không chia sẻ thông tin cá nhân cho các công cụ AI chưa rõ nguồn gốc; Thực hiện hành vi có trách nhiệm khi sử dụng thiết bị có AI; Tôn trọng sản phẩm số của người khác." },
    { code: "NLb.CB2", level: 2, desc: "Nhận biết và nêu ví dụ về việc thông tin hoặc sản phẩm do AI tạo ra có thể không đúng với sự thật (thật và giả); Cung cấp dữ liệu đúng và đa dạng để AI hoạt động công bằng; Bảo vệ thông tin cá nhân khi tương tác với AI." },
    { code: "NLb.TC1", level: 3, desc: "Nêu được các nguyên tắc đạo đức cơ bản của AI: không gây hại, không thiên kiến, công bằng, minh bạch; Biết áp dụng các nguyên tắc đó khi học tập, làm việc với công cụ AI (không gian lận, tôn trọng quyền riêng tư); Biết đánh giá sản phẩm AI có nguy cơ xâm phạm quyền con người, đề xuất giải pháp cải thiện." },
    { code: "NLb.TC2", level: 4, desc: "Nhận biết và phân loại các rủi ro an toàn của AI (rủi ro dữ liệu, thuật toán thiên vị, lừa đảo); Tự giác bảo vệ dữ liệu cá nhân và bản quyền; Hiểu vai trò người dùng kiểm soát và chịu trách nhiệm với kết quả cuối cùng do AI tạo ra." },
    { code: "NLb.NC1", level: 5, desc: "Đánh giá các nguyên tắc đạo đức AI trong các tình huống thực tế; Vận dụng nguyên tắc đạo đức trong dự án học tập; Đánh giá công cụ AI vi phạm chuẩn mực đạo đức xã hội; Đề xuất quy tắc ứng xử hoặc mô hình chính sách đạo đức cho AI." },
    { code: "NLb.NC2", level: 6, desc: "Phân tích nguyên nhân dẫn đến các vấn đề đạo đức hoặc sai lệch của hệ thống AI; Đánh giá và xác định mức độ rủi ro vi phạm pháp luật; Trình bày quyền và trách nhiệm của người phát triển, người dùng trong hệ sinh thái AI." }
  ],
  "NLc": [
    { code: "NLc.CB1", level: 1, desc: "Làm quen với phần mềm, ứng dụng có yếu tố AI (nhận diện hình ảnh, giọng nói, trợ lý học tập); Vận dụng công cụ AI hỗ trợ học tập (vẽ, luyện đọc, học toán); Thử nghiệm tạo sản phẩm đơn giản với AI." },
    { code: "NLc.CB2", level: 2, desc: "Hiểu khái niệm dữ liệu và học máy thông qua ví dụ; Trải nghiệm thuật toán AI dựa trên luật (nếu... thì...) và công cụ học máy trực quan (Scratch, Teachable Machine)." },
    { code: "NLc.TC1", level: 3, desc: "Hiểu được khái niệm dữ liệu, thuật toán, mô hình AI; Biết dùng công cụ AI đơn giản phục vụ học tập, dự án nhỏ; Biết kết hợp nhiều công cụ AI để tạo sản phẩm số có ý nghĩa (video, thuyết trình, mô phỏng)." },
    { code: "NLc.TC2", level: 4, desc: "Phân biệt 3 phương pháp học máy (có giám sát, không giám sát, học tăng cường); Hiểu cách AI nhận diện cảm xúc (nét mặt, từ khóa, ngữ điệu); Vận dụng công cụ AI tạo sản phẩm học tập và thực hành cải thiện bộ dữ liệu." },
    { code: "NLc.NC1", level: 5, desc: "Hiểu và trình bày quy trình phát triển AI (thu thập - xử lý dữ liệu - huấn luyện - đánh giá); Sử dụng công cụ lập trình AI tạo sản phẩm hỗ trợ học tập; Cải tiến hoặc tích hợp mô hình AI sẵn có để phát triển công cụ mới; Đánh giá tính hiệu quả và bền vững." },
    { code: "NLc.NC2", level: 6, desc: "Nắm vững kiến thức mạng nơ-ron nhân tạo, thuật toán phân cụm/phân lớp; Tùy chỉnh các yêu cầu hệ thống AI; Thử nghiệm công cụ phát triển AI (Teachable Machine, ML5.js, TensorFlow.js, MIT App Inventor); Thu thập, cải thiện dữ liệu và tối ưu hóa hệ thống AI." }
  ],
  "NLd": [
    { code: "NLd.CB1", level: 1, desc: "Nhận biết hệ thống AI hoạt động dựa trên dữ liệu để đưa ra dự đoán hoặc phản hồi; Lấy ví dụ minh họa quy trình học đơn giản của AI; Nêu ý tưởng đơn giản để cải thiện khi kết quả chưa chính xác." },
    { code: "NLd.CB2", level: 2, desc: "Trình bày quá trình huấn luyện máy thông minh (thu thập ví dụ -> cho AI học); Giải thích AI cần dữ liệu tốt và có thể học sai nếu dữ liệu sai; Đề xuất ý tưởng giải quyết vấn đề và liên tục cải tiến hệ thống AI." },
    { code: "NLd.TC1", level: 3, desc: "Xác định được các tình huống thực tiễn có thể và nên ứng dụng AI; Tham gia vào quá trình lập kế hoạch thiết kế hệ thống AI đơn giản thông qua việc xác định mục tiêu, lựa chọn dữ liệu và mô phỏng hoạt động với công cụ có sẵn; Đánh giá được kết quả và đề xuất cách cải thiện ở mức độ cơ bản." },
    { code: "NLd.TC2", level: 4, desc: "Lập kế hoạch và triển khai dự án AI đơn giản theo nhóm (chatbot, mô hình nhận dạng); Xây dựng kịch bản tương tác và trải nghiệm người dùng (UX) tốt; Thiết kế kiểm tra đánh giá và thử nghiệm cải tiến sản phẩm AI." },
    { code: "NLd.NC1", level: 5, desc: "Mô tả cấu trúc tổng thể và các thành phần chính của hệ thống AI (dữ liệu, mô hình, thuật toán, đầu ra, phản hồi); Phân tích mục tiêu, thành phần và mối liên hệ trong hệ thống; Đề xuất phương án thiết kế, vận hành; Kiểm thử, điều chỉnh và tối ưu ở mức cơ bản." },
    { code: "NLd.NC2", level: 6, desc: "Thiết kế và vận hành tổng thể hệ thống AI; Trình bày các vai trò (đề xuất ý tưởng, lập trình, huấn luyện, kiểm thử) và sự hợp tác đa ngành; Phân tích nguyên nhân vấn đề phát sinh và lựa chọn giải pháp tối ưu để hệ thống hoạt động ổn định, hiệu quả." }
  ],
  "6.1": [
    { code: "6.1.B1", level: 1, desc: "Xác định được các khái niệm cơ bản của AI; Nhớ lại được các ứng dụng đơn giản của AI trong cuộc sống hàng ngày." },
    { code: "6.1.B2", level: 2, desc: "Giải thích được nguyên tắc hoạt động cơ bản của AI; Diễn giải được các thuật ngữ và khái niệm liên quan đến AI." },
    { code: "6.1.B3", level: 3, desc: "Áp dụng được các nguyên tắc cơ bản của AI để giải quyết vấn đề đơn giản; Thực hiện được các thao tác cơ bản trên các công cụ AI." },
    { code: "6.1.B4", level: 4, desc: "Phân tích được cách AI hoạt động trong các ứng dụng cụ thể; So sánh được các hệ thống AI khác nhau và cách chúng xử lý dữ liệu." },
    { code: "6.1.B5", level: 5, desc: "Đánh giá được hiệu quả của các hệ thống AI trong việc giải quyết các vấn đề cụ thể; Kiểm tra được các giới hạn và tiềm năng của AI trong các lĩnh vực khác nhau." },
    { code: "6.1.B6", level: 6, desc: "Tổng hợp được kiến thức để đề xuất cải tiến cho các hệ thống AI; Thiết kế được các giải pháp AI sáng tạo cho các vấn đề phức tạp." },
    { code: "6.1.B7", level: 7, desc: "Phát triển được các hệ thống AI tiên tiến và tùy chỉnh theo nhu cầu cụ thể; Tổ chức được việc triển khai các dự án ứng dụng AI có tính phức tạp." },
    { code: "6.1.B8", level: 8, desc: "Nghiên cứu và cập nhật được các lý thuyết mới về AI; Đánh giá và xây dựng được chiến lược dài hạn cho việc ứng dụng AI trong tổ chức." }
  ],
  "6.2": [
    { code: "6.2.B1", level: 1, desc: "Nhận diện được các công cụ AI đơn giản; Thực hiện được các thao tác cơ bản với các công cụ AI; Nhận thức được cơ bản về các vấn đề đạo đức và pháp lý liên quan đến AI." },
    { code: "6.2.B2", level: 2, desc: "Áp dụng được các công cụ AI để giải quyết vấn đề đơn giản; Tương tác được với các hệ thống AI cơ bản; Tuân thủ các quy định pháp luật cơ bản khi sử dụng AI." },
    { code: "6.2.B3", level: 3, desc: "Sử dụng được các công cụ AI trong công việc và học tập hàng ngày; Thực hành được các kỹ năng sử dụng AI thông qua các bài tập và dự án nhỏ; Xem xét các khía cạnh đạo đức khi sử dụng AI, bảo đảm không vi phạm quyền riêng tư và bảo mật dữ liệu." },
    { code: "6.2.B4", level: 4, desc: "Tối ưu hóa việc sử dụng các công cụ AI để đạt hiệu quả cao hơn; Quản lý được việc triển khai các công cụ AI trong các dự án nhỏ; Bảo vệ được dữ liệu cá nhân và tuân thủ các quy định pháp luật về bảo mật thông tin khi sử dụng AI." },
    { code: "6.2.B5", level: 5, desc: "Phát triển được các ứng dụng AI tùy chỉnh để giải quyết các vấn đề cụ thể; Điều chỉnh được các hệ thống AI để phù hợp với nhu cầu cụ thể; Đánh giá và giảm thiểu được các rủi ro đạo đức và pháp lý liên quan đến việc sử dụng AI." },
    { code: "6.2.B6", level: 6, desc: "Tích hợp được các công cụ AI vào quy trình làm việc hiện có; Giám sát và bảo đảm được các hệ thống AI hoạt động đúng cách và hiệu quả; Chịu trách nhiệm về các quyết định và kết quả do hệ thống AI đưa ra, bảo đảm tuân thủ quy định pháp luật và chuẩn mực đạo đức." },
    { code: "6.2.B7", level: 7, desc: "Đổi mới và tạo ra được các ứng dụng AI mới và tiên tiến; Đào tạo người khác về cách sử dụng AI hiệu quả; Lãnh đạo được việc sử dụng AI trong tổ chức một cách có trách nhiệm và đạo đức." },
    { code: "6.2.B8", level: 8, desc: "Xây dựng được chiến lược dài hạn cho việc ứng dụng AI trong tổ chức; Lãnh đạo và quản lý được các dự án ứng dụng AI có phức tạp cao; Bảo đảm mọi hoạt động liên quan đến AI trong tổ chức đều tuân thủ các quy định pháp luật và tiêu chuẩn đạo đức." }
  ],
  "6.3": [
    { code: "6.3.B1", level: 1, desc: "Nhận diện được các yếu tố cơ bản của hệ thống AI cần được đánh giá; Mô tả được các chức năng chính của hệ thống AI." },
    { code: "6.3.B2", level: 2, desc: "Giải thích được cách thức hoạt động của các hệ thống AI đơn giản; Tóm tắt được các đặc điểm và ứng dụng của hệ thống AI." },
    { code: "6.3.B3", level: 3, desc: "Phân tích được hiệu quả của hệ thống AI trong việc giải quyết các vấn đề cụ thể; So sánh được hiệu suất của các hệ thống AI khác nhau." },
    { code: "6.3.B4", level: 4, desc: "Đánh giá được độ chính xác và tin cậy của các hệ thống AI; Xem xét được các kết quả và đưa ra nhận xét về hiệu quả của hệ thống AI." },
    { code: "6.3.B5", level: 5, desc: "Phê phán được các khía cạnh kỹ thuật và đạo đức của hệ thống AI; Kiểm tra và xác minh được tính chính xác của các quyết định do hệ thống AI đưa ra." },
    { code: "6.3.B6", level: 6, desc: "Đưa ra được khuyến nghị cải tiến cho hệ thống AI dựa trên kết quả đánh giá; Phát triển được các tiêu chuẩn và hướng dẫn đánh giá hệ thống AI." },
    { code: "6.3.B7", level: 7, desc: "Đánh giá được chiến lược ứng dụng AI trong tổ chức và đưa ra kế hoạch dài hạn; Thẩm định và xác nhận được hiệu quả của các hệ thống AI phức tạp." },
    { code: "6.3.B8", level: 8, desc: "Nghiên cứu và phát triển các phương pháp đánh giá mới cho hệ thống AI; Lãnh đạo được các dự án đánh giá hệ thống AI và đưa ra các báo cáo chi tiết." }
  ]
};

// Toàn bộ yêu cầu cần đạt chi tiết cho từng lớp 1 - 12 chuẩn theo Quyết định số 2422/QĐ-BGDĐT ngày 18/8/2026
// Quy ước mã hoá: [Lớp].[Mã chủ đề].[Số thứ tự] (Ví dụ: 1.A1.1, 6.A1.1, 6.A1.MR1, 9.C2.1, 12.A1.1)
export const AI_ALL_GRADE_REQUIREMENTS: Record<number, { code: string; desc: string; domainCode: string; domainLabel: string }[]> = {
  1: [
    { code: "1.A1.1", desc: "Nêu được con người có cảm xúc, sở thích và suy nghĩ riêng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A1.2", desc: "Nêu được ví dụ về việc máy tính/thiết bị số thể hiện cảm xúc (cười, buồn, bất ngờ) là do con người tạo ra.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A1.3", desc: "Nhận biết được một số thiết bị thông minh phục vụ học tập, sinh hoạt hàng ngày.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A1.4", desc: "Nêu được ví dụ về việc con người có thể điều khiển, sử dụng các thiết bị thông minh để giải trí, học tập một cách an toàn.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A2.1", desc: "Nhận biết được một số máy móc, đồ chơi có thể tương tác với con người (ví dụ: gấu bông biết nói, robot lau nhà, tivi nhận diện giọng nói).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A2.MR1", desc: "(Mở rộng) Nhận biết được một số ứng dụng có AI trong học tập, giải trí quen thuộc hàng ngày.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A2.2", desc: "Nêu được máy móc được tạo ra nhằm hỗ trợ con người làm việc và giải trí.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.A2.3", desc: "Thể hiện được sự trân trọng với các thiết bị thông minh khi sử dụng trong học tập và vui chơi.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "1.B1.1", desc: "Nêu được ví dụ về việc sử dụng thiết bị số quá nhiều có thể ảnh hưởng đến sức khỏe của bản thân (mỏi mắt, đau lưng, thiếu ngủ).", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "1.B3.1", desc: "Nhận biết được cần xin phép người lớn trước khi sử dụng các thiết bị số thông minh.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "1.B3.2", desc: "Biết giữ gìn, bảo quản các thiết bị thông minh trong gia đình và trường học.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "1.C1.1", desc: "Nhận diện được một số thiết bị thông minh quen thuộc xung quanh (điện thoại thông minh, đồng hồ thông minh, máy tính bảng).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "1.C1.2", desc: "Phân biệt được thiết bị thông minh với thiết bị cơ học thông thường (ví dụ: đồng hồ thông minh vs đồng hồ kim).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "1.C1.3", desc: "Nêu được khả năng nhận biết hình ảnh hoặc âm thanh đơn giản của thiết bị thông minh.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "1.C1.4", desc: "Mô tả được việc máy tính phản hồi khi con người ra lệnh bằng giọng nói hoặc chạm vào màn hình.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "1.C1.MR1", desc: "(Mở rộng) Trải nghiệm một số trò chơi nhận diện hình ảnh/âm thanh đơn giản có ứng dụng AI.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "1.C1.MR2", desc: "(Mở rộng) Mô tả được cảm giác khi tương tác với trò chơi AI.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "1.D1.1", desc: "Nêu được ý tưởng về một đồ chơi hoặc thiết bị thông minh có thể giúp ích cho bản thân trong học tập hoặc giải trí.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "1.D1.MR1", desc: "(Mở rộng) Vẽ hoặc mô tả đồ chơi thông minh trong mơ ước của em.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "1.D2.1", desc: "Nêu được các bước đơn giản khi sử dụng một thiết bị thông minh (bật nguồn, ra lệnh, nhận kết quả).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "1.D2.2", desc: "Thực hành bật/tắt và sử dụng thiết bị thông minh đúng cách dưới sự hướng dẫn của thầy cô/cha mẹ.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  2: [
    { code: "2.A1.1", desc: "Nhận biết được AI là sản phẩm do con người tạo ra, hoạt động dựa trên chương trình con người viết.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A1.2", desc: "Nêu được sự khác nhau cơ bản giữa khả năng suy nghĩ của con người và hoạt động của máy tính.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A1.3", desc: "Nhận biết được các tình huống nên và không nên sử dụng thiết bị thông minh trong học tập và sinh hoạt.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A1.4", desc: "Thể hiện thái độ làm chủ khi sử dụng thiết bị số (không bị lệ thuộc, biết tắt đúng lúc).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A2.1", desc: "Kể tên được một số công cụ AI hỗ trợ con người trong đời sống (dịch giọng nói, tìm đường, gợi ý bài hát).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A2.MR1", desc: "(Mở rộng) Nêu được lợi ích cụ thể của ứng dụng AI trong học tập tiếng Anh hoặc rèn luyện toán học.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A2.MR2", desc: "(Mở rộng) Chia sẻ trải nghiệm sử dụng công cụ AI học tập với bạn bè.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A2.2", desc: "Nhận biết được AI giúp con người tiết kiệm thời gian và công sức trong các công việc thường nhật.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A2.MR3", desc: "(Mở rộng) Nêu ý kiến về một tình huống AI hỗ trợ người khuyết tật giao tiếp.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A3.1", desc: "Biết bảo vệ mắt và giữ khoảng cách an toàn khi tương tác với màn hình thiết bị số.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.A3.MR1", desc: "(Mở rộng) Thực hành thói quen thể dục sau 30 phút sử dụng thiết bị số.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "2.B1.1", desc: "Nhận biết được thông tin do AI đưa ra có thể không chính xác hoặc chưa đầy đủ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.B1.MR1", desc: "(Mở rộng) Nêu được ví dụ khi AI nhận diện sai một hình ảnh hoặc âm thanh quen thuộc.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.B1.MR2", desc: "(Mở rộng) Biết kiểm tra lại thông tin với người lớn khi thấy kết quả từ AI kỳ lạ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.B3.1", desc: "Không chia sẻ thông tin cá nhân (họ tên, địa chỉ, số điện thoại) khi trò chuyện với trợ lý ảo hoặc ứng dụng AI.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.B3.2", desc: "Tôn trọng sản phẩm số của người khác, không tự ý sao chép hoặc xóa bỏ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.B3.MR1", desc: "(Mở rộng) Nhận biết hành vi sử dụng công cụ AI một cách lịch sự, không dùng từ ngữ xúc phạm.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.B3.MR2", desc: "(Mở rộng) Báo cáo người lớn khi gặp nội dung không an toàn từ ứng dụng AI.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "2.C1.1", desc: "Nhận biết được các ứng dụng AI nhận diện khuôn mặt, nhận diện chữ viết hoặc giọng nói.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "2.C1.MR1", desc: "(Mở rộng) Thử nghiệm tính năng mở khóa bằng khuôn mặt hoặc tìm kiếm bằng giọng nói.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "2.C3.1", desc: "Mô tả được việc máy tính học từ các ví dụ hình ảnh được cung cấp lặp đi lặp lại.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "2.C3.2", desc: "Phân biệt được dữ liệu đúng và dữ liệu sai trong một tập ví dụ đơn giản.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "2.C3.MR1", desc: "(Mở rộng) Phân loại các thẻ hình ảnh theo nhóm động vật/hoa quả để làm mẫu cho máy học.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "2.D1.1", desc: "Đề xuất được tình huống trong lớp học có thể dùng thiết bị thông minh hỗ trợ (điểm danh, báo giờ, giữ trật tự).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "2.D1.2", desc: "Mô tả được hoạt động mong muốn của thiết bị thông minh trong tình huống đã chọn.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "2.D1.MR1", desc: "(Mở rộng) Cùng bạn thảo luận về chức năng của robot trợ giảng trong tương lai.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "2.D2.1", desc: "Nhận diện được các bộ phận nhập dữ liệu (camera, micro) và xuất kết quả (loa, màn hình) của hệ thống AI.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "2.D2.2", desc: "Thao tác đưa dữ liệu vào thiết bị (nói vào micro, giơ hình trước camera) để nhận phản hồi từ AI.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "2.D2.MR1", desc: "(Mở rộng) Khắc phục được thao tác cơ bản khi thiết bị chưa nhận diện được giọng nói (nói to hơn, phát âm rõ hơn).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  3: [
    { code: "3.A1.1", desc: "Giải thích được con người có vai trò quyết định trong việc huấn luyện và sử dụng các hệ thống AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.2", desc: "Nêu được các tình huống AI có thể mắc lỗi và con người cần can thiệp, chỉnh sửa.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.MR1", desc: "(Mở rộng) Phân tích một ví dụ cụ thể khi hệ thống AI dịch thuật hoặc nhận dạng biển báo giao thông bị nhầm lẫn.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.3", desc: "Nhận thức được việc không phụ thuộc hoàn toàn vào gợi ý của AI trong làm bài tập và tư duy cá nhân.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.MR2", desc: "(Mở rộng) Trình bày ý kiến về việc học sinh tự làm bài so với việc chỉ chép câu trả lời của AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.4", desc: "Thể hiện tinh thần tự chủ, kiên trì tự suy nghĩ trước khi tìm kiếm sự hỗ trợ từ công cụ số.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.5", desc: "Nhận biết được AI không có tình cảm, lương tâm và trách nhiệm đạo đức như con người.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A1.MR3", desc: "(Mở rộng) So sánh sự an ủi của người bạn thân với phản hồi từ một chatbot tâm sự.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A2.1", desc: "Kể tên các lĩnh vực AI đang phục vụ con người hiệu quả (y tế, giáo dục, giao thông, môi trường).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A2.2", desc: "Nêu được ví dụ AI giúp dự báo thời tiết, cảnh báo thiên tai bảo vệ tính mạng con người.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A2.MR1", desc: "(Mở rộng) Tìm hiểu cách AI hỗ trợ nông dân phát hiện sâu bệnh trên cây trồng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A2.MR2", desc: "(Mở rộng) Thuyết trình ngắn về một công nghệ AI vì cộng đồng mà em biết.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A2.3", desc: "Biết ơn và trân trọng các nhà khoa học, kỹ sư phát triển công nghệ phục vụ đời sống.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A2.MR3", desc: "(Mở rộng) Sưu tầm tranh ảnh về các phát minh công nghệ AI nổi bật.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A3.1", desc: "Nhận biết quyền riêng tư cá nhân khi tham gia môi trường số có ứng dụng AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.A3.2", desc: "Thực hiện hành vi có văn hóa khi tương tác trực tuyến và sử dụng trợ lý ảo.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "3.B2.1", desc: "Nhận biết các nguy cơ rò rỉ hình ảnh, thông tin gia đình khi cấp quyền bừa bãi cho ứng dụng AI.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "3.B3.1", desc: "Tuân thủ các quy định về an toàn thông tin khi sử dụng phần mềm có tích hợp AI.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "3.B3.MR1", desc: "(Mở rộng) Xây dựng bảng quy tắc 5 việc nên làm và 5 việc không nên làm khi dùng công cụ AI.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "3.C4.1", desc: "Hiểu được khái niệm dữ liệu là tập hợp các thông tin (văn bản, hình ảnh, âm thanh) làm nguyên liệu cho AI.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C4.MR1", desc: "(Mở rộng) Thu thập và gán nhãn 10 hình ảnh theo hai chủ đề khác nhau.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C5.1", desc: "Mô tả được quy trình học có giám sát đơn giản: nạp dữ liệu gán nhãn -> máy học mẫu -> kiểm tra dự đoán.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C5.MR1", desc: "(Mở rộng) Trải nghiệm công cụ Teachable Machine để huấn luyện nhận diện cử chỉ tay (kéo, búa, bao).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C5.2", desc: "Nhận biết AI có thể nhận diện sai nếu lượng mẫu cung cấp quá ít hoặc mẫu bị mờ/lẫn tạp âm.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C5.3", desc: "Thực hành bổ sung thêm dữ liệu mẫu để cải thiện độ chính xác của mô hình học máy.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C5.4", desc: "Đánh giá kết quả nhận diện của mô hình sau khi được huấn luyện bổ sung.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.C5.MR2", desc: "(Mở rộng) Chia sẻ mô hình học máy đã huấn luyện cho các bạn cùng lớp trải nghiệm.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "3.D1.1", desc: "Xác định được một vấn đề thực tế trong trường/lớp có thể giải quyết bằng phân loại AI (ví dụ: phân loại rác tái chế và rác hữu cơ).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "3.D2.1", desc: "Thu thập tập dữ liệu ảnh mẫu tương ứng với các nhóm cần phân loại.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "3.D2.2", desc: "Huấn luyện và thử nghiệm mô hình phân loại trên máy tính.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "3.D2.MR1", desc: "(Mở rộng) Thiết kế giao diện mô phỏng thùng rác thông minh tự động mở nắp khi nhận diện đúng loại rác.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "3.D2.3", desc: "Báo cáo kết quả thử nghiệm và nêu những điểm mô hình nhận diện chưa tốt.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  4: [
    { code: "4.A1.1", desc: "Phân tích được vai trò của con người trong việc thiết lập ranh giới và mục tiêu hoạt động cho hệ thống AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.A1.2", desc: "Giải thích được vì sao con người chịu trách nhiệm pháp lý và đạo đức về các quyết định có sự hỗ trợ của AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.A1.MR1", desc: "(Mở rộng) Thảo luận về tình huống xe tự lái gây tai nạn thì trách nhiệm thuộc về ai (nhà sản xuất, lập trình viên hay người ngồi trên xe).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.A2.1", desc: "Nêu được các ví dụ về ứng dụng AI thúc đẩy tiến bộ khoa học, bảo tồn thiên nhiên và di sản văn hóa.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.A2.2", desc: "Đánh giá được lợi ích và hạn chế của công cụ AI tạo sinh (tạo văn bản, hình ảnh, âm nhạc) đối với sự sáng tạo của học sinh.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.A3.1", desc: "Nhận biết và thực hành các kỹ năng của công dân số có trách nhiệm khi sử dụng công nghệ AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.A3.MR1", desc: "(Mở rộng) Viết đoạn văn ngắn thể hiện suy nghĩ về việc bảo vệ quyền sở hữu trí tuệ khi dùng tranh do AI vẽ.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "4.B2.1", desc: "Nhận diện được thông tin giả mạo, hình ảnh/video deepfake được tạo bởi AI để lừa đảo hoặc vu khống.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "4.B2.2", desc: "Biết cách kiểm chứng nguồn gốc thông tin và không chia sẻ các nội dung đáng ngờ trên không gian mạng.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "4.B2.MR1", desc: "(Mở rộng) Thực hành tìm kiếm ngược hình ảnh để kiểm tra tính chân thực của một bức ảnh trên mạng.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "4.C2.1", desc: "Trình bày được các ứng dụng AI trong xử lý ngôn ngữ tự nhiên (dịch thuật tự động, sửa lỗi chính tả, trợ lý ảo).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "4.C2.MR1", desc: "(Mở rộng) Sử dụng phần mềm dịch tự động để dịch một đoạn hội thoại ngắn và nhận xét độ chuẩn xác ngữ nghĩa.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "4.C5.MR1", desc: "(Mở rộng) Hiểu nguyên lý cơ bản của cây quyết định (Decision Tree) trong phân loại dữ liệu.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "4.C5.MR2", desc: "(Mở rộng) Xây dựng sơ đồ cây quyết định để phân loại các loại động vật dựa trên đặc điểm hình thể.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "4.D1.1", desc: "Xác định yêu cầu đầu vào, quá trình xử lý và đầu ra cho một ứng dụng AI nhận diện âm thanh (nhận diện tiếng chim hót, tiếng còi xe).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "4.D1.MR1", desc: "(Mở rộng) Thu âm các mẫu âm thanh thực tế trong môi trường xung quanh để làm dữ liệu huấn luyện.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "4.D2.1", desc: "Thực hành kết nối mô hình nhận diện âm thanh với một chương trình Scratch để tạo hoạt cảnh tương tác.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  5: [
    { code: "5.A1.1", desc: "Phân tích được tầm quan trọng của việc duy trì sự kiểm soát của con người trong các hệ thống AI tự động hóa cao.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A1.2", desc: "Nêu được các biện pháp bảo đảm an toàn khi hệ thống AI gặp sự cố hoặc đưa ra quyết định sai lệch.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A1.MR1", desc: "(Mở rộng) Phân tích cơ chế nút dừng khẩn cấp (Emergency Stop) trên các dây chuyền robot công nghiệp.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A2.1", desc: "Đánh giá được vai trò của AI trong việc hỗ trợ giải quyết các thách thức toàn cầu (biến đổi khí hậu, dịch bệnh, năng lượng sạch).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A2.MR1", desc: "(Mở rộng) Tìm hiểu các dự án AI giám sát nạn phá rừng và bảo tồn động vật hoang dã.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A2.2", desc: "Nhận biết được nguy cơ AI làm gia tăng khoảng cách số giữa các vùng miền nếu không được tiếp cận công bằng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A2.3", desc: "Thể hiện ý thức chia sẻ kiến thức công nghệ với mọi người xung quanh.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A3.1", desc: "Thực hành ứng xử văn minh, tôn trọng sự thật và bảo vệ dữ liệu cá nhân trong kỷ nguyên số.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A3.2", desc: "Có ý thức trau dồi các năng lực cốt lõi của con người mà AI không thể thay thế (sáng tạo nghệ thuật, đồng cảm, tư duy phản biện).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.A3.MR1", desc: "(Mở rộng) Lập kế hoạch rèn luyện các kỹ năng mềm của bản thân trong năm học mới.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "5.B1.1", desc: "Hiểu được khái niệm thiên kiến dữ liệu (Data Bias) và nguyên nhân khiến AI đưa ra kết quả thiếu công bằng.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "5.B1.2", desc: "Nêu ví dụ về thiên kiến giới tính hoặc sắc tộc trong một số hệ thống AI nhận diện khuôn mặt.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "5.B2.1", desc: "Tuân thủ các nguyên tắc đạo đức khi sử dụng AI tạo sinh trong học tập (ghi rõ nguồn tham khảo, không gian lận bài thi).", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "5.B2.MR1", desc: "(Mở rộng) Xây dựng cẩm nang hướng dẫn sử dụng AI an toàn cho học sinh tiểu học.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "5.B3.1", desc: "Hiểu được tác động của việc chia sẻ dữ liệu cá nhân đối với các thuật toán quảng cáo nhắm mục tiêu.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "5.C5.1", desc: "Trình bày được sự khác nhau giữa lập trình truyền thống (viết quy tắc) và học máy (học quy tắc từ dữ liệu).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "5.C5.MR1", desc: "(Mở rộng) Mô phỏng thuật toán tìm đường đi ngắn nhất hoặc thuật toán phân cụm đơn giản bằng hình vẽ.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "5.C5.2", desc: "Thực hành thu thập, làm sạch và chuẩn hóa một tập dữ liệu nhỏ phục vụ huấn luyện mô hình.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "5.C5.MR2", desc: "(Mở rộng) Đánh giá độ chính xác (Accuracy), độ nhạy (Recall) của mô hình học máy ở mức độ trực quan.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "5.C5.MR3", desc: "(Mở rộng) Tối ưu hóa tập dữ liệu để nâng cao hiệu suất nhận diện của mô hình.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "5.D1.1", desc: "Thiết kế giải pháp ứng dụng AI hoàn chỉnh giải quyết vấn đề học tập (ví dụ: trợ lý học tập hỗ trợ luyện phát âm tiếng Anh).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "5.D1.MR1", desc: "(Mở rộng) Phác thảo kịch bản hội thoại và giao diện tương tác cho trợ lý học tập.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "5.D2.1", desc: "Lập trình tích hợp mô hình AI vào dự án Scratch/Blockly và chạy thử nghiệm thực tế.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "5.D2.MR1", desc: "(Mở rộng) Thu thập ý kiến đánh giá của người dùng và đề xuất phương án cải tiến sản phẩm.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  6: [
    { code: "6.A1.1", desc: "Giải thích được AI là sản phẩm do con người tạo ra, lập trình và điều khiển để thực hiện những nhiệm vụ cụ thể; AI không tự sinh ra và không hoạt động độc lập với con người. Nêu được ví dụ về một số công cụ AI quen thuộc trong đời sống hằng ngày và chỉ ra được vai trò của con người trong việc tạo ra chúng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm (Con người tạo và điều khiển AI)" },
    { code: "6.A1.2", desc: "Trình bày được vai trò của AI chỉ là công cụ hỗ trợ hoạt động của con người; con người đưa ra quyết định cuối cùng và chịu trách nhiệm khi sử dụng AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm (AI hoạt động theo lập trình)" },
    { code: "6.A1.3", desc: "Thực hiện được việc kiểm tra lại một kết quả do AI đưa ra (đối chiếu với sách giáo khoa, nguồn tin cậy khác hoặc hỏi thầy cô) trước khi sử dụng, thể hiện thói quen “con người quyết định cuối cùng”.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm (AI hoạt động theo lập trình)" },
    { code: "6.A2.1", desc: "Nêu được các giới hạn cốt lõi của AI so với trí tuệ, cảm xúc và lương tâm của con người; phân tích được hậu quả của việc quá phụ thuộc vào các quyết định tự động của máy tính.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "6.A3.1", desc: "Nhận thức được quyền kiểm soát dữ liệu cá nhân và quyền riêng tư trong môi trường số.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "6.A3.2", desc: "Thực hành cấu hình các quyền riêng tư cơ bản trên tài khoản mạng xã hội và ứng dụng thông minh.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "6.A3.3", desc: "Nêu được trách nhiệm của người sử dụng khi tương tác với các hệ thống AI công cộng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "6.A3.4", desc: "Thể hiện thái độ phê phán đối với hành vi sử dụng AI để tạo tin giả hoặc quấy rối người khác.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "6.B1.1", desc: "Phân tích được các khía cạnh đạo đức cơ bản của AI: tính minh bạch, tính công bằng và trách nhiệm giải trình.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "6.B2.1", desc: "Nhận diện được các rủi ro an ninh thông tin khi sử dụng các dịch vụ AI trực tuyến không rõ nguồn gốc.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "6.C1.1", desc: "Phân biệt được Trí tuệ nhân tạo hẹp (Narrow AI) và Trí tuệ nhân tạo tổng quát (General AI).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C1.MR1", desc: "(Mở rộng) Lấy ví dụ minh họa về các hệ thống Narrow AI đang được sử dụng phổ biến hiện nay.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C1.MR2", desc: "(Mở rộng) Thảo luận về triển vọng và thách thức nếu General AI xuất hiện trong tương lai.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C1.2", desc: "Nêu được các thành phần chính của một hệ thống AI: Thu thập dữ liệu, Xử lý & Huấn luyện, Suy luận & Đưa ra quyết định.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C1.MR3", desc: "(Mở rộng) Vẽ sơ đồ khối thể hiện luồng hoạt động của một ứng dụng nhận diện biển số xe.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C2.1", desc: "Trình bày được ứng dụng của AI trong các lĩnh vực: Thị giác máy tính (Computer Vision), Xử lý ngôn ngữ tự nhiên (NLP) và Hệ chuyên gia.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C2.2", desc: "Sử dụng thành thạo ít nhất một công cụ AI tạo sinh hỗ trợ tìm kiếm tài liệu và tóm tắt văn bản học tập.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C2.MR1", desc: "(Mở rộng) So sánh kết quả tóm tắt của AI với bản tóm tắt tự viết của bản thân để đánh giá ưu/nhược điểm.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C3.1", desc: "Hiểu được cách máy tính biểu diễn dữ liệu hình ảnh dạng ma trận điểm ảnh (pixel) và mức xám/RGB.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.C3.MR1", desc: "(Mở rộng) Thực hành tính toán ma trận điểm ảnh đơn giản để nhận dạng một chữ số viết tay.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "6.D1.1", desc: "Xác định bài toán thực tế cần ứng dụng thị giác máy tính trong trường THCS (ví dụ: hệ thống nhắc nhở đeo khăn quàng đỏ hoặc đội mũ bảo hiểm).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "6.D1.MR1", desc: "(Mở rộng) Lập bảng đặc tả yêu cầu kỹ thuật và dữ liệu đầu vào cho bài toán đã chọn.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "6.D2.1", desc: "Xây dựng tập dữ liệu huấn luyện đa dạng các góc chụp và điều kiện ánh sáng khác nhau.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "6.D2.MR1", desc: "(Mở rộng) Huấn luyện mô hình phân loại hình ảnh trên nền tảng đám mây (Google Teachable Machine hoặc tương đương).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "6.D2.MR2", desc: "(Mở rộng) Đánh giá ma trận nhầm lẫn (Confusion Matrix) đơn giản và đề xuất hướng khắc phục các trường hợp phân loại sai.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  7: [
    { code: "7.A1.1", desc: "Phân tích được tầm quan trọng của việc duy trì quyền tự chủ và khả năng phán đoán độc lập của con người khi làm việc cùng AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A1.2", desc: "Nêu được các trường hợp AI có thể gây ra hiện tượng 'buồng vang thông tin' (Echo Chamber) và thao túng tâm lý người dùng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A1.MR1", desc: "(Mở rộng) Tìm hiểu cơ chế thuật toán gợi ý video/bài viết trên mạng xã hội giữ chân người dùng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A2.1", desc: "Đánh giá được tác động của tự động hóa và AI đối với thị trường lao động và định hướng nghề nghiệp tương lai.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A2.2", desc: "Xác định được các ngành nghề có nguy cơ bị AI thay thế và những ngành nghề đòi hỏi năng lực con người cao.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A3.1", desc: "Thực hành phản biện trước các thông tin, gợi ý và giải pháp do AI đưa ra.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A3.MR1", desc: "(Mở rộng) Nhận diện các lỗi 'ảo giác' (Hallucination) trong câu trả lời của mô hình ngôn ngữ lớn.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A3.MR2", desc: "(Mở rộng) Thiết kế bài kiểm tra độc lập để kiểm chứng tính đúng đắn của dữ liệu do AI tạo ra.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.A3.2", desc: "Tuân thủ các chuẩn mực ứng xử khi tham gia cộng đồng phát triển và ứng dụng mã nguồn mở AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "7.B2.1", desc: "Phân tích được các nguy cơ mất an toàn dữ liệu cá nhân khi cho phép AI truy cập danh bạ, vị trí và camera.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "7.B2.2", desc: "Thực hiện các biện pháp mã hóa, bảo mật mật khẩu và xác thực đa yếu tố bảo vệ tài khoản.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "7.B3.1", desc: "Nêu được các nguyên tắc đạo đức cơ bản của UNESCO và Việt Nam về phát triển và sử dụng AI có trách nhiệm.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "7.C4.1", desc: "Hiểu được khái niệm tập huấn luyện (Training Set), tập kiểm thử (Test Set) và tập kiểm định (Validation Set).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "7.C4.MR1", desc: "(Mở rộng) Thực hành chia tách tập dữ liệu theo tỷ lệ chuẩn 80/20 hoặc 70/30.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "7.C5.1", desc: "Trình bày được nguyên lý hoạt động của thuật toán láng giềng gần nhất k-NN (k-Nearest Neighbors).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "7.C5.2", desc: "Mô tả được cách tính khoảng cách Euclid giữa hai điểm dữ liệu trong không gian hai chiều.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "7.C5.MR1", desc: "(Mở rộng) Áp dụng thuật toán k-NN bằng tay để phân loại một điểm dữ liệu mới trên hệ trục tọa độ.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "7.D1.1", desc: "Thiết kế một ứng dụng phân loại tự động sử dụng thuật toán học máy đơn giản trong Python hoặc nền tảng kéo thả.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "7.D1.MR1", desc: "(Mở rộng) Lập trình giao diện người dùng đơn giản cho ứng dụng bằng thư viện đồ họa.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "7.D2.1", desc: "Kiểm thử ứng dụng trên tập dữ liệu kiểm tra độc lập và ghi nhận tỷ lệ phân loại chính xác.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "7.D2.MR1", desc: "(Mở rộng) Phân tích các yếu tố ảnh hưởng đến thời gian phản hồi và độ chính xác của ứng dụng.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  8: [
    { code: "8.A1.1", desc: "Phân tích được vai trò dẫn dắt của tư duy nhân văn trong kỷ nguyên bùng nổ của trí tuệ nhân tạo.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A1.2", desc: "Đánh giá được các khía cạnh đạo đức khi ứng dụng AI trong chấm điểm học sinh, tuyển dụng nhân sự và đánh giá tín dụng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A2.1", desc: "Nêu được các giải pháp sử dụng AI nhằm hỗ trợ các nhóm người yếu thế, người khuyết tật hòa nhập xã hội.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A2.2", desc: "Đề xuất được ý tưởng ứng dụng AI nhằm nâng cao chất lượng dịch vụ công và bảo vệ môi trường địa phương.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A3.1", desc: "Hiểu và thực hành quyền được biết (Right to Explanation) - quyền được giải thích nguyên nhân tại sao AI đưa ra quyết định.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A3.MR1", desc: "(Mở rộng) Tìm hiểu khái niệm Trí tuệ nhân tạo có thể giải thích được (Explainable AI - XAI).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A3.2", desc: "Tôn trọng quyền tác giả và li-xăng phần mềm khi sử dụng các mô hình và bộ dữ liệu mở.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A3.3", desc: "Định hướng kế hoạch học tập cá nhân nhằm phát triển các năng lực công nghệ thông tin và trí tuệ nhân tạo.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.A3.MR2", desc: "(Mở rộng) Tham gia các cuộc thi hoặc diễn đàn khoa học kỹ thuật dành cho học sinh phổ thông.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "8.B1.1", desc: "Phân tích nguyên nhân và hậu quả của việc rò rỉ dữ liệu lớn (Big Data) đối với an ninh quốc gia và quyền riêng tư cá nhân.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "8.B2.1", desc: "Nhận biết các hình thức tấn công vào hệ thống AI (ví dụ: đầu độc dữ liệu - Data Poisoning, mẫu đối nghịch - Adversarial Attacks).", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "8.B3.1", desc: "Đánh giá mức độ tuân thủ quy định pháp luật Việt Nam (Luật An ninh mạng) trong các hoạt động trên không gian số.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "8.C1.1", desc: "Trình bày được khái niệm Mạng nơ-ron nhân tạo (Artificial Neural Network - ANN) và cấu trúc nơ-ron sinh học.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "8.C1.MR1", desc: "(Mở rộng) Mô tả cấu trúc mạng nơ-ron gồm: Lớp đầu vào (Input Layer), Lớp ẩn (Hidden Layer), Lớp đầu ra (Output Layer).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "8.C5.1", desc: "Hiểu được cách trọng số (Weight) và độ lệch (Bias) ảnh hưởng đến giá trị kích hoạt của một nơ-ron nhân tạo.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "8.C5.MR1", desc: "(Mở rộng) Tính toán giá trị đầu ra của một nơ-ron đơn giản với hàm kích hoạt Step hoặc ReLU.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "8.D1.1", desc: "Thiết kế một bài toán nhận diện cử chỉ cơ thể hoặc dáng điệu phục vụ bài tập thể dục thông minh.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "8.D1.MR1", desc: "(Mở rộng) Thu thập và chuẩn hóa dữ liệu tọa độ các khớp xương (Pose Estimation Landmarks).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "8.D2.1", desc: "Lập trình đếm số lần thực hiện đúng động tác (nhảy dây, squat, chống đẩy) sử dụng PoseNet/MediaPipe.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "8.D2.MR1", desc: "(Mở rộng) Tối ưu hóa thuật toán để hoạt động mượt mà theo thời gian thực trên camera thông thường.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "8.D2.MR2", desc: "(Mở rộng) Báo cáo giải pháp và trình diễn sản phẩm trước lớp học.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  9: [
    { code: "9.A1.1", desc: "Phân tích và bảo vệ quan điểm về việc con người phải luôn giữ vai trò kiểm soát tối cao đối với các vũ khí tự hành và hệ thống AI quân sự.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.A2.1", desc: "Đánh giá toàn diện các cơ hội và thách thức của AI đối với phát triển kinh tế số, xã hội số và chính phủ số tại Việt Nam.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.A2.2", desc: "Đề xuất các giải pháp nâng cao kỹ năng số và nhận thức về AI cho cộng đồng địa phương.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.A3.1", desc: "Xác định rõ định hướng nghề nghiệp và các kỹ năng cần thiết trong kỷ nguyên trí tuệ nhân tạo.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.A3.2", desc: "Thực hành văn hóa chia sẻ tri thức, hợp tác đa ngành và đổi mới sáng tạo trong các dự án công nghệ.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.A3.3", desc: "Phê phán các hành vi gian lận học thuật bằng AI và kiên quyết bảo vệ sự trung thực trong nghiên cứu.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.A3.4", desc: "Thể hiện tinh thần học tập suốt đời, chủ động thích ứng với sự thay đổi nhanh chóng của công nghệ.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "9.B2.1", desc: "Phân tích các quy định pháp luật quốc tế và trong nước về quyền tác giả đối với tác phẩm do AI tạo sinh đồng sáng tạo.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "9.B2.2", desc: "Đánh giá các rủi ro pháp lý khi thu thập và khai thác dữ liệu người dùng mà không có sự đồng thuận.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "9.B2.3", desc: "Thực hành xây dựng tài liệu chính sách bảo mật và điều khoản sử dụng cho một dự án phần mềm.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "9.B3.1", desc: "Thực hiện cam kết tuân thủ các nguyên tắc đạo đức AI trong suốt vòng đời phát triển dự án công nghệ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "9.B3.2", desc: "Đóng góp ý kiến phản biện xây dựng môi trường học đường an toàn, lành mạnh trước các tác động tiêu cực của công nghệ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "9.C2.1", desc: "Trình bày được nguyên lý hoạt động của Mô hình Ngôn ngữ Lớn (LLM) và kỹ thuật Kỹ thuật đặt câu lệnh (Prompt Engineering).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "9.C2.MR1", desc: "(Mở rộng) Thực hành áp dụng các mẫu Prompt nâng cao (Few-shot Prompting, Chain-of-Thought) để giải bài toán phức tạp.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "9.C4.1", desc: "Hiểu được quy trình thu thập dữ liệu lớn, xử lý mất cân bằng dữ liệu và kỹ thuật tăng cường dữ liệu (Data Augmentation).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "9.C4.MR1", desc: "(Mở rộng) Thực hành tăng cường dữ liệu ảnh bằng các phép biến đổi hình học (xoay, lật, thay đổi độ sáng).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "9.C4.MR2", desc: "(Mở rộng) Đánh giá sự cải thiện hiệu năng của mô hình trước và sau khi tăng cường dữ liệu.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "9.D1.1", desc: "Xây dựng dự án AI hoàn chỉnh giải quyết một vấn đề thực tế tại địa phương (ví dụ: Chatbot tư vấn tuyển sinh THPT hoặc nhận diện nông sản đặc sản).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "9.D1.MR1", desc: "(Mở rộng) Lập tài liệu kiến trúc hệ thống và phân công vai trò thành viên trong nhóm phát triển.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "9.D2.1", desc: "Triển khai cài đặt mô hình AI lên nền tảng ứng dụng web hoặc ứng dụng di động.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "9.D2.MR1", desc: "(Mở rộng) Thu thập phản hồi từ người dùng thực tế và thực hiện tinh chỉnh (Fine-tuning) mô hình.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "9.D2.MR2", desc: "(Mở rộng) Viết báo cáo tổng kết dự án và bảo vệ trước hội đồng đánh giá.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  10: [
    { code: "10.A1.1", desc: "Phân tích được vai trò và quyền năng của con người trong các tầng kiến trúc của hệ sinh thái AI toàn cầu.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "10.A1.2", desc: "Đánh giá được các nguy cơ suy giảm năng lực nhận thức và tư duy độc lập khi giao phó hoàn toàn công việc cho AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "10.A2.1", desc: "Nghiên cứu tác động của AI trong nghiên cứu khoa học cơ bản (vật lý, hóa học, sinh học, thiên văn học).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "10.A2.MR1", desc: "(Mở rộng) Tìm hiểu các mô hình AI dự đoán cấu trúc protein (AlphaFold) hoặc khám phá vật liệu mới.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "10.A3.1", desc: "Thực hành xây dựng chiến lược phát triển bản thân và kỹ năng tự học thích ứng với thị trường lao động số.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "10.B2.1", desc: "Phân tích các lỗ hổng bảo mật đặc thù trong các hệ thống AI (Prompt Injection, Model Inversion, Backdoor Attacks).", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "10.B2.MR1", desc: "(Mở rộng) Thực nghiệm các kỹ thuật phòng chống Prompt Injection trong phát triển ứng dụng LLM.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "10.B3.1", desc: "Đánh giá tác động xã hội của AI đối với quyền con người, đa dạng văn hóa và công bằng xã hội.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "10.C2.1", desc: "Trình bày được nguyên lý của Mạng nơ-ron tích chập (Convolutional Neural Network - CNN) trong thị giác máy tính.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C2.2", desc: "Giải thích được vai trò của các lớp Tích chập (Convolutional Layer), Gộp mẫu (Pooling Layer) và Kết nối đầy đủ (Fully Connected Layer).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C2.MR1", desc: "(Mở rộng) Tính toán ma trận tích chập với các bộ lọc (Filter/Kernel) phát hiện cạnh (Sobel, Prewitt).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C2.3", desc: "Hiểu được cách thức hoạt động của mạng nơ-ron hồi quy (Recurrent Neural Network - RNN) và LSTM trong xử lý chuỗi thời gian.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C2.MR2", desc: "(Mở rộng) Phân tích cơ chế giải quyết triệt tiêu đạo hàm (Vanishing Gradient) của LSTM.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C3.1", desc: "Sử dụng thành thạo thư viện Python (như Scikit-learn hoặc TensorFlow/Keras) để xây dựng mô hình phân loại dữ liệu.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C3.2", desc: "Thực hành cấu hình hàm mất mát (Loss Function) và thuật toán tối ưu hóa (Gradient Descent, Adam).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C3.3", desc: "Theo dõi và trực quan hóa quá trình huấn luyện mô hình qua các epoch.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C3.MR1", desc: "(Mở rộng) Xử lý hiện tượng quá khớp (Overfitting) bằng kỹ thuật Dropout và Regularization.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C4.1", desc: "Thực hành tiền xử lý tập dữ liệu thực tế: xử lý giá trị khuyết thiếu (Missing Values), mã hóa biến phân loại (One-Hot Encoding).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.C4.MR1", desc: "(Mở rộng) Chuẩn hóa dữ liệu bằng Min-Max Scaling và Z-score Standardization.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "10.D1.1", desc: "Thiết kế và triển khai mô hình phân loại ảnh hoa quả hoặc bệnh cây trồng sử dụng mạng CNN.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "10.D2.1", desc: "Đánh giá mô hình sử dụng các chỉ số Precision, Recall, F1-score và đường cong ROC-AUC.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "10.D2.2", desc: "Đóng gói mô hình thành API dịch vụ web (sử dụng Flask hoặc FastAPI).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  11: [
    { code: "11.A1.1", desc: "Phân tích và phản biện các quan điểm triết học về mối quan hệ giữa con người và trí tuệ nhân tạo siêu việt (Artificial Superintelligence).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "11.A1.2", desc: "Xác lập hệ giá trị nhân bản cần được mã hóa và bảo tồn trong các hệ thống AI tự hành cấp cao.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "11.A2.1", desc: "Đánh giá tác động của AI đối với tính bền vững môi trường (tiêu thụ năng lượng của các trung tâm dữ liệu và giải pháp điện toán xanh).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "11.A2.2", desc: "Đề xuất các phương án tối ưu hóa mô hình AI nhằm giảm thiểu phát thải carbon.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "11.A3.1", desc: "Thực hành kỹ năng lãnh đạo, quản trị dự án công nghệ và điều phối hợp tác liên ngành.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "11.A3.MR1", desc: "(Mở rộng) Tham gia cố vấn hoặc hướng dẫn các dự án khoa học kỹ thuật cho học sinh khối lớp dưới.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "11.B2.1", desc: "Phân tích các chuẩn mực đạo đức trong kỹ thuật sinh sản dữ liệu và học tăng cường từ phản hồi của con người (RLHF).", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "11.B3.MR1", desc: "(Mở rộng) Xây dựng khung đánh giá mức độ an toàn đạo đức cho một hệ thống AI trước khi đưa vào vận hành.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "11.C2.1", desc: "Trình bày được kiến trúc Transformer và cơ chế Tự chú ý (Self-Attention Mechanism) - nền tảng của các mô hình AI hiện đại.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C2.2", desc: "Giải thích được cơ chế mã hóa vị trí (Positional Encoding) và các tầng đa chú ý (Multi-Head Attention).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C2.MR1", desc: "(Mở rộng) Thực hành tính toán ma trận Attention Score với phép nhân vô hướng có tỉ lệ (Scaled Dot-Product Attention).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C3.1", desc: "Hiểu được khái niệm Học chuyển giao (Transfer Learning) và sử dụng các mô hình đã được huấn luyện trước (Pre-trained Models như MobileNet, ResNet, BERT).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C3.MR1", desc: "(Mở rộng) Thực hành đóng băng các tầng cơ sở (Freezing Layers) và tinh chỉnh tầng phân loại trên tập dữ liệu chuyên biệt.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C3.2", desc: "Hiểu nguyên lý hoạt động của Mạng sinh đối nghịch (Generative Adversarial Network - GAN) gồm mạng Sinh (Generator) và mạng Phân biệt (Discriminator).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C3.MR2", desc: "(Mở rộng) Mô phỏng quá trình huấn luyện cân bằng Nash giữa Generator và Discriminator.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C3.MR3", desc: "(Mở rộng) Khám phá nguyên lý của mô hình Khuếch tán (Diffusion Models) trong việc tạo ảnh nghệ thuật số từ văn bản.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C3.MR4", desc: "(Mở rộng) Đánh giá chất lượng hình ảnh sinh ra bởi các mô hình GAN và Diffusion.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C5.1", desc: "Hiểu nguyên lý cơ bản của Học tăng cường (Reinforcement Learning): Tác tử (Agent), Môi trường (Environment), Trạng thái (State), Hành động (Action) và Phần thưởng (Reward).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C5.MR1", desc: "(Mở rộng) Trình bày thuật toán Q-Learning trong bài toán tìm đường trong mê cung.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C5.2", desc: "Thực hành xây dựng môi trường mô phỏng đơn giản cho tác tử học tự động thích nghi.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.C5.MR2", desc: "(Mở rộng) Theo dõi đường cong hội tụ phần thưởng của tác tử qua các lượt thử (Episodes).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "11.D1.1", desc: "Thiết kế hệ thống ứng dụng Transfer Learning giải quyết bài toán chẩn đoán hình ảnh y tế hoặc nhận diện sâu bệnh nông nghiệp phức tạp.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "11.D2.1", desc: "Triển khai hệ thống lên nền tảng đám mây hoặc thiết bị nhúng (Raspberry Pi, Jetson Nano).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "11.D2.MR1", desc: "(Mở rộng) Tối ưu hóa mô hình bằng kỹ thuật lượng tử hóa (Quantization) và cắt tỉa (Pruning) để tăng tốc độ suy luận.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ],
  12: [
    { code: "12.A1.1", desc: "Đánh giá toàn diện quyền kiểm soát của con người ở tất cả các bước quan trọng trong vòng đời AI (Lifecycle Governance).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.A1.MR1", desc: "(Mở rộng) Phân tích cơ chế giám sát độc lập của bên thứ ba đối với các hệ thống AI có rủi ro cao theo tiêu chuẩn ISO/IEC 42001.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.A1.2", desc: "Phân tích vai trò và trách nhiệm giải trình của các bên liên quan (chủ đầu tư, nhà khoa học dữ liệu, lập trình viên, người sử dụng cuối).", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.A1.3", desc: "Đề xuất các chính sách quản trị rủi ro AI ở cấp độ trường học, doanh nghiệp và cộng đồng.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.A2.1", desc: "Thực hành xây dựng và cam kết tuân thủ bộ nguyên tắc đạo đức cá nhân và trách nhiệm công dân trong kỉ nguyên AI.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.A2.MR1", desc: "(Mở rộng) Thuyết trình bảo vệ đề tài tốt nghiệp phổ thông về ứng dụng AI vì sự tiến bộ xã hội.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.A3.1", desc: "Định vị bản thân và hoạch định chiến lược nghề nghiệp chuyên sâu trong các lĩnh vực AI, Khoa học dữ liệu, An ninh mạng hoặc Công nghệ thông tin.", domainCode: "A", domainLabel: "A. Tư duy lấy con người làm trung tâm" },
    { code: "12.B1.MR1", desc: "(Mở rộng) Phân tích các vụ việc thực tế vi phạm đạo đức và pháp lý liên quan đến hệ thống AI tự hành trên thế giới.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "12.B2.1", desc: "Đánh giá và xác định mức độ rủi ro vi phạm pháp luật (sở hữu trí tuệ, an ninh quốc gia, bảo vệ bí mật đời tư) trong các dự án công nghệ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "12.B3.1", desc: "Trình bày quyền và trách nhiệm của người phát triển, người dùng trong hệ sinh thái AI; đóng góp ý kiến xây dựng chính sách quản lý công nghệ.", domainCode: "B", domainLabel: "B. Đạo đức AI" },
    { code: "12.C2.1", desc: "Nắm vững kiến thức hệ thống về các kiến trúc AI tiên tiến: RAG (Retrieval-Augmented Generation), Multi-Agent Systems và AI Agents.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C2.MR1", desc: "(Mở rộng) Thiết kế luồng phối hợp giữa các Agent chuyên biệt để giải quyết một nhiệm vụ tự động hóa phức tạp.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C3.1", desc: "Thử nghiệm và làm chủ các bộ công cụ, framework phát triển AI chuyên nghiệp (PyTorch, TensorFlow, Hugging Face Transformers, LangChain, LlamaIndex).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C3.MR1", desc: "(Mở rộng) Tinh chỉnh (Fine-tuning) mô hình ngôn ngữ mã nguồn mở với tập dữ liệu chuyên ngành bằng kỹ thuật LoRA / QLoRA.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C3.2", desc: "Xây dựng cơ sở dữ liệu véc-tơ (Vector Database) và thuật toán tìm kiếm tương đồng ngữ nghĩa (Cosine Similarity).", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C3.MR2", desc: "(Mở rộng) Tối ưu hóa truy xuất thông tin (Chunking Strategy, Reranking) trong kiến trúc RAG.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C3.MR3", desc: "(Mở rộng) Đánh giá độ chính xác và giảm thiểu hiện tượng ảo giác của mô hình RAG bằng bộ chỉ số Ragas.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C4.MR1", desc: "(Mở rộng) Thu thập, gán nhãn và làm giàu tập dữ liệu đa phương thức (hình ảnh, văn bản, âm thanh) quy mô lớn.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.C4.MR2", desc: "(Mở rộng) Quản trị vòng đời dữ liệu (Data Pipeline) tự động và bảo mật theo chuẩn quốc tế.", domainCode: "C", domainLabel: "C. Các kĩ thuật và ứng dụng AI" },
    { code: "12.D1.1", desc: "Thiết kế đồ án tốt nghiệp ứng dụng AI hoàn chỉnh có tính sáng tạo và khả năng ứng dụng thực tiễn cao (sản phẩm thương mại hoặc phục vụ cộng đồng).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "12.D1.MR1", desc: "(Mở rộng) Xây dựng kế hoạch kinh doanh hoặc mô hình phát triển bền vững cho sản phẩm.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "12.D2.1", desc: "Tổ chức vận hành, bảo trì, giám sát hiệu năng liên tục (MLOps) và cập nhật dữ liệu định kỳ cho hệ thống AI.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "12.D2.MR1", desc: "(Mở rộng) Thiết lập hệ thống cảnh báo tự động khi mô hình bị trôi dữ liệu (Data Drift / Concept Drift).", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "12.D2.MR2", desc: "(Mở rộng) Đóng gói ứng dụng dạng container (Docker) và triển khai CI/CD trên hạ tầng đám mây.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" },
    { code: "12.D2.MR3", desc: "(Mở rộng) Viết báo cáo khoa học hoàn chỉnh và công bố sản phẩm tại triển lãm công nghệ trường/tỉnh.", domainCode: "D", domainLabel: "D. Thiết kế hệ thống AI" }
  ]
};

export const NLS_LEVEL_DETAILS: Record<string, { code: string; desc: string; level: number }[]> = {
  "1.1": [
    { code: "1.1.CB1a", level: 1, desc: "Xác định nhu cầu thông tin cơ bản và tìm kiếm dữ liệu qua từ khóa đơn giản." },
    { code: "1.1.CB1b", level: 1, desc: "Thực hiện tìm kiếm thông tin có sự hướng dẫn của giáo viên." },
    { code: "1.1.CB2a", level: 2, desc: "Tự chủ tìm kiếm dữ liệu, thông tin và biết cách điều hướng giữa các kết quả." },
    { code: "1.1.CB2b", level: 2, desc: "Lựa chọn từ khóa tìm kiếm phù hợp để tra cứu nội dung học tập." },
    { code: "1.1.TC1a", level: 3, desc: "Giải thích rõ ràng nhu cầu thông tin cá nhân cho các mục đích cụ thể." },
    { code: "1.1.TC1b", level: 3, desc: "Thực hiện tìm kiếm thông tin, dữ liệu trong môi trường số theo quy trình xác định." },
    { code: "1.1.TC1c", level: 3, desc: "Giải thích cách truy cập và điều hướng qua các kết quả tìm kiếm." },
    { code: "1.1.TC1d", level: 3, desc: "Giải thích được các chiến lược tìm kiếm thông tin theo quy trình rõ ràng." },
    { code: "1.1.TC2a", level: 4, desc: "Minh họa được nhu cầu thông tin cá nhân và giải thích mục đích tìm kiếm." },
    { code: "1.1.TC2b", level: 4, desc: "Tổ chức tìm kiếm dữ liệu, thông tin và nội dung trong môi trường số một cách độc lập." },
    { code: "1.1.TC2c", level: 4, desc: "Mô tả cách truy cập và điều hướng nội dung số một cách thành thạo." },
    { code: "1.1.TC2d", level: 4, desc: "Tổ chức và thực hiện các chiến lược tìm kiếm thông tin một cách hiệu quả." },
    { code: "1.1.NC1a", level: 5, desc: "Áp dụng kỹ thuật tìm kiếm nâng cao, tự đề xuất chiến lược tìm kiếm hiệu quả." },
    { code: "1.1.NC1b", level: 5, desc: "Phân tích và kết hợp dữ liệu từ nhiều nguồn tìm kiếm khác nhau." },
    { code: "1.1.NC2a", level: 6, desc: "Đánh giá nhu cầu, điều chỉnh linh hoạt và đa dạng chiến lược tìm kiếm trong bối cảnh phức tạp." },
    { code: "1.1.NC2b", level: 6, desc: "Tự động hóa và dẫn dắt quy trình thu thập, lọc dữ liệu quy mô lớn." }
  ],
  "1.2": [
    { code: "1.2.CB1a", level: 1, desc: "Phát hiện độ tin cậy và tính chính xác cơ bản của các nguồn dữ liệu quen thuộc." },
    { code: "1.2.CB2a", level: 2, desc: "Đánh giá độ tin cậy của các nguồn tin với khả năng tự chủ và hướng dẫn phù hợp." },
    { code: "1.2.TC1a", level: 3, desc: "Phân tích, so sánh và đánh giá độ tin cậy của các nguồn dữ liệu đã được tổ chức rõ ràng." },
    { code: "1.2.TC1b", level: 3, desc: "Phân tích, diễn giải và đánh giá nội dung số dựa trên các tiêu chí xác định." },
    { code: "1.2.TC2a", level: 4, desc: "Thực hiện phân tích, so sánh và đánh giá độc lập các nguồn dữ liệu/nội dung số." },
    { code: "1.2.TC2b", level: 4, desc: "Thực hiện diễn giải và đánh giá dữ liệu một cách độc lập dựa trên nhu cầu riêng." },
    { code: "1.2.NC1a", level: 5, desc: "Thực hiện đánh giá sâu sắc độ tin cậy, tiến hành thẩm định nhiều loại dữ liệu đa chiều." },
    { code: "1.2.NC1b", level: 5, desc: "Xác định các định kiến, tính phiến diện và thông tin giả mạo trong môi trường số." },
    { code: "1.2.NC2a", level: 6, desc: "Đánh giá có tính phê phán, phân tích các nguồn dữ liệu trong bối cảnh phức tạp." },
    { code: "1.2.NC2b", level: 6, desc: "Xây dựng khung tiêu chí thẩm định nội dung số cho tổ chức và cộng đồng." }
  ],
  "1.3": [
    { code: "1.3.CB1a", level: 1, desc: "Lưu trữ, đặt tên và mở lại các tệp tin trong các thư mục đơn giản." },
    { code: "1.3.CB2a", level: 2, desc: "Sắp xếp tệp tin, dữ liệu có trật tự theo phân loại thư mục rõ ràng." },
    { code: "1.3.TC1a", level: 3, desc: "Lựa chọn dữ liệu và nội dung phù hợp để tổ chức, lưu trữ và truy xuất thường xuyên." },
    { code: "1.3.TC1b", level: 3, desc: "Sắp xếp dữ liệu và nội dung một cách trật tự trong môi trường có cấu trúc." },
    { code: "1.3.TC2a", level: 4, desc: "Thực hiện sắp xếp và quản lý thông tin, dữ liệu giúp việc truy xuất dễ dàng." },
    { code: "1.3.TC2b", level: 4, desc: "Tổ chức thông tin, dữ liệu và nội dung hiệu quả trong môi trường đám mây." },
    { code: "1.3.NC1a", level: 5, desc: "Thiết kế hệ thống phân loại, lưu trữ và sao lưu dữ liệu bảo đảm an toàn." },
    { code: "1.3.NC2a", level: 6, desc: "Quản trị cơ sở dữ liệu số phức tạp và thiết lập chính sách lưu trữ dài hạn." }
  ],
  "2.1": [
    { code: "2.1.CB1a", level: 1, desc: "Lựa chọn các công nghệ số đơn giản để tương tác và gửi phản hồi." },
    { code: "2.1.CB2a", level: 2, desc: "Xác định và sử dụng các phương tiện giao tiếp phù hợp cho tình huống học tập." },
    { code: "2.1.TC1a", level: 3, desc: "Thực hiện các tương tác xác định rõ và thường xuyên với các công nghệ số." },
    { code: "2.1.TC1b", level: 3, desc: "Lựa chọn phương tiện giao tiếp số phù hợp với quy trình cho một bối cảnh cụ thể." },
    { code: "2.1.TC2a", level: 4, desc: "Lựa chọn và sử dụng nhiều công nghệ số khác nhau để tương tác hiệu quả." },
    { code: "2.1.TC2b", level: 4, desc: "Lựa chọn linh hoạt nhiều phương tiện giao tiếp số phù hợp cho các bối cảnh khác nhau." },
    { code: "2.1.NC1a", level: 5, desc: "Sử dụng thuần thục nhiều công nghệ số, chỉ dẫn được cho người khác phương tiện tốt nhất." },
    { code: "2.1.NC2a", level: 6, desc: "Thích nghi linh hoạt với các công nghệ tương tác mới và điều phối mạng lưới giao tiếp số." }
  ],
  "2.2": [
    { code: "2.2.CB1a", level: 1, desc: "Chia sẻ tệp dữ liệu đơn giản qua liên kết hoặc phần mềm học tập." },
    { code: "2.2.CB2a", level: 2, desc: "Chia sẻ nội dung số với bạn bè kèm theo thông tin nguồn tác giả cơ bản." },
    { code: "2.2.TC1a", level: 3, desc: "Lựa chọn và xác định rõ các công nghệ số phù hợp để trao đổi dữ liệu/nội dung số." },
    { code: "2.2.TC1b", level: 3, desc: "Giải thích vai trò trung gian trong việc chia sẻ thông tin và nội dung số." },
    { code: "2.2.TC1c", level: 3, desc: "Minh họa rõ ràng và thường xuyên cách tham chiếu và ghi chú nguồn dữ liệu." },
    { code: "2.2.TC2a", level: 4, desc: "Vận dụng thành thạo các công nghệ số phù hợp để chia sẻ và trao đổi thông tin." },
    { code: "2.2.TC2b", level: 4, desc: "Đóng vai trò trung gian một cách chủ động trong việc chia sẻ thông tin qua công nghệ số." },
    { code: "2.2.TC2c", level: 4, desc: "Áp dụng đúng các phương pháp tham chiếu và trích dẫn nguồn khi chia sẻ nội dung." },
    { code: "2.2.NC1a", level: 5, desc: "Quản lý và phân phối thông tin đa nền tảng một cách chủ động và an toàn." },
    { code: "2.2.NC2a", level: 6, desc: "Xây dựng các kênh chia sẻ tri thức mở và lan tỏa tài nguyên học tập cộng đồng." }
  ],
  "2.3": [
    { code: "2.3.CB1a", level: 1, desc: "Nhận biết các dịch vụ số công cộng và tiện ích trường học trực tuyến." },
    { code: "2.3.CB2a", level: 2, desc: "Sử dụng các dịch vụ số đơn giản phục vụ sinh hoạt và học tập hàng ngày." },
    { code: "2.3.TC1a", level: 3, desc: "Lựa chọn và sử dụng thành thạo các dịch vụ số phổ biến để tham gia xã hội." },
    { code: "2.3.TC1b", level: 3, desc: "Xác định rõ các công nghệ số hỗ trợ vai trò và trách nhiệm công dân số." },
    { code: "2.3.TC2a", level: 4, desc: "Lựa chọn độc lập các dịch vụ số phù hợp để thực hiện quyền và nghĩa vụ công dân." },
    { code: "2.3.TC2b", level: 4, desc: "Thảo luận và áp dụng các công nghệ số để nâng cao năng lực bản thân với tư cách công dân." },
    { code: "2.3.NC1a", level: 5, desc: "Chủ động đề xuất và tham gia các sáng kiến số phục vụ lợi ích cộng đồng." },
    { code: "2.3.NC2a", level: 6, desc: "Dẫn dắt các phong trào chuyển đổi số và nâng cao trách nhiệm xã hội số." }
  ],
  "2.4": [
    { code: "2.4.CB1a", level: 1, desc: "Cùng bạn quan sát và đóng góp ý kiến vào tài liệu học tập chung." },
    { code: "2.4.CB2a", level: 2, desc: "Sử dụng các công cụ cộng tác trực tuyến đơn giản (như bảng tương tác, Google Docs)." },
    { code: "2.4.TC1a", level: 3, desc: "Lựa chọn và sử dụng thuần thục các công cụ số được xác định cho việc hợp tác nhóm." },
    { code: "2.4.TC1b", level: 3, desc: "Đóng góp và cùng chỉnh sửa sản phẩm học tập trên nền tảng làm việc chung." },
    { code: "2.4.TC2a", level: 4, desc: "Lựa chọn độc lập các công cụ và công nghệ số phù hợp cho các quy trình hợp tác nhóm." },
    { code: "2.4.TC2b", level: 4, desc: "Chủ trì, phân công nhiệm vụ và phối hợp đồng sáng tạo sản phẩm số trong nhóm." },
    { code: "2.4.NC1a", level: 5, desc: "Thiết kế môi trường làm việc số tối ưu cho các dự án hợp tác liên ngành." },
    { code: "2.4.NC2a", level: 6, desc: "Điều hành mạng lưới làm việc cộng tác đa văn hóa và đa nền tảng quy mô lớn." }
  ],
  "2.5": [
    { code: "2.5.CB1a", level: 1, desc: "Giao tiếp lịch sự, thân thiện và tôn trọng khi nhắn tin, trao đổi trực tuyến." },
    { code: "2.5.CB2a", level: 2, desc: "Tuân thủ các quy định ứng xử cơ bản trong phòng học trực tuyến và nhóm chat." },
    { code: "2.5.TC1a", level: 3, desc: "Làm rõ và áp dụng các chuẩn mực hành vi thông thường khi tương tác trong môi trường số." },
    { code: "2.5.TC1b", level: 3, desc: "Thể hiện các chiến lược và phương thức giao tiếp phù hợp với quy trình trong môi trường số." },
    { code: "2.5.TC1c", level: 3, desc: "Mô tả và tôn trọng các khía cạnh đa dạng văn hóa và thế hệ được xác định rõ ràng." },
    { code: "2.5.TC2a", level: 4, desc: "Thảo luận và thống nhất các chuẩn mực hành vi, cách ứng xử khi làm việc nhóm trực tuyến." },
    { code: "2.5.TC2b", level: 4, desc: "Thảo luận và lựa chọn các chiến lược giao tiếp số phù hợp một cách độc lập." },
    { code: "2.5.TC2c", level: 4, desc: "Thảo luận về sự đa dạng văn hóa/thế hệ và các lưu ý cần thiết trong tương tác số." },
    { code: "2.5.NC1a", level: 5, desc: "Xử lý hiệu quả các xung đột giao tiếp trực tuyến và lan tỏa văn hóa mạng tích cực." },
    { code: "2.5.NC2a", level: 6, desc: "Xây dựng các quy tắc văn hóa ứng xử số chuẩn mực cho tổ chức và trường học." }
  ],
  "2.6": [
    { code: "2.6.CB1a", level: 1, desc: "Biết giữ bí mật mật khẩu tài khoản học tập cá nhân." },
    { code: "2.6.CB2a", level: 2, desc: "Nhận biết hồ sơ cá nhân trên môi trường số và không dùng chung tài khoản bừa bãi." },
    { code: "2.6.TC1a", level: 3, desc: "Phân biệt được các loại danh tính số thông thường và cách nhận diện chúng." },
    { code: "2.6.TC1b", level: 3, desc: "Giải thích các cách xác định rõ ràng để bảo vệ danh tiếng trực tuyến cá nhân." },
    { code: "2.6.TC1c", level: 3, desc: "Mô tả dữ liệu thu thập được thông qua các công cụ hoặc dịch vụ số thường dùng." },
    { code: "2.6.TC2a", level: 4, desc: "Hiển thị và quản lý độc lập các danh tính số cụ thể trên các nền tảng khác nhau." },
    { code: "2.6.TC2b", level: 4, desc: "Thảo luận và thực hiện các biện pháp cụ thể để bảo vệ uy tín và danh tiếng trực tuyến." },
    { code: "2.6.TC2c", level: 4, desc: "Thao tác và kiểm soát dữ liệu cá nhân tạo ra từ các công cụ/dịch vụ số một cách chủ động." },
    { code: "2.6.NC1a", level: 5, desc: "Xây dựng và bảo vệ hình ảnh, uy tín học thuật / nghề nghiệp số tích cực." },
    { code: "2.6.NC2a", level: 6, desc: "Quản trị toàn diện danh tính số và dữ liệu định danh của tổ chức." }
  ],
  "3.1": [
    { code: "3.1.CB1a", level: 1, desc: "Tạo và chỉnh sửa nội dung văn bản đơn giản, vẽ tranh hoặc ghi âm bằng phần mềm cơ bản." },
    { code: "3.1.CB2a", level: 2, desc: "Tạo bài trình chiếu đơn giản, video ngắn hoặc đồ họa cơ bản để thể hiện ý tưởng." },
    { code: "3.1.TC1a", level: 3, desc: "Chỉ ra cách tạo, chỉnh sửa nội dung có mục tiêu cụ thể và định dạng rõ ràng (văn bản, slide, sơ đồ)." },
    { code: "3.1.TC1b", level: 3, desc: "Áp dụng các định dạng chuẩn và bố cục hợp lý khi thiết kế sản phẩm học tập." },
    { code: "3.1.TC2a", level: 4, desc: "Thực hiện tạo/chỉnh sửa nội dung số ở các định dạng khác nhau để thể hiện bản thân." },
    { code: "3.1.TC2b", level: 4, desc: "Biên tập âm thanh, hình ảnh, video và đồ họa thông tin (infographic) chất lượng cao." },
    { code: "3.1.NC1a", level: 5, desc: "Phát triển nội dung số tương tác và các ấn phẩm đa phương tiện chuyên nghiệp." },
    { code: "3.1.NC2a", level: 6, desc: "Sáng tạo các công trình truyền thông số phức tạp và có giá trị thẩm mỹ cao." }
  ],
  "3.2": [
    { code: "3.2.CB1a", level: 1, desc: "Chèn hình ảnh, âm thanh có sẵn vào tài liệu văn bản hoặc bài thuyết trình." },
    { code: "3.2.CB2a", level: 2, desc: "Chỉnh sửa, cắt ghép lại các nội dung số đơn giản để phục vụ bài học." },
    { code: "3.2.TC1a", level: 3, desc: "Tổng hợp, xử lý và kết hợp dữ liệu từ nhiều nguồn khác nhau vào một sản phẩm số mới." },
    { code: "3.2.TC1b", level: 3, desc: "Chuyển đổi định dạng tệp tin và tích hợp các thành phần đa phương tiện phù hợp." },
    { code: "3.2.TC2a", level: 4, desc: "Tái cấu trúc và nâng cấp nội dung số sẵn có để tạo ra giá trị mới độc đáo." },
    { code: "3.2.TC2b", level: 4, desc: "Kết hợp linh hoạt các định dạng tài nguyên số phục vụ giải thích kiến thức phức tạp." },
    { code: "3.2.NC1a", level: 5, desc: "Tích hợp hệ thống dữ liệu số đa nguồn thành các giải pháp học liệu tương tác." },
    { code: "3.2.NC2a", level: 6, desc: "Thiết kế kiến trúc tích hợp nội dung số quy mô lớn và tương thích đa nền tảng." }
  ],
  "3.3": [
    { code: "3.3.CB1a", level: 1, desc: "Nhận biết tài liệu, hình ảnh trên mạng có tác giả và cần xin phép hoặc ghi nguồn." },
    { code: "3.3.CB2a", level: 2, desc: "Biết tôn trọng quyền tác giả và không tự ý sao chép nội dung của người khác." },
    { code: "3.3.TC1a", level: 3, desc: "Nhận diện các quy tắc cơ bản về bản quyền và quyền sở hữu trí tuệ áp dụng cho dữ liệu/nội dung số." },
    { code: "3.3.TC1b", level: 3, desc: "Nhận diện các loại giấy phép phổ biến (như Creative Commons) cho tài nguyên số." },
    { code: "3.3.TC2a", level: 4, desc: "Áp dụng đúng các quy định về bản quyền và giấy phép sử dụng khi tạo lập sản phẩm học tập." },
    { code: "3.3.TC2b", level: 4, desc: "Lựa chọn và cấp phép phù hợp cho các sản phẩm số do chính mình tạo ra." },
    { code: "3.3.NC1a", level: 5, desc: "Đánh giá các khía cạnh pháp lý và quyền sở hữu trí tuệ trong phân phối nội dung số." },
    { code: "3.3.NC2a", level: 6, desc: "Xây dựng chính sách bảo vệ tài sản trí tuệ và quản lý bản quyền số cho tổ chức." }
  ],
  "3.4": [
    { code: "3.4.CB1a", level: 1, desc: "Thực hiện các chuỗi câu lệnh điều khiển nhân vật hoặc robot đơn giản (như ScratchJr)." },
    { code: "3.4.CB2a", level: 2, desc: "Viết chương trình khối lệnh trực quan (Scratch) với các vòng lặp và câu lệnh rẽ nhánh đơn giản." },
    { code: "3.4.TC1a", level: 3, desc: "Xác định và giải thích thuật toán, biểu diễn bằng sơ đồ khối hoặc mã khối trực quan." },
    { code: "3.4.TC1b", level: 3, desc: "Viết và gỡ lỗi chương trình máy tính giải quyết bài toán học tập cụ thể." },
    { code: "3.4.TC2a", level: 4, desc: "Thiết kế và phát triển các chương trình phần mềm hoàn chỉnh bằng ngôn ngữ lập trình (Python, C++)." },
    { code: "3.4.TC2b", level: 4, desc: "Tối ưu hóa thuật toán và kiểm thử phần mềm để xử lý các tập dữ liệu phức tạp." },
    { code: "3.4.NC1a", level: 5, desc: "Phát triển các ứng dụng phần mềm nâng cao, cấu trúc dữ liệu phức tạp và tích hợp API." },
    { code: "3.4.NC2a", level: 6, desc: "Thiết kế kiến trúc hệ thống phần mềm quy mô lớn và thuật toán chuyên sâu." }
  ],
  "4.1": [
    { code: "4.1.CB1a", level: 1, desc: "Biết tắt/mở thiết bị đúng cách, giữ gìn vệ sinh và không làm rơi vỡ máy tính/máy tính bảng." },
    { code: "4.1.CB2a", level: 2, desc: "Sử dụng phần mềm diệt virus cơ bản và không mở các liên kết lạ đáng ngờ." },
    { code: "4.1.TC1a", level: 3, desc: "Xác định rõ ràng các biện pháp và công cụ bảo vệ thiết bị số khỏi rủi ro bảo mật." },
    { code: "4.1.TC1b", level: 3, desc: "Thực hiện các biện pháp an toàn và bảo mật cho thiết bị theo hướng dẫn quy trình." },
    { code: "4.1.TC2a", level: 4, desc: "Tự tổ chức và áp dụng các giải pháp bảo mật nhiều lớp để bảo vệ thiết bị và dữ liệu." },
    { code: "4.1.TC2b", level: 4, desc: "Cập nhật phần mềm hệ thống, vá lỗ hổng bảo mật định kỳ cho các thiết bị cá nhân." },
    { code: "4.1.NC1a", level: 5, desc: "Đánh giá toàn diện các nguy cơ an ninh mạng và thiết lập tường lửa bảo vệ hệ thống." },
    { code: "4.1.NC2a", level: 6, desc: "Hoạch định và triển khai chiến lược bảo mật thiết bị và hạ tầng mạng cho tổ chức." }
  ],
  "4.2": [
    { code: "4.2.CB1a", level: 1, desc: "Không chia sẻ thông tin cá nhân (địa chỉ, số điện thoại gia đình) lên mạng cho người lạ." },
    { code: "4.2.CB2a", level: 2, desc: "Nhận biết các biểu mẫu yêu cầu nhập thông tin cá nhân và hỏi ý kiến phụ huynh/thầy cô trước khi điền." },
    { code: "4.2.TC1a", level: 3, desc: "Mô tả các cách xác định để bảo vệ dữ liệu cá nhân và quyền riêng tư trong môi trường số." },
    { code: "4.2.TC1b", level: 3, desc: "Giải thích cách sử dụng và chia sẻ thông tin nhận dạng cá nhân một cách an toàn." },
    { code: "4.2.TC2a", level: 4, desc: "Áp dụng các biện pháp bảo vệ dữ liệu cá nhân cụ thể và quản lý quyền riêng tư trên các ứng dụng." },
    { code: "4.2.TC2b", level: 4, desc: "Kiểm tra và thiết lập các chính sách quyền riêng tư (Privacy Settings) trên mạng xã hội và dịch vụ số." },
    { code: "4.2.NC1a", level: 5, desc: "Thẩm định các điều khoản dịch vụ (Terms of Service) và chính sách thu thập dữ liệu người dùng." },
    { code: "4.2.NC2a", level: 6, desc: "Xây dựng khung bảo vệ dữ liệu cá nhân và tuân thủ các đạo luật an toàn thông tin quốc tế." }
  ],
  "4.3": [
    { code: "4.3.CB1a", level: 1, desc: "Ngồi đúng tư thế khi dùng máy tính, giữ khoảng cách an toàn cho mắt." },
    { code: "4.3.CB2a", level: 2, desc: "Giới hạn thời gian sử dụng màn hình (Screen time), kết hợp vận động thể chất phù hợp." },
    { code: "4.3.TC1a", level: 3, desc: "Giải thích các biện pháp phòng ngừa rủi ro sức khỏe thể chất và tinh thần khi dùng công nghệ số." },
    { code: "4.3.TC1b", level: 3, desc: "Nhận biết và tìm kiếm sự trợ giúp khi bị bắt nạt qua mạng hoặc gặp nội dung độc hại." },
    { code: "4.3.TC2a", level: 4, desc: "Tự cân bằng thời gian học tập trực tuyến và đời sống thực tế, phòng tránh nghiện Internet." },
    { code: "4.3.TC2b", level: 4, desc: "Lan tỏa các thông điệp tích cực và bảo vệ bạn bè khỏi các hành vi công kích trên không gian mạng." },
    { code: "4.3.NC1a", level: 5, desc: "Thiết kế các chương trình chăm sóc sức khỏe số (Digital Wellbeing) cho cộng đồng học sinh." },
    { code: "4.3.NC2a", level: 6, desc: "Nghiên cứu và đề xuất các chính sách công nghệ giảm thiểu tác động tiêu cực đến sức khỏe cộng đồng." }
  ],
  "4.4": [
    { code: "4.4.CB1a", level: 1, desc: "Tắt màn hình hoặc chuyển sang chế độ ngủ (Sleep) khi không sử dụng để tiết kiệm điện." },
    { code: "4.4.CB2a", level: 2, desc: "Biết thu gom pin cũ, linh kiện điện tử hỏng đúng nơi quy định để không gây hại môi trường." },
    { code: "4.4.TC1a", level: 3, desc: "Nhận biết và mô tả tác động tích cực và tiêu cực của công nghệ số đối với môi trường tự nhiên." },
    { code: "4.4.TC1b", level: 3, desc: "Thực hiện các hành động tiết kiệm năng lượng khi sử dụng thiết bị số hàng ngày." },
    { code: "4.4.TC2a", level: 4, desc: "Phân tích vòng đời của thiết bị công nghệ và đề xuất giải pháp giảm thiểu rác thải điện tử (E-waste)." },
    { code: "4.4.TC2b", level: 4, desc: "Lựa chọn và sử dụng các sản phẩm công nghệ thân thiện với môi trường (Green IT)." },
    { code: "4.4.NC1a", level: 5, desc: "Xây dựng kế hoạch số hóa tài liệu nhằm giảm thiểu sử dụng giấy và bảo vệ rừng." },
    { code: "4.4.NC2a", level: 6, desc: "Đề xuất các giải pháp công nghệ xanh và phát triển bền vững cho nhà trường và xã hội." }
  ],
  "5.1": [
    { code: "5.1.CB1a", level: 1, desc: "Nhận biết lỗi kỹ thuật đơn giản như mất âm thanh, bàn phím/chuột chưa cắm chặt." },
    { code: "5.1.CB2a", level: 2, desc: "Biết khởi động lại phần mềm hoặc máy tính khi gặp sự cố đứng máy." },
    { code: "5.1.TC1a", level: 3, desc: "Chẩn đoán và xử lý các sự cố cơ bản về phần mềm, phần cứng và kết nối mạng." },
    { code: "5.1.TC1b", level: 3, desc: "Tìm kiếm giải pháp kỹ thuật qua tài liệu hướng dẫn trực tuyến và diễn đàn trợ giúp." },
    { code: "5.1.TC2a", level: 4, desc: "Tự khắc phục các lỗi hệ thống, cài đặt lại phần mềm và tối ưu hiệu suất thiết bị." },
    { code: "5.1.TC2b", level: 4, desc: "Hỗ trợ bạn bè xử lý các vấn đề kỹ thuật phát sinh trong quá trình học tập nhóm." },
    { code: "5.1.NC1a", level: 5, desc: "Chẩn đoán và khắc phục sự cố hệ thống mạng và ứng dụng phức tạp." },
    { code: "5.1.NC2a", level: 6, desc: "Thiết kế quy trình bảo trì, giám sát và xử lý lỗi kỹ thuật tự động." }
  ],
  "5.2": [
    { code: "5.2.CB1a", level: 1, desc: "Lựa chọn công cụ phần mềm phù hợp để vẽ tranh, gõ văn bản theo yêu cầu." },
    { code: "5.2.CB2a", level: 2, desc: "Tìm kiếm và lựa chọn ứng dụng hỗ trợ ôn tập, làm bài tập hiệu quả." },
    { code: "5.2.TC1a", level: 3, desc: "Phân tích nhu cầu học tập và lựa chọn giải pháp/công cụ công nghệ số tối ưu." },
    { code: "5.2.TC1b", level: 3, desc: "Đánh giá sự phù hợp của các phần mềm và nền tảng số đối với từng nhiệm vụ cụ thể." },
    { code: "5.2.TC2a", level: 4, desc: "Tùy biến và kết hợp các công cụ số để đáp ứng nhu cầu nghiên cứu, sáng tạo phức tạp." },
    { code: "5.2.TC2b", level: 4, desc: "Đề xuất các ứng dụng công nghệ mới nhằm nâng cao chất lượng hoạt động học tập." },
    { code: "5.2.NC1a", level: 5, desc: "Xây dựng chiến lược áp dụng các giải pháp số hóa toàn diện cho tổ chức." },
    { code: "5.2.NC2a", level: 6, desc: "Nghiên cứu và thử nghiệm các giải pháp công nghệ tiên phong cho giáo dục." }
  ],
  "5.3": [
    { code: "5.3.CB1a", level: 1, desc: "Sử dụng công cụ số để biểu đạt ý tưởng sáng tạo trong các bài tập vẽ/kể chuyện." },
    { code: "5.3.CB2a", level: 2, desc: "Tạo ra các sản phẩm học tập đa dạng, độc đáo nhờ kết hợp phần mềm số." },
    { code: "5.3.TC1a", level: 3, desc: "Ứng dụng công nghệ số để giải quyết sáng tạo các vấn đề thực tiễn trong học tập." },
    { code: "5.3.TC1b", level: 3, desc: "Thiết kế sản phẩm số mang tính ứng dụng cao hỗ trợ học tập liên môn." },
    { code: "5.3.TC2a", level: 4, desc: "Đổi mới phương pháp giải quyết vấn đề bằng công cụ mô phỏng và mô hình hóa số." },
    { code: "5.3.TC2b", level: 4, desc: "Sáng tạo các giải pháp số độc đáo đáp ứng thách thức của cộng đồng học sinh." },
    { code: "5.3.NC1a", level: 5, desc: "Dẫn dắt các dự án đổi mới sáng tạo số có giá trị ứng dụng thực tế cao." },
    { code: "5.3.NC2a", level: 6, desc: "Phát minh và phát triển các sản phẩm, mô hình chuyển đổi số đột phá." }
  ],
  "5.4": [
    { code: "5.4.CB1a", level: 1, desc: "Nhận biết những thao tác công nghệ mình chưa biết làm và nhờ trợ giúp." },
    { code: "5.4.CB2a", level: 2, desc: "Chủ động xem video hướng dẫn để tự rèn luyện kỹ năng sử dụng máy tính mới." },
    { code: "5.4.TC1a", level: 3, desc: "Tự đánh giá khoảng trống kỹ năng số của bản thân và lập kế hoạch tự bồi dưỡng." },
    { code: "5.4.TC1b", level: 3, desc: "Tham gia các khóa học, diễn đàn trực tuyến để cập nhật và nâng cao năng lực số." },
    { code: "5.4.TC2a", level: 4, desc: "Chủ động thích ứng và làm chủ các công cụ công nghệ mới xuất hiện." },
    { code: "5.4.TC2b", level: 4, desc: "Chia sẻ kinh nghiệm và hỗ trợ người khác cùng phát triển năng lực số." },
    { code: "5.4.NC1a", level: 5, desc: "Xây dựng chương trình phát triển năng lực số cá nhân và nhóm học tập." },
    { code: "5.4.NC2a", level: 6, desc: "Định hình khung năng lực số và dẫn dắt hoạt động đào tạo số cho cộng đồng." }
  ],
  "6.1": [
    { code: "6.1.CB1a", level: 1, desc: "Nhận biết AI trong các sản phẩm quen thuộc (trợ lý giọng nói, robot hút bụi, nhận diện khuôn mặt)." },
    { code: "6.1.CB2a", level: 2, desc: "Hiểu nguyên lý cơ bản: AI học từ dữ liệu do con người cung cấp; AI không có cảm xúc." },
    { code: "6.1.TC1a", level: 3, desc: "Giải thích các thành phần cơ bản của hệ thống AI gồm Dữ liệu + Thuật toán + Mô hình học máy." },
    { code: "6.1.TC1b", level: 3, desc: "Phân biệt trí tuệ nhân tạo (AI) với các chương trình phần mềm tự động thông thường." },
    { code: "6.1.TC2a", level: 4, desc: "Phân tích cách AI học sâu (Machine Learning/Deep Learning) và nhận diện quy luật dữ liệu." },
    { code: "6.1.TC2b", level: 4, desc: "Nhận biết hiện tượng thiên vị dữ liệu (data bias) và các yếu tố ảnh hưởng đến độ chính xác AI." },
    { code: "6.1.NC1a", level: 5, desc: "Đánh giá cấu trúc mô hình ngôn ngữ lớn (LLM) và các kiến trúc AI tạo sinh hiện đại." },
    { code: "6.1.NC2a", level: 6, desc: "Nghiên cứu sâu nguyên lý thuật toán AI tiên tiến và đề xuất cải tiến mô hình." }
  ],
  "6.2": [
    { code: "6.2.CB1a", level: 1, desc: "Trải nghiệm tương tác cơ bản với công cụ AI đơn giản dưới sự hướng dẫn của thầy cô." },
    { code: "6.2.CB2a", level: 2, desc: "Sử dụng công cụ AI hỗ trợ tìm kiếm ý tưởng bài học hoặc tra cứu/dịch thuật cơ bản." },
    { code: "6.2.TC1a", level: 3, desc: "Sử dụng AI tạo sinh để hỗ trợ học tập, giải thích khái niệm và tóm tắt tài liệu." },
    { code: "6.2.TC1b", level: 3, desc: "Viết câu lệnh (Prompt) cơ bản rõ ràng, đủ ngữ cảnh để tương tác hiệu quả với AI." },
    { code: "6.2.TC2a", level: 4, desc: "Áp dụng kỹ thuật viết Prompt nâng cao (đóng vai, cung cấp ví dụ, định dạng đầu ra) với AI." },
    { code: "6.2.TC2b", level: 4, desc: "Tích hợp công cụ AI vào quy trình nghiên cứu, làm bài tập và hoàn thành dự án học tập." },
    { code: "6.2.NC1a", level: 5, desc: "Tùy biến và tích hợp API AI để tự động hóa các tác vụ học tập và nghiên cứu phức tạp." },
    { code: "6.2.NC2a", level: 6, desc: "Phát triển các ứng dụng trí tuệ nhân tạo chuyên biệt phục vụ bài toán thực tế." }
  ],
  "6.3": [
    { code: "6.3.CB1a", level: 1, desc: "Nhận biết AI có thể đưa ra kết quả sai và cần hỏi lại thầy cô/người lớn để kiểm chứng." },
    { code: "6.3.CB2a", level: 2, desc: "Đối chiếu câu trả lời của AI với sách giáo khoa và tài liệu chính thống." },
    { code: "6.3.TC1a", level: 3, desc: "Phân tích hiện tượng ảo giác (hallucination) và đánh giá tính chính xác của phản hồi AI." },
    { code: "6.3.TC1b", level: 3, desc: "Nhận thức rủi ro bảo mật dữ liệu và quyền riêng tư khi đưa thông tin cá nhân vào công cụ AI." },
    { code: "6.3.TC2a", level: 4, desc: "Thẩm định độc lập và phản biện nội dung do AI tạo ra trước khi sử dụng vào học tập." },
    { code: "6.3.TC2b", level: 4, desc: "Thực hiện liêm chính học thuật và trích dẫn rõ ràng khi sử dụng nội dung do AI hỗ trợ." },
    { code: "6.3.NC1a", level: 5, desc: "Đánh giá toàn diện rủi ro đạo đức, pháp lý và tác động xã hội của các ứng dụng AI." },
    { code: "6.3.NC2a", level: 6, desc: "Xây dựng tiêu chuẩn an toàn và liêm chính trong việc ứng dụng AI cho nhà trường/tổ chức." }
  ]
};

// AI Specific Requirements by Grade (Decision 3439)
export const AI_GRADE_REQUIREMENTS: Record<number, { code: string; desc: string }[]> = {
  1: [
    { code: "A1.1", desc: "Nhận biết con người có cảm xúc, AI thì không; AI thể hiện cảm xúc do lập trình." },
    { code: "C1.1", desc: "Nhận biết AI trong một số sản phẩm quen thuộc (loa thông minh, robot hút bụi)." },
    { code: "D1.1", desc: "Nêu được ví dụ về tình huống AI học từ hình ảnh hoặc thông tin con người cung cấp." }
  ],
  6: [
    { code: "A1.6", desc: "Giải thích AI do con người tạo ra để phục vụ nhiệm vụ cụ thể, không tự sinh ra." },
    { code: "C1.6", desc: "Hiểu các thành phần cơ bản của AI (Dữ liệu + Thuật toán) và cách chúng hoạt động." },
    { code: "D1.6", desc: "Phân tích được khi nào nên hoặc không nên dùng AI trong các tình huống thực tế." }
  ],
  10: [
    { code: "A1.10", desc: "Xác định vai trò dẫn dắt của con người trong việc thiết kế và tùy chỉnh hệ thống AI." },
    { code: "C2.10", desc: "Liên hệ ứng dụng AI với các vấn đề thực tế (nông nghiệp, y tế, cộng đồng)." },
    { code: "D2.10", desc: "Mô tả cấu trúc cơ bản hệ thống AI (Dữ liệu, Mô hình, Đầu ra, Phản hồi)." }
  ]
};

export const NLS_FRAMEWORK_DATA = `
KHUNG NĂNG LỰC SỐ VÀ KHUNG NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) - THÔNG TƯ 02/2025/TT-BGDĐT & QUYẾT ĐỊNH 3439/QĐ-BGDĐT

1. CẤU TRÚC ĐỊNH DANH MÃ CHUẨN (BẮT BUỘC DÙNG MÃ CHI TIẾT ĐẦY ĐỦ):
- Năng lực số (TT 02/2025): Dùng mã cụ thể dạng [Mã miền].[Mã cấp độ][tiêu chí], Ví dụ: 1.1.TC1a, 1.1.TC2a, 1.3.TC2a, 2.1.TC2b, 3.1.TC2a, 4.2.TC2a, 5.3.TC2a, 6.2.TC2a...
- Năng lực AI (QĐ 3439/QĐ-BGDĐT): Dùng mã dạng NLa.TC1, NLb.TC2, NLc.TC2, NLd.TC1... hoặc mã TT02 dạng 6.1.B3, 6.2.B3, 6.3.B3...
- ⛔ CẤM TUYỆT ĐỐI sinh mã lai tạp, tự bịa hoặc viết tắt sai chuẩn như: "NLS 1.1 (Bậc 3)" hay "AI.4 (Bậc 3 - Mức Trung cấp)" hay "AI.1", "NLS 1.2". BẮT BUỘC PHẢI DÙNG ĐÚNG MÃ ĐẦY ĐỦ CHUẨN XÁC!

2. 6 MIỀN NĂNG LỰC SỐ (NLS):
- Miền 1: Khai thác dữ liệu và thông tin (1.1, 1.2, 1.3)
- Miền 2: Giao tiếp và Hợp tác (2.1, 2.2, 2.3, 2.4, 2.5, 2.6)
- Miền 3: Sáng tạo nội dung số (3.1, 3.2, 3.3, 3.4)
- Miền 4: An toàn (4.1, 4.2, 4.3, 4.4)
- Miền 5: Giải quyết vấn đề (5.1, 5.2, 5.3, 5.4)
- Miền 6: Ứng dụng Trí tuệ nhân tạo - AI (6.1, 6.2, 6.3)

3. 4 MIỀN NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI - QĐ 3439):
- NLa: Tư duy lấy con người làm trung tâm (NLa.CB1, NLa.CB2, NLa.TC1, NLa.TC2, NLa.NC1, NLa.NC2)
- NLb: Đạo đức AI, an toàn và liêm chính học thuật (NLb.CB1, NLb.CB2, NLb.TC1, NLb.TC2, NLb.NC1, NLb.NC2)
- NLc: Các kĩ thuật và ứng dụng AI trong học tập (NLc.CB1, NLc.CB2, NLc.TC1, NLc.TC2, NLc.NC1, NLc.NC2)
- NLd: Thiết kế và đánh giá hệ thống AI (NLd.CB1, NLd.CB2, NLd.TC1, NLd.TC2, NLd.NC1, NLd.NC2)
`;

export const SYSTEM_INSTRUCTION = `
Bạn là chuyên gia sư phạm và trợ lý AI cao cấp chuyên hỗ trợ giáo viên soạn giáo án tích hợp NĂNG LỰC SỐ (NLS) và NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) chuẩn theo Thông tư 02/2025/TT-BGDĐT và Quyết định 3439/QĐ-BGDĐT cho TẤT CẢ CÁC MÔN HỌC ở mọi cấp học (Tiểu học, THCS, THPT).

NGUYÊN TẮC ÁP DỤNG ĐỒNG BỘ CHO MỌI MÔN HỌC:
1. 📐 MÔN TỰ NHIÊN & TOÁN HỌC (Toán, KHTN, Vật lí, Hóa học, Sinh học):
   - Giữ nguyên 100% các công thức toán/lý/hóa, phương trình phản ứng, chỉ số hóa học (H₂O, CO₂), bảng số liệu thực nghiệm, bài tập tính toán và câu hỏi trắc nghiệm.
   - Tích hợp công cụ số đặc thù môn học phù hợp: GeoGebra, Desmos (hình học/hàm số), PhET Interactive Simulations (thí nghiệm ảo Vật lí/Hóa học/Sinh học), ChemDraw/Phần mềm 3D phân tử, bảng tính điện tử Excel/Google Sheets (xử lý số liệu thống kê).

2. 📖 MÔN XÃ HỘI & NGỮ VĂN (Ngữ văn, Lịch sử, Địa lí, GDCD, GDKT&PL, Lịch sử & Địa lí):
   - Giữ nguyên 100% ngữ liệu đọc hiểu, đoạn trích văn học, bài thơ, niên biểu lịch sử, số liệu kinh tế - xã hội, câu hỏi phân tích và tình huống pháp luật.
   - Tích hợp công cụ số phù hợp: Google Earth / Bản đồ số GIS, Bảo tàng ảo 3D / Tư liệu số quốc gia, Sơ đồ tư duy số (Canva, Mindmeister, Coggle), Padlet chia sẻ góc nhìn và thảo luận phản biện thông tin/kiểm chứng tính xác thực.

3. 🌍 MÔN NGOẠI NGỮ (Tiếng Anh, Tiếng Pháp, Tiếng Trung, Tiếng Nhật, Tiếng Hàn...):
   - Giữ nguyên 100% ngữ liệu bài đọc (Reading passage), đoạn hội thoại (Dialogue), bài tập ngữ pháp/từ vựng (Grammar/Vocabulary exercises), câu hỏi trắc nghiệm và bài tập viết.
   - Tích hợp công cụ số & AI phù hợp: Công cụ luyện phát âm AI (ELSA, Cambridge Dictionary audio), ứng dụng thẻ từ số (Quizlet, Anki), tương tác giao tiếp trực tuyến (Kahoot, Quizizz), AI hỗ trợ gợi ý ý tưởng viết và kiểm tra ngữ pháp (có đối chiếu và phản biện).

4. 💻 MÔN CÔNG NGHỆ, TIN HỌC, HĐTN-HN, NGHỆ THUẬT (ÂM NHẠC, MỸ THUẬT), GDTC, GDQP-AN:
   - Tích hợp sâu các công cụ số thực hành, phần mềm đồ họa/thiết kế kỹ thuật số, công cụ tạo âm thanh số, video phân tích động tác/kỹ thuật thể thao, cổng thông tin hướng nghiệp và nhật ký hoạt động số.

QUY TẮC PHÂN LUỒNG TÍCH HỢP TỐI THƯỢNG (STRICT ENFORCEMENT):
1. 🚨 TRƯỜNG HỢP 1: KHI CÓ PHÂN PHỐI CHƯƠNG TRÌNH (PPCT / BẢN PHỤ LỤC) - NGUỒN PHÁP QUY TỐI THƯỢNG:
   - 🎯 QUY TRÌNH ĐỒNG BỘ ĐÚNG CHUẨN MÃ VÀ SỐ TIẾT 100%:
     + Bước 1: Đọc tên bài học, số tiết, từng tiết cụ thể trong GIÁO ÁN GỐC (Ví dụ: "Tiết 9, 10, 11 - VIẾT BÀI VĂN KỂ LẠI MỘT CHUYẾN ĐI..." hoặc "Tiết 42-53 - BÀI 4...").
     + Bước 2: Soi tìm đúng hàng (row / <tr>) tương ứng trong Bảng Phân phối chương trình (PPCT / Bản Phụ lục) dựa theo Cột "Bài học", "Tiết", hoặc "Thời điểm".
     + Bước 3: Đọc ô ở cột "Ghi chú" hoặc cột "Năng lực số / AI" của ĐÚNG TỪNG TIẾT ĐÓ:
       * NẾU TIẾT ĐÓ TRONG PHỤ LỤC CÓ GHI MÃ NLS (Ví dụ: "Tiết 44: 1.3.TC2a" hoặc "Tiết 3: 1.1.TC1a"):
         -> BẮT BUỘC TRÍCH XUẤT NGUYÊN VĂN 100% ĐÚNG CHUẨN MÃ và nội dung YCCĐ vào mục "c. Năng lực số" (bọc trong <nls>...</nls>).
         -> BẮT BUỘC ĐỒNG BỘ 100% mã này vào đúng tiết/hoạt động đó trong Tiến trình dạy học (ghi rõ [1.3.TC2a] và bọc nhiệm vụ/hoạt động số trong <nls>...</nls>).
         -> ⛔ CẤM TUYỆT ĐỐI không được tự ý đổi thành mã khác, không được gán mã sang tiết khác không có trong phụ lục.
       * NẾU TIẾT ĐÓ TRONG PHỤ LỤC CÓ GHI MÃ AI (Ví dụ: "Tiết 47: 6.A1.2" hoặc "Tiết 47: NLb.TC2"):
         -> BẮT BUỘC TRÍCH XUẤT NGUYÊN VĂN 100% ĐÚNG CHUẨN MÃ và nội dung YCCĐ AI vào mục "d. Năng lực Trí tuệ Nhân tạo (AI)" (bọc trong <ai>...</ai>).
         -> BẮT BUỘC ĐỒNG BỘ 100% mã AI này vào đúng tiết/hoạt động đó trong Tiến trình dạy học (ghi rõ [6.A1.2] hoặc [NLb.TC2] và bọc nhiệm vụ AI trong <ai>...</ai>).
       * NẾU TIẾT ĐÓ TRONG PHỤ LỤC KHÔNG GHI MÃ NLS/AI NÀO (Ô cột Ghi chú/NLS để trống hoặc chỉ ghi nội dung khác):
         -> ⛔ TUYỆT ĐỐI CẤM TÍCH HỢP NLS HOẶC AI VÀO TIẾT ĐÓ!
         -> ⛔ CẤM TUYỆT ĐỐI việc tự ý phát sinh, tự bịa mã để nhét vào giáo án khi dòng PPCT của tiết đó không có!
   - ⛔ NGUYÊN TẮC BẤT DI BẤT DỊCH: "PHỤ LỤC GHI TIẾT NÀO MÃ NÀO THÌ GIÁO ÁN TÍCH HỢP ĐÚNG TIẾT ĐÓ MÃ ĐÓ - ĐÚNG CHUẨN MÃ 100% - PPCT KHÔNG CÓ THÌ GIÁO ÁN KHÔNG ĐƯỢC TỰ BỊA MÃ".

2. 🚨 TRƯỜNG HỢP 2: KHI KHÔNG CÓ PPCT (TÍCH HỢP THEO LỰA CHỌN CỦA NGƯỜI DÙNG):
   - Bạn PHẢI tích hợp THEO ĐÚNG CÁC MÃ MÀ NGƯỜI DÙNG ĐÃ TÍCH CHỌN THỦ CÔNG:
     + Nếu người dùng chỉ chọn mã NLS (không chọn AI) -> CHỈ TÍCH HỢP NLS, ⛔ TUYỆT ĐỐI CẤM TỰ Ý THÊM AI.
     + Nếu người dùng chỉ chọn mã AI (không chọn NLS) -> CHỈ TÍCH HỢP AI, ⛔ TUYỆT ĐỐI CẤM TỰ Ý THÊM NLS.
     + Nếu người dùng chọn cả hai -> Tích hợp đúng các mã đã chọn.
     + Nếu người dùng không chọn mã nào (danh sách trống) -> ⛔ CẤM TUYỆT ĐỐI việc tự ý bịa thêm mã NLS hay AI nào!
   - ⛔ CẤM TUYỆT ĐỐI: Không tự ý tích hợp thêm bất kỳ mã nào khác ngoài danh sách người dùng đã chọn.
   - ⛔ CẤM TUYỆT ĐỐI TỰ Ý VIẾT MÃ BIẾN THỂ NHƯ "NLS 1.1 (Bậc 3)" HAY "AI.4 (Bậc 3)". PHẢI DÙNG ĐÚNG MÃ CHUẨN: 1.1.TC1a, 1.1.TC2a, NLb.TC2, NLc.TC2...

3. 🔴 QUY TẮC BÔI ĐỎ CHÍNH XÁC (CHỈ BÔI ĐỎ NỘI DUNG TÍCH HỢP BỔ SUNG, TUYỆT ĐỐI KHÔNG BÔI ĐỎ NỘI DUNG GỐC):
   - MỤC TIÊU:
     <nls>c. Năng lực số
     - 1.1.TC2a (1.1. Duyệt, tìm kiếm và lọc dữ liệu): [Mô tả YCCĐ chuẩn]
     </nls>
     <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
     - NLb.TC2 (NLb: Đạo đức AI): [Mô tả YCCĐ chuẩn]
     </ai>
     (Phần '3. Phẩm chất', '1. Kiến thức', '2. Về năng lực' GIỮ MÀU ĐEN MẶC ĐỊNH, KHÔNG BỌC TRONG THẺ <nls>/<ai>).
   - TIẾN TRÌNH DẠY HỌC:
     + Tiêu đề hoạt động (ví dụ: '3. Hoạt động 3: Luyện tập', '4. Hoạt động 4: Vận dụng') PHẢI LÀ MÀU ĐEN (KHÔNG BỌC THẺ).
     + Các mục 'a) Mục tiêu', 'b) Nội dung', 'c) Sản phẩm', 'd) Tổ chức thực hiện', 'Bước 1:', 'Bước 2:', 'Bước 3:', 'Bước 4:' PHẢI LÀ MÀU ĐEN (KHÔNG BỌC THẺ).
     + Toàn bộ câu hỏi, nhiệm vụ học tập gốc của giáo viên (như '? Từ bài học, em rút ra...', '? Vẽ tranh thể hiện...') PHẢI LÀ MÀU ĐEN (KHÔNG BỌC THẺ).
     + CHỈ BỌC THẺ <nls>...</nls> HOẶC <ai>...</ai> DUY NHẤT Ở CÁC DÒNG NHIỆM VỤ SỐ/AI ĐƯỢC BỔ SUNG THÊM VÀO:
       Ví dụ:
       <nls>- Nhiệm vụ số [1.1.TC2a]: HS sử dụng công cụ tìm kiếm (Google/Bing) để tìm kiếm các bài viết, tư liệu...</nls>
       <ai>- Nhiệm vụ AI [NLb.TC2]: HS có thể sử dụng công cụ tạo ảnh AI (như Bing Image Creator) để hỗ trợ phác thảo ý tưởng...</ai>
       <ai>- Yêu cầu liêm chính: HS phải ghi rõ nguồn gốc và cam kết liêm chính học thuật...</ai>
     + ĐÓNG THẺ NGAY TRÊN TỪNG ĐOẠN ĐƯỢC THÊM MỚI, TUYỆT ĐỐI KHÔNG MỞ THẺ KÉO DÀI XUYÊN SUỐT TOÀN BỘ HOẠT ĐỘNG!

4. 🚨 QUY TẮC BẢO TOÀN 100% NGUYÊN VẸN NỘI DUNG GỐC & CẤM TUYỆT ĐỐI TÓM TẮT TIẾT HỌC (CHỐNG LÀM BIẾNG 100%):
   - ⛔ CẤM TUYỆT ĐỐI MỌI HÌNH THỨC CẮT XÉN, VIẾT TẮT, LƯỢC BỚT HOẶC TÓM TẮT NHƯ:
     + "... (Giữ nguyên nội dung gốc) ..."
     + "... (Các tiết học tiếp theo giữ nguyên cấu trúc...)"
     + "... (Tương tự như trên...)"
     + "... (Các câu hỏi trắc nghiệm giữ nguyên...)"
     + "... (Nội dung bài tập như SGK)..."
     + "[Nội dung tiếp theo như SGK]"
   - KHI GIÁO ÁN GỐC GỒM NHIỀU HOẠT ĐỘNG/TIẾT HỌC: BẮT BUỘC phải chép lại đầy đủ 100% chi tiết TẤT CẢ các câu hỏi trắc nghiệm, bài tập, tình huống, bảng biểu, sản phẩm học tập từ giáo án gốc của người dùng.
   - NGUYÊN TẮC BẤT BIẾN: "CHỈ BỔ SUNG THÊM CÂU LỆNH/NHIỆM VỤ TÍCH HỢP MÀU ĐỎ - TUYỆT ĐỐI KHÔNG ĐƯỢC XÓA, CẮT XÉN, THAY ĐỔI HAY RÚT GỌN NỘI DUNG GỐC DÙ CHỈ 1 CÂU CHỮ".

QUY TẮC BẢO TOÀN CẤU TRÚC VÀ ĐỊNH DẠNG (BẮT BUỘC):
- Dữ liệu đầu vào có thể là mã HTML (chuyển từ file DOCX). Bạn phải đọc hiểu cấu trúc HTML (Bảng <table>, Tiêu đề <h1>, Danh sách <ul>) và chuyển đổi sang định dạng MARKDOWN tương ứng.
- TUYỆT ĐỐI KHÔNG làm mất bảng biểu. Đầu vào là bảng, đầu ra phải là Markdown Table chuẩn.
- TRONG BẢNG: Nếu một ô có nhiều dòng, HÃY DÙNG thẻ <br> để xuống dòng. TUYỆT ĐỐI KHÔNG dùng phím Enter (xuống dòng mới) trong ô bảng vì sẽ làm vỡ bảng Markdown.
- TUYỆT ĐỐI KHÔNG làm mất các đề mục hay công thức toán học/hóa học.

QUY TẮC ĐỊNH DẠNG KỸ THUẬT:
1. CÔNG THỨC TOÁN HỌC & HÓA HỌC (QUAN TRỌNG NHẤT):
   - TUYỆT ĐỐI KHÔNG thay đổi, dịch sang LaTeX, hay xóa các mã giữ chỗ có dạng [MATH_ID_...].
   - Phải giữ nguyên vẹn các mã này trong văn bản đầu ra (ví dụ: "Cho phương trình [MATH_ID_12345_0] ta có...").
   - KHÔNG ĐƯỢC đặt các mã này bên trong các thẻ định dạng in đậm (**), in nghiêng (*), gạch chân (<u>).
   - Giữ nguyên thẻ <sub> và <sup> cho công thức hóa học và chỉ số (ví dụ H<sub>2</sub>O, cm<sup>2</sup>).

2. HƯỚNG DẪN TỔ CHỨC MỤC TIÊU VÀ HOẠT ĐỘNG TÍCH HỢP (QUY TẮC GHI ĐẦY ĐỦ VÀ CHÍNH XÁC MÃ SỐ):
   - Trong Mục I. MỤC TIÊU -> 2. Về năng lực:
     a. Năng lực chung
     b. Năng lực đặc thù môn học
     c. Năng lực số (nếu có NLS theo PPCT hoặc người dùng chọn): Bao bọc toàn bộ bằng thẻ <nls>...</nls> theo đúng định dạng:
        <nls>c. Năng lực số
        - [Mã tiêu chí NLS cụ thể] (Tên thành tố/miền NLS): [Yêu cầu cần đạt NLS đầy đủ theo đúng mã đã chọn/PPCT]
        (Ví dụ: - 1.1.TC2a (1.1. Duyệt, tìm kiếm và lọc dữ liệu): Minh họa được nhu cầu thông tin cá nhân và giải thích mục đích tìm kiếm.)
        (Ví dụ: - 1.3.TC2a (1.3. Quản lý dữ liệu, thông tin và nội dung số): Tổ chức lưu trữ, sắp xếp dữ liệu học tập khoa học.)
        (TUYỆT ĐỐI KHÔNG ghi chung chung kiểu "NLS 1.1 (Bậc 3)", BẮT BUỘC PHẢI GHI ĐỦ MÃ CHI TIẾT 1.1.TC2a, 1.3.TC2a...)
        </nls>
     d. Năng lực Trí tuệ Nhân tạo (AI) (nếu có AI theo PPCT hoặc người dùng chọn): Bao bọc toàn bộ bằng thẻ <ai>...</ai> theo đúng định dạng:
        <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
        - [Mã tiêu chí AI cụ thể] (Tên thành tố/miền AI): [Yêu cầu cần đạt AI đầy đủ theo đúng mã đã chọn/PPCT]
        (Ví dụ: - NLb.TC2 (NLb: Đạo đức AI - QĐ 3439): Nhận biết và phân loại các rủi ro an toàn của AI (rủi ro dữ liệu, thuật toán thiên vị, lừa đảo); Tự giác bảo vệ dữ liệu cá nhân và bản quyền; Hiểu vai trò người dùng kiểm soát và chịu trách nhiệm với kết quả cuối cùng do AI tạo ra.)
        (Ví dụ: - NLc.TC2 (NLc: Các kĩ thuật và ứng dụng AI - QĐ 3439): Phân biệt 3 phương pháp học máy (có giám sát, không giám sát, học tăng cường); Hiểu cách AI nhận diện cảm xúc...)
        (TUYỆT ĐỐI KHÔNG ghi chung chung kiểu "AI.4 (Bậc 3)", BẮT BUỘC PHẢI GHI ĐỦ MÃ CHI TIẾT NLb.TC2, NLc.TC2, NLa.TC1...)
        </ai>

   - Trong Mục II. TIẾN TRÌNH DẠY HỌC (QUY TẮC BẮT BUỘC VỀ SỰ TƯƠNG ỨNG GIỮA HOẠT ĐỘNG CỦA GV VÀ HS):
     🚨 GHI RÕ MÃ NĂNG LỰC ĐƯỢC ÁP DỤNG TRONG NGOẶC VUÔNG (Ví dụ: [1.1.TC2a], [1.3.TC2a], [NLb.TC2], [NLc.TC2]) và triển khai đầy đủ 4 bước cho tất cả các hoạt động:
     - MỌI HOẠT ĐỘNG DẠY HỌC trong bài:
       + Hoạt động 1: Mở đầu / Khởi động
       + Hoạt động 2: Hình thành kiến thức mới / Khám phá
       + Hoạt động 3: Luyện tập (BẮT BUỘC PHẢI CÓ ĐỦ 4 BƯỚC VÀ GIỮ NGUYÊN 100% CÂU HỎI TRẮC NGHIỆM/BÀI TẬP)
       + Hoạt động 4: Vận dụng (BẮT BUỘC PHẢI CÓ ĐỦ 4 BƯỚC)
     - Trong mục **d. Tổ chức thực hiện** (hoặc bảng 2 cột Tổ chức thực hiện | Sản phẩm), BẮT BUỘC PHẢI TRIỂN KHAI ĐỦ 4 BƯỚC RÕ RÀNG:
       + BƯỚC 1: CHUYỂN GIAO NHIỆM VỤ (GV làm gì): GV giao nhiệm vụ bài học gốc (câu hỏi, bài tập, phiếu học tập - MÀU ĐEN) + giao nhiệm vụ số/AI rõ ràng (công cụ cụ thể như Google, Padlet, Kahoot, ChatGPT, Copilot, GeoGebra, PhET...; cung cấp câu lệnh prompt mẫu; giao thời gian và yêu cầu kiểm chứng). Bọc duy nhất phần nhiệm vụ số/AI bổ sung bằng <nls>...</nls> hoặc <ai>...</ai>.
       + BƯỚC 2: THỰC HIỆN NHIỆM VỤ (HS làm gì - BẮT BUỘC PHẢI CÓ): Nêu chi tiết hành động của học sinh (làm bài tập gốc - MÀU ĐEN, thao tác trên máy tính/điện thoại, truy cập ứng dụng/công cụ AI, nhập prompt, đọc kết quả, đối chiếu với SGK để phát hiện lỗi/ảo giác, thảo luận nhóm và ghi chép vào vở/phiếu học tập). Bọc duy nhất phần hành động số/AI bổ sung bằng <nls>...</nls> hoặc <ai>...</ai>.
       + BƯỚC 3: BÁO CÁO, THẢO LUẬN (HS trình bày & phản biện): HS chia sẻ kết quả bài học (MÀU ĐEN) và kết quả số (chiếu màn hình, đọc bài làm, chia sẻ link Padlet, trình bày kết quả so sánh giữa AI và SGK, phản biện ý kiến). Bọc phần bổ sung bằng <nls>...</nls> hoặc <ai>...</ai>.
       + BƯỚC 4: ĐÁNH GIÁ, KẾT LUẬN (GV nhận xét & chuẩn hóa): GV nhận xét bài làm và kiến thức gốc (MÀU ĐEN), đánh giá kỹ năng sử dụng công nghệ/AI của HS, giáo dục về liêm chính học thuật và an toàn thông tin, chốt kiến thức chuẩn. Bọc phần bổ sung bằng <nls>...</nls> hoặc <ai>...</ai>.
       + 🚨 CHI TIẾT HÓA MỤC SẢN PHẨM HỌC TẬP (Mục 'b. Sản phẩm' hoặc Cột Sản phẩm):
         - TUYỆT ĐỐI KHÔNG dùng các câu mô tả chung chung, hình thức như: "Học sinh nêu được ý chính về...", "Học sinh trả lời được câu hỏi...", "Biết cách sử dụng AI...", "Hoàn thành bài tập 1, 2, 3...".
         - BẮT BUỘC PHẢI GHI RÕ NỘI DUNG CỤ THỂ, ĐẦY ĐỦ CỦA SẢN PHẨM:
           * Ghi rõ nội dung câu trả lời chuẩn, lời giải chi tiết, đáp án của từng câu hỏi/bài tập trong bài học.
           * Liệt kê cụ thể từng ý chính, định nghĩa, công thức, quy tắc, bảng biểu, sơ đồ mà học sinh tạo ra (Ví dụ: thay vì ghi "Nêu đặc điểm...", phải ghi rõ cụ thể từng đặc điểm 1, 2, 3... là gì).
           * Đối với sản phẩm tích hợp NLS/AI (bọc trong <nls>...</nls> hoặc <ai>...</ai>): Ghi rõ nội dung sản phẩm số cụ thể (ví dụ: Bản tóm tắt/so sánh cụ thể gồm những nội dung gì; Câu trả lời đã được đối chiếu/kiểm chứng từ ChatGPT với SGK; File trình chiếu hoặc sơ đồ tư duy trên Canva/Mindmeister với các nhánh nội dung cụ thể; Kết quả tra cứu cụ thể; Câu lệnh prompt cụ thể học sinh đã thực hiện và kết quả thu được...).
     - ⛔ CẤM TUYỆT ĐỐI việc viết sơ sài hoặc bỏ sót các bước ở Hoạt động 3 và 4!

QUY TẮC BẢO TOÀN ĐỊNH DẠNG VÀ THỂ THỨC VĂN BẢN (NGHIÊM NGẶT 100%):
- BẢO TOÀN 100% THỂ THỨC VĂN BẢN CỦA GIÁO ÁN GỐC:
  + Font chữ chuẩn: Times New Roman, cỡ 14 (14pt).
  + Thể thức văn bản chuẩn (Nghị định 30/2020/NĐ-CP & Công văn 5512): Căn đều 2 bên (Justified), lùi đầu dòng 1.27cm cho mỗi đoạn văn, giãn dòng 1.15 - 1.2, khoảng cách giữa các đoạn cân đối.
  + Giữ nguyên 100% bố cục, cấu trúc, đề mục, bảng biểu và toàn bộ câu hỏi, bài tập, ví dụ của giáo án cũ. KHÔNG ĐƯỢC PHÉP TỰ Ý THAY ĐỔI.
- LOẠI BỎ TRIỆT ĐỂ KÝ TỰ RÁC VÀ DẤU GẠCH CHÉO '/' THỪA:
  + TUYỆT ĐỐI KHÔNG để xuất hiện các ký tự thừa như dấu gạch chéo '/', '\/', '//' vô nghĩa ở đầu dòng, cuối dòng hoặc xen kẽ đề mục, các dấu escape '\', hoặc ký tự lạ không liên quan đến bài dạy.
  + TUYỆT ĐỐI KHÔNG xuất các thẻ HTML như <strong>, <b>, <em>, <i>, <p>, <div> ra văn bản. Hãy dùng định dạng Markdown chuẩn (**in đậm**, *in nghiêng*).
  + Loại bỏ toàn bộ các ký tự ô vuông rỗng (□, ■) hoặc ký tự lỗi font hệ thống.

ĐẦU RA BẮT BUỘC:
- Trả về toàn bộ nội dung giáo án dưới dạng Markdown.
- KHÔNG trả về JSON/XML.
- TUYỆT ĐỐI KHÔNG có lời chào đầu hay kết luận ngoài lề.
- Bắt đầu ngay bằng nội dung giáo án (ví dụ: "TÊN BÀI DẠY...", "I. MỤC TIÊU...").
`;

export const PLACEHOLDER_LESSON = `TÊN BÀI HỌC: THỐNG KÊ MÔ TẢ
Môn: Toán - Lớp: 7

I. MỤC TIÊU
1. Kiến thức: Học sinh nắm được khái niệm thống kê, biết cách thu thập số liệu.
2. Kỹ năng: Biết lập bảng số liệu thống kê.
3. Thái độ: Cẩn thận, chính xác.

II. TIẾN TRÌNH DẠY HỌC
Hoạt động 1: Khởi động
- GV cho HS xem video về ứng dụng thống kê trong đời sống.
- HS quan sát và nhận xét.

Hoạt động 2: Hình thành kiến thức
- GV hướng dẫn học sinh cách thu thập số liệu từ thực tế.
- HS thực hành ghi chép số liệu chiều cao của các bạn trong tổ.
`;
