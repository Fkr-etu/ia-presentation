import { useEffect } from "react";

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
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) return;

      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          event.preventDefault();
          actions.next();
          break;
        case "ArrowLeft":
          event.preventDefault();
          actions.previous();
          break;
        case "r":
        case "R":
          actions.restart();
          break;
        case "m":
        case "M":
          actions.toggleMap();
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
          actions.goToScene(Number(event.key) - 1);
          break;
        case "f":
        case "F":
          actions.toggleFullscreen();
          break;
        case "Escape":
          actions.exit();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [actions]);
}
