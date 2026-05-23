/**
 * Supabase 관리자(service role) 클라이언트 — Session 2에서 채웁니다.
 *
 * ⚠️ SUPABASE_SERVICE_ROLE_KEY는 RLS를 우회하는 강력한 키입니다.
 *    절대로 클라이언트 코드(컴포넌트 등)에 import 하지 마세요.
 *    이 파일은 server route(예: app/api/ingest/route.ts)에서만 import.
 *
 * 설치:
 *   npm install @supabase/supabase-js
 *
 * TODO SESSION 2-3:
 *   - import { createClient } from "@supabase/supabase-js";
 *   - return createClient(
 *       process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *       process.env.SUPABASE_SERVICE_ROLE_KEY!,
 *       { auth: { persistSession: false } },
 *     );
 *
 * 지금은 build만 통과하도록 throw로 표시해둡니다.
 */
export function getSupabaseAdminClient(): never {
  throw new Error(
    "TODO SESSION 2-3: lib/supabase/admin.ts 의 getSupabaseAdminClient를 구현하세요.",
  );
}
