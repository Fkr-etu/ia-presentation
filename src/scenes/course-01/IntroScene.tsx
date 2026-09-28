import { motion } from "motion/react";

const map = [
  { label: "tokens", detail: "découper le texte" },
  { label: "représentations", detail: "passer aux nombres" },
  { label: "contexte", detail: "relier les éléments" },
  { label: "Transformer", detail: "transformer les représentations" },
  { label: "probabilités", detail: "estimer la suite possible" },
  { label: "tokens", detail: "générer progressivement" },
];

export function IntroScene({ step }: { step: number }) {
  const question = "Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans.";

  return (
    <div className="scene-intro">
      {step === 0 && (
        <motion.div className="lesson-frame lesson-frame--hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="lesson-kicker">01 · La question</span>
          <p className="lesson-lead">Une IA générative reçoit du texte et produit du texte. Mais que se passe-t-il entre les deux ?</p>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div className="lesson-frame" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="lesson-kicker">Le point de départ</span>
          <h1>{question}</h1>
          <div className="lesson-callout">
            <strong>Question centrale</strong>
            <span>Comment cette phrase devient-elle une réponse produite par une machine ?</span>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="lesson-frame" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="lesson-kicker">Le parcours en une vue</span>
          <div className="lesson-map" aria-label="Vue simplifiée du parcours d’une question">
            <div className="lesson-map__phase">
              <span>01</span>
              <strong>Transformer</strong>
              <small>le texte en tokens</small>
            </div>
            <div className="lesson-map__connector" aria-hidden="true">→</div>
            <div className="lesson-map__phase">
              <span>02</span>
              <strong>Contextualiser</strong>
              <small>les représentations et leurs relations</small>
            </div>
            <div className="lesson-map__connector" aria-hidden="true">→</div>
            <div className="lesson-map__phase">
              <span>03</span>
              <strong>Générer</strong>
              <small>une continuation token après token</small>
            </div>
          </div>
          <p className="lesson-explanation">Une vue simplifiée : le Transformer répète ces mécanismes sur plusieurs couches. Ce n’est pas une chaîne de trois opérations isolées.</p>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="lesson-frame lesson-frame--final" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="lesson-kicker">Le bon modèle mental</span>
          <h2>Un modèle ne pense pas au sens humain du terme.</h2>
          <div className="lesson-grid">
            <div><strong>Il transforme</strong><span>le texte en représentations numériques.</span></div>
            <div><strong>Il contextualise</strong><span>les éléments de la séquence.</span></div>
            <div><strong>Il génère</strong><span>une continuation token après token.</span></div>
          </div>
          <p className="lesson-takeaway">À chaque étape, demandons-nous : <b>qu’est-ce que la machine manipule réellement ?</b></p>
        </motion.div>
      )}
    </div>
  );
}
