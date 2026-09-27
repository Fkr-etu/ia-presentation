import { motion } from "motion/react";

const tokens = ["La", "souris", "mange", "le", "fromage", "parce", "qu’", "il", "est", "bon", "."];
const relations = [
  { from: 1, weight: 0.72 },
  { from: 4, weight: 0.94 },
  { from: 2, weight: 0.42 },
];

export function AttentionScene({ step }: { step: number }) {
  return (
    <div className="scene-attention lesson-frame">
      <span className="lesson-kicker">05 · L’attention</span>
      <h2 className="lesson-title">Chaque position peut pondérer l’information provenant du contexte.</h2>
      <div className="attention-stage" aria-label="Visualisation pédagogique des relations d’attention">
        <svg className="attention-graph" viewBox="0 0 1100 430" role="img">
          <defs>
            <marker id="attention-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          <text x="550" y="48" className="attention-graph__label">relations illustratives — cible : « il »</text>
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
              <g key={token + index} className={target && step >= 1 ? "attention-token is-target" : "attention-token"}>
                <rect x={x - 38} y="260" width="76" height="52" rx="14" />
                <text x={x} y="293" textAnchor="middle">{token}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {step === 0 && <div className="lesson-callout"><strong>Le problème</strong><span>Pour interpréter « il », il faut utiliser les autres éléments de la phrase. Le contexte fournit l’information nécessaire.</span></div>}
      {step === 1 && <div className="lesson-callout"><strong>Le mécanisme</strong><span>L’attention permet de calculer quelles autres positions contribuent davantage à la représentation de la position étudiée.</span></div>}
      {step === 2 && <div className="lesson-callout"><strong>Les liens sont pondérés</strong><span>Les traits sont illustratifs : ils représentent des poids relatifs, pas des mesures extraites d’un modèle réel.</span></div>}
      {step === 3 && <div className="lesson-content-panel"><strong>Le contexte influence aussi la demande.</strong><p>Dans « Explique-moi le ciel comme si j’avais 10 ans », la fin de la phrase apporte une contrainte de style et de niveau. Le contexte influence donc les représentations utilisées pour la suite du calcul.</p><div className="attention-transfer"><span>« comme si j’avais 10 ans »</span><b>→</b><span>contexte utile</span></div></div>}
      <div className="lesson-takeaway"><b>À retenir :</b> l’attention aide le modèle à contextualiser les représentations en reliant les positions de la séquence.</div>
    </div>
  );
}
