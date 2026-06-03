"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

export function MessageInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState("");

  const canSend = value.trim().length > 0 && !disabled && value.length <= 500;

  function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={disabled ? "응답 중…" : "PM Bot에게 메시지 보내기 (Enter 전송)"}
        disabled={disabled}
        className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
        style={{ maxHeight: "120px" }}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 120) + "px";
        }}
      />
      <button
        type="submit"
        disabled={!canSend}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="전송"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8L14 8M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}
