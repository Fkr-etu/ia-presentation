# Course 01 — Guide de l’orateur

## Purpose

This guide is the oral conductor for the 10-scene amphitheater presentation. The slides remain visually sparse; the guide contains what the presenter should explain, the questions to ask, the pedagogical traps to avoid, and the transition to the next state.

The wording is a conductor, not a text to recite verbatim. The presenter may shorten or expand it depending on the room.

## Global rules

- Start from the audience’s intuition before introducing technical vocabulary.
- One state should introduce one meaningful idea.
- Say explicitly when a number, probability, relation, or visualization is illustrative.
- Distinguish the model’s computation from the surrounding application: retrieval, tools, search, and external data are not part of a bare language model.
- Avoid saying that the model “understands”, “thinks”, or “knows” in the human sense unless the distinction is made immediately.
- Keep the central question visible throughout: **what happens between my question and the answer?**
- Do not overload a state with implementation details that do not serve the mental model.

---

## 01 — La question

### Objective

Create the central mystery of the course: what happens between a sentence typed by a person and the generated answer?

### Step 0 — The question appears

**What to say**

> « Imaginez que je demande à une IA : “Explique-moi pourquoi le ciel est bleu comme si j’avais 10 ans.” À première vue, il suffit de poser la question et une réponse apparaît. Mais qu’est-ce qui s’est réellement passé entre ces deux moments ? »

Pause.

> « Pendant cette présentation, on va suivre cette question à l’intérieur d’un modèle de langage. »

### Question to the audience

> « Selon vous, quelle est la toute première chose que le modèle doit faire avec cette phrase ? »

Accept several answers without correcting immediately.

### Step 1 — The question becomes a problem

**What to say**

> « Le piège serait d’imaginer une petite personne à l’intérieur de la machine qui lit la phrase, réfléchit, puis rédige une réponse. Ce n’est pas le bon modèle mental. »

> « Un modèle de langage transforme l’entrée en représentations numériques, calcule des relations et produit progressivement une suite de tokens. »

### Step 2 — Reveal the mental map

**What to say**

> « Voici la carte que nous allons suivre. Elle est volontairement simplifiée : texte, tokens, représentations, relations de contexte, Transformer, probabilités, nouveaux tokens, réponse. »

> « Nous allons maintenant ouvrir chacune de ces boîtes. »

### Step 3 — Establish the central question

**What to say**

> « Retenez une seule question : à chaque étape, qu’est-ce que la machine manipule réellement ? »

### Transition

> « Commençons par le voyage complet, avant de zoomer sur chaque mécanisme. »

---

## 02 — Le voyage d’une question

### Objective

Give the audience the complete pipeline before studying the mechanisms.

### Step 0 — The whole pipeline

**What to say**

> « Notre phrase ne passe pas directement de “question” à “réponse”. Il y a plusieurs transformations intermédiaires. »

Point to each block slowly.

### Step 1 — Zoom into the middle

**What to say**

> « Les premières étapes transforment le texte en unités et en nombres. Ensuite, le modèle combine ces représentations en tenant compte du contexte. »

> « Puis il calcule quelles continuations sont plausibles et produit un token. »

### Step 2 — Important simplification

**What to say**

> « Attention : ce schéma est une carte pédagogique, pas une chronologie littérale en huit opérations indépendantes. Dans un vrai Transformer, ces mécanismes sont intégrés et répétés sur plusieurs couches. »

> « Notre objectif est de construire le bon modèle mental, pas de reproduire le code interne d’un modèle industriel. »

### Question

> « À votre avis, laquelle de ces étapes va décider directement de ce que l’IA écrit ensuite ? »

### Transition

> « Pour répondre, il faut d’abord comprendre comment le texte est découpé. »

---

## 03 — Les tokens

### Objective

Break the intuition that a language model directly manipulates words.

### Step 0 — Tokenization

**What to say**

> « Un modèle de langage ne reçoit pas une phrase sous la forme de mots avec leur signification humaine. Le texte est d’abord découpé en tokens. »

### Step 1 — One word can become several tokens

**What to say**

> « Un token n’est pas forcément un mot. Selon le tokenizer, un mot peut être découpé en plusieurs morceaux, et certains espaces ou signes de ponctuation sont également représentés. »

