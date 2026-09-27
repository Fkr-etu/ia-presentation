import { motion } from "motion/react";

const tokens = ["Le", "ciel", "est", "souvent"];
const next = [
  { label: "bleu", value: "61%" },
  { label: "clair", value: "17%" },
  { label: "visible", value: "8%" },
];

export function GenerationScene({ step }: { step: number }) {
  return (
    <div className="scene-generation lesson-frame">
      <span className="lesson-kicker">07 · La génération</span>
      <h2 className="lesson-title">Le modèle estime le prochain token à partir du contexte courant.</h2>

      <div className="generation-stage">
        <div className="generation-line" aria-live="polite">
          {tokens.slice(0, Math.max(1, Math.min(tokens.length, step + 1))).map((token, index) => (
            <motion.span key={token} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }}>{token}</motion.span>
          ))}
          {step >= 1 && <motion.span className="generation-cursor" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.1 }}>▌</motion.span>}
        </div>
      </div>

      {step === 0 && <div className="lesson-callout"><strong>1 · Contexte</strong><span>À cet instant, le modèle dispose de la séquence déjà produite. Il calcule une distribution sur les tokens possibles ensuite.</span></div>}
      {step === 1 && <div className="lesson-callout"><strong>2 · Prédiction</strong><span>Le modèle attribue des scores transformés en probabilités aux tokens candidats. Les chiffres ci-dessous sont illustratifs.</span></div>}
      {step >= 2 && (
        <motion.div className="generation-choice" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="generation-choice__title">Distribution illustrative du prochain token</p>
          <div className="generation-probs">{next.map((item) => <span key={item.label}>{item.label}<b>{item.value}</b></span>)}</div>
          <p className="generation-choice__note"><strong>Distribution ≠ choix final.</strong> Une stratégie de décodage détermine le token retenu à partir de cette distribution. Après son ajout, le modèle recommence avec le nouveau contexte.</p>
        </motion.div>
      )}
      {step === 4 && <div className="lesson-content-panel"><strong>Pourquoi une réponse paraît-elle continue ?</strong><p>Parce que cette boucle est répétée : prédire → retenir un token → l’ajouter au contexte → prédire à nouveau. Une suite de décisions locales produit progressivement un texte cohérent.</p></div>}
      <div className="lesson-takeaway"><b>À retenir :</b> la génération autoregressive construit la réponse progressivement, token après token.</div>
    </div>
  );
}
