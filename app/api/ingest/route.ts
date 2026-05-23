/**
 * 자기소개 문서 ingest API — Session 2에서 채웁니다.
 *
 * 흐름:
 *   클라이언트(IngestPanel) → POST /api/ingest { text, accessCode }
 *   → access code 검증
 *   → lib/ai/rag.ts 의 ingestDocument(text) 호출
 *   → 성공 시 200, 실패 시 500
 *
 * 보안:
 *   - SUPABASE_SERVICE_ROLE_KEY는 ingestDocument 내부(서버)에서만 사용.
 *   - 클라이언트로 전달되지 않도록 절대 response body에 넣지 마세요.
 *
 * TODO SESSION 2-7:
 *   - 아래 401/500 분기를 살린 채, 본체에서 ingestDocument(text)를 호출하도록 바꾸세요.
 *   - 큰 문서가 들어올 수 있으니 입력 크기 상한도 두세요(예: 30,000자).
 */

export const runtime = "nodejs";

type IngestBody = {
  text?: string;
  accessCode?: string;
};

export async function POST(req: Request) {
  let body: IngestBody;
  try {
    body = (await req.json()) as IngestBody;
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const expectedCode = process.env.APP_ACCESS_CODE;
  if (!expectedCode || body.accessCode !== expectedCode) {
    return Response.json(
      { error: "access code가 올바르지 않습니다." },
      { status: 401 },
    );
  }

  if (!body.text || body.text.trim().length === 0) {
    return Response.json(
      { error: "ingest할 텍스트가 비어 있습니다." },
      { status: 400 },
    );
  }

  // TODO SESSION 2-7:
  //   const { ingestDocument } = await import("@/lib/ai/rag");
  //   await ingestDocument(body.text);
  //   return Response.json({ ok: true });

  return Response.json(
    { error: "이 endpoint는 아직 구현되지 않았습니다. (Session 2에서 채워주세요)" },
    { status: 501 },
  );
}
