import { useEffect, useRef } from "react";

type Actions = {
  next: () => void;
  previous: () => void;
  restart: () => void;
  goToScene: (sceneIndex: number) => void;
  toggleMap: () => void;
  toggleFullscreen: () => void;
  exit: () => void;
};

export function usePresentationKeyboard(actions: Actions) {
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) return;

      const current = actionsRef.current;

      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          event.preventDefault();
          current.next();
          break;
        case "ArrowLeft":
          event.preventDefault();
          current.previous();
          break;
        case "r":
        case "R":
          current.restart();
          break;
        case "m":
        case "M":
          current.toggleMap();
          break;
        case "0":
          event.preventDefault();
          current.goToScene(9);
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          event.preventDefault();
          current.goToScene(Number(event.key) - 1);
          break;
        case "f":
        case "F":
          current.toggleFullscreen();
          break;
        case "Escape":
          current.exit();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, []);
}
