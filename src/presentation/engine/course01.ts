import type { PresentationScene, PresentationSceneId } from "../types";

export const COURSE_01_SCENES: PresentationScene[] = [
  { id: "intro", title: "La question", steps: 4, render: () => null },
  { id: "pipeline", title: "Le voyage d’une question", steps: 3, render: () => null },
  { id: "tokens", title: "Les tokens", steps: 3, render: () => null },
  { id: "embeddings", title: "Les embeddings", steps: 5, render: () => null },
  { id: "attention", title: "L’attention", steps: 4 },
  { id: "transformer", title: "Le Transformer", steps: 4 },
  { id: "generation", title: "La génération", steps: 4, render: () => null },
  { id: "simulation", title: "À vous de jouer", steps: 4 },
  { id: "hallucinations", title: "Le piège du plausible", steps: 3 },
  { id: "synthesis", title: "Du texte à la réponse", steps: 3 },
];

export function sceneIdAt(index: number): PresentationSceneId {
  return COURSE_01_SCENES[index]?.id ?? COURSE_01_SCENES[0].id;
}
