"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";

export function MessageList({
  messages,
  isStreaming,
}: {
  messages: UIMessage[];
  isStreaming: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
          P
        </div>
        <div>
          <p className="text-base font-semibold text-slate-700">PM Bot에게 물어보세요</p>
          <p className="mt-1 text-sm text-slate-400">사용자 스토리 · 우선순위 · 시장 조사 · 태스크 배분</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-left">
          {[
            "로그인 기능 사용자 스토리 작성해줘",
            "요즘 AI 챗봇 시장 트렌드 알려줘",
            "기능 3개 RICE 우선순위 매겨줘",
            "개발자한테 API 설계 태스크 추가해줘",
          ].map((hint) => (
            <div
              key={hint}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-500 shadow-sm"
            >
              {hint}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isStreaming && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  const text = message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");

  if (!text) return null;

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[72%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
        P
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100 whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
        P
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
        <span className="inline-flex gap-1">
          <Dot delay="0ms" />
          <Dot delay="160ms" />
          <Dot delay="320ms" />
        </span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
      style={{ animationDelay: delay }}
    />
  );
}
