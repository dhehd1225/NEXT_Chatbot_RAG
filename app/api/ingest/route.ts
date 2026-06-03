export const runtime = "nodejs";

type IngestBody = {
  text?: string;
};

export async function POST(req: Request) {
  let body: IngestBody;
  try {
    body = (await req.json()) as IngestBody;
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (!body.text || body.text.trim().length === 0) {
    return Response.json(
      { error: "ingest할 텍스트가 비어 있습니다." },
      { status: 400 },
    );
  }

  const MAX_INGEST_CHARS = 30000;
  if (body.text.length > MAX_INGEST_CHARS) {
    return Response.json(
      { error: `문서가 너무 깁니다. ${MAX_INGEST_CHARS}자 이하로 나눠서 올려주세요.` },
      { status: 400 },
    );
  }

  try {
    const { ingestDocument } = await import("@/lib/ai/rag");
    await ingestDocument(body.text);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[/api/ingest] ingest 실패:", err);
    return Response.json(
      { error: "문서 저장 중 오류가 발생했습니다. (서버 로그 확인)" },
      { status: 500 },
    );
  }
}
