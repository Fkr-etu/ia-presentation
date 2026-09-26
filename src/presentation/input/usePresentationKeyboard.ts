import { useEffect } from "react";

type Actions = {
  next: () => void;
  previous: () => void;
  restart: () => void;
  toggleMap: () => void;
  toggleFullscreen: () => void;
  exit: () => void;
};

export function usePresentationKeyboard(actions: Actions) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

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

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [actions]);
}
