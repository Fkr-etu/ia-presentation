import { motion } from "motion/react";

const tokens = ["La", "souris", "mange", "le", "fromage", "parce", "qu’", "il", "est", "bon", "."];
const relations = [
  { from: 1, weight: 0.72 },
  { from: 4, weight: 0.94 },
  { from: 2, weight: 0.42 },
];

export function AttentionScene({ step }: { step: number }) {
  return (
    <div className="scene-attention">
      <div className="attention-stage" aria-label="Visualisation pédagogique des relations d’attention">
        <svg className="attention-graph" viewBox="0 0 1100 430" role="img">
          <defs>
            <marker id="attention-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          <text x="550" y="48" className="attention-graph__label">contexte</text>
          {step >= 2 && relations.map((relation, index) => {
            const x = 72 + relation.from * 96;
            const targetX = 72 + 7 * 96;
            const y = 286;
            return (
              <motion.path
                key={relation.from}
                d={"M " + x + " " + (y - 24) + " Q " + ((x + targetX) / 2) + " " + (115 - index * 22) + " " + targetX + " " + (y - 24)}
                className={index === 1 ? "attention-graph__link attention-graph__link--strong" : "attention-graph__link"}
                style={{ opacity: 0.35 + relation.weight * 0.65 }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 + relation.weight * 0.65 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                markerEnd="url(#attention-arrow)"
              />
            );
          })}
          {tokens.map((token, index) => {
            const x = 72 + index * 96;
            const target = index === 7;
            return (
              <g key={`${token}-${index}`} className={target && step >= 1 ? "attention-token is-target" : "attention-token"}>
                <rect x={x - 38} y="260" width="76" height="52" rx="14" />
                <text x={x} y="293" textAnchor="middle">{token}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {step === 0 && <p className="scene-question">À quoi renvoie « il » ?</p>}
      {step === 1 && <motion.p className="attention-prompt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Le modèle doit mettre « il » en relation avec le contexte.</motion.p>}
      {step >= 2 && <motion.p className="attention-explanation" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Les relations ne sont pas toutes pondérées de la même façon : certaines informations du contexte comptent davantage pour la représentation courante.</motion.p>}
      {step >= 3 && <motion.div className="attention-transfer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span>« 10 ans »</span><b>→</b><span>contexte de la réponse</span></motion.div>}
    </div>
  );
}