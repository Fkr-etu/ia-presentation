import { motion } from "motion/react";

const points = [
  { label: "ciel", x: 8, y: -4, z: 1, related: true },
  { label: "nuage", x: 2, y: -8, z: 5, related: true },
  { label: "pluie", x: 13, y: 5, z: 3, related: true },
  { label: "soleil", x: 20, y: -7, z: -2, related: true },
  { label: "chat", x: -14, y: 8, z: 2, related: false },
  { label: "chien", x: -8, y: 14, z: -4, related: false },
  { label: "voiture", x: -18, y: -2, z: -6, related: false },
];

export function EmbeddingsScene({ step }: { step: number }) {
  const rotation = step >= 3 ? -8 : 0;

  return (
    <div className="scene-embeddings">
      {step < 2 ? (
        <motion.div
          className="embedding-vector"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span>ciel</span>
          <code>[0.21, -0.73, 0.44, 0.08, …]</code>
        </motion.div>
      ) : (
        <div className="embedding-stage" aria-label="Espace d'embeddings en 3D, représentation pédagogique">
          <div
            className="embedding-space embedding-space--3d"
            style={{ transform: `rotateX(58deg) rotateZ(${rotation}deg)` }}
          >
            <span className="embedding-axis embedding-axis--x" />
            <span className="embedding-axis embedding-axis--y" />
            <span className="embedding-axis embedding-axis--z" />
            {points.map((point, index) => (
              <motion.div
                key={point.label}
                className={`embedding-point-3d ${step >= 3 && point.related ? "is-related" : ""}`}
                style={{
                  left: `${50 + point.x}%`,
                  top: `${50 + point.y}%`,
                  transform: `translateZ(${point.z * 9}px)`,
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: step >= 3 && point.related ? 1.12 : 1 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                {point.label}
              </motion.div>
            ))}
          </div>
          {step >= 3 && (
            <motion.div
              className="embedding-cluster-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              proximité sémantique
            </motion.div>
          )}
        </div>
      )}
      {step >= 4 && (
        <p className="embedding-note">
          3D ici = projection pédagogique. Un vrai embedding possède beaucoup plus de dimensions.
        </p>
      )}
    </div>
  );
}
