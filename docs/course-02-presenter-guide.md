# Course 02 — Guide de l’orateur

## Fil rouge

Question centrale :

> Comment passer d’un LLM qui répond à un système capable d’utiliser nos connaissances et nos outils, tout en restant observable, contrôlable et sécurisé ?

Le cours ne présente pas RAG, MCP, harnais et loop comme quatre produits. Chaque notion arrive pour résoudre une limite apparue à l’étape précédente.

### Les quatre idées à faire retenir

- **RAG** : apporter le bon contexte.
- **MCP** : exposer des capacités et des ressources de manière standardisée.
- **Harnais** : orchestrer et contrôler l’exécution.
- **Loop** : enchaîner observation, décision et action.
- **Observabilité** : savoir ce qui s’est passé.
- **Sécurité** : définir ce qui est permis, par qui et dans quelles conditions.

Ne pas présenter le « harnais » comme un produit ou un standard unique : ici, c’est un concept d’architecture. Même prudence pour la « loop ».

## 01 — Le LLM ne suffit plus

Faire partir le groupe d’un cas simple : « Combien de tickets sont ouverts ? »

État 0 : le LLM produit une réponse, mais ne possède pas nécessairement les données du SI.

État 1 : faire constater que la question porte sur une donnée vivante.

État 2 : annoncer le changement de perspective : on ne cherche plus seulement à comprendre le modèle, mais à construire le système autour de lui.

Transition : « Première limite : comment lui donner les bonnes informations ? »

## 02 — Le RAG

État 0 : documents → découpage → recherche → contexte → LLM.

État 1 : expliquer que les documents doivent être préparés et représentés pour être recherchables.

État 2 : montrer que la recherche prépare le contexte ; elle ne modifie pas les poids du modèle.

État 3 : insister sur la chaîne de qualité : ingestion, découpage, recherche, filtrage, contexte.

État 4 : poser immédiatement la question sécurité : « Et si le document retrouvé est confidentiel ? »

Ne pas dire « le RAG donne une mémoire au modèle ». Dire plutôt qu’il récupère des informations externes et les fournit au modèle au moment de la requête.

## 03 — Le contexte n’est pas un droit

Faire un exemple Alice / Bob.

État 0 : deux utilisateurs, deux périmètres documentaires.

État 1 : l’autorisation doit être imposée par le système, pas demandée au LLM.

État 2 : une donnée filtrée après son passage dans le contexte est déjà trop tard.

Message clé : **l’accès à l’information est une propriété du système d’autorisation, pas une consigne adressée au modèle.**

## 04 — MCP

État 0 : RAG ne permet pas de connaître directement l’état courant de Jira, GitHub ou d’un CRM.

État 1 : présenter MCP comme un cadre standardisé permettant à un client compatible de découvrir/utiliser des outils et ressources exposés par un serveur.

État 2 : séparer clairement « outil disponible » et « action autorisée ».

État 3 : RAG + MCP : connaissance récupérée d’un côté, capacités et données vivantes de l’autre.

Éviter de présenter MCP comme « le protocole qui transforme le LLM en agent ».

## 05 — Le harnais

État 0 : demander « qui contrôle tout cela ? »

État 1 : permissions, limites, validations, budgets, timeouts.

État 2 : le modèle propose ; le système décide ce qui peut réellement être exécuté.

État 3 : certaines actions doivent attendre une confirmation humaine.

Message clé : **l’autorité ne doit pas être implicite dans le modèle.**

## 06 — La boucle

État 0 : objectif → décision → outil → résultat → nouvelle décision.

État 1 : montrer qu’une tâche complexe peut nécessiter plusieurs observations et actions.

État 2 : faire apparaître les limites d’exécution : itérations, timeout, budget, erreurs, condition d’arrêt.

État 3 : conclure : plus d’autonomie signifie aussi davantage de surface de risque.

Ne pas présenter une loop comme une intelligence mystérieuse : c’est une orchestration répétée d’étapes avec des conditions d’arrêt.

## 07 — Observer ce qui se passe

État 0 : poser la question « à 14 h 32, que s’est-il passé ? »

État 1 : introduire la trace d’exécution : requête, retrieval, appel LLM, tool call, résultat, latence, coût, erreur.

État 2 : rappeler qu’un log peut lui-même devenir une fuite de données.

Message clé : **on ne peut pas exploiter sérieusement un système agentique qu’on ne sait pas observer.**

## 08 — Sécuriser l’action

État 0 : un document récupéré peut contenir une instruction hostile. Une donnée n’est pas automatiquement une instruction fiable.

État 1 : prompt injection : la frontière de sécurité doit rester dans les composants de confiance.

État 2 : moindre privilège, séparation des responsabilités, validation des actions sensibles.

État 3 : la sécurité doit couvrir toute la chaîne.

Ne pas laisser entendre qu’un prompt système « résout » la sécurité. Les permissions et les contrôles d’exécution doivent être imposés par l’architecture.

## 09 — Le système complet

État 0 : reconstruire la chaîne complète : utilisateur → harnais → LLM → RAG/MCP → outils.

État 1 : montrer que le modèle est une brique parmi d’autres.

État 2 : poser la question finale :

> « Jusqu’où sommes-nous prêts à laisser le système agir seul ? »

Faire répondre le groupe avant de conclure.

## Les pièges de formulation

Éviter :
- « Le RAG donne une mémoire au LLM. »
- « MCP donne des mains au modèle. »
- « Le harnais est le cerveau de l’agent. »
- « L’agent sait quand s’arrêter. »
- « Les logs prouvent que la réponse est correcte. »
- « Le prompt protège le système contre les attaques. »

Préférer :
- « Le RAG récupère du contexte externe. »
- « MCP standardise l’exposition de capacités et de ressources. »
- « Le harnais orchestre et contrôle l’exécution. »
- « La boucle doit avoir des conditions d’arrêt explicites. »
- « Les traces permettent de reconstruire l’exécution. »
- « La sécurité doit être imposée par les composants de confiance. »
