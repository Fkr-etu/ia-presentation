import { motion } from "motion/react";

const tokens = ["Le", "ciel", "est", "souvent"];
const next = [
  { label: "bleu", value: "61%" },
  { label: "clair", value: "17%" },
  { label: "visible", value: "8%" },
];

export function GenerationScene({ step }: { step: number }) {
  const visible = Math.min(tokens.length, step + 1);

  return (
    <div className="scene-generation">
      <div className="generation-stage">
        <div className="generation-line" aria-live="polite">
          {tokens.slice(0, visible).map((token, index) => (
            <motion.span key={token} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }}>
              {token}
            </motion.span>
          ))}
          {step >= 4 && <motion.span className="generation-cursor" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.1 }}>▌</motion.span>}
        </div>
      </div>

      {step >= 4 && (
        <motion.div className="generation-choice" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="generation-choice__title">Distribution illustrative du prochain token</p>
          <div className="generation-probs">
            {next.map((item) => (
              <span key={item.label}>{item.label}<b>{item.value}</b></span>
            ))}
          </div>
          <p className="generation-choice__note">Ces probabilités sont illustratives : le modèle attribue des scores aux tokens candidats puis en sélectionne un.</p>
        </motion.div>
      )}

      {step >= 4 ? null : step >= 3 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          La génération se fait token après token. Après chaque token, le modèle recalcule la suite possible à partir du nouveau contexte.
        </motion.p>
      ) : null}
    </div>
  );
}
