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
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn("[searchWeb] TAVILY_API_KEY가 없습니다. 빈 결과 반환.");
    return [];
  }

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: "basic",
      max_results: 4,
    }),
  });

  if (!res.ok) {
    console.error("[searchWeb] Tavily API 오류:", res.status, await res.text());
    return [];
  }

  const data = (await res.json()) as {
    results?: { title: string; url: string; content: string }[];
  };
  return (data.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    content: r.content,
  }));
}

/**
 * TODO SESSION 3-3:
 *   - 검색 결과를 system prompt에 끼울 수 있는 문자열로 변환.
 *   - 각 결과를 번호 + 제목 + URL + content snippet 형태로 정리.
 *   - LLM이 답변할 때 출처(url)를 함께 인용하도록 안내 문구 포함.
 */
export function buildWebContext(results: WebSearchResult[]): string {
  if (results.length === 0) return "";
  const body = results
    .map((r, i) => `[${i + 1}] ${r.title}\n출처: ${r.url}\n${r.content}`)
    .join("\n\n");
  return `## 웹 검색 결과\n다음 정보를 바탕으로 답변하고, 출처 URL을 함께 인용해줘.\n\n${body}`;
}
