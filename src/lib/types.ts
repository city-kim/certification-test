/** 과목 key 는 자격증마다 다르므로 문자열로 둔다(정의는 certs.config.json). */
export type Subject = string;

/** 문항 공통 필드 */
interface QuestionBase {
  id: string;
  exam: string;
  subject: Subject;
  number: number;
  question: string;
  figure?: string;
  explanation: string;
}

/** 4지선다 문항. type 을 생략하면 이쪽으로 본다(기존 데이터 호환). */
export interface McqQuestion extends QuestionBase {
  type?: "mcq";
  options: string[];
  answerIndex: number;
}

/** 주관식(단답형) 문항. 실기처럼 답을 직접 적는 유형. */
export interface ShortQuestion extends QuestionBase {
  type: "short";
  /** 허용 정답 목록. 첫 번째가 대표 정답으로 표시된다. */
  answers: string[];
  /** true 면 대소문자까지 일치해야 정답(리눅스 명령어 등). 기본 false. */
  caseSensitive?: boolean;
  /** 입력란 안내 문구 (예: "IP 주소 형식으로 입력") */
  placeholder?: string;
}

export type Question = McqQuestion | ShortQuestion;

export function isShort(q: Question): q is ShortQuestion {
  return q.type === "short";
}

/** 암기카드 한 장. answers[0]을 대표 정답으로 표시한다. */
export interface Flashcard {
  id: string;
  subject: Subject;
  /** 카드 앞면에 표시할 질문 또는 암기 주제 */
  prompt: string;
  /** 대표 정답과 함께 인정할 수 있는 다른 표현 */
  answers: string[];
  /** 정답을 공개한 뒤 보여줄 설명 */
  explanation: string;
}

/** 출제 화면에서 다루는 문항: 보기 순서를 섞은 뒤의 상태를 담는다. */
export interface ExamItem {
  question: Question;
  /** 섞인 보기 텍스트(표시 순서). 주관식이면 빈 배열 */
  options: string[];
  /** 섞인 보기 기준 정답 위치. 주관식이면 -1 */
  answerIndex: number;
  /** 4지선다에서 사용자가 선택한 보기 위치 (미응답이면 null) */
  selected: number | null;
  /** 주관식에서 사용자가 입력한 답 (미응답이면 빈 문자열) */
  input: string;
  /** 풀이 중 힌트(해설)를 열어봤는지 */
  hintUsed: boolean;
}
