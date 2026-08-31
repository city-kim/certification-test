import network_2_practical from "./refs/network_2_practical.json";

/** 참고자료 링크 한 건 */
export interface RefItem {
  title: string;
  url: string;
  date: string;
}

/** 소분류(### 단위) */
export interface RefGroup {
  title: string;
  items: RefItem[];
}

/** 대분류(## 단위) */
export interface RefSection {
  title: string;
  note: string;
  groups: RefGroup[];
}

/** docs/<certId>-links.md 를 build-refs.mjs 가 변환한 문서 */
export interface RefDoc {
  title: string;
  source: { label: string; url: string } | null;
  intro: string;
  sections: RefSection[];
}

/** 자격증 id → 참고자료 문서. 없는 자격증은 화면 진입 버튼도 노출하지 않는다. */
const REFS: Record<string, RefDoc> = {
  network_2_practical: network_2_practical as RefDoc,
};

export function getRefs(certId: string): RefDoc | undefined {
  return REFS[certId];
}

/** 문서 전체 링크 수 */
export function countRefItems(doc: RefDoc): number {
  return doc.sections.reduce(
    (n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0),
    0,
  );
}
