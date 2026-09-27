import { motion } from "motion/react";

const stages = [
  ["ta question", "texte"],
  ["tokens", "unités"],
  ["représentations", "vecteurs"],
  ["contexte", "relations"],
  ["Transformer", "transformations"],
  ["probabilités", "prochains tokens"],
  ["tokens générés", "boucle"],
  ["réponse", "texte"],
];

export function SynthesisScene({ step }: { step: number }) {
  return (
    <div className="scene-synthesis lesson-frame">
      <span className="lesson-kicker">10 · Tout remettre ensemble</span>
      <h2 className="lesson-title">Une réponse générée est le résultat d’une longue chaîne de transformations.</h2>

      <div className="synthesis-flow" aria-label="Synthèse du parcours">
        {stages.map(([stage, detail], index) => (
          <motion.span key={stage} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.06 }}>
            <b>{stage}</b><small>{detail}</small>
          </motion.span>
        ))}
      </div>

      {step === 0 && <div className="lesson-grid lesson-grid--three"><div><strong>1. Représenter</strong><span>Le texte est converti en tokens puis en représentations numériques.</span></div><div><strong>2. Contextualiser</strong><span>L’attention et les couches du Transformer transforment ces représentations.</span></div><div><strong>3. Générer</strong><span>Le modèle produit progressivement des tokens à partir du contexte courant.</span></div></div>}
      {step === 1 && (
        <div className="synthesis-final">
          <strong>Le modèle calcule ; il ne consulte pas nécessairement une base de vérité.</strong>
          <strong>Une réponse peut être cohérente et néanmoins fausse.</strong>
        </div>
      )}
      {step === 2 && (
        <div className="synthesis-final synthesis-final--hook">
          <div className="lesson-callout"><strong>Les 3 idées à retenir</strong><span>Tokens : l’unité manipulée. · Attention : le contexte compte. · Génération : la réponse se construit token après token.</span></div>
          <em>Alors, une IA pense-t-elle comme nous ?</em>
          <p>Prochaine étape : comprendre ce que l’on doit ajouter à un LLM seul pour travailler avec des connaissances, des sources et des actions externes.</p>
        </div>
      )}
    </div>
  );
}
