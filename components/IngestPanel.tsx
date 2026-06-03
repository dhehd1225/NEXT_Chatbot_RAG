"use client";

import { useState } from "react";

// TODO SESSION 2-7: textarea + ingest 버튼 + 성공/실패 메시지.
type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function IngestPanel() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const canSubmit = text.trim().length > 0 && status.kind !== "loading";

  async function handleIngest() {
    if (!canSubmit) return;
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "알 수 없는 오류" });
        return;
      }
      setStatus({ kind: "ok" });
      setText("");
    } catch {
      setStatus({ kind: "error", message: "네트워크 오류가 발생했습니다." });
    }
  }

  return (
    <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          제품 문서 학습 (RAG)
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          PRD, 기획서, 로드맵을 붙여넣으면 PM Bot이 참고해서 답합니다.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="예) 우리 제품은 AI 스터디 매칭 플랫폼으로, 핵심 기능은..."
        className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-2.5 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        disabled={status.kind === "loading"}
      />

      <button
        type="button"
        onClick={handleIngest}
        disabled={!canSubmit}
        className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status.kind === "loading" ? "저장 중..." : "문서 학습시키기"}
      </button>

      {status.kind === "ok" ? (
        <p className="text-xs text-green-600 dark:text-green-400">
          저장 완료! 이제 챗봇에게 물어보세요.
        </p>
      ) : null}
      {status.kind === "error" ? (
        <p className="text-xs text-red-600 dark:text-red-400">
          오류: {status.message}
        </p>
      ) : null}
    </section>
  );
}
