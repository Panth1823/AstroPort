import { useState, useEffect, useCallback, useRef } from "react";
import "./LoadingScreen.css";

/* ═══════════════════════════════════════════════════
   CUSTOMIZE THESE — Change greetings, colors, timing
   ═══════════════════════════════════════════════════ */

/** Greeting items displayed sequentially. The first one gets the blur-stagger effect. */
const GREETINGS = [
  { text: "Hello.", lang: "en", blurStagger: true },
  { text: "नमस्ते.", lang: "hi" },
  { text: "નમસ્તે.", lang: "gu" },
];

/** Background color for the loader panels */
const PANEL_COLOR = "#ff3800";

/** How long (ms) the first greeting stays visible (includes blur-in time) */
const FIRST_GREETING_HOLD = 1200;

/** How long (ms) each subsequent greeting stays visible */
const SUBSEQUENT_HOLD = 250;

/** Delay (ms) per character for the blur-stagger on the first greeting */
const CHAR_STAGGER_DELAY = 0.04; // seconds (used in CSS animation-delay)

/** Duration (s) for each character's blur-in animation */
const CHAR_ANIM_DURATION = 0.6; // seconds

/** Minimum total time (ms) the loader is visible regardless of greetings */
const MIN_LOADER_TIME = 1800;

/** localStorage key — loader only plays once per session */
const STORAGE_KEY = "loading-screen-seen";

/** Number of panels for the staggered exit */
const PANEL_COUNT = 4;

/* ═══════════════════════════════════════════════════ */

interface LoadingScreenProps {
  /** Called when the entire loading animation has completed */
  onComplete?: () => void;
}

/**
 * Full-screen loading overlay with multilingual greeting cycle
 * and staggered panel-slide exit. Plays once per browser visit.
 */

/** Check localStorage synchronously so the component never renders if already seen */
function hasBeenSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const startTimeRef = useRef(Date.now());
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        document.documentElement.setAttribute("data-loader-done", "true");
        document.body.classList.remove("loading");
        document.body.classList.add("loading-done");
        setShouldRender(false);
        onComplete?.();
        return;
      }
    } catch {
      // ignore
    }

    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.classList.add("loading");
  }, []);

  // Greeting cycle
  useEffect(() => {
    if (!shouldRender || phase !== "loading") return;

    const isFirst = greetingIndex === 0;
    const holdTime = isFirst ? FIRST_GREETING_HOLD : SUBSEQUENT_HOLD;

    const timer = setTimeout(() => {
      if (greetingIndex < GREETINGS.length - 1) {
        setGreetingIndex((i) => i + 1);
      } else {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);

        setTimeout(() => {
          setPhase("exit");
        }, remaining);
      }
    }, holdTime);

    return () => clearTimeout(timer);
  }, [greetingIndex, phase, shouldRender]);

  // Handle exit-animation end
  useEffect(() => {
    if (phase !== "exit") return;

    const exitDuration = prefersReducedMotion.current ? 400 : 900;

    const timer = setTimeout(() => {
      setPhase("done");
      document.documentElement.setAttribute("data-loader-done", "true");
      document.body.classList.remove("loading");
      document.body.classList.add("loading-done");

      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore
      }

      onComplete?.();
    }, exitDuration);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase === "done") {
      const cleanup = setTimeout(() => setShouldRender(false), 100);
      return () => clearTimeout(cleanup);
    }
  }, [phase]);

  if (!shouldRender) return null;

  const currentGreeting = GREETINGS[greetingIndex];
  const isExiting = phase === "exit";

  return (
    <div
      className={`loading-screen${isExiting ? " loading-screen--exit" : ""}`}
      aria-hidden="true"
    >
      {/* Background panels */}
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="loading-panel"
          style={{ backgroundColor: PANEL_COLOR }}
        />
      ))}

      {/* Greeting text */}
      <div className="loading-content">
        <p
          className={`loading-screen__text${
            currentGreeting.lang !== "en"
              ? ` loading-screen__text--secondary loading-screen__text--${currentGreeting.lang}`
              : ""
          }`}
        >
          {currentGreeting.blurStagger && !prefersReducedMotion.current
            ? renderBlurStagger(currentGreeting.text)
            : currentGreeting.text}
        </p>
      </div>
    </div>
  );
}

/** Wraps each character in a span with staggered blur-in animation */
function renderBlurStagger(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className={`loading-char${char === " " ? " loading-char--space" : ""}`}
      style={{
        animationDelay: `${i * CHAR_STAGGER_DELAY}s`,
        animationDuration: `${CHAR_ANIM_DURATION}s`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}
