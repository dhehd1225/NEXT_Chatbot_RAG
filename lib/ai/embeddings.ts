/**
 * OpenAI embedding 생성 — Session 2에서 채웁니다.
 *
 * embedding = 텍스트를 고정 길이 숫자 벡터로 변환한 것.
 * 의미가 비슷한 문장은 벡터 공간에서도 가까이 위치한다 → 검색에 사용.
 *
 * 모델 후보:
 *   - "text-embedding-3-small"  (저렴, 1536 dim) ← 기본 추천
 *   - "text-embedding-3-large"  (성능 좋음, 3072 dim, 비쌈)
 *
 * ⚠️ dimension은 supabase/schema.sql의 `vector(N)`과 반드시 일치시켜야 합니다.
 *
 * TODO SESSION 2-2:
 *   - @ai-sdk/openai의 embed() 또는 embedMany()를 사용해 embedding 생성.
 *   - import { embed } from "ai";
 *   - import { openai } from "@ai-sdk/openai";
 *   - const { embedding } = await embed({
 *       model: openai.embedding("text-embedding-3-small"),
 *       value: text,
 *     });
 *   - return embedding;
 *
 * 지금은 build만 통과하도록 빈 배열을 반환합니다.
 */
export async function createEmbedding(text: string): Promise<number[]> {
  void text;
  return [];
}

/**
 * 여러 텍스트를 한 번에 embedding (batch 호출, 비용/속도 면에서 유리).
 *
 * TODO SESSION 2-2 (optional):
 *   - embedMany를 써서 한 번에 처리하세요.
 */
export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  return texts.map(() => []);
}
