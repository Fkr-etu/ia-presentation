import { motion } from "motion/react";

const tokens = ["Le", "ciel", "est", "souvent", "bleu", "."];

export function GenerationScene({ step }: { step: number }) {
  const visible = Math.min(tokens.length, step + 2);
  return (
    <div className="scene-generation">
      <div className="generation-line">
        {tokens.slice(0, visible).map((token, index) => (
          <motion.span key={token} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            {token}
          </motion.span>
        ))}
        {step < tokens.length - 2 && <span className="generation-cursor">▌</span>}
      </div>
      {step >= 1 && (
        <div className="generation-probs">
          <span>bleu <b>61%</b></span>
          <span>clair <b>17%</b></span>
          <span>visible <b>8%</b></span>
        </div>
      )}
      {step >= 4 && <p>Les probabilités ci-dessus sont illustratives : elles servent à comprendre le mécanisme, pas à représenter un modèle réel.</p>}
    </div>
  );
}
