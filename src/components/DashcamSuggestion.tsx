import { motion } from "framer-motion";
import { ChartArtifact } from "./ChartArtifact";

type DashcamSuggestionProps = {
  chartLayoutId: string;
  onAttach: () => void;
  onDismiss: () => void;
};

export function DashcamSuggestion({
  chartLayoutId,
  onAttach,
  onDismiss,
}: DashcamSuggestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
      className="mt-3 max-w-[500px] rounded-[22px] border border-[var(--color-border-primary)] bg-white/80 p-3 shadow-[var(--shadow-floating)] backdrop-blur-xl"
    >
      <div className="flex gap-3">
        <motion.div layoutId={chartLayoutId} className="shrink-0">
          <ChartArtifact mode="preview" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-medium leading-[1.4] text-[var(--color-foreground-strong)]">
            Sarah referenced the August churn spike while this chart was on
            screen. Attach it?
          </p>

          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground-tertiary)]">
            Shared screen • 14:02
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={onAttach}
              className="rounded-full bg-[var(--oats-fill-accent)] px-3.5 py-2 text-[13px] font-semibold text-[var(--oats-ink-primary-inverse)] transition hover:bg-[var(--oats-fill-accent-hover)]"
            >
              Attach
            </button>

            <button
              type="button"
              onClick={onDismiss}
              className="rounded-full border border-[var(--color-border-primary)] bg-[var(--color-background-elevated)]/88 px-3.5 py-2 text-[13px] font-medium text-[var(--color-foreground-secondary)] transition hover:bg-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
