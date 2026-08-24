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
    player.unlock().catch(() => {});
    player.play(cue, options);
  } catch (err) {
    // Ignore audio playback errors if audio context is blocked
  }
}

export function initGlobalSFX(): void {
  if (typeof window === "undefined") return;

  const player = getSFX();
  if (!player) return;

  // Eagerly unlock AudioContext if browser policy allows
  player.unlock().catch(() => {});

  // Preload common UI cues to avoid first-play synthesis delay
  player.preload(["hover", "press", "release", "select", "toggle-on", "toggle-off", "open"]).catch(() => {});

  // Listen to ANY user interaction (hover, mouse movement, scroll, touch, key, focus)
  // to unlock AudioContext without requiring an explicit click.
  const interactionEvents = [
    "pointermove",
    "pointerover",
    "pointerenter",
    "mousemove",
    "touchstart",
    "pointerdown",
    "keydown",
    "wheel",
    "scroll",
    "focus",
  ] as const;

  const cleanupListeners = () => {
    interactionEvents.forEach((evt) => {
      window.removeEventListener(evt, unlockAudio);
      document.removeEventListener(evt, unlockAudio);
    });
  };

  const unlockAudio = () => {
    player.unlock().then((unlocked) => {
      if (unlocked) {
        cleanupListeners();
      }
    }).catch(() => {});
  };

  interactionEvents.forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { passive: true });
    document.addEventListener(evt, unlockAudio, { passive: true });
  });

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
