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
 const flows:Record<string,string[]>={
 rag1:["Documents","Découpage","Recherche","Contexte","LLM"],rag2:["Document","Chunks","Embeddings","Index"],rag3:["Question","Recherche","Passages pertinents","LLM"],tools:["LLM","MCP","Jira · GitHub · CRM"],mcp:["Client","MCP","Serveur","Outil / ressource"],"rag-mcp":["Question","RAG","MCP","LLM","Réponse"],harness:["Entrée","Harnais","LLM","Outils","Sortie"],loop1:["Objectif","Décision","Outil","Résultat","↺"],loop2:["Observer","Décider","Agir","Observer","Décider"],architecture:["Utilisateur","Harnais","LLM","RAG + MCP","Outils"],stack:["Données","RAG","LLM","Harnais","Outils","Observabilité"]};
 const cards:Record<string,string[]>={
 llm:["Question","LLM","Réponse"],question:["Utilisateur","« Combien de tickets ? »","LLM"],system:["Connaissance","Outils","Contrôle","Observation"],rag4:["Qualité des données","Recherche","Contexte","Réponse"],auth:["Document retrouvé","Droit de lecture ?","Oui / Non"],acl:["Alice","Documents autorisés","Bob","Documents autorisés"],policy:["Source de vérité","Politique d’accès","Avant le LLM"],"tool-policy":["Outil exposé","Permission","Action autorisée"],guardrails:["Permissions","Limites","Validation"],control:["LLM propose","Harnais contrôle","Système exécute"],human:["Action faible risque","Action sensible","Confirmation humaine"],loop3:["Max itérations","Timeout","Budget"],loop4:["Appel","Donnée","Décision","Risque"],logs:["14:32:01  request","14:32:02  retrieval","14:32:04  tool.call","14:32:07  response"],trace:["request","retrieval","llm.call","tool.call","tool.result","response"],"log-policy":["Tracer","Minimiser","Protéger"],injection:["Document","Instruction cachée","Système"],injection2:["Donnée non fiable","Règle système","Autorisation"],least:["Moindre privilège","Séparation","Validation"],"security-system":["Données","Identités","Outils","Politiques"],final:["Lire","Décider","Agir","Tracer"]};
 const items=flows[kind]??cards[kind]??["Une idée","Une règle","Une conséquence"];
 return <div className={flows[kind]?"c2-flow":"c2-card-stack"}>{items.map((x,i)=><div className={flows[kind]?"c2-flow__node":"c2-card"} key={x+i}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div>;
}
