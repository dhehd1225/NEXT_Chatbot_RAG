export type QuestionType = "rag" | "web" | "direct";

// 업로드된 PRD/기획서에서 검색이 필요한 키워드
const RAG_KEYWORDS = [
  "우리 제품", "우리 서비스", "우리 앱", "내 프로젝트", "내가 만드는",
  "PRD", "기획서", "로드맵에", "지난번에 올린", "업로드한",
  "내 스타트업", "우리 팀", "우리가 정한",
];

// 최신 시장/경쟁사 정보가 필요한 키워드
const WEB_KEYWORDS = [
  "최신", "최근", "요즘", "트렌드", "뉴스", "현재",
  "경쟁사", "시장 규모", "시장조사", "벤치마킹",
  "2024", "2025", "2026", "이번 분기", "올해",
];

export function classifyQuestion(query: string): QuestionType {
  if (RAG_KEYWORDS.some((k) => query.includes(k))) return "rag";
  if (WEB_KEYWORDS.some((k) => query.toLowerCase().includes(k))) return "web";
  return "direct";
}
