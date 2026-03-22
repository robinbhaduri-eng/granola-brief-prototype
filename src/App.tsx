import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EditorPanel } from "./components/EditorPanel";
import { EnhanceButton } from "./components/EnhanceButton";
import { Sidebar, type MeetingSection } from "./components/Sidebar";

export type FlowState =
  | "idle"
  | "enhancing"
  | "suggested"
  | "attached"
  | "dismissed";

const validStates: FlowState[] = [
  "idle",
  "enhancing",
  "suggested",
  "attached",
  "dismissed",
];

const UNDO_DURATION_MS = 4000;

const meetingSections: MeetingSection[] = [
  {
    label: "Today",
    items: [
      {
        id: "quick-note",
        title: "New note",
        subtitle: "Me",
        time: "2:13 PM",
        initials: "D",
        tone: "neutral",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "firm-brainstorm",
        title: "FIRM x User Reporting brainstorm",
        subtitle: "Adam, Carl & 4 others",
        time: "1:05 PM",
        initials: "A",
        tone: "amber",
      },
      {
        id: "q3-strategy",
        title: "Q3 Strategy Review",
        subtitle: "Sarah Chen",
        time: "12:00 PM",
        initials: "S",
        tone: "blue",
      },
      {
        id: "retention-context",
        title: "Retention triage context",
        subtitle: "Me",
        time: "9:39 AM",
        initials: "R",
        tone: "neutral",
      },
    ],
  },
  {
    label: "Thu, Mar 19",
    items: [
      {
        id: "incident-postmortem",
        title: "Incident postmortem",
        subtitle: "Infra",
        time: "12:06 PM",
        initials: "I",
        tone: "purple",
      },
      {
        id: "roadmap-review",
        title: "Roadmap calibration",
        subtitle: "Strategy team",
        time: "11:35 AM",
        initials: "R",
        tone: "green",
      },
    ],
  },
];

function WaveIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5 text-[var(--color-foreground-accent-strong)]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d="M3.5 12.75V7.25" />
      <path d="M7.75 14.75V5.25" />
      <path d="M12.25 13.5v-7" />
      <path d="M16.5 11V9" />
    </svg>
  );
}

export default function App() {
  const [flowState, setFlowState] = useState<FlowState>(() => {
    if (typeof window === "undefined") {
      return "idle";
    }

    const requestedState = new URLSearchParams(window.location.search).get("state");
    return validStates.includes(requestedState as FlowState)
      ? (requestedState as FlowState)
      : "idle";
  });

  const [showUndo, setShowUndo] = useState(false);
  const [undoLabel, setUndoLabel] = useState("");
  const undoTimer = useRef<number | null>(null);

  const clearUndo = useCallback(() => {
    if (undoTimer.current) {
      window.clearTimeout(undoTimer.current);
      undoTimer.current = null;
    }
    setShowUndo(false);
  }, []);

  const triggerUndo = useCallback(
    (label: string) => {
      clearUndo();
      setUndoLabel(label);
      setShowUndo(true);
      undoTimer.current = window.setTimeout(() => {
        setShowUndo(false);
        undoTimer.current = null;
      }, UNDO_DURATION_MS);
    },
    [clearUndo],
  );

  const handleUndo = useCallback(() => {
    clearUndo();
    setFlowState("suggested");
  }, [clearUndo]);

  useEffect(() => {
    if (flowState !== "enhancing") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setFlowState("suggested");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [flowState]);

  const handleEnhance = () => {
    if (flowState !== "idle") {
      return;
    }
    setFlowState("enhancing");
  };

  const handleAttach = useCallback(() => {
    setFlowState("attached");
    triggerUndo("Chart attached");
  }, [triggerUndo]);

  const handleDismiss = useCallback(() => {
    setFlowState("dismissed");
    triggerUndo("Suggestion dismissed");
  }, [triggerUndo]);

  const dockPrompt =
    flowState === "attached"
      ? "Ask anything about this chart"
      : flowState === "dismissed"
        ? "Continue chat"
        : "Ask anything";

  const trailingChip =
    flowState === "attached"
      ? "Visual saved"
      : flowState === "dismissed"
        ? "Enhanced note"
        : "What did I miss";

  return (
    <div className="min-h-screen bg-[var(--color-background-window)] text-[var(--color-foreground-primary)]">
      <div className="flex min-h-screen">
        <Sidebar sections={meetingSections} selectedId="q3-strategy" />

        <main className="relative flex min-h-screen flex-1 overflow-hidden">
          <div className="mx-auto flex min-h-screen w-full max-w-[1200px] px-6 pb-40 pt-8 lg:px-10 lg:pt-9">
            <EditorPanel
              flowState={flowState}
              onAttach={handleAttach}
              onDismiss={handleDismiss}
            />
          </div>

          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3 px-4">
            <AnimatePresence mode="wait">
              {flowState === "idle" ? (
                <motion.div
                  key="enhance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.22, ease: [0.2, 1, 0.3, 1] }}
                  className="pointer-events-auto"
                >
                  <EnhanceButton onClick={handleEnhance} />
                </motion.div>
              ) : flowState === "enhancing" ? (
                <motion.div
                  key="enhancing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-auto rounded-full border border-[var(--color-border-primary)] bg-white/82 px-5 py-3 text-sm font-medium text-[var(--color-foreground-secondary)] shadow-[var(--shadow-floating)] backdrop-blur-xl"
                >
                  Enhancing notes...
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {showUndo ? (
                <motion.div
                  key="undo-toast"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.2, 1, 0.3, 1] }}
                  className="pointer-events-auto flex items-center gap-3 rounded-full border border-[var(--color-border-primary)] bg-white/88 px-4 py-2.5 shadow-[var(--shadow-floating)] backdrop-blur-xl"
                >
                  <span className="text-[13px] font-medium text-[var(--color-foreground-secondary)]">
                    {undoLabel}
                  </span>
                  <button
                    type="button"
                    onClick={handleUndo}
                    className="rounded-full px-2.5 py-1 text-[13px] font-semibold text-[var(--color-foreground-accent-strong)] transition hover:bg-[var(--color-background-accent)]"
                  >
                    Undo
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div
              layout
              className="pointer-events-auto flex w-full max-w-[780px] items-center gap-3 rounded-[28px] border border-[var(--color-border-primary)] bg-white/78 px-3 py-3 shadow-[var(--shadow-window)] backdrop-blur-xl"
            >
              <button
                type="button"
                aria-label="Open recorder controls"
                className="flex items-center gap-2 rounded-full border border-[var(--color-border-primary)] bg-[var(--color-background-elevated)]/90 py-2.5 pl-3 pr-4 shadow-[var(--shadow-subtle)] transition hover:bg-white"
              >
                <WaveIcon />
                <span className="text-[13px] font-semibold text-[var(--color-foreground-accent-strong)]">
                  Resume
                </span>
              </button>

              <div className="flex min-h-[44px] flex-1 items-center rounded-full border border-[var(--color-border-primary)] bg-[var(--color-background-elevated)]/88 px-5 text-sm text-[var(--color-foreground-tertiary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                {dockPrompt}
              </div>

              <div className="hidden rounded-full border border-[var(--color-border-primary)] bg-[var(--color-background-elevated)]/88 px-4 py-2.5 text-sm font-medium text-[var(--color-foreground-secondary)] shadow-[var(--shadow-subtle)] sm:block">
                {trailingChip}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
