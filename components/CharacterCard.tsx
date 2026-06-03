import type { CharacterConfig } from "@/lib/ai/prompts";

/**
 * 캐릭터 프로필 카드.
 *
 * 큰 일러스트 + 이름/설명/말투/관심사가 한 카드에 모여 있다.
 *
 * TODO SESSION 1-3:
 *   - PersonSilhouette SVG를 본인 캐릭터 이미지로 교체.
 *     public/character.png (또는 .svg/.webp) 추가 후 next/image 사용:
 *       import Image from "next/image";
 *       <Image src="/character.png" alt={character.name} width={120} height={120} priority />
 *   - 카드 그라디언트 색상, 폰트, 배치도 자유롭게 바꿔보세요.
 */
export function CharacterCard({ character }: { character: CharacterConfig }) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* 상단: 일러스트 + 이름/설명 */}
      <div className="flex flex-col items-center gap-2 bg-gradient-to-b from-blue-50 to-cyan-50 p-5 dark:from-blue-950/40 dark:to-cyan-950/40">
        <InitialAvatar
          initial={character.name.charAt(0)}
          className="h-28 w-28"
        />
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {character.name}
        </h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {character.description}
        </p>
      </div>

      {/* 하단: 말투 + 관심사 */}
      <dl className="space-y-3 p-5 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            말투
          </dt>
          <dd className="mt-0.5 text-zinc-800 dark:text-zinc-200">
            {character.tone}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            관심사
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {character.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {interest}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

/**
 * 캐릭터 이름의 첫 글자를 보여주는 원형 아바타.
 * 실제 캐릭터 이미지가 생기면 next/image로 교체하세요.
 */
function InitialAvatar({
  initial,
  className,
}: {
  initial: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-4xl font-bold text-white shadow-md ring-4 ring-white/60 dark:ring-zinc-800/60 ${className ?? ""}`}
    >
      {initial}
    </div>
  );
}
