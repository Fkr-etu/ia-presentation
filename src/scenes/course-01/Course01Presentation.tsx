import { useCallback, useEffect, useState } from "react";
import { usePresentation } from "../../presentation/engine/usePresentation";
import { usePresentationKeyboard } from "../../presentation/input/usePresentationKeyboard";
import { PresentationShell } from "../../presentation/components/PresentationShell";
import { IntroScene } from "./IntroScene";
import { PipelineScene } from "./PipelineScene";
import { TokensScene } from "./TokensScene";
import { EmbeddingsScene } from "./EmbeddingsScene";
import { GenerationScene } from "./GenerationScene";
import { AttentionScene } from "./AttentionScene";
import { TransformerScene } from "./TransformerScene";
import { SimulationScene } from "./SimulationScene";
import { HallucinationsScene } from "./HallucinationsScene";
import { SynthesisScene } from "./SynthesisScene";

export function Course01Presentation({ onExit }: { onExit: () => void }) {
  const p = usePresentation();
  const [mapOpen, setMapOpen] = useState(false);
  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }, []);
  usePresentationKeyboard({ next:p.next, previous:p.previous, restart:p.restart, toggleMap:()=>setMapOpen(v=>!v), toggleFullscreen, exit:onExit });

  useEffect(() => {
    document.body.dataset.presentation = "true";
    return () => {
      delete document.body.dataset.presentation;
    };
  }, []);
  const renderScene = () => {
    switch (p.state.sceneId) {
      case "intro": return <IntroScene step={p.state.stepIndex}/>;
      case "pipeline": return <PipelineScene step={p.state.stepIndex}/>;
      case "tokens": return <TokensScene step={p.state.stepIndex}/>;
      case "embeddings": return <EmbeddingsScene step={p.state.stepIndex}/>;
      case "attention": return <AttentionScene step={p.state.stepIndex}/>;
      case "transformer": return <TransformerScene step={p.state.stepIndex}/>;
      case "generation": return <GenerationScene step={p.state.stepIndex}/>;
      case "simulation": return <SimulationScene step={p.state.stepIndex}/>;
      case "hallucinations": return <HallucinationsScene step={p.state.stepIndex}/>;
      case "synthesis": return <SynthesisScene step={p.state.stepIndex}/>;
    }
  };
  return <PresentationShell scene={p.scene} sceneIndex={p.state.sceneIndex} stepIndex={p.state.stepIndex} totalScenes={p.scenes.length} scenes={p.scenes} mapOpen={mapOpen} onCloseMap={()=>setMapOpen(false)} onSelectScene={(sceneIndex)=>{p.goToScene(sceneIndex); setMapOpen(false);}}>
    <button className="presentation__exit" type="button" onClick={onExit}>Quitter</button>{renderScene()}
  </PresentationShell>;
}