> « C’est une première traduction entre notre langage et le format manipulé par le modèle. »

### Step 2 — Consequence

**What to say**

> « À partir de maintenant, lorsque nous parlerons de “prochain token”, il ne faut donc pas imaginer uniquement “prochain mot”. »

> « Le modèle va prédire une continuation dans son vocabulaire de tokens. »

### Question

> « Pourquoi ne pas simplement utiliser un dictionnaire de mots entiers ? »

Expected direction: vocabulary size, unknown/new words, flexibility, subword representation.

### Transition

> « Nous avons maintenant des tokens. Mais un token comme “ciel” reste encore un symbole. Comment un réseau neuronal peut-il le manipuler ? »

---

## 04 — Les embeddings

### Objective

Explain the passage from discrete tokens to learned numerical representations.

### Step 0 — The problem

**What to say**

> « Un réseau neuronal calcule avec des nombres. Il faut donc transformer notre token en représentation numérique. »

### Step 1 — Vector

**What to say**

> « Pour un token donné, le modèle possède une représentation numérique apprise pendant l’entraînement. On peut la visualiser comme un vecteur : une longue liste de nombres. »

> « Les valeurs affichées ici sont fictives : elles servent uniquement à rendre l’idée visible. »

### Step 2 — Relations

**What to say**

> « Ces nombres ne sont pas des définitions lisibles par un humain. Ils permettent au réseau de faire des calculs et d’apprendre des régularités à partir des données d’entraînement. »

> « Des représentations peuvent ainsi être utiles pour distinguer ou rapprocher certains usages et relations. »

### Step 3 — Visual projection

**What to say**

> « Pour nous aider à voir cette idée, on projette ici un espace de très grande dimension sur une représentation visuelle. »

> « Les mots proches dans cette visualisation ne signifient pas automatiquement qu’ils sont synonymes. La projection est une simplification. »

### Step 4 — Critical distinction

**What to say**

> « Et surtout, nous n’avons pas encore traité le contexte de la phrase. Le token possède une représentation initiale, mais son rôle dans cette phrase dépend des autres tokens. »

> « C’est précisément ce que nous allons étudier avec l’attention. »

### Question

> « Si je prends le mot “banque”, est-ce que sa représentation seule suffit toujours pour savoir de quelle banque je parle ? »

### Transition

> « Non. Il faut regarder autour du mot. »

---

## 05 — L’attention

### Objective

Make contextual dependency intuitive before discussing technical notation.

### Step 0 — Ambiguity

**What to say**

> « Regardons “il”. À quoi renvoie-t-il ? La réponse dépend du reste de la phrase. »

Let the audience inspect the sentence.

### Step 1 — Context

**What to say**

> « Le modèle doit construire une représentation qui tient compte des autres éléments disponibles dans le contexte. »

> « L’attention est l’un des mécanismes qui permettent de pondérer les relations entre positions dans la séquence. »

### Step 2 — Illustrative relations

**What to say**

> « Les liens que vous voyez sont illustratifs. Ils représentent l’idée que toutes les informations du contexte ne contribuent pas de la même manière à la représentation courante. »

> « Les valeurs affichées ne sont pas des mesures extraites d’un modèle réel. »

### Step 3 — Prompt context

**What to say**

> « Le contexte ne concerne pas seulement les pronoms. Dans notre question initiale, “comme si j’avais 10 ans” fournit également une information utile : le niveau de formulation attendu. »

> « Le contexte influence donc la représentation et, plus loin, les continuations possibles. »

### Question

> « Si je retire “comme si j’avais 10 ans”, est-ce que vous attendez exactement la même réponse ? »

### Transition

> « Nous avons vu un mécanisme. Mais ce mécanisme n’existe pas seul : il est intégré dans une architecture répétée. »

---

## 06 — Le Transformer

### Objective

Introduce the Transformer as the architecture that repeatedly transforms representations using attention and other operations.

### Step 0 — Architecture

**What to say**

> « Le Transformer n’est pas simplement “l’attention”. C’est une architecture qui organise plusieurs opérations de transformation des représentations. »

### Step 1 — Repeated layers

