import { motion } from "motion/react";

const stages = ["QUESTION", "TOKENS", "EMBEDDINGS", "ATTENTION", "TRANSFORMER", "PROBABILITÉS", "NOUVEAUX TOKENS", "RÉPONSE"];

export function PipelineScene({ step }: { step: number }) {
  const count = step === 0 ? 2 : step === 1 ? 5 : stages.length;
  return (
    <div className="scene-pipeline">
      {stages.slice(0, count).map((stage, index) => (
        <motion.div key={stage} className="scene-pipeline__stage" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <strong>{stage}</strong>
          {index < count - 1 && <span aria-hidden="true">↓</span>}
        </motion.div>
      ))}
      {step === 2 && <p>Ce schéma simplifie le calcul réel : il ne se déroule pas comme une simple ligne.</p>}
    </div>
  );
}
