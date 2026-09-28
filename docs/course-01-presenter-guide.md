# Course 01 — Guide de l’orateur

## Rôle du guide

La V2 porte désormais l’essentiel du contenu pédagogique à l’écran. Ce document n’est donc **pas un script à lire** et ne doit pas être nécessaire pour comprendre les notions présentées.

Le guide sert à piloter l’oral :

- où ralentir ou faire une pause ;
- quoi faire observer au groupe ;
- quelle question poser ;
- quelle idée souligner à l’oral ;
- quelle transition préparer ;
- quels pièges de formulation éviter.

**Principe :** si une phrase est déjà lisible à l’écran, ne la relis pas. Utilise-la comme point d’appui pour faire observer, questionner ou expliquer.

---

## Règles d’animation

### 1. Une action = une intention

À chaque pression sur « suivant », identifie l’intention de l’état qui vient d’apparaître : faire observer, révéler, comparer, expliquer ou synthétiser.

Si deux états successifs provoquent exactement la même prise de parole, le problème est probablement dans la progression de la scène.

### 2. Ne pas commenter tout ce qui est visible

L’écran porte les mots-clés, les schémas et les exemples. L’oral apporte surtout :

- le contexte ;
- l’interprétation ;
- les questions ;
- les analogies courtes ;
- les limites des simplifications.

### 3. Faire participer sans bloquer le rythme

Une question destinée à la salle ne doit pas nécessiter une réponse longue. Deux ou trois réponses suffisent avant de poursuivre.

### 4. Signaler les simplifications

Dire explicitement lorsqu’un chiffre, un poids d’attention, une projection 3D ou une distribution est illustratif.

Ne pas présenter le pipeline pédagogique comme une chronologie littérale d’un modèle industriel.

### 5. Garder trois distinctions

- token ≠ forcément mot ;
- représentation numérique ≠ définition humaine du sens ;
- continuation plausible ≠ information vérifiée.

### 6. Vocabulaire

Éviter de dire qu’un modèle « pense », « comprend » ou « sait » au sens humain sans préciser immédiatement la métaphore.

---

# 01 — La question

**Intention orale :** installer la question centrale sans expliquer trop tôt.

### État 0 — Entrer par la question

Laisser le premier écran quelques secondes.

**Faire :** regarder la salle, puis demander :

> « Qu’est-ce qui se passe entre une phrase que nous tapons et le texte qui apparaît ensuite ? »

Prendre quelques intuitions sans les corriger immédiatement.

### État 1 — Montrer le point de départ

Faire lire ou paraphraser la question affichée.

**Insister :** le cours va suivre cette question à l’intérieur d’un modèle de langage.

### État 2 — Montrer le parcours en une vue

Ne pas détailler chaque mécanisme. Faire suivre les trois phases : transformer, contextualiser, générer.

**À dire :**

> « Cette vue nous donne le fil conducteur. Nous allons maintenant ouvrir chaque phase pour voir ce que le modèle manipule réellement. »

### État 3 — Fixer la question directrice

Faire retenir une seule question :

> « Qu’est-ce que la machine manipule réellement à cette étape ? »

**Transition :** passer du panorama au trajet complet.

---

# 02 — Le voyage d’une question

**Intention orale :** donner le panorama avant d’entrer dans les mécanismes.

### État 0 — Première moitié du parcours

Pointer rapidement les premiers blocs.

**Insister :** le texte est converti en unités puis en représentations numériques.

### État 1 — Deuxième moitié

Montrer que le calcul se poursuit vers une distribution puis vers une continuation.

**Question courte :**

> « À quel moment pensez-vous que le prochain morceau de texte est déterminé ? »

Ne pas donner la réponse avant la scène sur la génération.

### État 2 — Mise en garde

Faire une pause sur la note de simplification.

**Insister :** le schéma est une carte pédagogique, pas une liste de huit opérations exécutées isolément.

**Transition :**

> « Pour comprendre le début de ce trajet, commençons par les tokens. »

---

# 03 — Les tokens

**Intention orale :** casser l’intuition « le modèle lit des mots ».

### État 0 — Découpage

Faire observer la phrase et ses unités.

Demander :

> « Où voyez-vous ici quelque chose qui ne correspond pas forcément à un mot entier ? »

### État 1 — Sous-unités

Faire comprendre qu’un mot peut être découpé en plusieurs tokens.

**À souligner :** le découpage exact dépend du tokenizer et de son vocabulaire.

### État 2 — Conséquence

Faire le lien avec la génération :

