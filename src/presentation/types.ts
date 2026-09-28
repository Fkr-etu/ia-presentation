import type { ReactNode } from "react";

export type PresentationSceneId =
  | "intro" | "pipeline" | "tokens" | "embeddings" | "attention" | "transformer" | "generation" | "simulation" | "hallucinations" | "synthesis"
  | "c2-intro" | "c2-rag" | "c2-rag-security" | "c2-mcp" | "c2-harness" | "c2-loop" | "c2-observability" | "c2-security" | "c2-architecture";

export type PresentationState = { sceneIndex: number; stepIndex: number; sceneId: PresentationSceneId };
export type PresentationScene = { id: PresentationSceneId; title: string; steps: number; render?: (step: number) => ReactNode };
