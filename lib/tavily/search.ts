/**
 * Tavily Web Search — Session 3에서 채웁니다.
 *
 * Tavily는 LLM용으로 정제된 웹검색 API입니다.
 * 기본 무료 플랜이 있어 데모에 충분합니다.
 *
 * 발급: https://tavily.com → Dashboard → API Keys
 * 환경변수: TAVILY_API_KEY
 *
 * ⚠️ 모든 질문에 호출하면 API quota가 빠르게 소모됩니다.
 *    lib/ai/router.ts의 classifyQuestion이 "web"으로 분류한 질문에만 사용하세요.
 *
 * 설치(권장):
 *   npm install @tavily/core
 *   또는 그냥 fetch로 https://api.tavily.com/search 호출.
 */

export type WebSearchResult = {
  title: string;
  url: string;
  content: string;
};

/**
 * TODO SESSION 3-2:
 *   - fetch("https://api.tavily.com/search", { method: "POST", body: JSON.stringify({
 *       api_key: process.env.TAVILY_API_KEY,
 *       query,
 *       search_depth: "basic",
 *       max_results: 4,
 *     })})
 *   - 응답에서 results 배열을 꺼내 WebSearchResult[]로 매핑하세요.
 *   - 비용 방지: max_results는 3~5개로 제한.
 */
export async function searchWeb(query: string): Promise<WebSearchResult[]> {
  void query;
  return [];
}

/**
 * TODO SESSION 3-3:
 *   - 검색 결과를 system prompt에 끼울 수 있는 문자열로 변환.
 *   - 각 결과를 번호 + 제목 + URL + content snippet 형태로 정리.
 *   - LLM이 답변할 때 출처(url)를 함께 인용하도록 안내 문구 포함.
 */
export function buildWebContext(results: WebSearchResult[]): string {
  if (results.length === 0) return "";
  return results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.content}`)
    .join("\n\n");
}