> « Quand nous dirons “prochain token”, pensez donc “prochaine unité du vocabulaire”, pas nécessairement “prochain mot”. »

**Transition :**

> « Nous avons maintenant des tokens. Mais un réseau neuronal doit travailler avec des nombres. »

---

# 04 — Les embeddings

**Intention orale :** passer du symbole discret à une représentation numérique sans transformer le vecteur en « définition du mot ».

### État 0 — Le problème

Faire verbaliser :

> « Que peut faire un réseau neuronal avec le symbole “ciel” ? »

Puis introduire la représentation numérique.

### État 1 — Le vecteur

Faire observer la liste de nombres.

**Insister :** les valeurs affichées sont fictives.

Ne pas lire les nombres à voix haute.

### État 2 — Projection

Laisser la visualisation 3D apparaître avant de l’expliquer.

**À dire :**

> « Ce que nous voyons est une projection pédagogique d’un espace beaucoup plus grand. »

### État 3 — Relations visibles

Faire observer le regroupement sans dire « ces mots ont le même sens ».

**Formulation sûre :**

> « Cette projection permet de rendre certaines relations visibles, mais elle ne constitue pas une carte exacte du sens. »

### État 4 — Limite de l’embedding initial

Faire le lien avec la scène suivante :

> « Une représentation initiale ne suffit pas encore à déterminer le rôle du token dans cette phrase. »

**Question :**

> « Si je vous donne seulement le mot “banque”, avez-vous toujours assez d’informations pour savoir de quelle banque il s’agit ? »

**Transition :** contexte → attention.

---

# 05 — L’attention

**Intention orale :** rendre la dépendance au contexte intuitive avant toute formulation technique.

### État 0 — Ambiguïté

Faire regarder « il ».

Demander :

> « À quoi renvoie-t-il ? Qu’est-ce qui vous permet de le décider ? »

### État 1 — Mécanisme

Nommer l’attention comme mécanisme de contextualisation.

Ne pas introduire les matrices Q/K/V ici : ce n’est pas nécessaire pour l’objectif de cette scène.

### État 2 — Relations illustratives

Faire observer les liens.

**Préciser :** les poids sont illustratifs et ne proviennent pas d’un modèle réel.

### État 3 — Contexte de la demande

Revenir à la question du début.

Faire remarquer que « comme si j’avais 10 ans » ajoute une contrainte de style et de niveau.

**Question :**

> « Si on retire cette partie, vous attendez exactement la même réponse ? »

**Transition :**

> « L’attention est un mécanisme. Voyons maintenant l’architecture qui l’intègre et la répète. »

---

# 06 — Le Transformer

**Intention orale :** faire comprendre « architecture » plutôt que « attention = Transformer ».

### État 0 — Architecture

Faire formuler la distinction :

> « Le Transformer n’est donc pas simplement un autre mot pour attention. »

### État 1 — Répétition

Pointer les couches.

**Insister :** un modèle réel comporte de nombreuses couches ; l’écran montre un bloc conceptuel.

### État 2 — Opérations internes

Mentionner brièvement :

- attention ;
- transformations neuronales ;
- connexions résiduelles ;
- normalisation.

Ne pas ouvrir un détour mathématique.

### État 3 — Intuition finale

Poser :

> « À ce stade, avons-nous déjà écrit la réponse ? »

Laisser la salle répondre.

**Transition :**

> « Non. Nous avons transformé les représentations. Il faut maintenant produire le prochain token. »

---

# 07 — La génération

**Intention orale :** installer le modèle mental autorégressif.

### État 0 — Contexte courant

Faire observer que le modèle travaille avec la séquence déjà disponible.

### État 1 — Prédiction

Faire apparaître l’idée de distribution.

**Insister :** les pourcentages sont illustratifs.

### État 2 — Distribution et boucle

Faire verbaliser la boucle :

> « prédire → retenir un token → l’ajouter au contexte → recommencer ».

Puis faire la distinction entre la distribution et le décodage :

> « La distribution est produite par le modèle ; la stratégie de décodage détermine ensuite comment un token est retenu. »

Éviter « le modèle choisit toujours le plus probable ».

### État 3 — Le texte continu

Faire observer que la boucle est répétée.

**Phrase clé :**

> « Une suite de décisions locales peut progressivement produire un texte continu. »

**Transition :**

> « Nous avons le mécanisme. Maintenant, faisons-le raisonner avec nous. »

---

# 08 — À vous de jouer

**Intention orale :** transformer la génération en exercice mental très court.

### État 0 — Faire voter la salle

Question :

> « Le ciel est souvent… ? »

Prendre quelques réponses à voix haute.

