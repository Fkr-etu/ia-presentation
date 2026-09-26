import { motion } from "motion/react";

const sentence = ["Un", "modèle", "ne", "pense", "pas", "."];

export function TokensScene({ step }: { step: number }) {
  return (
    <div className="scene-tokens">
      <div className="tokens-sentence" aria-label="Phrase découpée en tokens">
        {sentence.map((token, index) => (
          <motion.span key={token + index} className="token-chip" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            {token}
          </motion.span>
        ))}
      </div>

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="token-fragment-note">Un token n’est pas forcément un mot : le modèle découpe le texte en unités adaptées à son vocabulaire.</p>
          <div className="tokens-example">
            <span>« incroyable »</span>
            <b>→</b>
            <code>[incroy] [able]</code>
          </div>
        </motion.div>
      )}
    </div>
  );
}
