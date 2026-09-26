import { motion } from "motion/react";

export function IntroScene({ step }: { step: number }) {
  const question = "Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans.";

  return (
    <div className="scene-intro">
      {step === 0 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scene-kicker">Une question ordinaire.</motion.p>}
      {step === 1 && <motion.h1 initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>{question}</motion.h1>}
      {step === 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scene-question">Que se passe-t-il maintenant ?</motion.p>}
      {step === 3 && (
        <motion.div className="scene-pipeline-mini" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {["tokens", "vecteurs", "relations", "réseau", "probabilités", "réponse"].map((item, index) => (
            <span key={item} style={{ animationDelay: `${index * 80}ms` }}>{item}</span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
