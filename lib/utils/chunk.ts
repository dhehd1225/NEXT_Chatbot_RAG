/**
 * 텍스트 chunking 유틸 — Session 2에서 채웁니다.
 *
 * RAG의 가장 첫 단계: 긴 문서를 작은 조각(chunk)으로 나눠야
 * 1) embedding 모델의 입력 길이를 넘지 않고,
 * 2) 검색 시 "정확히 필요한 부분만" 골라낼 수 있다.
 *
 * 너무 크게 자르면 → 한 chunk에 여러 주제가 섞여 검색 정확도 하락.
 * 너무 작게 자르면 → 문맥이 끊겨 모델이 의미 파악을 못 함.
 * 보통 500~1000 글자 / 100~200 글자 overlap 정도가 무난.
 *
 * TODO SESSION 2-1:
 *   - 입력 텍스트를 일정 크기(예: 500자) chunk로 나누세요.
 *   - 인접 chunk 간 overlap(예: 100자)을 줘서 문맥이 끊기지 않게 하세요.
 *   - 공백/줄바꿈 기준으로 자르는 게 단순합니다. (paragraph 단위도 OK)
 *
 * 지금은 build만 통과하도록 통째 1개 chunk로 반환합니다.
 */
export function chunkText(text: string): string[] {
  if (!text) return [];
  return [text];
}
