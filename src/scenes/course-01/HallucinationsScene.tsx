import {useState} from "react"; import {motion} from "motion/react";
export function HallucinationsScene({step}:{step:number}){
 const [revealed,setRevealed]=useState(false);
 return <div className="scene-hallucinations">
  <p className="hallucination-question">Quel est le nom de la première ville sur Mars fondée en 1987 ?</p>
  {step===0&&<button className="reveal-button" type="button" onClick={()=>setRevealed(true)}>Que répondrait un modèle ?</button>}
  {step>=1&&<motion.div initial={{opacity:0}} animate={{opacity:1}} className="hallucination-answer">« New Horizon City »</motion.div>}
  {step>=2&&<><p className="hallucination-verdict">{revealed?"Cette réponse est inventée.":"Une réponse fluide n’est pas nécessairement une réponse vraie."}</p><p className="hallucination-bridge">Pour vérifier, il faut apporter au modèle des sources ou des outils.</p></>}
 </div>;
}