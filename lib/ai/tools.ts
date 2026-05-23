/**
 * AI SDK tool 정의 자리 — Session 3에서 채우거나 사용 (선택).
 *
 * 이 starter는 라우터(lib/ai/router.ts)로 분기하는 단순한 방식이지만,
 * 더 진화시키고 싶다면 Vercel AI SDK의 tool() 헬퍼로 LLM이 직접 웹검색을
 * "필요하다고 판단할 때만" 호출하게 만들 수 있습니다.
 *
 * 예 (Session 3 이후):
 *   import { tool } from "ai";
 *   import { z } from "zod";
 *   export const webSearchTool = tool({
 *     description: "최신 정보가 필요할 때 웹을 검색합니다.",
 *     parameters: z.object({ query: z.string() }),
 *     execute: async ({ query }) => searchWeb(query),
 *   });
 *
 * 그리고 streamText에 `tools: { webSearch: webSearchTool }` 형태로 넘기면 됩니다.
 *
 * TODO SESSION 3 (선택): tool 기반 방식으로 업그레이드해보세요.
 */

export const tools = {};
