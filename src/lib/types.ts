/** 과목 key 는 자격증마다 다르므로 문자열로 둔다(정의는 certs.config.json). */
export type Subject = string;

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
