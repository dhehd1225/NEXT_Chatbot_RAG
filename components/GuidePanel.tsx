"use client";

import { useState } from "react";

const SECTIONS = [
  {
    icon: "🔍",
    title: "RAG 지식 베이스",
    desc: "아래 주제는 학습된 문서를 참고해 답합니다",
    items: [
      "MVP 설계 원칙 & 한국 사례",
      "PMF 시그널 & 검증 지표",
      "스타트업 로드맵 단계별 목표",
      "사용자 리서치 & Mom Test",
      "한국 투자 환경 & 지원 프로그램",
    ],
    hint: "\"우리 제품 MVP 어떻게 잡아야 해?\"",
  },
  {
    icon: "🛠",
    title: "Tool Calling",
    desc: "말만 하면 도구가 자동으로 실행됩니다",
    items: [
      "웹 검색 — 최신 트렌드·경쟁사 조사",
      "사용자 스토리 — As a / I want / So that",
      "RICE 우선순위 — 기능 점수화",
      "태스크 추가 — 기획 보드에 바로 저장",
      "태스크 상태 변경 — 진행 중·완료 처리",
    ],
    hint: "\"로그인 기능 개발자한테 태스크 추가해줘\"",
  },
];

export function GuidePanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <span className="text-xs font-semibold text-slate-500">기능 안내</span>
        <span className="text-slate-300 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="space-y-3 px-3 pb-3">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{s.icon}</span>
                <p className="text-xs font-semibold text-slate-600">{s.title}</p>
              </div>
              <p className="text-[11px] text-slate-400 mb-1.5">{s.desc}</p>
              <ul className="space-y-0.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                    <span className="mt-0.5 text-slate-300">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-2 rounded-lg bg-white border border-slate-100 px-2 py-1.5 text-[11px] text-slate-400 italic leading-snug">
                예) {s.hint}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
