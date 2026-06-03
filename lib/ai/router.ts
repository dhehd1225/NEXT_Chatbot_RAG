export type QuestionType = "rag" | "web" | "direct";

// 업로드된 PRD/기획서에서 검색이 필요한 키워드
const RAG_KEYWORDS = [
  "우리 제품", "우리 서비스", "우리 앱", "우리가 만드는", "우리가 정한",
  "내 프로젝트", "내가 만드는", "내 스타트업",
  "PRD", "기획서", "로드맵", "우선순위 목록",
  "지난번에 올린", "업로드한", "우리 팀",
  "우리 타겟", "우리 KPI", "핵심 기능이 뭐야",
  "우리 팀원", "팀원이 누구", "담당자가 누구",
  "우리 목표", "이번 달 목표", "이번 분기 목표",
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
