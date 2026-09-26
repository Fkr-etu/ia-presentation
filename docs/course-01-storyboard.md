# Cours 01 — Ce que fait réellement une IA générative

> Document de référence pédagogique et technique pour l'implémentation de la présentation interactive.

## 1. Objectif du cours

Le cours est une présentation interactive destinée à être projetée dans un amphithéâtre et pilotée exclusivement par un présentateur.

Le fil rouge est la question :

> « Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans. »

L'objectif n'est pas de faire mémoriser des définitions techniques, mais de construire un modèle mental correct de ce qui se passe entre une question humaine et la réponse générée par un LLM.

À la fin, l'auditoire doit pouvoir expliquer, avec ses propres mots :

> Un LLM transforme le texte en tokens et en représentations numériques, traite les relations entre les éléments du contexte au travers de l'architecture Transformer, puis génère progressivement une réponse en prédisant des tokens successifs.

Cette formulation reste une simplification pédagogique : elle ne doit pas être présentée comme une description exhaustive de tous les détails internes d'un modèle moderne.

---

## 2. Contraintes de présentation

### Public et contexte

- Présentation en amphithéâtre.
- Un seul écran principal.
- Un seul présentateur pilote le cours.
- Pas de mode étudiant à implémenter.
- Pas de progression individuelle.
- Pas de compte, backend, synchronisation ou persistance nécessaires.
- Le cours doit pouvoir fonctionner comme une présentation autonome et statique.
- Format cible : écran 16:9.
- Priorité à la lisibilité à distance.

### Navigation

Le présentateur doit pouvoir tout piloter au clavier :

- ArrowRight / Space : état suivant.
- ArrowLeft : état précédent.
- R : rejouer l'animation de l'état courant.
- M : afficher/masquer la carte du cours.
- F : plein écran.
- Escape : quitter une scène immersive ou un mode secondaire.
- 1–9 : accès direct à une séquence lorsque pertinent.

La navigation doit être déterministe : une action utilisateur correspond à une transition identifiable.

### Principe d'affichage

À chaque instant :

1. une idée principale ;
2. un point focal évident ;
3. très peu de texte ;
4. une hiérarchie visuelle lisible depuis le fond de l'amphithéâtre.

Les informations essentielles ne doivent jamais dépendre d'un hover, d'un tooltip minuscule ou d'une interaction de précision.

---

## 3. Storyboard global

Durée cible : environ 45–50 minutes.

| # | Scène | Objectif | Durée |
|---|---|---|---:|
| 01 | La question | Créer la curiosité et installer le fil rouge | ~2 min |
| 02 | Le voyage d'une question | Donner la carte mentale globale | ~4 min |
| 03 | Les tokens | Comprendre la transformation du texte | ~4 min |
| 04 | Embeddings | Comprendre les représentations numériques | ~7 min |
| 05 | Attention | Comprendre le rôle du contexte | ~7 min |
| 06 | Transformer | Comprendre l'architecture sans jargon inutile | ~5 min |
| 07 | Génération | Comprendre la prédiction token par token | ~6 min |
| 08 | À vous de jouer | Faire participer l'amphithéâtre | ~5 min |
| 09 | Le piège du plausible | Introduire les hallucinations et limites | ~4 min |
| 10 | Tout remettre ensemble | Consolider le modèle mental | ~4 min |

---

## 4. Grammaire d'animation

Les animations doivent servir le raisonnement pédagogique. Elles ne sont pas décoratives.

Le système d'animation doit privilégier un petit nombre de primitives réutilisables :

- BUILD — un élément se construit progressivement.
- TRANSFORM — un élément change de représentation.
- TRAVEL — un objet se déplace dans le système.
- CONNECT — des relations apparaissent.
- GENERATE — un élément apparaît progressivement, notamment token par token.
- FOCUS — tout sauf l'élément important s'efface ou s'atténue.
- MORPH — une représentation évolue progressivement vers une autre.

Une scène peut combiner ces primitives, mais chaque animation doit avoir une justification pédagogique explicite.

---

## 5. Scène 01 — La question

### Objectif
Créer la curiosité et installer le fil rouge.

### États

1. Écran vide : fond éditorial, aucun élément.
2. La question est tapée progressivement : « Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans. »
3. La question reste seule avec l'annotation : « Que se passe-t-il maintenant ? »
4. La phrase est attirée vers le centre et commence à se transformer en pipeline.

