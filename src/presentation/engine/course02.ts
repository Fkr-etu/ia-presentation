import type { PresentationScene, PresentationSceneId } from "../types";
export const COURSE_02_SCENES: PresentationScene[] = [
{id:"c2-intro",title:"Le LLM ne suffit plus",steps:3,render:()=>null},
{id:"c2-rag",title:"Le RAG",steps:5,render:()=>null},
{id:"c2-rag-security",title:"Le contexte n'est pas un droit",steps:3,render:()=>null},
{id:"c2-mcp",title:"MCP",steps:4,render:()=>null},
{id:"c2-harness",title:"Le harnais",steps:4,render:()=>null},
{id:"c2-loop",title:"La boucle",steps:4,render:()=>null},
{id:"c2-observability",title:"Observer ce qui se passe",steps:3,render:()=>null},
{id:"c2-security",title:"Sécuriser l'action",steps:4,render:()=>null},
{id:"c2-architecture",title:"Le système complet",steps:3,render:()=>null},
];
export function sceneIdAt02(index:number):PresentationSceneId{return COURSE_02_SCENES[index]?.id??COURSE_02_SCENES[0].id;}
