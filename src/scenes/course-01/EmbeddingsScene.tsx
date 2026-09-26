import { motion } from "motion/react";
import { EmbeddingSpace3D } from "./EmbeddingSpace3D";

mport { motion } from "motion/react";
import { EmbeddingSpace3D } from "./EmbeddingSpace3D";

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
      {step === 0 && (
        <motion.div
          className="embedding-intro"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="embedding-word">ciel</span>
          <p>Comment transformer ce token en quelque chose qu’un réseau neuronal peut manipuler ?</p>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          className="embedding-vector"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span>ciel</span>
          <b>→</b>
          <code>[0.21, -0.73, 0.44, 0.08, …]</code>
          <p>Un token reçoit une représentation numérique : un vecteur de nombres.</p>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          className="embedding-relations"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="embedding-relation-node embedding-relation-node--main">ciel</div>
          <div className="embedding-relation-line embedding-relation-line--one" />
          <div className="embedding-relation-line embedding-relation-line--two" />
          <div className="embedding-relation-line embedding-relation-line--three" />
          <div className="embedding-relation-node embedding-relation-node--cloud">nuage</div>
          <div className="embedding-relation-node embedding-relation-node--rain">pluie</div>
          <div className="embedding-relation-node embedding-relation-node--sun">soleil</div>
          <span className="embedding-relation-label">pendant l’entraînement, ces représentations sont ajustées pour rendre certaines relations utiles au modèle</span>
        </motion.div>
      )}

      {step >= 3 && (
        <div className="embedding-stage embedding-stage--immersive">
          <EmbeddingSpace3D step={step} />
          {step === 3 && (
            <motion.div
              className="embedding-cluster-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              une projection pédagogique d’un espace de grande dimension
            </motion.div>
          )}
        </div>
      )}

      {step >= 4 && (
        <motion.div
          className="embedding-note"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>Attention : ce n’est pas une carte réelle en 3D.</strong>
          <p>
            Les vrais embeddings ont beaucoup plus de dimensions. Cette projection sert seulement à
            rendre l’idée visible. Et le contexte n’est pas encore intégré : c’est justement le rôle
            de l’attention.
          </p>
        </motion.div>
      )}
    </div>
  );
}
