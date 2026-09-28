import {useCallback,useEffect,useState} from "react";
import {usePresentation02} from "../../presentation/engine/usePresentation02";
import {usePresentationKeyboard} from "../../presentation/input/usePresentationKeyboard";
import {PresentationShell} from "../../presentation/components/PresentationShell";
import {Course02Scene} from "./Course02Scene";
export function Course02Presentation({onExit}:{onExit:()=>void}){
 const p=usePresentation02();const [mapOpen,setMapOpen]=useState(false);
 const toggleFullscreen=useCallback(async()=>{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();},[]);
 usePresentationKeyboard({next:p.next,previous:p.previous,restart:p.restart,goToScene:p.goToScene,toggleMap:()=>setMapOpen(v=>!v),toggleFullscreen,exit:onExit});
 useEffect(()=>{document.body.dataset.presentation="true";return()=>{delete document.body.dataset.presentation;}},[]);
 return <PresentationShell courseNumber="02" courseLabel="cours.ia / 02" scene={p.scene} sceneIndex={p.state.sceneIndex} stepIndex={p.state.stepIndex} totalScenes={p.scenes.length} scenes={p.scenes} isLastStep={p.isLastStep} mapOpen={mapOpen} onCloseMap={()=>setMapOpen(false)} onSelectScene={i=>{p.goToScene(i);setMapOpen(false);}}><button className="presentation__exit" type="button" onClick={onExit}>Quitter</button><Course02Scene sceneIndex={p.state.sceneIndex} step={p.state.stepIndex}/></PresentationShell>;
}
