import type { Flashcard } from "../lib/types";
import network_2_practical from "./flashcards/network_2_practical.json";

/** 자격증 id → 암기카드 덱. 카드가 없는 자격증은 빈 배열을 반환한다. */
const FLASHCARD_DECKS: Record<string, Flashcard[]> = {
  network_2_practical: network_2_practical as Flashcard[],
};

export function getFlashcards(certId: string): Flashcard[] {
  return FLASHCARD_DECKS[certId] ?? [];
}
