import { motion } from "motion/react";

const layers = [
  { number: "01", title: "Représentations", detail: "le texte devient une représentation numérique" },
  { number: "02", title: "Attention", detail: "les éléments du contexte sont mis en relation" },
  { number: "03", title: "Transformation", detail: "la représentation est transformée" },
  { number: "04", title: "Nouvelle représentation", detail: "l'information évolue pour la suite du calcul" },
];

export function TransformerScene({ step }: { step: number }) {
  const count = Math.min(layers.length, step + 2);

  return (
    <div className="scene-transformer">
      <div className="transformer-stage" aria-label="Architecture pédagogique simplifiée d'un Transformer">
        <div className="transformer-stack">
          {layers.slice(0, count).map((layer, index) => (
            <motion.div key={layer.number} className={index === count - 1 ? "transformer-layer transformer-layer--active" : "transformer-layer"} initial={{ opacity: 0, x: -40, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.45, delay: index * 0.1 }}>
              <span>{layer.number}</span>
              <div><strong>{layer.title}</strong><small>{layer.detail}</small></div>
            </motion.div>
          ))}
        </div>
        <div className="transformer-flow" aria-hidden="true"><span>entrée</span><i /><span>sortie</span></div>
      </div>
      {step >= 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Le Transformer enchaîne ces transformations pour construire des représentations de plus en plus utiles à la tâche.</motion.p>}
      {step >= 3 && <motion.div className="transformer-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><b>À retenir</b><span>Le Transformer est une architecture : l’attention est l’un de ses mécanismes.</span></motion.div>}
    </div>
  );
}
