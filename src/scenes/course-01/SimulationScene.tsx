import { motion } from "motion/react";

const options = [
  { label: "BLEU", value: "61%" },
  { label: "VERT", value: "12%" },
  { label: "VOITURE", value: "0,1%" },
];

export function SimulationScene({ step }: { step: number }) {
  return (
    <div className="scene-simulation lesson-frame">
      <span className="lesson-kicker">08 · À vous de jouer</span>
      <h2 className="lesson-title">Si vous deviez prédire le prochain token, que choisiriez-vous ?</h2>
      <p className="simulation-prompt">Le ciel est souvent…</p>

      <div className="simulation-options" aria-label="Candidats au prochain token">
        {options.map((option) => (
          <span key={option.label} className={step >= 3 && option.label === "BLEU" ? "simulation-option is-selected" : "simulation-option"}>{option.label}</span>
        ))}
      </div>

      {step === 0 && <p className="simulation-instruction">Choisissez mentalement un candidat. Votre intuition utilise le contexte et vos connaissances du monde ; le modèle, lui, produit une distribution calculée.</p>}
      {step === 1 && (
        <motion.div className="simulation-result" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          {options.map((option) => <span key={option.label}>{option.label}</span>)}
          {options.map((option) => <b key={option.label + option.value}>{option.value}</b>)}
        </motion.div>
      )}
      {step === 2 && <p className="simulation-message"><strong>Le contexte change la distribution.</strong> Remplacer « ciel » par « herbe » ou « voiture » ferait apparaître une autre hiérarchie de continuations. Les valeurs ici sont illustratives.</p>}
      {step === 3 && <p className="simulation-choice"><strong>Dans notre simulation : BLEU.</strong> Le token retenu est ajouté au contexte, puis le calcul recommence pour le prochain token.</p>}
      <div className="lesson-takeaway"><b>À retenir :</b> prédire un token, c’est estimer une distribution conditionnée par le contexte.</div>
    </div>
  );
}