### Animations
- BUILD pour la saisie.
- FOCUS sur la question.
- TRANSFORM pour passer de la phrase au pipeline.

### Message oral
Le présentateur pose l'intuition commune : « On pourrait croire que l'IA comprend la question et va chercher la bonne réponse. Mais que se passe-t-il réellement entre les deux ? »

---

## 6. Scène 02 — Le voyage d'une question

### Objectif
Installer la carte mentale qui restera visible dans la mémoire de l'auditoire.

### États
1. TA QUESTION
2. TA QUESTION → TOKENS
3. → EMBEDDINGS
4. → ATTENTION
5. → TRANSFORMER
6. → PROBABILITÉS
7. → NOUVEAUX TOKENS
8. → RÉPONSE

Pipeline final :

    QUESTION
       ↓
    TOKENS
       ↓
    EMBEDDINGS
       ↓
    ATTENTION
       ↓
    TRANSFORMER
       ↓
    PROBABILITÉS
       ↓
    NOUVEAUX TOKENS
       ↓
    RÉPONSE

### Règle
Le pipeline ne doit pas être présenté comme une chaîne technique littérale dans laquelle chaque étape ne s'exécute qu'une seule fois. C'est une carte pédagogique simplifiée.

---

## 7. Scène 03 — Les tokens

### Objectif
Faire comprendre qu'un modèle manipule des unités de texte et non directement les mots comme le fait un humain.

### États
1. Afficher : « Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans. »
2. Fragmentation progressive : [Explique] [-moi] [pourquoi] [le] [ciel] [est] [bleu] [...]
3. Exemple illustratif : « incroyable » → [incroy] [able].
4. Message central : « Un token n'est pas forcément un mot. »
5. Les tokens quittent la scène : « Mais le modèle ne peut pas faire ses calculs directement sur ces morceaux de texte. »

### Animations
- BUILD.
- TRANSFORM.
- TRAVEL.

---

## 8. Scène 04 — Embeddings

### Objectif
Faire comprendre le passage du langage vers des représentations numériques.

C'est la première grande visualisation scientifique du cours.

### États
1. Token : « ciel », puis [0.21, -0.73, 0.44, 0.08, ...]. Cette liste est illustrative.
2. La représentation numérique se transforme en point dans un espace 3D.
3. L'espace 3D contient un petit ensemble de points : ciel, nuage, pluie, soleil, chat, chien, voiture.
4. Le présentateur peut tourner, zoomer et sélectionner.
5. Sélection de « ciel » : les autres points sont atténués.
6. Sélection de « nuage » : une relation visuelle est montrée.
7. Correction : « Une dimension = un concept » puis « Faux. » et « Les représentations réelles sont beaucoup plus complexes. »
8. Retour au pipeline : TOKENS → REPRÉSENTATIONS NUMÉRIQUES.

### Règle scientifique
La visualisation 3D doit être explicitement traitée comme une projection pédagogique simplifiée, et non comme une représentation fidèle de l'espace réel des embeddings.

### Animations
- TRANSFORM.
- MORPH.
- FOCUS.
- CONNECT.

### Exigence technique
La scène 3D doit rester fluide à la résolution de projection cible et être contrôlable au clavier/souris.

---

## 9. Scène 05 — Attention

### Objectif
Faire comprendre que le contexte influence le traitement des éléments.

### États
1. Afficher : « La souris mange le fromage parce qu'il est bon. » Surligner « il ». Question : « Il désigne quoi ? »
2. Les tokens deviennent des nœuds.
3. Sélection de « il » : les relations apparaissent.
4. Une relation forte avec « fromage » est mise en évidence. Message : « Le contexte compte. »
5. Retour au fil rouge : « Explique-moi pourquoi le ciel est bleu comme si j'avais 10 ans. » Sélection de « 10 ans ». Les relations pertinentes changent.
6. Message : « Le modèle ne traite pas chaque token isolément. » Puis : « L'attention permet de pondérer les relations entre les éléments du contexte. »

### Règle
Ne pas commencer par Query / Key / Value. Ces détails sont hors objectif du cours 01.

---

## 10. Scène 06 — Transformer

### Objectif
Comprendre le rôle d'une architecture en couches sans transformer le cours en cours d'architecture logicielle ou mathématique.