**What to say**

> « Un modèle réel empile de nombreuses couches. À chaque couche, les représentations sont transformées. »

> « Pour simplifier, nous montrons ici un bloc conceptuel plutôt que tous les détails mathématiques. »

### Step 2 — What happens inside

**What to say**

> « L’attention permet de mélanger de l’information provenant de différentes positions. D’autres opérations transforment ensuite les représentations. Des connexions résiduelles et des mécanismes de normalisation jouent également un rôle dans les architectures Transformer modernes. »

### Step 3 — Build intuition

**What to say**

> « L’idée importante n’est donc pas “une énorme base de données de réponses”. Le réseau transforme progressivement une représentation de la séquence pour préparer la prédiction suivante. »

### Question

> « À ce stade, avons-nous encore une réponse écrite ? »

Expected answer: no.

### Transition

> « Exactement. Nous avons préparé les représentations. Il faut maintenant produire quelque chose. »

---

## 07 — La génération

### Objective

Explain autoregressive next-token prediction without reducing it to “the most probable word wins”.

### Step 0 — First continuation

**What to say**

> « Le modèle calcule une distribution sur les tokens qu’il pourrait produire ensuite. »

> « Nous affichons ici une distribution illustrative : les pourcentages ne proviennent pas d’un modèle réel. »

### Step 1 — One token at a time

**What to say**

> « Une fois un token retenu, il est ajouté au contexte. Le modèle recalcule alors une nouvelle distribution pour la suite. »

> « La réponse est donc construite progressivement. »

### Step 2 — Context changes

**What to say**

> « Chaque nouveau token devient à son tour une partie du contexte. La distribution du prochain token peut donc changer. »

### Step 3 — Decoding

**What to say**

> « Il faut également distinguer la distribution produite par le modèle de la stratégie qui choisit le token final. Selon les paramètres et la stratégie de décodage, on peut sélectionner différemment parmi les candidats. »

### Step 4 — The key mental model

**What to say**

> « Le modèle ne rédige pas d’abord toute la réponse dans une boîte cachée. Il produit une continuation, puis une nouvelle continuation, et ainsi de suite. »

> « C’est cette répétition qui donne l’impression d’un texte continu. »

### Question

> « Si le modèle prédit le prochain token, d’où vient alors la cohérence sur plusieurs phrases ? »

Use this as a bridge to context, learned patterns, and repeated prediction.

### Transition

> « Maintenant que nous avons le mécanisme général, faisons-le vivre devant vous. »

---

## 08 — À vous de jouer

### Objective

Make the audience reason about next-token prediction without requiring a student UI.

### Step 0 — Audience participation

**What to say**

> « Je vous donne la phrase : “Le ciel est souvent…” Quelle continuation vous paraît la plus plausible ? »

Take a few answers verbally.

### Step 1 — Reveal distribution

**What to say**

> « Le modèle ne reçoit pas directement votre intuition humaine. Il produit une distribution sur les tokens candidats. »

> « Les chiffres sont illustratifs : ce qui nous intéresse est la compétition entre plusieurs continuations possibles. »

### Step 2 — Bad candidate

**What to say**

> « “Voiture” est possible comme token au sens technique, mais dans ce contexte il est beaucoup moins compatible avec les régularités apprises que “bleu”, par exemple. »

Avoid saying impossible unless the model's probability is actually zero.

### Step 3 — New context

**What to say**

> « Ajoutons un token. Maintenant, le contexte a changé. Le modèle recommence le calcul avec cette nouvelle séquence. »

> « C’est ce processus répété qui produit la réponse token après token. »

### Transition

> « Mais une réponse fluide et cohérente en apparence nous garantit-elle qu’elle est vraie ? »

---

## 09 — Le piège du plausible

### Objective

Separate linguistic fluency from factual verification.

### Step 0 — False premise

**What to say**

> « Voici une question construite avec une prémisse fausse. Regardez ce qui se passe si l’on demande malgré tout une réponse détaillée. »

### Step 1 — Plausibility

**What to say**

> « Un modèle de langage peut produire une continuation linguistiquement plausible même lorsque la question repose sur une information fausse ou inexistante. »

