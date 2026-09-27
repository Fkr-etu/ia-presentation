import { motion } from "motion/react";

const sentence = ["Un", "modèle", "ne", "pense", "pas", "."];

export function TokensScene({ step }: { step: number }) {
  return (
    <div className="scene-tokens lesson-frame">
      <span className="lesson-kicker">03 · Les tokens</span>
      <h2 className="lesson-title">Le modèle ne manipule pas directement nos mots.</h2>

      <div className="tokens-sentence" aria-label="Phrase découpée en tokens">
        {sentence.map((token, index) => (
          <motion.span key={token + index} className="token-chip" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            {token}
          </motion.span>
        ))}
      </div>

      {step === 0 && (
        <div className="lesson-grid lesson-grid--two">
          <div><strong>Token</strong><span>Une unité issue du découpage du texte selon le vocabulaire du modèle.</span></div>
          <div><strong>Pas forcément un mot</strong><span>Un token peut correspondre à un morceau de mot, un mot, un espace ou un signe selon le tokenizer.</span></div>
        </div>
      )}

      {step === 1 && (
        <motion.div className="lesson-example" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span>Un mot peut être découpé.</span>
          <div className="tokens-example"><b>« incroyable »</b><i>→</i><code>[incroy] [able]</code></div>
          <p>Le découpage exact dépend du tokenizer et de son vocabulaire.</p>
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div className="lesson-frame lesson-frame--inset" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <strong>Pourquoi découper ainsi ?</strong>
          <p>Un vocabulaire de sous-unités permet de représenter des mots rares ou nouveaux sans devoir stocker chaque mot entier. Le modèle prédit ensuite des <b>tokens</b>, pas nécessairement des mots.</p>
        </motion.div>
      )}

      <div className="lesson-takeaway"><b>À retenir :</b> le token est l’unité de base que le modèle manipule et génère.</div>
    </div>
  );
}
