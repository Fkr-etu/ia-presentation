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
          <p className="hallucination-verdict">Le piège est dans la question.</p>
          <p className="hallucination-bridge">
            La prémisse est fictive : il n’existe pas de ville fondée sur Mars en 1987.
            Un modèle peut pourtant produire une réponse fluide et plausible au lieu de signaler que la prémisse est fausse.
            Pour vérifier un fait, on peut lui apporter des sources ou des outils.
          </p>
        </div>
      )}
    </div>
  );
}
