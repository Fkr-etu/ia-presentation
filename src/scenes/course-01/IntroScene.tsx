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
          <span className="lesson-kicker">Une carte mentale</span>
          <div className="scene-pipeline-mini">
            {map.map((item) => (
              <span key={item.label}>
                <b>{item.label}</b>
                <small>{item.detail}</small>
              </span>
            ))}
          </div>
          <p className="lesson-explanation">Cette carte est une simplification pédagogique : les mécanismes du Transformer sont intégrés et répétés sur plusieurs couches.</p>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="lesson-frame lesson-frame--final" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="lesson-kicker">Le bon modèle mental</span>
          <h2>Le modèle ne « réfléchit » pas comme une personne.</h2>
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