### États
1. Les tokens entrent dans une structure verticale.
2. Première couche.
3. Deuxième couche.
4. Plusieurs couches.
5. Sortie vers la génération.

Représentation :

    TOKENS
      ↓
    ┌───────────┐
    │ COUCHE 1  │
    └───────────┘
      ↓
    ┌───────────┐
    │ COUCHE 2  │
    └───────────┘
      ↓
       ...
      ↓
    ┌───────────┐
    │ COUCHE N  │
    └───────────┘
      ↓
    PRÉDICTION

### Message
« Le Transformer orchestre des transformations successives des représentations. »

### Règle
La visualisation est une représentation pédagogique. Elle ne doit pas prétendre montrer exactement les opérations internes d'une couche réelle.

---

## 11. Scène 07 — Génération

### Objectif
Faire comprendre la génération progressive.

Afficher successivement :

> Le

> Le ciel

> Le ciel est

Avant chaque token, montrer brièvement une distribution illustrative :

    bleu       ███████████████ 61 %
    clair      ████             17 %
    visible    ██                8 %
    ...

Puis révéler le token et continuer : bleu → parce → que → la → lumière → ...

### État final
« La réponse n'est pas sortie d'un seul bloc. »

    CONTEXTE
       ↓
    PROBABILITÉS
       ↓
    TOKEN
       ↓
    NOUVEAU CONTEXTE
       ↓
    NOUVEAU CALCUL
       ↓
    ...

### Règle scientifique
Les probabilités montrées sont pédagogiques et ne doivent pas être présentées comme les probabilités d'un modèle réel.

---

## 12. Scène 08 — À vous de jouer

### Objectif
Faire vivre au public le principe de prédiction.

### États
1. « Le ciel est souvent… »
2. Proposer BLEU / VERT / VOITURE et demander au public de choisir oralement.
3. Révéler une distribution illustrative : bleu 64 %, couvert 12 %, gris 8 %, ...
4. Ajouter du contexte : « Pour un enfant de 10 ans, explique pourquoi le ciel est… »
5. Montrer que la distribution change.
6. Conclusion : « Le contexte influence les probabilités de génération. »

---

## 13. Scène 09 — Le piège du plausible

### Objectif
Introduire les limites sans casser la narration.

États : question volontairement problématique → deux réponses plausibles → question au public → révélation → retour au mécanisme de génération → introduction des outils externes.

Message central :

> Une réponse fluide n'est pas nécessairement une réponse vraie.

Puis :

> Le mécanisme de génération ne garantit pas à lui seul la vérité.

Transition vers les futurs cours sur les outils, la recherche, les documents et les systèmes augmentés.

---

## 14. Scène 10 — Tout remettre ensemble

### Objectif
Consolider le modèle mental.

La question initiale traverse à nouveau le système :

    QUESTION
       ↓
    TOKENS
       ↓
    REPRÉSENTATIONS
       ↓
    RELATIONS / ATTENTION
       ↓
    TRANSFORMATIONS
       ↓
    PROBABILITÉS
       ↓
    TOKENS GÉNÉRÉS
       ↓
    RÉPONSE

Trois messages apparaissent successivement :

> Il ne « sort » pas simplement une réponse stockée.

> Il traite une représentation du contexte.

> Puis il génère progressivement une suite de tokens.

Dernière accroche :

> « Alors, une IA pense-t-elle comme nous ? »

Puis :

> À suivre.

---

# 15. Architecture logicielle obligatoire

Le code produit à partir de ce document doit respecter les règles suivantes.

## 15.1 Séparer contenu, moteur et scènes

Interdiction de mettre tout le cours dans App.tsx.

Structure cible indicative :

    src/
      presentation/
        engine/
        input/
        transitions/
        types/
      scenes/
        course-01/
          intro/
          pipeline/
          tokens/
          embeddings/
          attention/
          transformer/
          generation/
          simulation/
          hallucinations/
          synthesis/
      components/
      data/
      lib/

Les noms peuvent évoluer si une meilleure organisation apparaît, mais la séparation des responsabilités doit rester.

## 15.2 Une scène ne doit pas gérer le moteur global

Une scène reçoit son état et expose ses transitions.

Le moteur de présentation est responsable de :
- scène courante ;
- état courant ;
- navigation ;
- clavier ;
- plein écran ;
- historique minimal ;
- transitions globales.

