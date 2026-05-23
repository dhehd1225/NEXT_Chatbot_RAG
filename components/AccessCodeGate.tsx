"use client";

import { useState, type FormEvent } from "react";

/**
 * access code 입력 게이트.
 *
 * 챗봇 사용 전에 미리 정해둔 비밀 코드를 입력해야 채팅창이 열린다.
 * 코드는 서버의 환경변수 APP_ACCESS_CODE와 비교된다.
 *
 * 주의:
 *   - 이 화면은 "비용 보호" 용도일 뿐, 진짜 보안용 인증이 아니다.
 *     (실제 서비스에서는 NextAuth / Supabase Auth 등 정식 인증을 써야 한다.)
 *   - 그래도 access code가 있으면 친구/지인이 아닌 외부인이
 *     OpenAI 비용을 태우는 것을 막을 수 있다.
 *
 * 새로고침하면 입력값은 사라진다. (의도된 동작 — Session 1에서는 저장하지 않는다.)
 */
export function AccessCodeGate({
  onUnlock,
}: {
  onUnlock: (code: string) => void;
}) {
  const [code, setCode] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (code.trim().length === 0) return;
    onUnlock(code.trim());
  }

  return (
    <div className="flex h-full items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Access code
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            챗봇을 사용하려면 운영자에게 받은 코드를 입력하세요.
          </p>
        </div>

        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="access code"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          autoFocus
        />

        <button
          type="submit"
          disabled={code.trim().length === 0}
          className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          시작하기
        </button>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          코드는 서버 환경변수와 비교됩니다. 새로고침하면 다시 입력해야 합니다.
        </p>
      </form>
    </div>
  );
}
