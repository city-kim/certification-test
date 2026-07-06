import type { Question } from "../lib/types";
import network_2 from "./network_2/questions.json";
import adsp from "./adsp/questions.json";

/** 자격증 id → 문제은행. build-bank.mjs 가 생성한 회차 병합본을 정적 import. */
export const BANKS: Record<string, Question[]> = {
  network_2: network_2 as Question[],
  adsp: adsp as Question[],
};

export function getBank(certId: string): Question[] {
  return BANKS[certId] ?? [];
}

/** figure 경로를 base 경로 기준 절대 URL 로 변환 (GitHub Pages 하위 경로 대응) */
export function figureUrl(figure: string): string {
  return import.meta.env.BASE_URL + figure;
}
