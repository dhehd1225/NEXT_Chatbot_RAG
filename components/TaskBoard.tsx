"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  assignee: string;
};

const COLUMNS: { key: Task["status"]; label: string; color: string }[] = [
  { key: "todo",        label: "할 일",    color: "bg-zinc-100 dark:bg-zinc-800" },
  { key: "in_progress", label: "진행 중",  color: "bg-blue-50 dark:bg-blue-950/40" },
  { key: "done",        label: "완료",     color: "bg-green-50 dark:bg-green-950/40" },
];

export function TaskBoard({ refreshKey }: { refreshKey: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then((d) => setTasks(d.tasks ?? []))
      .catch(() => {});
  }, [refreshKey]);

  const total = tasks.length;
  if (total === 0) return null;

  return (
    <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        기획 보드 <span className="ml-1 text-xs font-normal text-zinc-400">{total}개</span>
      </h3>

      <div className="space-y-2">
        {COLUMNS.map(({ key, label, color }) => {
          const col = tasks.filter((t) => t.status === key);
          if (col.length === 0) return null;
          return (
            <div key={key} className={`rounded-lg p-2 ${color}`}>
              <p className="mb-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {label} ({col.length})
              </p>
              <ul className="space-y-1">
                {col.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-md bg-white px-2.5 py-1.5 text-xs shadow-sm dark:bg-zinc-900"
                  >
                    <p className="font-medium text-zinc-800 dark:text-zinc-100">{t.title}</p>
                    {t.assignee ? (
                      <p className="mt-0.5 text-zinc-400">@{t.assignee}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
