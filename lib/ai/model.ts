import { openai } from "@ai-sdk/openai";
import { MODEL_NAME } from "@/lib/utils/limits";

/**
 * 챗봇이 사용할 LLM 인스턴스.
 *
 * 모델 이름은 lib/utils/limits.ts의 MODEL_NAME에서 관리한다.
 * 이렇게 한곳에 모아두면 나중에 모델을 바꾸기 쉽고,
 * 비용 관련 설정을 한눈에 볼 수 있다.
 *
 * 주의: 이 파일은 서버에서만 import 되어야 한다.
 * 클라이언트에서 import 하면 OPENAI_API_KEY가 번들에 들어갈 위험이 있다.
 */
export const chatModel = openai(MODEL_NAME);
