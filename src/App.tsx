import { useState } from "react";
import { motion } from "motion/react";
import { courses } from "./data/courses";
import { Course01Presentation } from "./scenes/course-01/Course01Presentation";

function CourseCard({ course, index, onOpen }: { course: (typeof courses)[number]; index: number; onOpen: (id: string) => void }) {
  return (
    <motion.article className={`course-card course-card--${course.accent}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.06 }} whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.4 : 0.4 }}>
      <div className="course-card__visual" aria-hidden="true"><span>{course.visual}</span><div className="course-card__shape course-card__shape--one" /><div className="course-card__shape course-card__shape--two" /></div>
      <div className="course-card__body">
        <div className="course-card__meta"><span>{course.number}</span><span>{course.level}</span><span>{course.duration}</span></div>
        <h3>{course.title}</h3><p>{course.description}</p>
        <button className="course-card__link" type="button" onClick={() => onOpen(course.id)}>Explorer le cours <span aria-hidden="true">↗</span></button>
      </div>
    </motion.article>
  );
}

function Home({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <main className="home">
      <nav className="nav shell"><a className="brand" href="/" aria-label="Accueil"><span className="brand__mark" aria-hidden="true">i</span><span>cours<span className="brand__dot">.</span>ia</span></a><div className="nav__links"><a href="#cours">Les cours</a><a href="#approche">L’approche</a></div><a className="nav__cta" href="#cours">Explorer</a></nav>
      <section className="hero shell"><div className="hero__copy"><p className="eyebrow"><span className="eyebrow__dot" /> Des cours pour vraiment comprendre</p><h1>L’IA, sans<br /><em>le brouillard.</em></h1><p className="hero__intro">Des cours courts, visuels et concrets pour comprendre ce qui se cache derrière les mots à la mode.</p><div className="hero__actions"><a className="button button--dark" href="#cours">Voir les cours <span aria-hidden="true">↓</span></a><span className="hero__note">Pas besoin d’être ingénieur.</span></div></div><div className="hero__visual" aria-hidden="true"><div className="orbit orbit--one" /><div className="orbit orbit--two" /><div className="hero-card hero-card--main"><span className="hero-card__label">LE CONCEPT</span><strong>Un modèle<br />ne « pense » pas.</strong><span className="hero-card__arrow">↗</span></div><div className="hero-sticker hero-sticker--yellow">À comprendre<br />pas à mémoriser.</div><div className="hero-sticker hero-sticker--coral">IA<br />≠ magie</div><div className="hero-doodle">∿</div></div></section>
      <section className="course-section shell" id="cours"><div className="section-heading"><div><p className="eyebrow">La bibliothèque</p><h2>Choisis ton point<br /><em>de départ.</em></h2></div><p className="section-heading__aside">Chaque cours isole une idée, la rend visuelle, puis la reconnecte au monde réel.</p></div><div className="course-grid">{courses.map((course, index) => <CourseCard key={course.id} course={course} index={index} onOpen={onOpen} />)}</div></section>
      <section className="approach shell" id="approche"><div className="approach__stamp" aria-hidden="true">?</div><div><p className="eyebrow">Notre parti pris</p><h2>Moins de jargon.<br /><em>Plus de déclics.</em></h2></div><p className="approach__text">Ici, on commence par une question simple. On démonte l’idée étape par étape. Puis on montre où elle apparaît dans la vraie vie.</p></section>
      <footer className="footer shell"><span className="brand">cours<span className="brand__dot">.</span>ia</span><span>Comprendre l’IA, une idée à la fois.</span></footer>
    </main>
  );
}

export default function App() {
  const [presentation, setPresentation] = useState(false);
  return presentation ? <Course01Presentation onExit={() => setPresentation(false)} /> : <Home onOpen={(id) => id === "ia-fondamentaux" ? setPresentation(true) : undefined} />;
}
