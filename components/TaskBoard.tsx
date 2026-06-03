"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  assignee: string;
};

const COLUMNS: { key: Task["status"]; label: string; dot: string }[] = [
  { key: "todo",        label: "할 일",   dot: "bg-slate-400" },
  { key: "in_progress", label: "진행 중", dot: "bg-blue-500" },
  { key: "done",        label: "완료",    dot: "bg-emerald-500" },
];

export function TaskBoard({ refreshKey }: { refreshKey: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then((d) => setTasks(d.tasks ?? []))
      .catch(() => {});
  }, [refreshKey]);

  if (tasks.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-xs font-medium text-slate-400 mb-3">기획 보드</p>
        <p className="text-xs text-slate-300">태스크가 없습니다.<br/>PM Bot에게 추가 요청해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        기획 보드
      </p>

      {COLUMNS.map(({ key, label, dot }) => {
        const col = tasks.filter((t) => t.status === key);
        return (
          <div key={key}>
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
              <span className="text-xs font-medium text-slate-500">
                {label}
                <span className="ml-1 text-slate-300">{col.length}</span>
              </span>
            </div>

            {col.length === 0 ? (
              <p className="pl-3 text-xs text-slate-300">없음</p>
            ) : (
              <ul className="space-y-1.5">
                {col.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <p className="text-xs font-medium text-slate-700 leading-snug">{t.title}</p>
                    {t.assignee && (
                      <p className="mt-1 text-[11px] text-slate-400">@{t.assignee}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