### État 1 — Révéler la distribution

Faire comparer l’intuition humaine et la distribution affichée.

**Insister :** les valeurs sont illustratives.

### État 2 — Mauvais candidat

Utiliser « voiture » pour montrer qu’un candidat peut être techniquement possible sans être adapté au contexte.

Éviter de dire « impossible ».

### État 3 — Boucle

Faire le geste mental d’ajouter le token au contexte.

**Phrase clé :**

> « Le calcul recommence avec une séquence légèrement différente. »

**Transition :**

> « Une suite de continuations plausibles produit-elle pour autant des faits vrais ? »

---

# 09 — Le piège du plausible

**Intention orale :** séparer fluidité linguistique et vérification factuelle.

### État 0 — Prémisse

Laisser la salle examiner la question.

Demander :

> « Quel est le problème avec cette question avant même de regarder la réponse ? »

### État 1 — Réponse plausible

Faire constater que la fluidité ne garantit rien sur la prémisse.

**Insister :**

> « Une réponse bien formulée n’est pas une preuve. »

### État 2 — Vérification

Faire passer du modèle à l’usage responsable :

- source ;
- recherche ;
- outil externe ;
- vérification lorsque l’enjeu le justifie.

**Transition :**

> « Revenons maintenant à notre question initiale et remettons toutes les pièces ensemble. »

---

# 10 — Tout remettre ensemble

**Intention orale :** consolider le modèle mental, pas introduire une nouvelle notion.

### État 0 — Parcours complet

Faire suivre la chaîne du doigt, sans relire chaque libellé.

**Question :**

> « Si je vous donne une nouvelle question, quelles sont les grandes familles d’étapes que vous vous attendez à retrouver ? »

### État 1 — Les trois idées

Faire retenir les trois messages :

1. le modèle manipule des représentations numériques ;
2. le contexte influence les représentations et les continuations ;
3. une continuation plausible n’est pas une vérification de vérité.

Ne pas ajouter de nouvelle notion technique.

### État 2 — Ouverture

Poser la question finale :

> « Alors, une IA pense-t-elle comme nous ? »

Laisser la question ouverte.

**Pont vers la suite :**

> « La prochaine question devient alors : que faut-il ajouter à un LLM pour travailler avec des sources, des documents, des outils ou des actions externes ? »

---

## Questions fréquentes — réponses courtes

### « Un token est-il un mot ? »

Non. Un token peut être un mot, une partie de mot, un signe ou une autre unité définie par le tokenizer.

### « Un embedding contient-il le sens d’un mot ? »

Pas sous la forme d’une définition humaine. Il s’agit d’une représentation numérique apprise, utilisée par le réseau pour effectuer ses calculs.

### « L’attention regarde-t-elle seulement le mot précédent ? »

Non. Elle permet de mettre en relation différentes positions accessibles dans le contexte, selon l’architecture et le masque utilisé.

### « Le modèle choisit-il toujours le token le plus probable ? »

Non. La distribution produite par le modèle et la stratégie de décodage sont deux choses distinctes.

### « Pourquoi une réponse peut-elle être fausse tout en étant fluide ? »

Parce que la génération d’une continuation plausible et la vérification d’un fait sont deux problèmes différents.

### « La visualisation 3D des embeddings est-elle réelle ? »

Elle est pédagogique. Les représentations réelles vivent dans des espaces de grande dimension ; l’écran montre une projection.

### « Le Transformer est-il seulement de l’attention ? »

Non. L’attention est un mécanisme important, mais l’architecture comprend également d’autres transformations, notamment des blocs feed-forward, des connexions résiduelles et de la normalisation.

---

## Rythme indicatif

| Scène | Durée indicative |
|---|---:|
| 01 — La question | 2 min |
| 02 — Le voyage d’une question | 4 min |
| 03 — Les tokens | 4 min |
| 04 — Les embeddings | 7 min |
| 05 — L’attention | 7 min |
| 06 — Le Transformer | 5 min |
| 07 — La génération | 6 min |
| 08 — À vous de jouer | 5 min |
| 09 — Le piège du plausible | 4 min |
| 10 — Tout remettre ensemble | 4 min |
| **Total** | **≈ 48 min** |

## Règle finale pour l’orateur

Le guide sert à **animer** la présentation, pas à la faire fonctionner.

Si l’orateur retire ce document, le public doit toujours pouvoir comprendre les concepts essentiels en lisant et en observant les écrans.

Le guide apporte ce que l’écran ne peut pas porter seul : rythme, questions, réactions à la salle, transitions et vigilance sur les simplifications.
