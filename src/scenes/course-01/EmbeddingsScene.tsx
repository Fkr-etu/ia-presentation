import { motion } from "motion/react";
import { EmbeddingSpace3D } from "./EmbeddingSpace3D";

export function EmbeddingsScene({ step }: { step: number }) {
  return (
    <div className="scene-embeddings lesson-frame">
      <span className="lesson-kicker">04 · Les embeddings</span>
      <h2 className="lesson-title">Un token devient une représentation numérique.</h2>

      {step === 0 && (
        <motion.div className="embedding-intro lesson-content-panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="embedding-word">ciel</span>
          <div>
            <strong>Le problème</strong>
            <p>Un réseau neuronal effectue des calculs sur des nombres. Il faut donc associer au token une représentation numérique exploitable par le réseau.</p>
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div className="embedding-vector" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <span>ciel</span><b>→</b><code>[0.21, -0.73, 0.44, 0.08, …]</code>
          <p><strong>Embedding :</strong> vecteur de nombres associé à une représentation apprise du token. Les valeurs affichées sont fictives.</p>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="embedding-stage embedding-stage--immersive" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <EmbeddingSpace3D step={0} />
          <div className="embedding-cluster-label">projection pédagogique</div>
          <div className="lesson-overlay-card"><strong>Les représentations apprises</strong><span>permettent au réseau de calculer sur des régularités présentes dans les données.</span></div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="embedding-stage embedding-stage--immersive" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <EmbeddingSpace3D step={1} />
          <div className="lesson-overlay-card lesson-overlay-card--bottom"><strong>Une proximité n’est pas une définition.</strong><span>Les relations visibles ici sont une simplification pédagogique, pas une carte exacte du « sens » des mots.</span></div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div className="embedding-note lesson-content-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <strong>Ce que les embeddings ne font pas encore</strong>
          <p>Cette représentation initiale ne suffit pas à déterminer le rôle d’un token dans une phrase. Le contexte doit encore être pris en compte. C’est le problème auquel répond l’attention.</p>
          <div className="lesson-grid lesson-grid--two">
            <div><strong>Appris</strong><span>Les représentations sont ajustées pendant l’entraînement.</span></div>
            <div><strong>Pas une carte 3D</strong><span>Les vrais vecteurs vivent dans un espace de grande dimension.</span></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
