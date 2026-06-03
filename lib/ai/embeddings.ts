import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

// gemini-embedding-001: 3072차원 (schema.sql vector(3072)과 일치)
const embeddingModel = google.textEmbeddingModel("gemini-embedding-001");

export async function createEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value: text,
  });
  return embedding;
}

export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: texts,
  });
  return embeddings;
}
