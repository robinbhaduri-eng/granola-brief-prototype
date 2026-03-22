type EnhanceButtonProps = {
  onClick: () => void;
};

function SparklesIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-[16px] w-[16px]"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* large star, bottom-left */}
      <path d="M5 4c.2 2 2 3.8 4 4-2 .2-3.8 2-4 4-.2-2-2-3.8-4-4 2-.2 3.8-2 4-4Z" />
      {/* medium star, top-right */}
      <path d="M12.5 0c.13 1.37 1.13 2.37 2.5 2.5-1.37.13-2.37 1.13-2.5 2.5-.13-1.37-1.13-2.37-2.5-2.5 1.37-.13 2.37-1.13 2.5-2.5Z" />
      {/* small star, middle-right */}
      <path d="M13 8c.1.9.6 1.4 1.5 1.5-.9.1-1.4.6-1.5 1.5-.1-.9-.6-1.4-1.5-1.5.9-.1 1.4-.6 1.5-1.5Z" />
    </svg>
  );
}

export function EnhanceButton({ onClick }: EnhanceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-2 rounded-full bg-[var(--oats-fill-accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--oats-ink-primary-inverse)] shadow-[0_16px_40px_rgba(91,111,0,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--oats-fill-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--oats-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-background-window)]"
    >
      <SparklesIcon />
      Enhance notes
    </button>
  );
}
