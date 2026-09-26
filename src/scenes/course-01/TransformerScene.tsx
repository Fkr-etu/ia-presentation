import { motion } from "motion/react";
const layers=["représentations","attention","transformation","nouvelle représentation"];
export function TransformerScene({step}:{step:number}){
 const count=Math.min(layers.length,step+2);
 return <div className="scene-transformer">
  <div className="transformer-stack">{layers.slice(0,count).map((layer,i)=><motion.div key={layer} initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:i*.12}} className="transformer-layer"><span>{String(i+1).padStart(2,"0")}</span><strong>{layer}</strong></motion.div>)}</div>
  {step>=2&&<p>Le Transformer orchestre des transformations successives des représentations du contexte.</p>}
 </div>;
}