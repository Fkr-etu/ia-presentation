import { motion } from "motion/react";

export function HallucinationsScene({ step }: { step: number }) {
  return (
    <div className="scene-hallucinations">
      <p className="hallucination-question">Quel est le nom de la première ville sur Mars fondée en 1987 ?</p>
      {step === 0 && <button className="reveal-button" type="button">Que répondrait un modèle ?</button>}
      {step >= 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hallucination-answer">« New Horizon City »</motion.div>}
      {step >= 2 && (
        <>
          <p className="hallucination-verdict">Cette réponse est inventée.</p>
          <p className="hallucination-bridge">Une réponse fluide n’est pas nécessairement une réponse vraie. Pour vérifier, il faut apporter au modèle des sources ou des outils.</p>
        </>
      )}
    </div>
  );
}
