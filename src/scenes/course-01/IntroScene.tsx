import { motion } from "motion/react";

export function IntroScene({ step }: { step: number }) {
  const question = "Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans.";

  return (
    <div className="scene-intro">
      {step === 0 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scene-kicker">Une question ordinaire.</motion.p>}
      {step >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1>{question}</h1>
          {step === 1 && <p className="scene-question">Que se passe-t-il maintenant ?</p>}
        </motion.div>
      )}
      {step === 2 && (
        <motion.div className="scene-pipeline-mini" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {["tokens", "vecteurs", "relations", "réseau", "probabilités", "réponse"].map((item, index) => (
            <span key={item} style={{ animationDelay: `${index * 80}ms` }}>{item}</span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
