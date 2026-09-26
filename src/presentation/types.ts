import type { ReactNode } from "react";

export type PresentationSceneId =
  | "intro" | "pipeline" | "tokens" | "embeddings" | "attention"
  | "transformer" | "generation" | "simulation" | "hallucinations" | "synthesis";

export type PresentationState = { sceneIndex: number; stepIndex: number; sceneId: PresentationSceneId };
export type PresentationScene = { id: PresentationSceneId; title: string; steps: number; render?: (step: number) => ReactNode };
