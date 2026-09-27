import { motion } from "motion/react";

const stages = [
  ["QUESTION", "texte fourni par l’utilisateur"],
  ["TOKENS", "unités du vocabulaire du modèle"],
  ["EMBEDDINGS", "vecteurs numériques"],
  ["ATTENTION", "relations entre positions"],
  ["TRANSFORMER", "transformations successives"],
  ["PROBABILITÉS", "distribution sur les prochains tokens"],
  ["NOUVEAUX TOKENS", "continuation sélectionnée"],
  ["RÉPONSE", "suite de tokens affichée comme du texte"],
];

export function PipelineScene({ step }: { step: number }) {
  const count = step === 0 ? 2 : step === 1 ? 5 : stages.length;

  return (
    <div className="scene-pipeline">
      <div className="lesson-frame">
        <span className="lesson-kicker">02 · Le voyage d’une question</span>
        <h2 className="lesson-title">Du texte aux tokens, puis des tokens vers une continuation.</h2>
        <div className="pipeline-map">
          {stages.slice(0, count).map(([stage, detail], index) => (
            <motion.div key={stage} className="pipeline-map__item" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
              <strong>{stage}</strong>
              <span>{detail}</span>
              {index < count - 1 && <i aria-hidden="true">↓</i>}
            </motion.div>
          ))}
        </div>
      </div>

      {step === 0 && <p className="lesson-explanation">Première moitié : transformer une entrée textuelle en représentations que le réseau neuronal peut calculer.</p>}
      {step === 1 && <p className="lesson-explanation">Deuxième moitié : utiliser le contexte pour estimer ce qui peut venir ensuite, puis ajouter le token retenu au contexte.</p>}
      {step === 2 && (
        <div className="lesson-callout">
          <strong>Attention à la simplification</strong>
          <span>Ce schéma n’est pas une succession de huit opérations indépendantes : dans un vrai Transformer, ces mécanismes sont intégrés et répétés sur plusieurs couches.</span>
        </div>
      )}
    </div>
  );
}
