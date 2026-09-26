import { useCallback, useState } from "react";
import { usePresentation } from "../../presentation/engine/usePresentation";
import { usePresentationKeyboard } from "../../presentation/input/usePresentationKeyboard";
import { PresentationShell } from "../../presentation/components/PresentationShell";
import { IntroScene } from "./IntroScene";
import { PipelineScene } from "./PipelineScene";
import { EmbeddingsScene } from "./EmbeddingsScene";
import { GenerationScene } from "./GenerationScene";

export function Course01Presentation({ onExit }: { onExit: () => void }) {
  const presentation = usePresentation();
  const [mapOpen, setMapOpen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }, []);

  usePresentationKeyboard({
    next: presentation.next,
    previous: presentation.previous,
    restart: presentation.restart,
    toggleMap: () => setMapOpen((open) => !open),
    toggleFullscreen,
  });

  const renderScene = () => {
    switch (presentation.state.sceneId) {
      case "intro": return <IntroScene step={presentation.state.stepIndex} />;
      case "pipeline": return <PipelineScene step={presentation.state.stepIndex} />;
      case "embeddings": return <EmbeddingsScene step={presentation.state.stepIndex} />;
      case "generation": return <GenerationScene step={presentation.state.stepIndex} />;
      default:
        return <div className="scene-placeholder"><span>Scène en construction</span><small>{presentation.scene.title}</small></div>;
    }
  };

  return (
    <PresentationShell
      scene={presentation.scene}
      sceneIndex={presentation.state.sceneIndex}
      stepIndex={presentation.state.stepIndex}
      totalScenes={presentation.scenes.length}
      mapOpen={mapOpen}
      onCloseMap={() => setMapOpen(false)}
    >
      <button className="presentation__exit" type="button" onClick={onExit}>Quitter</button>
      {renderScene()}
    </PresentationShell>
  );
}
