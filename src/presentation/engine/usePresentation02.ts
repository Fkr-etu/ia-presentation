import {useCallback,useMemo,useState} from "react";
import {COURSE_02_SCENES,sceneIdAt02} from "./course02";
import type {PresentationState} from "../types";
export function usePresentation02(){
 const [state,setState]=useState<PresentationState>({sceneIndex:0,stepIndex:0,sceneId:sceneIdAt02(0)});
 const scene=COURSE_02_SCENES[state.sceneIndex];
 const isLastStep=state.sceneIndex===COURSE_02_SCENES.length-1&&state.stepIndex===scene.steps-1;
 const next=useCallback(()=>setState(c=>{const s=COURSE_02_SCENES[c.sceneIndex];if(c.stepIndex<s.steps-1)return{...c,stepIndex:c.stepIndex+1};if(c.sceneIndex===COURSE_02_SCENES.length-1)return c;const i=c.sceneIndex+1;return{sceneIndex:i,stepIndex:0,sceneId:sceneIdAt02(i)};}),[]);
 const previous=useCallback(()=>setState(c=>{if(c.stepIndex>0)return{...c,stepIndex:c.stepIndex-1};if(c.sceneIndex===0)return c;const i=c.sceneIndex-1;return{sceneIndex:i,stepIndex:COURSE_02_SCENES[i].steps-1,sceneId:sceneIdAt02(i)};}),[]);
 const goToScene=useCallback((sceneIndex:number)=>{const i=Math.max(0,Math.min(sceneIndex,COURSE_02_SCENES.length-1));setState({sceneIndex:i,stepIndex:0,sceneId:sceneIdAt02(i)});},[]);
 const restart=useCallback(()=>setState(c=>({...c,stepIndex:0})),[]);
 return useMemo(()=>({state,scene,scenes:COURSE_02_SCENES,next,previous,restart,goToScene,isLastStep}),[state,scene,next,previous,restart,goToScene,isLastStep]);
}
