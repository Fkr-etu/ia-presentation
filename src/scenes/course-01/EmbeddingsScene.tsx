import { motion } from "motion/react";
import { EmbeddingSpace3D } from "./EmbeddingSpace3D";

export function EmbeddingsScene({ step }: { step: number }) {
  return (
    <div className="scene-embeddings">
      {step === 0 && (
        <motion.div className="embedding-intro" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="embedding-word">ciel</span>
          <p>Comment transformer ce token en quelque chose qu’un réseau neuronal peut manipuler ?</p>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div className="embedding-vector" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <span>ciel</span><b>→</b><code>[0.21, -0.73, 0.44, 0.08, …]</code>
          <p>Un token reçoit une représentation numérique : un vecteur de nombres.</p>
        </motion.div>
      )}

      {step >= 2 && (
        <div className="embedding-stage embedding-stage--immersive">
          <EmbeddingSpace3D step={step - 2} />
          {step === 2 && (
            <motion.div className="embedding-cluster-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              une projection pédagogique d’un espace de grande dimension
            </motion.div>
          )}
        </div>
      )}

      {step === 3 && (
        <motion.div className="embedding-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
