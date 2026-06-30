import type { Question } from "../lib/types";
import raw from "./questions.json";

export const QUESTIONS: Question[] = raw as Question[];

/** figure 경로를 base 경로 기준 절대 URL 로 변환 (GitHub Pages 하위 경로 대응) */
export function figureUrl(figure: string): string {
  return import.meta.env.BASE_URL + figure;
}
