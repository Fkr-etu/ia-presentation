import { motion } from "motion/react";

export function HallucinationsScene({ step }: { step: number }) {
  return (
    <div className="scene-hallucinations">
      <p className="hallucination-question">Quel est le nom de la première ville sur Mars fondée en 1987 ?</p>
      {step >= 1 && (
        <motion.div className="hallucination-answer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          « New Horizon City »
        </motion.div>
      )}
      {step >= 2 && (
        <div className="hallucination-verdict-block">
          <p className="hallucination-verdict">Cette réponse est inventée.</p>
          <p className="hallucination-bridge">Le modèle peut produire une réponse fluide sans disposer d’une information fiable. Pour vérifier un fait, on peut lui apporter des sources ou des outils.</p>
        </div>
      )}
    </div>
  );
}
