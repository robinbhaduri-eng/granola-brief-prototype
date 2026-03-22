export type MeetingTone = "amber" | "blue" | "green" | "neutral" | "purple";

export type MeetingItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  initials: string;
  tone: MeetingTone;
};

export type MeetingSection = {
  label: string;
  items: MeetingItem[];
};

type SidebarProps = {
  sections: MeetingSection[];
  selectedId: string;
};

const toneClasses: Record<MeetingTone, string> = {
  amber: "bg-[#f5e7bf] text-[#8b6922]",
  blue: "bg-[#dbe6ff] text-[#5974b7]",
  green: "bg-[#dfeccb] text-[#5f7d1d]",
  neutral: "bg-[#ece9df] text-[#6a6656]",
  purple: "bg-[#e8e1f8] text-[#7965a8]",
};

const navItems = ["Home", "Shared with me", "Chat"];

export function Sidebar({ sections, selectedId }: SidebarProps) {
  return (
    <aside className="hidden w-[286px] shrink-0 flex-col border-r border-[var(--color-border-primary)] bg-[rgba(252,252,248,0.6)] px-4 py-4 lg:flex">
      <div className="flex items-center gap-2 rounded-full border border-[var(--color-border-primary)] bg-white/72 px-3 py-2.5 shadow-[var(--shadow-subtle)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4 text-[var(--color-foreground-tertiary)]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        >
          <circle cx="8.5" cy="8.5" r="4.75" />
          <path d="M12 12l4 4" />
        </svg>

        <span className="flex-1 text-sm text-[var(--color-foreground-secondary)]">
          Search
        </span>

        <span className="rounded-md bg-[var(--color-highlight-faint)] px-1.5 py-0.5 text-[11px] font-medium text-[var(--color-foreground-tertiary)]">
          ⌘K
        </span>
      </div>

      <nav className="mt-5 space-y-1">
        {navItems.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm transition ${
              index === 0
                ? "bg-white/80 text-[var(--color-foreground-strong)] shadow-[var(--shadow-subtle)]"
                : "text-[var(--color-foreground-secondary)] hover:bg-white/55"
            }`}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[var(--color-border-primary)] bg-[var(--color-background-elevated)]/82 text-[10px] font-semibold text-[var(--color-foreground-secondary)]">
              {index === 0 ? "⌂" : index === 1 ? "↗" : "✦"}
            </span>
            {item}
          </button>
        ))}
      </nav>

      <div className="mt-6 space-y-1">
        <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
          Spaces
        </div>
        {["All-hands", "Customer calls", "Team Meta"].map((space) => (
          <button
            key={space}
            type="button"
            className="flex w-full items-center gap-2 rounded-2xl px-3 py-1.5 text-[13px] text-[var(--color-foreground-secondary)] transition hover:bg-white/55"
          >
            <span className="text-[12px]">📁</span>
            {space}
          </button>
        ))}
      </div>

      <div className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
        My notes
      </div>

      <div className="mt-4 flex-1 overflow-y-auto pr-1">
        <div className="space-y-5 pb-6">
          {sections.map((section) => (
            <section key={section.label}>
              <div className="px-3 text-xs font-medium text-[var(--color-foreground-tertiary)]">
                {section.label}
              </div>

              <div className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const isSelected = item.id === selectedId;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`group flex w-full items-start gap-3 rounded-[20px] px-3 py-3 text-left transition ${
                        isSelected
                          ? "bg-white/86 shadow-[var(--shadow-subtle)]"
                          : "hover:bg-white/55"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${toneClasses[item.tone]}`}
                      >
                        {item.initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className={`truncate text-[13px] leading-5 ${
                            isSelected
                              ? "font-semibold text-[var(--color-foreground-strong)]"
                              : "font-medium text-[var(--color-foreground-primary)]"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="truncate text-[12px] text-[var(--color-foreground-secondary)]">
                          {item.subtitle}
                        </div>
                      </div>

                      <div className="pt-0.5 text-[11px] text-[var(--color-foreground-tertiary)]">
                        {item.time}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-[var(--color-border-primary)] px-2 pt-4">
        <div className="flex items-center justify-between rounded-[18px] px-2 py-1.5">
          <div>
            <div className="text-sm font-medium text-[var(--color-foreground-primary)]">
              Granola
            </div>
            <div className="text-xs text-[var(--color-foreground-secondary)]">
              Meeting memory prototype
            </div>
          </div>

          <div className="rounded-full bg-[var(--color-background-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--color-foreground-secondary)] shadow-[var(--shadow-subtle)]">
            macOS
          </div>
        </div>
      </div>
    </aside>
  );
}
