/**
 * RAG (Retrieval-Augmented Generation) — Session 2에서 채웁니다.
 *
 * 전체 흐름:
 *   [ingest 시점]
 *     문서 → chunkText() → createEmbedding() → Supabase documents 테이블에 저장
 *
 *   [질문 시점]
 *     사용자 질문 → createEmbedding() → match_documents RPC로 유사 chunk 검색
 *                → buildRagContext()로 system prompt에 끼워 넣기 → LLM 호출
 *
 * 핵심 원칙:
 *   - 검색된 chunk가 없으면 "모른다"고 답하도록 system prompt에 명시.
 *   - topK는 3~5개로 제한 (너무 많으면 토큰 낭비 + 잡음 증가).
 */

export type RetrievedChunk = {
  content: string;
  similarity: number;
  metadata?: Record<string, unknown>;
};

/**
 * 자기소개 문서 한 편을 받아 chunking → embedding → Supabase 저장까지.
 *
 * TODO SESSION 2-3:
 *   - chunkText(text)로 자르고,
 *   - createEmbeddings(chunks)로 한 번에 embedding 만들고,
 *   - getSupabaseAdminClient().from("documents").insert([...]) 로 저장.
 */
export async function ingestDocument(text: string): Promise<void> {
  void text;
  throw new Error("TODO SESSION 2-3: ingestDocument를 구현하세요.");
}

/**
 * 사용자 질문에 가장 유사한 chunk를 Supabase에서 검색.
 *
 * TODO SESSION 2-5:
 *   - createEmbedding(query)로 질문 벡터 만들고,
 *   - supabase.rpc("match_documents", { query_embedding, match_count: topK, ... }) 호출.
 *   - 결과 배열을 RetrievedChunk[] 형태로 반환.
 */
export async function retrieveRelevantChunks(
  query: string,
  topK: number = 4,
): Promise<RetrievedChunk[]> {
  void query;
  void topK;
  return [];
}

/**
 * 검색된 chunk들을 LLM에 줄 context 문자열로 변환.
 *
 * TODO SESSION 2-6:
 *   - 각 chunk를 번호 매겨 합치고,
 *   - "다음은 사용자에 대한 사실입니다. 이 정보만 사용해 답하세요." 같은 안내를 앞에 붙이세요.
 *   - 빈 배열이면 빈 문자열을 반환해서 호출부에서 분기할 수 있게 합니다.
 */
export function buildRagContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return "";
  return chunks.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n");
}
