"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { MessageList } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";
import { TaskBoard } from "@/components/TaskBoard";

export function Chat() {
  const [boardKey, setBoardKey] = useState(0);
  const prevStatus = useRef<string>("");

  const transport = new DefaultChatTransport({ api: "/api/chat" });
  const { messages, sendMessage, status, error, setMessages } = useChat({ transport });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (prevStatus.current !== "ready" && status === "ready") {
      setBoardKey((k) => k + 1);
    }
    prevStatus.current = status;
  }, [status]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── 왼쪽 사이드바 ── */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        {/* 로고 */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
            P
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">PM Bot</p>
            <p className="text-[11px] text-slate-400">AI 제품 기획 어시스턴트</p>
          </div>
        </div>

        {/* 태스크 보드 */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <TaskBoard refreshKey={boardKey} />
        </div>

        {/* 하단 버튼 */}
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={() => setMessages([])}
            className="w-full rounded-lg px-3 py-2 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          >
            대화 초기화
          </button>
        </div>
      </aside>

      {/* ── 오른쪽 채팅 영역 ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 채팅 헤더 */}
        <header className="flex items-center gap-2 border-b border-slate-200 bg-white px-6 py-3.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-slate-700">PM Bot</span>
          {isBusy && (
            <span className="ml-1 text-xs text-slate-400 animate-pulse">응답 중…</span>
          )}
        </header>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <MessageList messages={messages} isStreaming={status === "streaming"} />
        </div>

        {/* 오류 */}
        {error && (
          <div className="mx-6 mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
            {error.message}
          </div>
        )}

        {/* 입력창 */}
        <div className="border-t border-slate-200 bg-white px-6 py-4">
          <MessageInput onSend={(t) => sendMessage({ text: t })} disabled={isBusy} />
        </div>
      </div>
    </div>
  );
}
