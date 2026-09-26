export type Course = {
  id: string;
  number: string;
  title: string;
  description: string;
  level: "Débutant" | "Intermédiaire";
  duration: string;
  accent: "coral" | "blue" | "lime" | "violet";
  visual: string;
};

export const courses: Course[] = [
  {
    id: "ia-fondamentaux",
    number: "01",
    title: "Comprendre l’IA",
    description: "Les grandes idées derrière l’intelligence artificielle, expliquées sans jargon.",
    level: "Débutant",
    duration: "30 min",
    accent: "coral",
    visual: "01",
  },
  {
    id: "ia-generative",
    number: "02",
    title: "L’IA générative",
    description: "Comment une machine produit du texte, des images, du son et du code.",
    level: "Débutant",
    duration: "45 min",
    accent: "blue",
    visual: "02",
  },
  {
    id: "llm",
    number: "03",
    title: "Les modèles de langage",
    description: "Tokens, entraînement, contexte et prédiction : ce qui se passe derrière ChatGPT.",
    level: "Intermédiaire",
    duration: "50 min",
    accent: "lime",
    visual: "03",
  },
  {
    id: "prompting",
    number: "04",
    title: "Parler aux IA",
    description: "Construire de bonnes consignes et comprendre pourquoi certaines fonctionnent mieux.",
    level: "Débutant",
    duration: "35 min",
    accent: "violet",
    visual: "04",
  },
];
