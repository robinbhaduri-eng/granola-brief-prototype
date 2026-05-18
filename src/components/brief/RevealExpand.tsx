import { motion } from "framer-motion";
import type { Reveal } from "./briefFixtures";

type RevealExpandProps = {
  reveal: Reveal;
};

/**
 * Inline reveal — appears below the insight when the user clicks
 * "Show what shifted" / "Show me Pat's notes" / "Show the other thread".
 * Three lines of summary + source citations + a quiet "Open full note →" link.
 * Never navigates away unless the user clicks the link. BRIEF Section 6.
 */
export function RevealExpand({ reveal }: RevealExpandProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-4 border-l border-[var(--oats-border-solid)] pl-5">
        <ul className="space-y-2.5">
          {reveal.summary.map((line, i) => (
            <li
              key={i}
              className="text-[14px] leading-[1.65] text-[var(--color-foreground-secondary)]"
            >
              {line}
            </li>
          ))}
        </ul>

        <ul className="mt-4 space-y-1">
          {reveal.citations.map((c) => (
            <li
              key={c.source}
              className="text-[12.5px] leading-[1.55] text-[var(--color-foreground-tertiary)]"
            >
              <span className="font-medium text-[var(--color-foreground-secondary)]">
                {c.source}:
              </span>{" "}
              {c.detail}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-foreground-accent-strong)] transition hover:underline"
        >
          Open full note
          <span aria-hidden="true">→</span>
          <span className="sr-only">: {reveal.fullNoteTitle}</span>
        </button>
      </div>
    </motion.div>
  );
}
