import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { chatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import { retrieveRelevantChunks, buildRagContext } from "@/lib/ai/rag";
import { classifyQuestion } from "@/lib/ai/router";
import { searchWeb, buildWebContext } from "@/lib/tavily/search";
import { tools } from "@/lib/ai/tools";
import {
  MAX_INPUT_CHARS,
  MAX_OUTPUT_TOKENS,
  MAX_HISTORY_MESSAGES,
  TEMPERATURE,
} from "@/lib/utils/limits";

export const runtime = "nodejs";

type ChatRequestBody = {
  messages: UIMessage[];
  accessCode?: string;
};

export async function POST(req: Request) {
  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { messages, accessCode } = body;

  const expectedCode = process.env.APP_ACCESS_CODE;
  if (!expectedCode) {
    return Response.json(
      { error: "서버에 APP_ACCESS_CODE가 설정되어 있지 않습니다. .env.local 또는 Vercel 환경변수를 확인하세요." },
      { status: 500 },
    );
  }
  if (!accessCode || accessCode !== expectedCode) {
    return Response.json(
      { error: "access code가 올바르지 않습니다." },
      { status: 401 },
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "메시지가 비어 있습니다." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  const lastText = extractText(lastMessage);
  if (lastText.length > MAX_INPUT_CHARS) {
    return Response.json(
      { error: `메시지가 너무 깁니다. ${MAX_INPUT_CHARS}자 이하로 줄여주세요.` },
      { status: 400 },
    );
  }

  const trimmedMessages = messages.slice(-MAX_HISTORY_MESSAGES);

  const questionType = classifyQuestion(lastText);
  console.log("[DEBUG chat] questionType:", questionType, "| lastText:", JSON.stringify(lastText));

  let systemPrompt = buildSystemPrompt();

  if (questionType === "rag") {
    try {
      const chunks = await retrieveRelevantChunks(lastText);
      console.log("[DEBUG chat] RAG chunks:", chunks.length);
      const ragContext = buildRagContext(chunks);
      if (ragContext) systemPrompt = `${systemPrompt}\n\n${ragContext}`;
    } catch (err) {
      console.error("[DEBUG chat] RAG 검색 실패:", err);
    }
  } else if (questionType === "web") {
    try {
      const results = await searchWeb(lastText);
      console.log("[DEBUG chat] Tavily results:", results.length);
      const webContext = buildWebContext(results);
      if (webContext) systemPrompt = `${systemPrompt}\n\n${webContext}`;
    } catch (err) {
      console.error("[DEBUG chat] 웹 검색 실패:", err);
    }
  }

  try {
    const modelMessages = await convertToModelMessages(trimmedMessages);
    const result = streamText({
      model: chatModel,
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: TEMPERATURE,
      tools,
      stopWhen: stepCountIs(3),
    });
    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[/api/chat] streamText 실패:", err);
    return Response.json(
      { error: "모델 호출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. (서버 로그를 확인하세요)" },
      { status: 500 },
    );
  }
}

function extractText(message: UIMessage): string {
  if (!message?.parts) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}