Une scène est responsable de :
- son rendu ;
- ses états visuels ;
- ses interactions locales ;
- ses animations spécifiques.

## 15.3 Pas de logique de navigation dupliquée

Les scènes ne doivent pas chacune implémenter ArrowRight, ArrowLeft, gestion du plein écran ou changement de scène. Ces comportements appartiennent au moteur.

## 15.4 États explicites

Éviter une collection de booléens du type isTokensVisible, isVectorVisible, isNetworkVisible, isSelected, isGenerating.

Préférer un état explicite, par exemple :

    scene: "embeddings"
    step: "exploration"

ou un modèle équivalent typé.

Cela évite les combinaisons d'états impossibles.

## 15.5 Animations déclaratives

Les scènes doivent décrire autant que possible des transitions d'état plutôt que manipuler directement le DOM dans des effets dispersés.

L'animation doit être pilotée par l'état de présentation.

## 15.6 Les scènes doivent être composables

Une scène complexe comme Embeddings doit être découpable en sous-composants cohérents :

    EmbeddingsScene
      ├── EmbeddingIntro
      ├── VectorRepresentation
      ├── EmbeddingSpace
      ├── EmbeddingControls
      └── EmbeddingConclusion

Même principe pour Attention et Generation.

## 15.7 Les données ne doivent pas être codées dans les composants visuels

Les tokens, probabilités fictives, labels et étapes doivent pouvoir vivre dans des fichiers de données ou constantes dédiées.

Le composant doit principalement savoir comment représenter une donnée, et non quelle donnée le cours contient.

## 15.8 3D isolée du reste du moteur

La scène Embeddings doit encapsuler sa logique 3D.

Le moteur de présentation ne doit pas connaître Three.js, les meshes, les caméras ou les coordonnées 3D.

Il doit uniquement savoir que la scène Embeddings est à l'étape « exploration ».

## 15.9 Pas de dépendance backend

Le cours reste statique, client-side, compilé en build, distribuable et sans API nécessaire au fonctionnement de la présentation.

Toute donnée pédagogique nécessaire à la présentation doit être disponible localement.

## 15.10 Accessibilité minimale de présentation

- Navigation clavier obligatoire.
- Focus logique.
- Contraste suffisant.
- Respect de prefers-reduced-motion lorsque pertinent.
- Les animations ne doivent jamais être nécessaires pour comprendre une information critique.

## 15.11 Performance

Une scène ne doit pas dégrader les scènes suivantes.

Pour la 3D notamment :
- nettoyage des ressources ;
- pas de boucle de rendu inutile lorsque la scène est inactive ;
- limitation du nombre d'objets ;
- lazy loading des scènes lourdes lorsque pertinent ;
- destruction correcte des ressources WebGL lors du démontage.

## 15.12 Pas de god component

Un composant ne doit pas devenir un fichier de plusieurs centaines de lignes qui contient navigation, rendu, contenu, animations, clavier, 3D et logique pédagogique.

Chaque responsabilité doit rester identifiable.

---

# 16. Critères de validation avant développement complet

### Pédagogie
- [ ] La scène possède un objectif pédagogique unique.
- [ ] Son animation sert cet objectif.
- [ ] Le présentateur sait exactement quoi expliquer pendant l'animation.
- [ ] Le public sait où regarder.

### Présentation
- [ ] Lisible en 16:9.
- [ ] Lisible à distance.
- [ ] Contrôlable au clavier.
- [ ] Aucun hover indispensable.
- [ ] Aucun petit contrôle indispensable.

### Technique
- [ ] État explicite et typé.
- [ ] Navigation gérée par le moteur.
- [ ] Animations découplées du contenu.
- [ ] Pas de logique métier dupliquée.
- [ ] Pas de dépendance backend.
- [ ] Nettoyage des ressources.
- [ ] Pas de composant monolithique.

---

# 17. Règle fondamentale du projet

> Le code doit refléter la structure pédagogique du cours, pas l'inverse.

Si une scène devient difficile à coder parce qu'elle mélange trop de concepts, on ne doit pas complexifier le moteur pour la faire rentrer dans un composant géant. On doit d'abord vérifier si la scène doit être découpée.

---

## Statut du document

Ce fichier est la source de vérité de travail pour le développement du cours 01.

Les futures implémentations doivent s'y conformer. Si le design ou la pédagogie évoluent pendant le développement, le document doit être mis à jour avant ou avec le changement.