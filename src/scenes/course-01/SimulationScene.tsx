import {useState} from "react"; import {motion} from "motion/react";
const options=["BLEU","VERT","VOITURE"];
export function SimulationScene({step}:{step:number}){
 const [choice,setChoice]=useState<string|null>(null);
 return <div className="scene-simulation">
  <p className="simulation-prompt">Le ciel est souvent…</p>
  <div className="simulation-options">{options.map(option=><button key={option} type="button" onClick={()=>setChoice(option)} className={choice===option?"is-selected":""}>{option}</button>)}</div>
  {step>=1&&<motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="simulation-result"><span>BLEU</span><b>61%</b><span>VERT</span><b>12%</b><span>VOITURE</span><b>0.1%</b></motion.div>}
  {step>=2&&<p className="simulation-message">Le contexte influence les probabilités de génération.</p>}
  {step>=3&&<p className="simulation-choice">Ton choix : <strong>{choice??"—"}</strong></p>}
 </div>;
}