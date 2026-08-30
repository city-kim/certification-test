/**
 * 문항 id 로부터 결정적(deterministic) 가짜 메타값을 만든다.
 * 뉴스 게시판처럼 보이게 하는 용도이며, 렌더가 매번 바뀌지 않도록 난수 대신 해시를 쓴다.
 */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const DOMAINS = [
  "docs.oracle.com",
  "developer.mozilla.org",
  "cloudflare.com",
  "cisco.com",
  "kernel.org",
  "aws.amazon.com",
  "wikipedia.org",
  "stackoverflow.com",
  "github.com",
  "redhat.com",
];

export interface FakeMeta {
  points: number;
  comments: number;
  ago: string;
  domain: string;
}

export function fakeMeta(id: string): FakeMeta {
  const h = hash(id);
  const points = 3 + (h % 240);
  const comments = (h >>> 5) % 46;
  const hours = 1 + ((h >>> 9) % 30);
  const ago = hours < 24 ? `${hours}시간 전` : `${Math.round(hours / 24)}일 전`;
  const domain = DOMAINS[(h >>> 3) % DOMAINS.length];
  return { points, comments, ago, domain };
}
