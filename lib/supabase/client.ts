/**
 * Supabase 브라우저(anon) 클라이언트 — Session 2에서 채웁니다.
 *
 * "anon" 클라이언트는 누구나 봐도 되는 공개 키(NEXT_PUBLIC_SUPABASE_ANON_KEY)를 사용합니다.
 * Row Level Security(RLS) 정책이 안전망 역할을 합니다.
 *
 * 설치:
 *   npm install @supabase/supabase-js
 *
 * TODO SESSION 2-3:
 *   - import { createClient } from "@supabase/supabase-js";
 *   - return createClient(
 *       process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 *     );
 *
 * 지금은 build만 통과하도록 throw로 표시해둡니다.
 */
export function getSupabaseBrowserClient(): never {
  throw new Error(
    "TODO SESSION 2-3: lib/supabase/client.ts 의 getSupabaseBrowserClient를 구현하세요.",
  );
}
