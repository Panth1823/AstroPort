import { createUISFX, bindUISFX, type UISFXPlayer, type CueName, type PlayOptions } from "uisfx";

let playerInstance: UISFXPlayer | null = null;
let bindingInstance: ReturnType<typeof bindUISFX> | null = null;

export function getSFX(): UISFXPlayer | null {
  if (typeof window === "undefined") return null;

  if (!playerInstance) {
    playerInstance = createUISFX({
      pack: "minimal",
    });
  }
  return playerInstance;
}

export function playSFX(cue: CueName, options?: PlayOptions): void {
  const player = getSFX();
  if (!player) return;

  try {
    player.play(cue, options);
  } catch (err) {
    // Ignore audio playback errors if audio context is blocked
  }
}

export function initGlobalSFX(): void {
  if (typeof window === "undefined") return null;

  const player = getSFX();
  if (!player) return;

  // Unlock AudioContext on first user interaction
  const unlockAudio = () => {
    player.unlock().catch(() => {});
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  // Clean up any existing document binding
  if (bindingInstance) {
    try {
      bindingInstance.unbind();
    } catch {}
  }

  // Ensure interactive elements have default hover sounds if not set
  const interactiveElements = document.querySelectorAll<HTMLElement>(
    "a, button, [role='button']"
  );
  interactiveElements.forEach((el) => {
    if (
      !el.hasAttribute("data-uisfx-hover") &&
      !el.hasAttribute("data-no-sfx")
    ) {
      el.setAttribute("data-uisfx-hover", "hover");
    }
  });

  // Bind uisfx declarative event listeners to the document
  bindingInstance = bindUISFX(document, {
    player,
    pack: "minimal",
  });
}
