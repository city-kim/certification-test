import config from "../data/certs.config.json";

/** 자격증 과목 정의: 출제 정원(count)과 표시 라벨 */
export interface SubjectConfig {
  key: string;
  label: string;
  count: number;
}

/** 자격증 한 종류의 전체 설정. build-bank.mjs 와 certs.config.json 을 공유한다. */
export interface CertConfig {
  id: string;
  label: string;
  sub: string;
  /** 합격 총점 (100점 만점 환산 기준) */
  passScore: number;
  /** 과목별 과락 기준 정답률(0~1). 0 이면 과락 없음. */
  subjectPassRatio: number;
  subjects: SubjectConfig[];
}

export const CERTS: CertConfig[] = config.certs as CertConfig[];

export function getCert(id: string | undefined): CertConfig | undefined {
  return id ? CERTS.find((c) => c.id === id) : undefined;
}

/** 자격증의 총 출제 문항 수(과목별 정원 합) */
export function totalQuestions(cert: CertConfig): number {
  return cert.subjects.reduce((s, x) => s + x.count, 0);
}

/** 과목 key → 라벨 (없으면 key 그대로) */
export function subjectLabel(cert: CertConfig, key: string): string {
  return cert.subjects.find((s) => s.key === key)?.label ?? key;
}
