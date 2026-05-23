"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { CharacterCard } from "@/components/CharacterCard";
import { MessageList } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";
import { AccessCodeGate } from "@/components/AccessCodeGate";
import { characterConfig } from "@/lib/ai/prompts";

/**
 * 챗봇 메인 화면.
 *
 * 구조 (모바일은 세로 1단, 데스크탑은 좌측 카드 + 우측 채팅):
 *
 *   ┌─────────────┬───────────────────────────┐
 *   │ Character   │   메시지 목록             │
 *   │ Card        │                           │
 *   │             │                           │
 *   │             ├───────────────────────────┤
 *   │             │   입력창 + 전송 버튼      │
 *   └─────────────┴───────────────────────────┘
 *
 * 새로고침하면 대화가 모두 사라진다. (의도된 단순함)
 * 대화 저장이 필요하면 Session 2 이후에 추가한다.
 */
export function Chat() {
  // access code는 클라이언트 메모리에만 보관한다.
  // (새로고침 시 다시 입력해야 함 → 의도된 동작)
  const [accessCode, setAccessCode] = useState<string | null>(null);

  if (!accessCode) {
    return <AccessCodeGate onUnlock={setAccessCode} />;
  }

  return <ChatRoom accessCode={accessCode} onReset={() => setAccessCode(null)} />;
}

function ChatRoom({
  accessCode,
  onReset,
}: {
  accessCode: string;
  onReset: () => void;
}) {
  // 같은 accessCode 동안에는 같은 transport를 재사용한다.
  // accessCode가 바뀌면 useChat이 재마운트되도록 key를 따로 둔다.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        // body에 accessCode를 함께 보낸다.
        // 서버 route(app/api/chat/route.ts)가 이 값을 검증한다.
        body: { accessCode },
      }),
    [accessCode],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  });

  const isBusy = status === "submitted" || status === "streaming";

  function handleSend(text: string) {
    // useChat의 sendMessage가 user message 추가 + 서버 요청 + 스트리밍 응답 처리를 한 번에 한다.
    sendMessage({ text });
  }

  function handleClear() {
    // 화면의 메시지만 비운다. 서버에는 어차피 저장하지 않으므로 이걸로 충분.
    setMessages([]);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 p-4 md:flex-row md:p-6">
      {/* 좌측: 캐릭터 카드 + 컨트롤 */}
      <div className="flex flex-col gap-3 md:w-72 md:shrink-0">
        <CharacterCard character={characterConfig} />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            대화 초기화
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            title="access code 입력 화면으로 돌아갑니다"
          >
            잠금
          </button>
        </div>
      </div>

      {/* 우측: 메시지 영역 + 입력창 */}
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex-1 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <MessageList messages={messages} isStreaming={status === "streaming"} />
        </div>

        {error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            오류: {error.message}
          </div>
        ) : null}

        <MessageInput onSend={handleSend} disabled={isBusy} />
      </div>
    </div>
  );
}
