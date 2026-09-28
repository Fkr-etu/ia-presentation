import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { PresentationScene } from "../types";

type Props = {
  scene: PresentationScene;
  sceneIndex: number;
  stepIndex: number;
  totalScenes: number;
  scenes: PresentationScene[];
  isLastStep: boolean;
  mapOpen: boolean;
  onCloseMap: () => void;
  onSelectScene: (sceneIndex: number) => void;
  children: ReactNode;
  courseNumber?: string;
  courseLabel?: string;
};

export function PresentationShell({
  scene,
  sceneIndex,
  stepIndex,
  totalScenes,
  scenes,
  isLastStep,
  mapOpen,
  onCloseMap,
  onSelectScene,
  children,
  courseNumber = "01",
  courseLabel = "cours.ia / 01",
}: Props) {
  return (
    <main className="presentation" aria-label={`Présentation du cours ${courseNumber}`}>
      <div className="presentation__grain" aria-hidden="true" />
      <header className="presentation__topbar">
        <span>{courseLabel}</span>
        <span>{String(sceneIndex + 1).padStart(2, "0")} / {String(totalScenes).padStart(2, "0")}</span>
      </header>

      <motion.section
        key={scene.id}
        className="presentation__scene"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="presentation__scene-label">{scene.title}</div>
        <div className="presentation__scene-content">{children}</div>
      </motion.section>

      <footer className="presentation__controls" aria-label="Contrôles">
        <span>← / →</span>
        <span>Étape {stepIndex + 1} / {scene.steps}</span>
        <span>{isLastStep ? "Fin du parcours · → reste ici" : "F plein écran · M plan · R rejouer"}</span>
      </footer>

      {mapOpen && (
        <aside className="presentation__map" aria-label="Plan du cours">
          <div className="presentation__map-head">
            <div>
              <span className="presentation__map-title">Le parcours</span>
              <span>{totalScenes} scènes · 1 idée à la fois</span>
            </div>
            <button type="button" onClick={onCloseMap} aria-label="Fermer le plan">×</button>
          </div>
          <div className="presentation__map-list">
            {scenes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === sceneIndex ? "is-current" : ""}
                aria-current={index === sceneIndex ? "step" : undefined}
                aria-label={item.title}
                onClick={() => onSelectScene(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </aside>
      )}
    </main>
  );
}
