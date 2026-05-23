"use client";

/**
 * 자기소개 문서 ingest UI — Session 2에서 채웁니다.
 *
 * 이 컴포넌트는 현재 어디서도 import되지 않습니다.
 * Session 2에서 학회원이 직접 components/Chat.tsx 또는 사이드 패널에
 * 끼워 넣으면서 동작하게 만듭니다.
 *
 * TODO SESSION 2-7:
 *   - textarea로 자기소개 본문을 입력받고,
 *   - "ingest" 버튼을 누르면 POST /api/ingest 호출.
 *   - body에 { text, accessCode } 포함.
 *   - 성공/실패 메시지 표시.
 */
export function IngestPanel({ accessCode }: { accessCode: string }) {
  void accessCode;
  return (
    <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
      <p className="font-medium">IngestPanel — Session 2에서 구현 예정</p>
      <p className="mt-1 text-xs">
        자기소개 문서를 입력 → /api/ingest 호출 → Supabase에 embedding 저장.
      </p>
    </section>
  );
}
