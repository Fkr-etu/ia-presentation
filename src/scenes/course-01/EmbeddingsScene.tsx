import { motion } from "motion/react";

const points = [
  ["ciel", 18, 28], ["nuage", 34, 21], ["pluie", 40, 42], ["soleil", 63, 20],
  ["chat", 76, 63], ["chien", 67, 76], ["voiture", 88, 42],
];

export function EmbeddingsScene({ step }: { step: number }) {
  return (
    <div className="scene-embeddings">
      {step < 2 ? (
        <motion.div className="embedding-vector" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <span>ciel</span>
          <code>[0.21, -0.73, 0.44, 0.08, …]</code>
        </motion.div>
      ) : (
        <div className="embedding-space" aria-label="Projection pédagogique d'un espace d'embeddings">
          {points.map(([label, left, top], index) => (
            <motion.button
              key={label}
              type="button"
              className={`embedding-point ${step >= 3 && index < 4 ? "is-related" : ""}`}
              style={{ left: `${left}%`, top: `${top}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {label}
            </motion.button>
          ))}
          {step >= 4 && <div className="embedding-note">3D ici = projection pédagogique. L’espace réel possède beaucoup plus de dimensions.</div>}
        </div>
      )}
    </div>
  );
}
