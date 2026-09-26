import { motion } from "motion/react";

const options = ["BLEU", "VERT", "VOITURE"];

export function SimulationScene({ step }: { step: number }) {
  const selected = step >= 3 ? "BLEU" : null;

  return (
    <div className="scene-simulation">
      <p className="simulation-prompt">Le ciel est souvent…</p>
      <div className="simulation-options" aria-label="Choisir un prochain token">
        {options.map((option) => (
          <button key={option} type="button" className={selected === option ? "is-selected" : ""}>
            {option}
          </button>
        ))}
      </div>

      {step >= 1 && (
        <motion.div className="simulation-result" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <span>BLEU</span><b>61%</b>
          <span>VERT</span><b>12%</b>
          <span>VOITURE</span><b>0,1%</b>
        </motion.div>
      )}

      {step >= 2 && <p className="simulation-message">Le contexte influence la distribution des probabilités : les candidats n’ont pas tous le même poids dans cette distribution.</p>}
      {step >= 3 && <p className="simulation-choice">Dans cette simulation, le token retenu est <strong>BLEU</strong>.</p>}
    </div>
  );
}