> « Le fait qu’une réponse soit fluide ne constitue donc pas une preuve de vérité. »

### Step 2 — How to respond responsibly

**What to say**

> « Face à une question factuelle importante, on peut apporter des sources, utiliser une recherche ou un outil externe, et vérifier l’information. »

> « Le modèle de langage et le système qui l’entoure ne sont pas nécessairement la même chose. »

### Question

> « Quelle différence faites-vous maintenant entre “le modèle peut produire une réponse” et “nous pouvons faire confiance à cette réponse” ? »

### Transition

> « Nous pouvons maintenant remettre toutes les pièces du puzzle ensemble. »

---

## 10 — Tout remettre ensemble

### Objective

Consolidate the mental model and leave the audience with three durable ideas.

### Step 0 — Full pipeline

**What to say**

> « Revenons à notre question de départ. Nous pouvons maintenant suivre son parcours : texte, tokens, représentations, contexte, transformations, distribution de probabilités, puis génération de nouveaux tokens. »

### Step 1 — Three messages

**What to say**

> « Premier message : un modèle de langage manipule des représentations numériques, pas directement nos concepts humains. »

> « Deuxième message : le contexte joue un rôle central dans la représentation et la prédiction. »

> « Troisième message : générer une réponse plausible et vérifier qu’elle est vraie sont deux problèmes différents. »

### Step 2 — Final question

**What to say**

> « Alors, une IA pense-t-elle comme nous ? »

Pause.

> « Nous avons maintenant assez d’éléments pour éviter une réponse trop simple. Un modèle de langage effectue des transformations numériques complexes et produit des continuations très sophistiquées. Mais cela ne signifie pas qu’il fonctionne comme une pensée humaine. »

### Final hook

> « Et si le modèle seul ne suffit pas toujours, comment peut-on lui donner accès à des documents, à une recherche, à des outils ou à des actions ? C’est la suite logique de notre cours. »

---

## Questions fréquentes à préparer

### « Est-ce qu’un token est un mot ? »

Non. Un token peut correspondre à un mot, une partie de mot, un signe ou une autre unité définie par le tokenizer.

### « Est-ce que les embeddings donnent le sens d’un mot ? »

Pas sous la forme d’une définition humaine. Ils fournissent une représentation numérique apprise, utile aux calculs du réseau.

### « Est-ce que l’attention regarde seulement le mot précédent ? »

Non. Dans un Transformer, l’attention permet de mettre en relation différentes positions accessibles dans le contexte, selon l’architecture et le type de masque utilisé.

### « Est-ce que le modèle choisit toujours le token le plus probable ? »

Pas nécessairement. La distribution de probabilités et la stratégie de décodage sont deux choses différentes.

### « Pourquoi une IA peut-elle halluciner ? »

Parce que produire une continuation linguistiquement plausible et établir la vérité d’une affirmation sont deux problèmes différents. Des outils de recherche, des sources ou des mécanismes de vérification peuvent compléter le modèle.

### « Est-ce que les visualisations 3D des embeddings sont réelles ? »

Elles sont pédagogiques. Les représentations réelles vivent dans des espaces de beaucoup plus grandes dimensions ; une visualisation 3D est une projection ou une métaphore visuelle.

### « Le Transformer est-il seulement de l’attention ? »

Non. L’attention est un mécanisme important du Transformer, mais l’architecture comprend également d’autres transformations, notamment les blocs feed-forward, les connexions résiduelles et la normalisation.

---

## Timing indicatif

| Scene | Duration |
|---|---:|
| 01 — La question | 2 min |
| 02 — Le voyage | 4 min |
| 03 — Les tokens | 4 min |
| 04 — Les embeddings | 7 min |
| 05 — L’attention | 7 min |
| 06 — Le Transformer | 5 min |
| 07 — La génération | 6 min |
| 08 — À vous de jouer | 5 min |
| 09 — Le piège du plausible | 4 min |
| 10 — Synthèse | 4 min |
| **Total** | **≈ 48 min** |

## Presenter rule

The presenter should not read the guide verbatim. The guide guarantees the pedagogical sequence, the terminology, the caveats, and the transitions; the spoken delivery should remain natural and responsive to the room.
