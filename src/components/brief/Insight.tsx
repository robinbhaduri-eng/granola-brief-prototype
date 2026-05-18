import { AnimatePresence, motion } from "framer-motion";
import type { Insight as InsightType } from "./briefFixtures";
import { RevealExpand } from "./RevealExpand";

type InsightProps = {
  insight: InsightType;
  revealed: boolean;
  broughtUp: boolean;
  /** When true, render an inline "Undo" link beside the confirmation. */
  undoVisible: boolean;
  onReveal: () => void;
  onBringUp: () => void;
  onUndo: () => void;
  onPing?: () => void;
};

/**
 * The single insight + its inline actions. BRIEF Sections 4–7.
 * - Reveal ("Show me X") → inline expand (RevealExpand)
 * - Prep ("Bring this up") → confirms inline; the brought-up state propagates
 *   to the recording notification (Beat 2) and pinned bullet (Beat 3).
 * - Optional outreach ("Ping Pat for a quick read") only for Category B.
 */
export function Insight({
  insight,
  revealed,
  broughtUp,
  undoVisible,
  onReveal,
  onBringUp,
  onUndo,
  onPing,
}: InsightProps) {
  return (
    <section className="space-y-3">
      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
        Worth knowing
      </div>

      <p className="text-[17px] leading-[1.55] tracking-[-0.005em] text-[var(--color-foreground-strong)]">
        {insight.body}
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
        <button
          type="button"
          onClick={onReveal}
          className="text-[14px] font-medium text-[var(--color-foreground-accent-strong)] transition hover:underline"
        >
          {revealed ? "Hide" : insight.reveal.label}
        </button>

        {broughtUp ? (
          <span className="flex items-center gap-3 text-[14px] font-medium text-[var(--color-foreground-tertiary)]">
            <span>✓ {insight.prep.confirmation}</span>
            {undoVisible ? (
              <button
                type="button"
                onClick={onUndo}
                className="text-[var(--color-foreground-accent-strong)] transition hover:underline"
              >
                Undo
              </button>
            ) : null}
          </span>
        ) : (
          <button
            type="button"
            onClick={onBringUp}
            className="text-[14px] font-medium text-[var(--color-foreground-accent-strong)] transition hover:underline"
          >
            {insight.prep.label}
          </button>
        )}

        {insight.outreach && onPing ? (
          <button
            type="button"
            onClick={onPing}
            className="text-[14px] font-medium text-[var(--color-foreground-secondary)] transition hover:text-[var(--color-foreground-accent-strong)] hover:underline"
          >
            {insight.outreach.label}
          </button>
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {revealed ? (
          <motion.div key="reveal" layout>
            <RevealExpand reveal={insight.reveal} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
