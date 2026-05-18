import { motion } from "framer-motion";

type PinnedBulletProps = {
  text: string;
  /** When provided, a hover-revealed × dismisses the bullet. */
  onDismiss?: () => void;
};

/**
 * Beat 3 of the arc. Sits as the first bullet at the top of the meeting
 * note. Reads as a Granola note bullet, with the lightest possible mark
 * to indicate origin: a subtle olive accent in the left margin — nothing
 * more. The "Bring up:" prefix already signals the brief's voice; the
 * accent does the visual lift.
 *
 * BRIEF Section 12: "a small label OR a subtle accent in the left margin,
 * nothing more." We chose the accent.
 */
export function PinnedBullet({ text, onDismiss }: PinnedBulletProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, height: 0, marginTop: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1], delay: 0.05 }}
      className="group relative flex list-none items-start gap-2.5 pl-3"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-[var(--oats-fill-accent)]/60"
      />

      <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1C1C1E]/70" />

      <span className="flex-1 text-[15px] leading-[1.6] tracking-[-0.006em] text-[var(--color-foreground-primary)]">
        {text}
      </span>

      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss this bullet"
          className="mt-[5px] shrink-0 rounded-md p-0.5 text-[var(--color-foreground-tertiary)] opacity-0 transition focus:opacity-100 group-hover:opacity-100 hover:text-[var(--color-foreground-secondary)]"
        >
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      ) : null}
    </motion.li>
  );
}
