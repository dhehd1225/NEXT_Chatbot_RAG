import { Chat } from "@/components/Chat";

/**
 * 메인 페이지.
 *
 * 이 파일은 서버 컴포넌트(default) 그대로 두고,
 * 실제 인터랙션은 "use client"가 붙은 Chat 안에서 처리한다.
 *
 * 이렇게 분리하면:
 *  - page.tsx는 서버에서 한 번만 렌더 → 빠른 초기 로드
 *  - Chat.tsx는 클라이언트에서만 동작 → useState/useChat 등 훅 사용 가능
 */
export default function Page() {
  return (
    <main className="flex h-dvh flex-col bg-zinc-50 dark:bg-zinc-950">
      <Chat />
    </main>
  );
}
