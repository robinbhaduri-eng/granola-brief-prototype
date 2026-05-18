import { motion } from "framer-motion";

/**
 * Beat 2 of the arc. Reuses Granola's existing recording-start notification
 * chrome (BRIEF Section 8 + Section 12 + reference 07).
 *
 * Two variants share the same chrome — only the icon, copy, and CTA change:
 *
 * - "detected"  → "Meeting detected" / "Chrome" / green G mark / Take Notes.
 *                 This is the trigger that replaces the synthetic "Simulate
 *                 meeting start" affordance. Persistent until clicked.
 * - "recording" → "Recording started — bring up: X" / green wave bars.
 *                 No CTA. Appears briefly when recording begins.
 */

type Variant = "detected" | "recording";

type RecordingNotificationProps = {
  variant: Variant;
  title: string;
  source: string;
  onPrimary?: () => void;
};

export function RecordingNotification({
  variant,
  title,
  source,
  onPrimary,
}: RecordingNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.2, 1, 0.3, 1] }}
      className="pointer-events-auto flex w-[360px] items-center gap-3 rounded-2xl border border-[var(--oats-border-solid)] bg-white p-3 shadow-[0_18px_44px_rgba(71,67,42,0.18),0_4px_10px_rgba(71,67,42,0.06)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--oats-fill-accent)] text-white">
        {variant === "detected" ? (
          <span className="text-[15px] font-semibold leading-none">G</span>
        ) : (
          <WaveBars className="h-3.5 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold leading-tight text-[var(--color-foreground-strong)]">
          {title}
        </div>
        <div className="mt-0.5 text-[11.5px] leading-tight text-[var(--color-foreground-tertiary)]">
          {source}
        </div>
      </div>

      {variant === "detected" && onPrimary ? (
        <button
          type="button"
          onClick={onPrimary}
          className="shrink-0 rounded-full bg-[var(--oats-fill-accent)] px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-[var(--oats-fill-accent-hover)]"
        >
          Take Notes
        </button>
      ) : null}
    </motion.div>
  );
}

/**
 * Granola's wave-bars recording icon (4 vertical bars that pulse like an
 * audio waveform). Used in the "recording" notification variant and in the
 * in-meeting note header (replacing the generic red recording dot).
 */
export function WaveBars({ className = "h-3.5 w-4" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center gap-[2px] ${className}`}
    >
      {[0, 0.12, 0.24, 0.36].map((delay, i) => (
        <span
          key={i}
          className="granola-wave-bar inline-block w-[2px] rounded-full bg-current"
          style={{ height: "100%", animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}
