import { motion } from "motion/react";

const stages = [
  "ta question",
  "tokens",
  "représentations",
  "relations",
  "Transformer",
  "probabilités",
  "tokens générés",
  "réponse",
];

export function SynthesisScene({ step }: { step: number }) {
  const count = step === 0 ? 2 : step === 1 ? 5 : stages.length;

  return (
    <div className="scene-synthesis">
      <div className="synthesis-flow" aria-label="Synthèse du parcours">
        {stages.slice(0, count).map((stage, index) => (
          <motion.span key={stage} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.06 }}>
            {stage}
          </motion.span>
        ))}
      </div>
      {step >= 2 && (
        <div className="synthesis-final">
          <strong>Le modèle transforme le contexte en représentations utiles.</strong>
          <strong>Puis il génère progressivement la suite de tokens.</strong>
          <em>Alors, une IA pense-t-elle comme nous ?</em>
        </div>
      )}
    </div>
  );
}
