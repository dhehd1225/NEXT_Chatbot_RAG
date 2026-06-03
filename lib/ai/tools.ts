import { tool } from "ai";
import { z } from "zod";
import { searchWeb } from "@/lib/tavily/search";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const webSearchTool = tool({
  description:
    "최신 시장 트렌드, 경쟁사 정보, 뉴스 등 실시간 정보가 필요할 때 웹을 검색합니다.",
  inputSchema: z.object({
    query: z.string().describe("검색할 키워드 또는 질문"),
  }),
  execute: async ({ query }: { query: string }) => {
    const results = await searchWeb(query);
    if (results.length === 0) return "검색 결과를 찾지 못했습니다.";
    return results
      .map((r, i) => `[${i + 1}] ${r.title}\n출처: ${r.url}\n${r.content}`)
      .join("\n\n");
  },
});

export const createUserStoryTool = tool({
  description:
    "사용자 스토리를 표준 형식(As a ... / I want ... / So that ...)으로 작성합니다. 기능 기획 단계에서 활용합니다.",
  inputSchema: z.object({
    persona: z.string().describe("대상 사용자 (예: 스타트업 창업자, 대학생 사용자)"),
    goal: z.string().describe("사용자가 원하는 것 (예: 경쟁사 분석 리포트를 빠르게 생성)"),
    benefit: z.string().describe("그 기능을 통해 얻는 가치 (예: 시장 조사 시간을 80% 절약)"),
    acceptanceCriteria: z
      .array(z.string())
      .describe("완료 기준 목록 (예: ['3초 내 응답', '출처 URL 포함'])"),
  }),
  execute: async ({ persona, goal, benefit, acceptanceCriteria }) => {
    const criteria = acceptanceCriteria.map((c, i) => `  ${i + 1}. ${c}`).join("\n");
    return [
      "## 사용자 스토리",
      "",
      `**As a** ${persona},`,
      `**I want to** ${goal},`,
      `**So that** ${benefit}.`,
      "",
      "### 완료 기준 (Acceptance Criteria)",
      criteria,
    ].join("\n");
  },
});

export const riceScoreTool = tool({
  description:
    "기능 우선순위를 RICE 프레임워크로 점수화합니다. 여러 기능 중 무엇을 먼저 만들지 결정할 때 사용합니다.",
  inputSchema: z.object({
    features: z
      .array(
        z.object({
          name: z.string().describe("기능 이름"),
          reach: z.number().min(1).max(10).describe("영향받는 사용자 수 (1~10 척도)"),
          impact: z.number().min(1).max(10).describe("사용자당 임팩트 (1~10 척도)"),
          confidence: z.number().min(10).max(100).describe("추정 확신도 % (10~100)"),
          effort: z.number().min(1).max(10).describe("개발 난이도 (1~10, 낮을수록 쉬움)"),
        }),
      )
      .describe("우선순위를 매길 기능 목록"),
  }),
  execute: async ({ features }) => {
    const scored = features
      .map((f) => ({
        name: f.name,
        score: Math.round((f.reach * f.impact * (f.confidence / 100)) / f.effort),
        reach: f.reach,
        impact: f.impact,
        confidence: f.confidence,
        effort: f.effort,
      }))
      .sort((a, b) => b.score - a.score);

    const rows = scored
      .map(
        (f, i) =>
          `${i + 1}. **${f.name}** — RICE: ${f.score}점\n   (Reach:${f.reach} × Impact:${f.impact} × Conf:${f.confidence}% ÷ Effort:${f.effort})`,
      )
      .join("\n");

    return `## RICE 우선순위 결과\n\n${rows}\n\n> 점수가 높을수록 먼저 개발을 권장합니다.`;
  },
});

export const addTaskTool = tool({
  description:
    "기획보드에 태스크를 추가합니다. 대화 중 팀원에게 업무를 배분하거나 할 일을 정리할 때 사용합니다.",
  inputSchema: z.object({
    title: z.string().describe("태스크 제목 (예: 로그인 화면 와이어프레임 작성)"),
    description: z.string().describe("상세 내용 또는 완료 기준"),
    assignee: z.string().describe("담당자 이름 (예: 개발자, 디자이너, 마케터)").default(""),
    status: z
      .enum(["todo", "in_progress", "done"])
      .describe("초기 상태")
      .default("todo"),
  }),
  execute: async ({ title, description, assignee, status }) => {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from("tasks")
      .insert({ title, description, assignee, status });
    if (error) return `태스크 추가 실패: ${error.message}`;
    return `태스크 추가됨: "${title}" → ${assignee || "미배정"} (${status})`;
  },
});

export const updateTaskStatusTool = tool({
  description:
    "기획보드의 태스크 상태를 변경합니다. '완료했어', '진행 중으로 바꿔줘' 등의 요청에 사용합니다.",
  inputSchema: z.object({
    title: z.string().describe("변경할 태스크 제목 (정확하게 입력)"),
    status: z.enum(["todo", "in_progress", "done"]).describe("새 상태"),
  }),
  execute: async ({ title, status }) => {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .ilike("title", `%${title}%`);
    if (error) return `상태 변경 실패: ${error.message}`;
    return `"${title}" 상태 → ${status}`;
  },
});

export const tools = {
  webSearch: webSearchTool,
  createUserStory: createUserStoryTool,
  riceScore: riceScoreTool,
  addTask: addTaskTool,
  updateTaskStatus: updateTaskStatusTool,
};
