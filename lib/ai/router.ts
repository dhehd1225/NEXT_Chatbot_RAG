/**
 * 질문 유형 라우터 — Session 3에서 채웁니다.
 *
 * 세 가지 경로:
 *   - "rag"    : "나" 관련 질문 → Supabase RAG context 사용
 *   - "web"    : 최신/시사 질문 → Tavily web search 사용
 *   - "direct" : 일반 지식 / 캐릭터와의 잡담 → 그냥 LLM 호출
 *
 * 단순 키워드 매칭으로 시작하고, 필요하면 나중에 LLM-based classifier로 교체.
 */

export type QuestionType = "rag" | "web" | "direct";

/**
 * TODO SESSION 3-1:
 *   - 아래 정도의 키워드 휴리스틱부터 시작하세요.
 *
 *   const RAG_KEYWORDS = ["내가", "나는", "내 ", "제가", "저는", "내 정보", "내 관심사", "내 프로젝트"];
 *   const WEB_KEYWORDS = ["오늘", "최근", "최신", "뉴스", "트렌드", "현재", "요즘", "지금"];
 *
 *   const q = query.toLowerCase();
 *   if (RAG_KEYWORDS.some(k => query.includes(k))) return "rag";
 *   if (WEB_KEYWORDS.some(k => q.includes(k))) return "web";
 *   return "direct";
 *
 *   더 정교하게 가려면:
 *   - LLM에 짧은 분류 프롬프트로 1회 호출 (비용↑ 정확도↑)
 *   - rag/web 동시 사용 (질문이 둘 다 해당될 때)
 */
export function classifyQuestion(query: string): QuestionType {
  void query;
  return "direct";
}
