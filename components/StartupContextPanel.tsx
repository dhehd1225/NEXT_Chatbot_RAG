"use client";

import { useState } from "react";

const CATEGORIES = [
  { key: "team",    label: "팀원",    placeholder: "예) 개발자 김OO - Next.js, Python 가능. 디자이너 이OO - Figma 전담." },
  { key: "product", label: "제품",    placeholder: "예) AI 스터디 매칭 앱. 핵심 기능: 관심사 기반 매칭, 주간 체크인. 타겟: 대학생 20대." },
  { key: "goal",    label: "목표",    placeholder: "예) 이번 달 목표: 베타 출시. 다음 분기: 유료 고객 50명 확보." },
  { key: "note",    label: "메모",    placeholder: "예) 지난 미팅 결론: 로그인은 카카오 OAuth만 지원하기로 결정." },
];

type Status = "idle" | "loading" | "ok" | "error";

export function StartupContextPanel() {
  const [category, setCategory] = useState("team");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const current = CATEGORIES.find((c) => c.key === category)!;
  const canSubmit = text.trim().length > 0 && status !== "loading";

  async function handleSave() {
    if (!canSubmit) return;
    setStatus("loading");
    try {
      const label = current.label;
      const payload = `[${label}] ${text.trim()}`;
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payload }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setText("");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
      <div className="px-3 py-2.5 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-500">내 스타트업 등록</p>
        <p className="text-[11px] text-slate-400 mt-0.5">팀·제품·목표를 저장하면 PM Bot이 맥락을 기억합니다</p>
      </div>

      <div className="px-3 pt-2.5 pb-3 space-y-2">
        {/* 카테고리 탭 */}
        <div className="flex gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => { setCategory(c.key); setText(""); }}
              className={[
                "rounded-md px-2 py-1 text-[11px] font-medium transition",
                category === c.key
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 입력창 */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={current.placeholder}
          disabled={status === "loading"}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 disabled:opacity-50"
        />

        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSubmit}
          className="w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "loading" ? "저장 중…" : "저장"}
        </button>

        {status === "ok" && (
          <p className="text-center text-[11px] text-emerald-500">저장됐어요! 이제 질문해보세요.</p>
        )}
        {status === "error" && (
          <p className="text-center text-[11px] text-red-400">저장 실패. 다시 시도해주세요.</p>
        )}
      </div>
    </div>
  );
}
