import { motion } from "motion/react";

const tokens=["La","souris","mange","le","fromage","parce","qu’","il","est","bon","."];
export function AttentionScene({step}:{step:number}){
 const target=step>=1?"il":null;
 return <div className="scene-attention">
  <p className="attention-sentence">{tokens.map((token,i)=><span key={`${token}-${i}`} className={token===target?"is-target":""}>{token} </span>)}</p>
  {step===0&&<p className="scene-question">À quoi renvoie « il » ?</p>}
  {step>=1&&<div className="attention-links" aria-hidden="true"><motion.div initial={{scaleX:0}} animate={{scaleX:1}} className="attention-link attention-link--main"/><span>contexte</span></div>}
  {step>=2&&<p className="attention-explanation">Le modèle pondère les relations entre les éléments du contexte. Il ne traite pas chaque token isolément.</p>}
  {step>=3&&<div className="attention-transfer"><span>« 10 ans »</span><b>→</b><span>style de la réponse</span></div>}
 </div>;
}