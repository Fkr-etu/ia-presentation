import { useCallback, useMemo, useState } from "react";
import { COURSE_01_SCENES, sceneIdAt } from "./course01";
import type { PresentationState } from "../types";

export function usePresentation() {
  const [state, setState] = useState<PresentationState>({
    sceneIndex: 0,
    stepIndex: 0,
    sceneId: sceneIdAt(0),
  });

  const scene = COURSE_01_SCENES[state.sceneIndex];

  const next = useCallback(() => {
    setState((current) => {
      const currentScene = COURSE_01_SCENES[current.sceneIndex];
      if (current.stepIndex < currentScene.steps - 1) {
        return { ...current, stepIndex: current.stepIndex + 1 };
      }

      const nextSceneIndex = Math.min(current.sceneIndex + 1, COURSE_01_SCENES.length - 1);
      return {
        sceneIndex: nextSceneIndex,
        stepIndex: 0,
        sceneId: sceneIdAt(nextSceneIndex),
      };
    });
  }, []);

  const previous = useCallback(() => {
    setState((current) => {
      if (current.stepIndex > 0) return { ...current, stepIndex: current.stepIndex - 1 };

      const previousSceneIndex = Math.max(current.sceneIndex - 1, 0);
      const previousScene = COURSE_01_SCENES[previousSceneIndex];
      return {
        sceneIndex: previousSceneIndex,
        stepIndex: previousScene.steps - 1,
        sceneId: sceneIdAt(previousSceneIndex),
      };
    });
  }, []);

  const goToScene = useCallback((sceneIndex: number) => {
    const nextSceneIndex = Math.max(0, Math.min(sceneIndex, COURSE_01_SCENES.length - 1));
    setState({
      sceneIndex: nextSceneIndex,
      stepIndex: 0,
      sceneId: sceneIdAt(nextSceneIndex),
    });
  }, []);

  const restart = useCallback(() => {
    setState((current) => ({ ...current, stepIndex: 0 }));
  }, []);

  return useMemo(() => ({
    state,
    scene,
    scenes: COURSE_01_SCENES,
    next,
    previous,
    restart,
    goToScene,
  }), [state, scene, next, previous, restart, goToScene]);
}
