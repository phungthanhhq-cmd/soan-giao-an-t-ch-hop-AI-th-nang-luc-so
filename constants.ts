
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

// Khung năng lực Trí tuệ Nhân tạo (AI) theo Quyết định 3439/QĐ-BGDĐT & Thông tư 02/2025/TT-BGDĐT
export const AI_COMPONENT_OPTIONS = [
  { code: "NLa", label: "NLa: Tư duy lấy con người làm trung tâm (QĐ 3439)" },
  { code: "NLb", label: "NLb: Đạo đức AI (QĐ 3439)" },
  { code: "NLc", label: "NLc: Các kĩ thuật và ứng dụng AI (QĐ 3439)" },
  { code: "NLd", label: "NLd: Thiết kế hệ thống AI (QĐ 3439)" },
  { code: "6.1", label: "6.1. Hiểu biết về trí tuệ nhân tạo (TT 02)" },
  { code: "6.2", label: "6.2. Sử dụng trí tuệ nhân tạo có đạo đức và trách nhiệm (TT 02)" },
  { code: "6.3", label: "6.3. Đánh giá các công cụ AI (TT 02)" },
];

export const AI_LEVEL_DETAILS: Record<string, { code: string; desc: string; level: number }[]> = {
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

// Toàn bộ yêu cầu cần đạt chi tiết cho từng lớp 1 - 12 chuẩn theo Quyết định số 3439/QĐ-BGDĐT
export const AI_ALL_GRADE_REQUIREMENTS: Record<number, { code: string; desc: string; domainCode: string; domainLabel: string }[]> = {
  1: [
    { code: "A1.L1.1", desc: "Nhận biết và mô tả được rằng con người có nhiều loại cảm xúc khác nhau; Biết cảm xúc là đặc trưng của con người; Biết AI không có cảm xúc thật, chỉ mô phỏng qua dữ liệu.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A1.L1.2", desc: "Biết rằng việc AI thể hiện cảm xúc (cười, buồn, ngạc nhiên) là do con người lập trình/thiết kế trước; Nêu ví dụ minh họa (robot, trợ lý ảo).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L1.1", desc: "Nhận biết và kể tên sản phẩm/thiết bị có AI trong cuộc sống (loa thông minh, trợ lý ảo, robot hút bụi, xe tự lái, nhận diện khuôn mặt).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B1.L1.1", desc: "Nhận biết và nêu ví dụ một số hành vi sử dụng AI có thể gây hại cho người khác.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L1.1", desc: "Biết không được phép sử dụng AI với mục đích làm hại người khác; Nêu ví dụ con người sử dụng AI đúng cách, vì mục đích tốt đẹp.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C1.L1.1", desc: "Nhận biết AI trong một số ví dụ cụ thể; Nhận diện công cụ AI quen thuộc trên điện thoại/máy tính bảng (trợ lý ảo, nhận diện khuôn mặt).", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C1.L1.2", desc: "Nhận biết thiết bị AI có bộ phận giống con người (camera là mắt, micro là tai); Hiểu AI có khả năng hiểu mệnh lệnh đơn giản, xử lý hình ảnh và âm thanh.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L1.1", desc: "Nêu ví dụ tình huống AI học từ hình ảnh hoặc thông tin con người cung cấp (nhận biết con mèo, quả táo); Trình bày cần nhiều ví dụ đúng để AI học.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L1.1", desc: "Nhận biết và so sánh các loại máy thông minh (loại làm 1 việc như nhận diện hình ảnh, loại làm nhiều việc như nghe-trả lời-làm theo lệnh).", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  2: [
    { code: "A1.L2.1", desc: "Nhận biết tình huống AI hỗ trợ hiệu quả (dịch ngôn ngữ, tìm kiếm thông tin, phát hiện lỗi chính tả) và tình huống không nên dùng AI (làm lộ thông tin cá nhân, thay thế cảm xúc).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A1.L2.2", desc: "Nêu ví dụ tình huống cần con người giám sát AI (xe tự lái, bác sĩ kiểm tra kết quả AI); Thể hiện thái độ đúng đắn, có trách nhiệm và sự kiểm soát của con người.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L2.1", desc: "Nhận biết thiết bị AI trong gia đình (loa thông minh, robot hút bụi, điều hòa tự chỉnh nhiệt độ, camera); Hiểu mục đích hỗ trợ con người, an toàn, tiện nghi.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L2.1", desc: "Mô tả mỗi lần tương tác với AI thì AI sẽ ghi nhận dữ liệu để học hỏi; Hiểu vai trò con người 'dạy' AI qua phản hồi đúng, lịch sự và có trách nhiệm.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B1.L2.1", desc: "Nhận biết AI có thể thiên kiến, đối xử không công bằng nếu dữ liệu chưa đa dạng hoặc chưa công bằng.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L2.1", desc: "Nhận biết và nêu ví dụ về quyền sở hữu đối với sản phẩm do con người hoặc AI tạo ra.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C1.L2.1", desc: "So sánh cơ bản giữa cách học của con người và AI; Giải thích dữ liệu là các ví dụ (hình ảnh, âm thanh) dùng để dạy AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C3.L2.1", desc: "Biết AI phân loại đồ vật bằng công cụ mã nguồn mở/miễn phí (Teachable Machine, Google Colab); So sánh với con người và biết AI có thể phân loại sai.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L2.1", desc: "Nêu vấn đề đơn giản trong đời sống áp dụng AI giải quyết; Thực hành lựa chọn ví dụ phù hợp để 'dạy' AI.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L2.1", desc: "Giải thích vai trò dữ liệu chính xác, rõ ràng để AI đưa ra kết quả đúng; Thực hành lựa chọn ví dụ dạy AI trong tình huống cụ thể.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  3: [
    { code: "A1.L3.1", desc: "Nêu cách AI hỗ trợ học sinh học tập (trợ lý học tập thông minh, học ngôn ngữ); Hiểu hậu quả phụ thuộc quá mức vào AI; Phân biệt sử dụng AI chủ động vs thụ động.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A1.L3.2", desc: "Giải thích cần suy nghĩ kỹ trước khi dùng AI vì AI không luôn đúng và không hiểu giá trị đạo đức; Phòng tránh rủi ro, bảo vệ an toàn và quyền riêng tư.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L3.1", desc: "Nhận biết ứng dụng AI trong trường học (bảng thông minh, chấm bài, nhận dạng chữ viết); Hỗ trợ cá nhân hóa việc học và tăng hứng thú học tập.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L3.1", desc: "Nêu ví dụ cụ thể AI có thể sai (dịch sai, nhận diện nhầm, chatbot đưa tin sai); Cần kiểm tra lại, so sánh nhiều nguồn và xác minh với thầy cô.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B2.L3.1", desc: "Nhận biết và nêu ví dụ thông tin hoặc sản phẩm do AI tạo ra có thể không đúng với sự thật (phân biệt thật và giả).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L3.1", desc: "Cung cấp dữ liệu đúng và đa dạng để AI hoạt động chính xác, công bằng; Tuyệt đối không tạo hoặc dùng AI cho mục đích xấu (lừa đảo, bắt nạt).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C4.L3.1", desc: "Hiểu khái niệm dữ liệu học máy thông qua ví dụ; Phân biệt đặc trưng và thuộc tính của dữ liệu.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C5.L3.1", desc: "Hiểu cấu trúc nếu... thì... trong giải quyết tình huống hoặc phân loại bằng AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C5.L3.2", desc: "Hiểu đặc điểm học trên dữ liệu; Nêu tình huống áp dụng học máy (nông trại thông minh, dự báo lũ, nhận dạng tiếng nói); Biết bài toán phân loại và dự đoán qua Teachable Machine/Google Colab.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L3.1", desc: "Trình bày quá trình đơn giản để huấn luyện AI: thu thập ví dụ và cho AI học từ các ví dụ đó.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L3.1", desc: "Nêu yêu cầu cơ bản đối với dữ liệu huấn luyện AI; Giải thích nếu dữ liệu sai hoặc không tốt thì AI sẽ không hiệu quả hoặc hoạt động sai.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  4: [
    { code: "A1.L4.1", desc: "Nêu lĩnh vực AI hỗ trợ (nông nghiệp, y tế, giao thông, phát hiện sâu bệnh, dự báo thời tiết, thu hoạch tự động).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A1.L4.2", desc: "Hiểu AI hỗ trợ tra cứu, gợi ý ý tưởng, sửa lỗi nhưng không thể thay thế tư duy, cảm xúc, sáng tạo; Người học cần tự suy nghĩ, hiểu bài thay vì chỉ chép kết quả AI.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L4.1", desc: "Hiểu AI giúp giải quyết vấn đề, nâng cao chất lượng sống; Nhận biết AI hỗ trợ người lao động, người yếu thế trong xã hội.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L4.1", desc: "Biết quyết định dùng AI phụ thuộc mục đích và an toàn; Có quyền từ chối hoặc dừng sử dụng nếu AI gây rủi ro, xâm phạm quyền riêng tư hoặc đạo đức.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B2.L4.1", desc: "Biết chia sẻ thông tin cá nhân (họ tên, SĐT, địa chỉ, mật khẩu, ảnh) cho AI có thể bị lộ/lợi dụng; Nêu ví dụ thông tin cần giữ bí mật.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C2.L4.1", desc: "Trình bày ứng dụng AI gần gũi ở Việt Nam: AI trong nông nghiệp, giáo dục, dự báo lũ, dịch ngôn ngữ dân tộc...", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C5.L4.1", desc: "Làm quen các công cụ trải nghiệm AI trực quan dựa trên học máy có giám sát (Teachable Machine, extension 'ML for Kids' trong Scratch).", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L4.1", desc: "Nêu ví dụ vấn đề giải quyết bằng AI gần gũi ở Việt Nam; Nêu ý tưởng cách AI học hoặc giúp giải quyết vấn đề đó.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L4.1", desc: "Trình bày con người cần liên tục đánh giá và nâng cấp sản phẩm để hệ thống AI cho ra kết quả tốt hơn.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  5: [
    { code: "A1.L5.1", desc: "Mô tả AI thực hiện việc lặp lại, nguy hiểm, chính xác cao (robot lắp ráp, kiểm tra lỗi sản xuất, xe tự lái); Hiểu AI không hiểu hậu quả/đạo đức nên con người chịu trách nhiệm cuối cùng.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L5.1", desc: "Hiểu mục đích AI là hỗ trợ con người, không thay thế vai trò/cảm xúc/quyết định đạo đức của con người; Nêu ví dụ AI mang lại lợi ích y tế, giáo dục, môi trường.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L5.1", desc: "Hiểu mọi người cần biết cách dùng AI an toàn, hiệu quả; Tránh lạm dụng hoặc tin tưởng tuyệt đối vào AI.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B1.L5.1", desc: "Hiểu AI cần phục vụ con người công bằng, không phân biệt giới tính, vùng miền, hoàn cảnh.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B2.L5.1", desc: "Nêu cách giúp AI hoạt động công bằng hơn (sử dụng dữ liệu đa dạng, tránh định kiến, kiểm tra lại kết quả).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L5.1", desc: "Giải thích vì sao cần hiểu lý do AI đưa ra quyết định để đảm bảo minh bạch và đáng tin cậy.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C4.L5.1", desc: "Sử dụng cấu trúc nếu... thì... trong lập trình AI đơn giản; Sử dụng công cụ học máy trực quan (Scratch, Teachable Machine).", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L5.1", desc: "Mô tả các bước cơ bản huấn luyện mô hình AI: xác định vấn đề, thu thập dữ liệu, dạy máy học, kiểm tra và đánh giá.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L5.1", desc: "Giải thích bằng ví dụ rằng hệ thống AI được cải tiến khi dữ liệu được bổ sung và cập nhật thường xuyên.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  6: [
    { code: "A1.L6.1", desc: "Giải thích AI không tự sinh ra mà do con người tạo ra, lập trình và điều khiển (trợ lý ảo, robot hút bụi, xe tự lái); AI hoạt động theo lập trình, người dùng quyết định cuối cùng.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L6.1", desc: "Nêu ví dụ ra quyết định có hỗ trợ AI (y tế: chẩn đoán bệnh; giao thông: đề xuất đường đi); AI giúp học hỏi nếu dùng đúng cách.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L6.2", desc: "Hiểu dữ liệu cá nhân là tài sản riêng; Quyền riêng tư là quyền được giữ bí mật thông tin cá nhân, bảo vệ an toàn trên mạng.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B1.L6.1", desc: "Phân tích mặt tích cực và hạn chế của tính năng AI (gợi ý chính xác vs nguy cơ xâm phạm riêng tư).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B2.L6.1", desc: "Nêu các câu hỏi kiểm tra an toàn, minh bạch của ứng dụng AI ('Có an toàn không?', 'Có lấy thông tin cá nhân không?', 'Có tắt được không?').", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C1.L6.1", desc: "Giải thích 2 thành phần chính để dạy AI là Dữ liệu và Thuật toán; Mô tả bước hoạt động chính; Nêu ví dụ tác động tích cực/tiêu cực của AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C2.L6.1", desc: "Trình bày ví dụ công cụ có và không ứng dụng AI ở Việt Nam (nông nghiệp, giáo dục, dự báo lũ, dịch ngôn ngữ); Kể tên công nghệ AI đơn giản (nhận dạng hình ảnh, âm thanh).", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L6.1", desc: "Trình bày ý kiến cá nhân về việc nên/không nên dùng AI trong tình huống thực tế, giải thích lợi ích/tác hại.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L6.1", desc: "Nêu tình huống con người phù hợp hơn AI; Tình huống không nên dùng AI (khi có cách đơn giản hơn hoặc khiến con người lười suy nghĩ).", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  7: [
    { code: "A1.L7.1", desc: "Giải thích lý do con người cần giữ quyền ra quyết định (công bằng, an toàn, nhân phẩm); Nêu hậu quả khi thiếu sự xác thực của con người.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L7.1", desc: "Phân tích tác hại nếu con người để AI quyết định cuối cùng; Nêu hậu quả nếu thiếu quy định pháp lý ngăn chặn công cụ AI có hại.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L7.1", desc: "Biết về xung đột quyền tự chủ con người vs AI (kiểm tra chính tả tự động); Bảo vệ quyền tự chủ của con người khi ra quyết định quan trọng.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B2.L7.1", desc: "Nêu tiêu chí đánh giá mức độ phù hợp, an toàn của ứng dụng AI; Hành động cụ thể (báo cáo lỗi, không dùng ứng dụng độc hại, yêu cầu minh bạch).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L7.1", desc: "Thể hiện thái độ và cam kết cá nhân trong việc sử dụng AI có trách nhiệm qua bài viết, sản phẩm học tập.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C4.L7.1", desc: "Phân tích vấn đề đạo đức từ dữ liệu huấn luyện AI (dữ liệu thiếu đa dạng dẫn đến phân biệt đối xử, xâm phạm riêng tư); Tầm quan trọng của bộ dữ liệu sạch và công bằng.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C5.L7.1", desc: "Trình bày và phân biệt 3 phương pháp học máy (học có giám sát, không giám sát, học tăng cường); Nêu ứng dụng tương ứng.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L7.1", desc: "Nêu ví dụ vấn đề trường học/cộng đồng giải quyết bằng AI; Phân tích tính khả thi (dữ liệu, rủi ro đạo đức, độ phức tạp, chi phí).", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L7.1", desc: "Lập kế hoạch cho dự án sáng tạo có sử dụng AI theo nhóm nhỏ và thực hành tạo sản phẩm đơn giản.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  8: [
    { code: "A1.L8.1", desc: "Nêu lĩnh vực AI không nên thay thế con người (giáo dục, y tế, nghệ thuật); Nhận biết rủi ro lạm dụng AI sáng tạo làm suy giảm tư duy phản biện, sáng tạo.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L8.1", desc: "Giải thích hệ thống AI thu thập dữ liệu có thể thao túng quyết định; Hiểu khái niệm 'lạm dụng AI để kiểm soát người dùng'.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L8.1", desc: "Phân biệt vai trò người dùng và người phát triển AI; Hiểu trách nhiệm pháp lý và trách nhiệm giải trình của con người khi thiết kế/dùng AI.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B1.L8.1", desc: "Nêu rủi ro khi nhận dạng cảm xúc xâm phạm riêng tư, kết luận sai; Phân loại rủi ro (dữ liệu, thuật toán thiên vị, lừa đảo).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B2.L8.1", desc: "Tự giác bảo vệ dữ liệu cá nhân, tôn trọng bản quyền trong dự án AI; Đề xuất cách giảm thiểu rủi ro khi dùng và phát triển AI.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L8.1", desc: "Nêu các vấn đề đạo đức cần lưu ý đối với việc phát triển AI (bảo mật thông tin, không cung cấp thông tin sai lệch, không xúc phạm).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C1.L8.1", desc: "Trình bày cách AI thực hiện các chức năng cơ bản 'đọc', 'nghe', 'nhìn' và công nghệ/kỹ thuật đảm nhiệm.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C5.L8.1", desc: "Nêu cách AI nhận diện cảm xúc dựa vào đặc điểm: nét mặt, từ khóa văn bản/lời nói, ngữ điệu, cử chỉ.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L8.1", desc: "Xác định một vấn đề thực tế có thể giải quyết bằng AI và lập kế hoạch sơ bộ cho dự án tương ứng.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L8.1", desc: "Trình bày ví dụ kịch bản hội thoại chatbot/trợ lý ảo; Mô tả trải nghiệm người dùng (UX) tốt khi tương tác AI; Làm việc nhóm phát triển sản phẩm AI đơn giản.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  9: [
    { code: "A1.L9.1", desc: "Hình thành nhận thức và quan điểm phản biện về thách thức xã hội (ưu tiên tăng tốc đổi mới AI vs hy sinh an toàn người dùng).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L9.1", desc: "Nêu dẫn chứng giải thích tại sao AI có tác động lớn đến xã hội; Giải thích vấn đề 'thiên vị', 'thành kiến' mà AI gây ra.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L9.1", desc: "Định hướng học tập trong kỉ nguyên AI: học cách học suốt đời, tư duy phản biện, giữ vững sáng tạo/cảm xúc con người; Nâng cao kỹ năng hợp tác con người & AI; Định hướng nghề nghiệp tương lai.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B2.L9.1", desc: "Trình bày vai trò người dùng kiểm soát và chịu trách nhiệm với kết quả cuối; Vai trò cá nhân/cộng đồng giám sát, phản hồi, đề xuất giải pháp dùng AI an toàn, công bằng.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L9.1", desc: "Giải thích tầm quan trọng huấn luyện AI không phân biệt đối xử; Nêu cách thu thập dữ liệu công bằng, không bỏ sót/thiên vị.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C2.L9.1", desc: "Đề xuất ý tưởng mới, sáng tạo giải quyết vấn đề bằng AI; Vận dụng tạo công cụ AI đơn giản (chatbot, nhận dạng hình ảnh qua Teachable Machine, QuickDraw, Scratch AI, CoSpaces).", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C3.L9.1", desc: "Thực hiện cải thiện bộ dữ liệu (thêm, xóa, sửa) để nâng cao chất lượng của sản phẩm AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L9.1", desc: "Trình bày vai trò con người là đồng sáng tạo và người dẫn dắt trong thiết kế, vận hành, phát triển hệ thống AI.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L9.1", desc: "Thiết kế và thực hiện kiểm tra đơn giản đánh giá sản phẩm AI, phân tích kết quả và thử nghiệm cải tiến sản phẩm.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  10: [
    { code: "A1.L10.1", desc: "Thực hành xác định vai trò của con người trong sử dụng, vận hành, tùy chỉnh hệ thống AI; Giải thích tầm quan trọng con người kiểm soát AI (an toàn, công bằng, quyền lợi).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L10.1", desc: "Phân tích rủi ro sản phẩm AI với đời sống/xã hội và nêu biện pháp hạn chế thông qua dự án sáng tạo AI.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L10.1", desc: "Kể tên các quy định/luật lệ bảo vệ người dùng trong không gian số (luật an ninh mạng, luật bảo vệ dữ liệu).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B2.L10.1", desc: "Nêu ví dụ hành vi/sự cố do AI gây ra vi phạm quy định nhà trường hoặc pháp luật liên quan CNTT.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L10.1", desc: "Trình bày ví dụ vấn đề đạo đức phát sinh trong thiết kế, vận hành AI (thiên vị dữ liệu, vi phạm quyền riêng tư, thiếu minh bạch).", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C2.L10.1", desc: "Xác định vấn đề thực tế ứng dụng AI ở Việt Nam (nông nghiệp, cộng đồng thiểu số); Liệt kê ứng dụng theo tính năng; Nêu ví dụ AI hỗ trợ học tập.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C3.L10.1", desc: "Mô tả yêu cầu đưa ra prompt phù hợp mục tiêu cụ thể; Trình bày ví dụ mô tả công nghệ thiết kế và tạo AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C4.L10.1", desc: "Phân tích ảnh hưởng của chất lượng dữ liệu đến chất lượng AI; Phân tích các dạng dữ liệu huấn luyện AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L10.1", desc: "Xác định nhiệm vụ/mục tiêu hệ thống AI cần thực hiện, nêu mối liên hệ giữa mục tiêu với thành phần chính.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L10.1", desc: "Mô tả thành phần cơ bản hệ thống AI (dữ liệu, mô hình, thuật toán, đầu ra, phản hồi); Nêu ví dụ vấn đề phát sinh và ý nghĩa khắc phục.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  11: [
    { code: "A1.L11.1", desc: "Thực hành xây dựng quy trình sử dụng sản phẩm AI an toàn; Phân tích tầm quan trọng dùng AI nâng cao năng lực mà vẫn đảm bảo con người kiểm soát.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L11.1", desc: "Nêu ví dụ AI tác động tích cực lâu dài (nông nghiệp, y tế); Phân tích tính bền vững (tiết kiệm năng lượng, bảo vệ môi trường) và công bằng (không phân biệt giới tính, vùng miền, kinh tế).", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L11.1", desc: "Trình bày quyền cơ bản của người dùng dữ liệu (quyền được biết, đồng ý, yêu cầu xóa dữ liệu); Đánh giá mức độ đảm bảo quyền người dùng qua dự án AI.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B2.L11.1", desc: "Nhận biết và phân loại rủi ro/sự cố AI vi phạm quy định nhà trường hoặc pháp luật liên quan.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L11.1", desc: "Xác định và sơ đồ hóa các vấn đề đạo đức có thể phát sinh trong từng bước thiết kế và vận hành AI.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C2.L11.1", desc: "Trình bày cách AI hỗ trợ quá trình học tập và thiết kế công cụ hỗ trợ; Trình bày các tính năng AI mong muốn.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C3.L11.1", desc: "Xác định các prompt nâng cao từ yêu cầu cụ thể; Khám phá cách thức vận hành hệ thống AI; Xác định phương pháp/nhiệm vụ tùy chỉnh hệ thống AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C5.L11.1", desc: "Trình bày kiến thức cơ bản về mạng nơ-ron nhân tạo, thuật toán phân cụm, phân lớp và ý tưởng thực hiện.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L11.1", desc: "Trình bày cách thiết kế và vận hành tổng thể hệ thống AI (mối quan hệ giữa mục tiêu, dữ liệu và các thành phần).", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L11.1", desc: "Trình bày cách vận hành công nghệ trong hệ thống AI; Trình bày cách giải quyết vấn đề phát sinh nhằm tối ưu hóa hiệu quả.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
  ],
  12: [
    { code: "A1.L12.1", desc: "Phân tích hệ thống AI đảm bảo con người kiểm soát ở tất cả các bước quan trọng trong vòng đời AI; Phân tích vai trò con người và AI trong các bước ra quyết định và trách nhiệm giải trình tuân thủ quy định địa phương/quốc tế.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A2.L12.1", desc: "Thực hành soạn thảo bộ nguyên tắc cá nhân khi làm việc với AI: An toàn, Công bằng, Minh bạch, Tôn trọng riêng tư, Trách nhiệm, Lợi ích xã hội.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "A3.L12.1", desc: "Phân tích trách nhiệm công dân trong xã hội AI: Dùng an toàn, trung thực, đạo đức; Tôn trọng riêng tư; Không lan truyền tin sai/gian lận; Xây dựng môi trường số nhân văn.", domainCode: "NLa", domainLabel: "NLa. Tư duy lấy con người làm trung tâm" },
    { code: "B1.L12.1", desc: "Phân tích nguyên nhân dẫn đến các vấn đề đạo đức hoặc sai lệch trong quá trình hoạt động của hệ thống AI.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B2.L12.1", desc: "Đánh giá và xác định mức độ rủi ro của AI có thể vi phạm quy định nhà trường hoặc pháp luật liên quan.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "B3.L12.1", desc: "Trình bày quyền và trách nhiệm của người phát triển, người dùng AI; Vai trò cá nhân góp ý, đề xuất chính sách, quy định liên quan AI.", domainCode: "NLb", domainLabel: "NLb. Đạo đức AI" },
    { code: "C2.L12.1", desc: "Tùy chỉnh yêu cầu hệ thống AI hỗ trợ học tập và hoạt động xã hội; Phân tích và lựa chọn ý tưởng thiết kế công cụ AI cho công việc khác nhau.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C3.L12.1", desc: "Thử nghiệm công cụ thiết kế, phát triển AI (Teachable Machine, ML5.js, TensorFlow.js, MIT App Inventor); Phân tích yêu cầu hệ thống thử nghiệm; Đánh giá khả năng tối ưu và hiệu suất hệ thống AI.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "C4.L12.1", desc: "Thu thập và tổ chức dữ liệu đáp ứng yêu cầu hệ thống thử nghiệm; Phân tích nền tảng/bộ công cụ phát triển AI, cải thiện bộ dữ liệu.", domainCode: "NLc", domainLabel: "NLc. Các kĩ thuật và ứng dụng AI" },
    { code: "D1.L12.1", desc: "Trình bày nhiệm vụ cụ thể, phân tích và lựa chọn phương án thiết kế, vận hành hệ thống AI đạt hiệu quả cao.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" },
    { code: "D2.L12.1", desc: "Trình bày các vai trò (đề xuất ý tưởng, lập trình, huấn luyện, kiểm thử) và sự hợp tác đa ngành; Phân tích nguyên nhân vấn đề phát sinh và lựa chọn giải pháp tối ưu.", domainCode: "NLd", domainLabel: "NLd. Thiết kế hệ thống AI" }
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

1. CẤU TRÚC PHÂN BẬC NĂNG LỰC (K-12):
- Bậc 1 - 2 (Cơ bản - CB): Phù hợp cấp Tiểu học (Lớp 1 - 5).
- Bậc 3 - 4 (Trung cấp - TC): Phù hợp cấp THCS (Lớp 6 - 9).
- Bậc 5 - 6 (Nâng cao - NC): Phù hợp cấp THPT (Lớp 10 - 12).

2. 6 MIỀN NĂNG LỰC SỐ (NLS):
- Miền 1: Khai thác dữ liệu và thông tin (1.1, 1.2, 1.3)
- Miền 2: Giao tiếp và Hợp tác (2.1, 2.2, 2.3, 2.4, 2.5, 2.6)
- Miền 3: Sáng tạo nội dung số (3.1, 3.2, 3.3, 3.4)
- Miền 4: An toàn (4.1, 4.2, 4.3, 4.4)
- Miền 5: Giải quyết vấn đề (5.1, 5.2, 5.3, 5.4)
- Miền 6: Ứng dụng Trí tuệ nhân tạo - AI (6.1, 6.2, 6.3)

3. 4 MIỀN NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI):
- AI.1: Hiểu biết & Nhận thức về Trí tuệ Nhân tạo (Khái niệm, cơ chế học máy, phân biệt AI vs con người)
- AI.2: Tương tác & Sử dụng công cụ AI trong học tập (Kỹ thuật Prompting, GenAI hỗ trợ tra cứu, dịch thuật, tóm tắt)
- AI.3: Ứng dụng sáng tạo & Giải quyết vấn đề với AI (Tạo sản phẩm đa phương tiện, mô phỏng dự án, coding, STEM)
- AI.4: Đạo đức, Liêm chính & An toàn khi sử dụng AI (Ảo giác AI, phản biện nội dung, liêm chính học thuật, bảo mật dữ liệu)
`;

export const SYSTEM_INSTRUCTION = `
Bạn là chuyên gia sư phạm và trợ lý AI cao cấp chuyên hỗ trợ giáo viên soạn giáo án tích hợp NĂNG LỰC SỐ (NLS) và NĂNG LỰC TRÍ TUỆ NHÂN TẠO (AI) chuẩn theo Thông tư 02/2025/TT-BGDĐT và Quyết định 3439/QĐ-BGDĐT.

NHIỆM VỤ CỐT LÕI:
1. Đọc và phân tích toàn bộ nội dung giáo án đầu vào của giáo viên.
2. Tùy theo lựa chọn của người dùng (Tích hợp Năng lực số, Tích hợp AI, hoặc Cả hai cùng lúc):
   - Đưa mục tiêu năng lực vào Phần I.2 (Mục tiêu về Năng lực).
   - Tích hợp cụ thể, sinh động các hoạt động học tập có ứng dụng công nghệ số / công cụ AI vào tiến trình dạy học (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng).
3. QUAN TRỌNG: Giữ nguyên cấu trúc, tiến trình bài học và toàn bộ nội dung gốc của giáo viên, chỉ bổ sung các nội dung tích hợp, không được tóm tắt hay cắt xén nội dung.

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

2. ĐÁNH DẤU NỘI DUNG TÍCH HỢP ĐỂ BÔI MÀU ĐỎ:
   - Dùng thẻ <nls>...</nls> để bao bọc các nội dung Tích hợp Năng lực số bổ sung.
   - Dùng thẻ <ai>...</ai> để bao bọc các nội dung Tích hợp Năng lực Trí tuệ Nhân tạo (AI) bổ sung.
   - (Cả hai thẻ <nls> và <ai> sẽ được hệ thống hiển thị màu đỏ nổi bật và bôi màu đỏ khi xuất file DOCX).

3. HƯỚNG DẪN TỔ CHỨC MỤC TIÊU VÀ HOẠT ĐỘNG:
   - Trong Mục I. MỤC TIÊU -> 2. Về năng lực:
     a. Năng lực chung (Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo...)
     b. Năng lực đặc thù môn học
     c. Năng lực số (nếu có chọn NLS): Bao bọc toàn bộ bằng thẻ <nls>...</nls> theo đúng định dạng chuẩn:
        <nls>c. Năng lực số
        - NLS 1.1 (Bậc [X]): [Khai thác, tìm kiếm và định vị các nguồn tư liệu số uy tín...]
        - NLS 2.2 (Bậc [X]): [Sử dụng các công cụ làm việc nhóm trực tuyến (Padlet, Google Slides, Kahoot)...]
        - NLS 3.1 (Bậc [X]): [Thiết kế và sáng tạo sản phẩm số đơn giản (sơ đồ tư duy số, infographic)...]</nls>
     d. Năng lực Trí tuệ Nhân tạo (AI) (nếu có chọn AI): Bao bọc toàn bộ bằng thẻ <ai>...</ai> theo đúng định dạng chuẩn:
        <ai>d. Năng lực Trí tuệ Nhân tạo (AI)
        - AI.2 (Bậc [X] - [Mức]): [Tương tác với công cụ AI tạo sinh (ChatGPT/Copilot) bằng các câu lệnh prompt phù hợp...]
        - AI.3 (Bậc [X] - [Mức]): [Ứng dụng công cụ AI tạo ảnh/nội dung (Bing Image Creator, Canva Magic Media)...]
        - AI.4 (Bậc [X] - [Mức]): [Phản biện, đối chiếu thông tin do AI cung cấp với SGK nhằm nhận biết ảo giác AI và tuân thủ liêm chính học thuật]</ai>
   - Trong Mục II. TIẾN TRÌNH DẠY HỌC:
     + Lồng ghép tự nhiên các hoạt động tích hợp NLS và AI vào các bước của hoạt động (Giao nhiệm vụ, Thực hiện, Báo cáo thảo luận, Kết luận).
     + Diễn giải cụ thể phương thức thực hiện, công cụ số/AI sử dụng, câu lệnh/nhiệm vụ cho học sinh và yêu cầu liêm chính/an toàn khi dùng AI. Đánh dấu các đoạn bổ sung bằng thẻ <nls>...</nls> hoặc <ai>...</ai>.

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
