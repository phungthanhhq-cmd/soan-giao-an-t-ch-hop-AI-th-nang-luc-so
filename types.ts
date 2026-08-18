export enum Textbook {
  KNTT = "Kết nối tri thức",
  CTST = "Chân trời sáng tạo",
  CD = "Cánh diều"
}

export enum SchoolLevel {
  TH = "TH",
  THCS = "THCS",
  THPT = "THPT"
}

export enum Subject {
  TIN = "Tin Học",
  TOAN = "Toán",
  VAN = "Ngữ Văn",
  LY = "Vật Lí",
  HOA = "Hóa Học",
  SINH = "Sinh Học",
  ANH = "Tiếng Anh",
  SU = "Lịch Sử",
  DIA = "Địa Lí",
  GDCD = "GDCD",
  CONG_NGHE = "Công Nghệ",
  THE_DUC = "Thể Dục",
  NQTN = "Nghệ thuật",
  HDKH = "Hoạt động trải nghiệm",
  TAT_CA = "Tất cả môn",
  TIENG_VIET = "Tiếng Việt",
  NGOAI_NGU_1 = "Ngoại ngữ 1",
  GD_LOI_SONG = "Giáo dục lối sống",
  DAO_DUC = "Đạo đức",
  TN_XH = "Tự nhiên và Xã hội",
  LS_DL = "Lịch sử và Địa lý",
  KHOA_HOC = "Khoa học",
  TIN_CONG_NGHE = "Tin học và Công nghệ",
  GD_THE_CHAT = "Giáo dục thể chất",
  TIENG_DT_THIEU_SO = "Tiếng dân tộc thiểu số",
  KHAC = "Khác"
}

export interface ManualNLSEntry {
  id: string; // unique id for list management
  code: string; // e.g., "1.1", "AI.1", "6.1.TC1a"
  name: string; // e.g., "Duyệt, tìm kiếm...", "Hiểu biết về AI"
  description: string; // User typed or selected content
  category?: 'NLS' | 'AI'; // Differentiates NLS vs AI competency
}

export interface IntegrationModes {
  enableNLS: boolean;
  enableAI: boolean;
}

export interface LessonInfo {
  textbook: Textbook;
  schoolLevel: SchoolLevel;
  subject: Subject;
  grade: number;
  content: string; 
  distributionContent?: string;
  isStem?: boolean;
  manualNLS?: ManualNLSEntry[]; // List of manual NLS entries
  manualAI?: ManualNLSEntry[]; // List of manual AI entries
  integrationModes?: IntegrationModes; // Selected integration modes (NLS, AI, or both)
}

export interface ProcessingOptions {
  analyzeOnly: boolean;
  detailedReport: boolean;
  comparisonExport: boolean;
}

export interface GeminiResponse {
  rawText: string;
}
