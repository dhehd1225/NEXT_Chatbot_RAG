"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";

/**
 * 채팅 메시지 목록.
 *
 * - user / assistant 메시지를 좌우로 정렬해 보여준다.
 * - 새 메시지가 들어오면 자동으로 가장 아래로 스크롤한다.
 * - UIMessage는 parts 배열을 가지므로, text part만 합쳐서 렌더한다.
 *
 * 세션 1에서는 text 외 part(tool call, file 등)는 다루지 않는다.
 * 세션 2/3에서 RAG와 web search를 붙이면 그때 새 part 타입이 등장한다.
 */
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
      <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        아래에서 메시지를 입력해 대화를 시작해보세요.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isStreaming ? <TypingIndicator /> : null}
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

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
        ].join(" ")}
      >
        {text || (
          <span className="italic text-zinc-400">(빈 메시지)</span>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl bg-zinc-100 px-4 py-2.5 dark:bg-zinc-800">
        <span className="inline-flex gap-1">
          <Dot delay="0ms" />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 dark:bg-zinc-400"
      style={{ animationDelay: delay }}
    />
  );
}
