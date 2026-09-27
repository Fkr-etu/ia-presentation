import { motion } from "motion/react";

export function HallucinationsScene({ step }: { step: number }) {
  return (
    <div className="scene-hallucinations lesson-frame">
      <span className="lesson-kicker">09 · Le piège du plausible</span>
      <h2 className="lesson-title">Une réponse fluide n’est pas une preuve de vérité.</h2>

      <p className="hallucination-question">Quel est le nom de la première ville sur Mars fondée en 1987 ?</p>

      {step >= 1 && (
        <motion.div className="hallucination-answer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          « New Horizon City »
        </motion.div>
      )}

      {step === 0 && <div className="lesson-callout"><strong>Testez la question</strong><span>La question contient-elle une information que le modèle devrait accepter comme vraie ?</span></div>}
      {step === 1 && <div className="lesson-callout"><strong>Une continuation plausible</strong><span>Le modèle peut produire un nom qui ressemble à une réponse parce qu’il cherche une continuation compatible avec le contexte. Cela ne valide pas la prémisse.</span></div>}
      {step === 2 && (
        <div className="lesson-content-panel">
          <strong>Le piège est dans la question.</strong>
          <p>La prémisse est fictive : il n’existe pas de ville fondée sur Mars en 1987. Un modèle peut néanmoins produire une réponse fluide au lieu de signaler que la prémisse est fausse.</p>
          <div className="lesson-grid lesson-grid--two">
            <div><strong>À vérifier</strong><span>faits, dates, noms, chiffres et prémisses inhabituelles.</span></div>
            <div><strong>À renforcer</strong><span>sources, recherche ou outils externes lorsque la vérification est nécessaire.</span></div>
          </div>
        </div>
      )}

      <div className="lesson-takeaway"><b>À retenir :</b> un LLM optimise une génération plausible ; la vérification de faits demande parfois des sources ou des outils.</div>
    </div>
  );
}
