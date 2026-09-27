import { motion } from "motion/react";

const layers = [
  { number: "01", title: "Représentations", detail: "les tokens sont convertis en représentations numériques" },
  { number: "02", title: "Attention", detail: "les positions mettent en relation des informations du contexte" },
  { number: "03", title: "Transformation", detail: "des opérations neuronales transforment les représentations" },
  { number: "04", title: "Nouvelle représentation", detail: "la sortie devient l’entrée de la couche suivante" },
];

export function TransformerScene({ step }: { step: number }) {
  return (
    <div className="scene-transformer lesson-frame">
      <span className="lesson-kicker">06 · Le Transformer</span>
      <h2 className="lesson-title">Le Transformer orchestre des transformations répétées sur les représentations.</h2>

      <div className="transformer-stage" aria-label="Architecture pédagogique simplifiée d'un Transformer">
        <div className="transformer-stack">
          {layers.map((layer, index) => (
            <motion.div key={layer.number} className={index <= step ? "transformer-layer transformer-layer--active" : "transformer-layer"} initial={{ opacity: 0, x: -40, scale: 0.96 }} animate={{ opacity: index <= step ? 1 : 0.32, x: 0, scale: index === step ? 1.02 : 1 }} transition={{ duration: 0.45, delay: index * 0.08 }}>
              <span>{layer.number}</span>
              <div><strong>{layer.title}</strong><small>{layer.detail}</small></div>
            </motion.div>
          ))}
        </div>
        <div className="transformer-flow" aria-hidden="true"><span>entrée</span><i /><span>sortie</span></div>
      </div>

      {step === 0 && <div className="lesson-callout"><strong>Architecture</strong><span>Le Transformer n’est pas synonyme d’attention : l’attention est un mécanisme parmi d’autres dans cette architecture.</span></div>}
      {step === 1 && <div className="lesson-callout"><strong>Répétition</strong><span>Un modèle réel empile de nombreuses couches. Chaque couche transforme les représentations reçues de la précédente.</span></div>}
      {step === 2 && <div className="lesson-callout"><strong>Transformation</strong><span>Après l’attention, d’autres opérations neuronales transforment encore les représentations. Des connexions résiduelles et une normalisation sont également utilisées dans les architectures Transformer modernes.</span></div>}
      {step === 3 && <div className="lesson-content-panel"><strong>Pourquoi empiler les couches ?</strong><p>La représentation évolue progressivement pour intégrer des informations de plus en plus utiles à la tâche. Le modèle prépare ainsi les informations nécessaires à la prédiction suivante.</p></div>}

      <div className="lesson-takeaway"><b>À retenir :</b> le Transformer est une architecture de traitement ; il transforme progressivement les représentations avant la génération.</div>
    </div>
  );
}
