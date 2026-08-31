import network_2 from "./network_2/practical.json";

/** 실기 학습용 문항: 객관식이 아닌 단답·서술형이라 Question 과 별도 타입을 쓴다. */
export interface PracticalItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  explanation: string;
}

/** 실기 학습 카테고리 표시 순서 및 라벨 (자격증별) */
export const PRACTICAL_CATEGORIES: Record<string, { key: string; label: string }[]> = {
  network_2: [
    { key: "cable", label: "케이블 제작" },
    { key: "router", label: "라우터 설정" },
    { key: "windows", label: "Windows Server" },
    { key: "linux", label: "리눅스" },
    { key: "command", label: "네트워크 명령어" },
    { key: "ip", label: "IP·서브넷" },
    { key: "term", label: "단답형 용어" },
  ],
};

const PRACTICAL_BANKS: Record<string, PracticalItem[]> = {
  network_2: network_2 as PracticalItem[],
};

export function getPracticalBank(certId: string): PracticalItem[] {
  return PRACTICAL_BANKS[certId] ?? [];
}

export function practicalCategoryLabel(certId: string, key: string): string {
  const found = (PRACTICAL_CATEGORIES[certId] ?? []).find((c) => c.key === key);
  return found?.label ?? key;
}
