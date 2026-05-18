import type { Attendee } from "./briefFixtures";

type TheRoomProps = {
  attendees: Attendee[];
};

const toneClasses: Record<Attendee["tone"], string> = {
  amber: "bg-[#f5e7bf] text-[#8b6922]",
  blue: "bg-[#dbe6ff] text-[#5974b7]",
  green: "bg-[#dfeccb] text-[#5f7d1d]",
  neutral: "bg-[#ece9df] text-[#6a6656]",
  purple: "bg-[#e8e1f8] text-[#7965a8]",
};

/**
 * "The room" — always shown. 1-2 lines per attendee.
 * Renders as plain prose lines, not cards. BRIEF Section 4 + Section 12.
 */
export function TheRoom({ attendees }: TheRoomProps) {
  return (
    <section className="space-y-3">
      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
        The room
      </div>

      <ul className="space-y-2.5">
        {attendees.map((a) => (
          <li key={a.name} className="flex items-start gap-3">
            <div
              className={`mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${toneClasses[a.tone]}`}
            >
              {a.initials}
            </div>
            <div className="text-[15px] leading-[1.55] text-[var(--color-foreground-primary)]">
              <span className="font-semibold">{a.name}</span>{" "}
              <span className="text-[var(--color-foreground-secondary)]">
                — {a.line}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
