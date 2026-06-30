export type Subject = "tcpip" | "general" | "nos" | "device";

export interface Question {
  id: string;
  exam: string;
  subject: Subject;
  number: number;
  question: string;
  figure?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

/** 출제 화면에서 다루는 문항: 보기 순서를 섞은 뒤의 상태를 담는다. */
export interface ExamItem {
  question: Question;
  /** 섞인 보기 텍스트(표시 순서) */
  options: string[];
  /** 섞인 보기 기준 정답 위치 */
  answerIndex: number;
  /** 사용자가 선택한 보기 위치 (미응답이면 null) */
  selected: number | null;
}

export const SUBJECTS: { key: Subject; label: string; count: number }[] = [
  { key: "tcpip", label: "TCP/IP", count: 17 },
  { key: "general", label: "네트워크 일반", count: 10 },
  { key: "nos", label: "NOS", count: 18 },
  { key: "device", label: "네트워크 운용기기", count: 5 },
];

export const TOTAL_QUESTIONS = SUBJECTS.reduce((s, x) => s + x.count, 0); // 50
