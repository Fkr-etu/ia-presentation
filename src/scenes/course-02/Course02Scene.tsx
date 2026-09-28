type Props={sceneIndex:number;step:number};
const data=[
["Le point de départ","Un LLM sait répondre. Pas forcément travailler.","Il génère à partir de ce qu’on lui fournit. Nos documents et nos outils sont ailleurs.","llm"],
["Le problème","« Combien de tickets sont ouverts ? »","Un modèle seul n’a pas accès à l’état courant de votre SI.","question"],
["Le changement","On construit un système autour du modèle.","Connaissance, outils, contrôle, boucle et observation deviennent des briques distinctes.","system"],
["RAG · 01","Donner au modèle le bon contexte","On retrouve des informations pertinentes avant de demander au LLM de répondre.","rag1"],
["RAG · 02","Documents → unités → recherche","Les documents sont préparés, représentés et indexés pour permettre une recherche sémantique.","rag2"],
["RAG · 03","La recherche prépare le contexte","La requête sert à sélectionner des passages. Ces passages sont ensuite transmis au modèle.","rag3"],
["RAG · 04","Le RAG n’est pas une mémoire magique","La qualité dépend de l’ingestion, du découpage, de la recherche, du filtrage et du contexte envoyé.","rag4"],
["RAG · 05","Connaissance ≠ autorisation","Un document retrouvé n’est exploitable que si l’utilisateur a le droit de le consulter.","auth"],
["Sécurité · 01","Alice et Bob ne voient pas la même chose","Les permissions de la source doivent être respectées au moment de la récupération.","acl"],
["Sécurité · 02","Le contrôle d’accès ne se délègue pas au LLM","L’autorisation doit être appliquée par le système, avant de transmettre le contenu au modèle.","policy"],
["Sécurité · 03","La sécurité commence avant le prompt","Une donnée filtrée trop tard est déjà une donnée potentiellement divulguée.","policy"],
["MCP · 01","Le RAG ne suffit plus","Pour consulter Jira, GitHub ou un CRM, il faut donner accès à des capacités et à des données vivantes.","tools"],
["MCP · 02","Le modèle choisit une capacité","MCP fournit un cadre standardisé pour exposer des outils et des ressources à un client compatible.","mcp"],
["MCP · 03","Un outil n’est pas un privilège","Exposer une capacité ne signifie pas autoriser toutes les actions qu’elle permet.","tool-policy"],
["MCP · 04","RAG + MCP","RAG apporte du contexte. Les outils permettent d’interroger ou d’agir sur le SI.","rag-mcp"],
["Harnais · 01","Qui orchestre tout cela ?","Le harnais encadre l’exécution : contexte, outils, règles, limites, validations et traces.","harness"],
["Harnais · 02","Le harnais décide ce qui peut arriver","Il peut imposer des permissions, des validations humaines, des limites de temps et de budget.","guardrails"],
["Harnais · 03","Le modèle propose. Le système contrôle.","Ne donnez pas au LLM une autorité implicite sur votre SI.","control"],
["Harnais · 04","Une action sensible peut attendre un humain","Lire un ticket n’a pas le même niveau de risque que supprimer une donnée ou envoyer un message.","human"],
["Loop · 01","Une réponse devient une séquence","Objectif → décision → outil → résultat → nouvelle décision.","loop1"],
["Loop · 02","Le système observe puis agit","La boucle permet de décomposer une tâche en plusieurs étapes au lieu de tout résoudre en un appel.","loop2"],
["Loop · 03","Une boucle doit savoir s’arrêter","Timeout, nombre maximal d’itérations, budget, erreurs et conditions d’arrêt sont explicites.","loop3"],
["Loop · 04","Plus d’autonomie = plus de surface de risque","Chaque étape supplémentaire ajoute des appels, des données et des possibilités d’erreur.","loop4"],
["Observabilité · 01","À 14 h 32, que s’est-il passé ?","Sans traces, une exécution agentique est difficile à expliquer, diagnostiquer ou auditer.","logs"],
["Observabilité · 02","Une trace raconte l’exécution","Utilisateur, récupération, modèle, outil, résultat, latence, erreurs et coût peuvent être corrélés.","trace"],
["Observabilité · 03","On ne logue pas n’importe quoi","Les traces doivent aider à diagnostiquer sans devenir un nouveau canal de fuite de données sensibles.","log-policy"],
["Sécurité · 01","Le contenu récupéré peut être hostile","Une instruction présente dans un document n’est pas automatiquement une instruction fiable pour le système.","injection"],
["Sécurité · 02","Prompt injection : le modèle n’est pas la frontière de sécurité","Les permissions, validations et filtres doivent être imposés par les composants de confiance.","injection2"],
["Sécurité · 03","Moindre privilège, séparation, validation","Réduire les droits et confirmer les actions sensibles limite l’impact d’une mauvaise décision.","least"],
["Sécurité · 04","La sécurité est une propriété du système","RAG, MCP, harnais, loop et observabilité doivent fonctionner ensemble.","security-system"],
["Synthèse · 01","Du LLM au système","Chaque brique répond à une limite différente : connaissance, outils, contrôle, boucle, observation.","architecture"],
["Synthèse · 02","Le modèle n’est qu’une brique","La valeur et le risque se trouvent dans le système complet, ses données, ses outils et ses règles.","stack"],
["Synthèse · 03","La vraie question : jusqu’où laisser agir ?","Une bonne architecture définit explicitement ce que le système peut lire, décider, faire, enregistrer et transmettre.","final"],
] as const;
const starts=[0,3,8,11,15,19,23,26,30];
export function Course02Scene({sceneIndex,step}:Props){
 const d=data[starts[sceneIndex]+step];return <div className={`c2-scene c2-scene--${d[3]}`}><div className="c2-copy"><div className="c2-kicker">{d[0]}</div><h1>{d[1]}</h1><p>{d[2]}</p></div><div className="c2-visual"><Visual kind={d[3]}/></div></div>;
}
function Visual({kind}:{kind:string}){
  if(kind==="llm") return <div className="c2-visual c2-visual--hero"><div className="c2-model-orbit"><span className="c2-orbit-ring c2-orbit-ring--one"/><span className="c2-orbit-ring c2-orbit-ring--two"/><strong>LLM</strong><small>génère</small></div><div className="c2-outside"><span>documents</span><span>SI vivant</span><span>outils</span></div></div>;
  if(kind==="question") return <div className="c2-question-board"><div className="c2-question-bubble">Combien de tickets sont ouverts ?</div><div className="c2-question-gap">?</div><div className="c2-question-state"><b>état courant du SI</b><span>inaccessible au modèle seul</span></div></div>;
  if(kind==="system") return <div className="c2-system-ring"><div className="c2-system-core">LLM</div>{["connaissance","outils","contrôle","observation"].map((x,i)=><div className="c2-system-satellite" style={{"--i":i} as React.CSSProperties} key={x}>{x}</div>)}</div>;
  if(kind==="rag1") return <div className="c2-rag-search"><div className="c2-rag-query">question</div><div className="c2-rag-searchline"><span/><i>⌕</i></div><div className="c2-rag-results"><b>résultat 01</b><b>résultat 02</b><b>résultat 03</b></div></div>;
  if(kind==="rag2") return <div className="c2-document"><div className="c2-document-title">Guide interne</div><div className="c2-document-lines">{Array.from({length:8},(_,i)=><span key={i}/>)}</div><div className="c2-chunks"><b>chunk</b><b>chunk</b><b>chunk</b></div></div>;
  if(kind==="rag3") return <div className="c2-context-window"><div className="c2-context-query">« tickets ouverts »</div><div className="c2-context-passages"><span>passage pertinent</span><span>passage pertinent</span><span>passage pertinent</span></div><div className="c2-context-model">LLM</div></div>;
  if(kind==="rag4") return <div className="c2-quality-ladder">{["ingestion","découpage","recherche","filtrage","contexte"].map((x,i)=><div key={x} style={{"--i":i} as React.CSSProperties}><span>{i+1}</span><b>{x}</b></div>)}</div>;
  if(kind==="auth"||kind==="acl"||kind==="policy") return <div className="c2-access"><div className="c2-person c2-person--a"><b>{kind==="acl"?"Alice":"demande"}</b><span>requête</span></div><div className="c2-gate"><strong>POLICY</strong><span>autorisé ?</span></div><div className="c2-protected"><b>documents</b><span>source protégée</span></div><div className="c2-denied">filtrer avant le LLM</div></div>;
  if(kind==="tools") return <div className="c2-tools-map"><div className="c2-tool-hub">capacité</div>{["Jira","GitHub","CRM"].map((x,i)=><div className="c2-tool-node" style={{"--i":i} as React.CSSProperties} key={x}>{x}</div>)}</div>;
  if(kind==="mcp") return <div className="c2-mcp-bridge"><div>CLIENT</div><div className="c2-mcp-protocol">MCP</div><div>SERVEUR</div><div className="c2-mcp-capability">outil / ressource</div></div>;
  if(kind==="tool-policy") return <div className="c2-permission-stack"><div>outil exposé</div><span>≠</span><div>permission</div><span>≠</span><div>action</div></div>;
  if(kind==="rag-mcp") return <div className="c2-two-lanes"><div><small>connaissance</small><strong>RAG</strong><span>documents</span></div><div><small>capacité</small><strong>MCP</strong><span>SI vivant</span></div><i>→ LLM →</i></div>;
  if(kind==="harness") return <div className="c2-control-tower"><div className="c2-control-core">HARNAIS</div><div className="c2-control-lines">{["contexte","outils","règles","limites","traces"].map(x=><span key={x}>{x}</span>)}</div></div>;
  if(kind==="guardrails") return <div className="c2-guardrails"><div className="c2-guardrail-zone"><span>permissions</span><span>budget</span><span>timeout</span></div><div className="c2-guardrail-action">action</div></div>;
  if(kind==="control") return <div className="c2-control-split"><div className="c2-propose">LLM<br/><small>propose</small></div><div className="c2-control-bar">CONTRÔLE</div><div className="c2-execute">SI<br/><small>exécute</small></div></div>;
  if(kind==="human") return <div className="c2-human-check"><div>lecture</div><div>suppression</div><div className="c2-human"><b>humain</b><span>confirme</span></div></div>;
  if(kind==="loop1"||kind==="loop2") return <div className="c2-loop"><div className="c2-loop-node c2-loop-node--a">observer</div><div className="c2-loop-node c2-loop-node--b">décider</div><div className="c2-loop-node c2-loop-node--c">agir</div><div className="c2-loop-arrow">↻</div></div>;
  if(kind==="loop3") return <div className="c2-stop-panel"><div className="c2-stop-core">STOP</div>{["itérations","timeout","budget","erreur"].map((x,i)=><span style={{"--i":i} as React.CSSProperties} key={x}>{x}</span>)}</div>;
  if(kind==="loop4") return <div className="c2-risk-meter"><div className="c2-risk-line"><span/><span/><span/><span/><span/></div><small>autonomie</small><b>surface de risque</b></div>;
  if(kind==="logs") return <div className="c2-log-window">{["14:32:01 request","14:32:02 retrieval","14:32:04 tool.call","14:32:07 response"].map((x,i)=><div key={x}><span>{i+1}</span>{x}</div>)}</div>;
  if(kind==="trace") return <div className="c2-trace"><div className="c2-trace-line"/>{["request","retrieval","llm.call","tool.call","tool.result","response"].map((x,i)=><span style={{"--i":i} as React.CSSProperties} key={x}>{x}</span>)}</div>;
  if(kind==="log-policy") return <div className="c2-log-filter"><div>DONNÉE SENSIBLE</div><span>minimiser</span><b>TRACE UTILE</b><span>protéger</span></div>;
  if(kind==="injection"||kind==="injection2") return <div className="c2-injection"><div className="c2-injection-doc">DOCUMENT<div className="c2-hostile">« ignore les règles… »</div></div><div className="c2-injection-boundary">FRONTIÈRE<br/><small>composants de confiance</small></div><div className="c2-injection-action">action</div></div>;
  if(kind==="least") return <div className="c2-least"><div className="c2-key">droits</div><div className="c2-least-bars">{["lire","écrire","supprimer"].map((x,i)=><span className={i===0?"is-allowed":""} key={x}>{x}</span>)}</div><small>seul le nécessaire est ouvert</small></div>;
  if(kind==="security-system") return <div className="c2-security-wall">{["identités","données","outils","politiques"].map(x=><span key={x}>{x}</span>)}<b>sécurité</b></div>;
  if(kind==="architecture") return <div className="c2-architecture"><div>UTILISATEUR</div><span>→</span><div className="is-core">HARNAIS</div><span>→</span><div>LLM</div><section><b>RAG</b><b>MCP</b><b>OBSERVABILITÉ</b></section><footer>OUTILS · DONNÉES · RÈGLES</footer></div>;
  if(kind==="stack") return <div className="c2-stack-visual">{["données","RAG","LLM","harnais","outils","observabilité"].map((x,i)=><div style={{"--i":i} as React.CSSProperties} key={x}>{x}</div>)}</div>;
  if(kind==="final") return <div className="c2-final-question"><span>lire</span><span>décider</span><span>agir</span><span>tracer</span><strong>?</strong></div>;
  return <div className="c2-card-stack"><div className="c2-card"><strong>Une idée</strong></div></div>;
}
