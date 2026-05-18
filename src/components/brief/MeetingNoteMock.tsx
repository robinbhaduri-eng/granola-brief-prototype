import { AnimatePresence } from "framer-motion";
import type { Meeting } from "./briefFixtures";
import { PinnedBullet } from "./PinnedBullet";
import { WaveBars } from "./RecordingNotification";

type MeetingNoteMockProps = {
  meeting: Meeting;
  pinned?: string;
  onBackToBrief: () => void;
  onDismissPinned: () => void;
};

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        aria-hidden="true"
        className="text-[14px] font-medium text-[var(--color-foreground-tertiary)]"
      >
        #
      </span>
      <h2 className="text-[15px] font-semibold leading-[1.5] text-[var(--color-foreground-strong)]">
        {children}
      </h2>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1C1C1E]/60" />
      <span className="text-[15px] leading-[1.6] tracking-[-0.006em] text-[var(--color-foreground-primary)]">
        {children}
      </span>
    </li>
  );
}

function SubBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 pl-5">
      <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full ring-1 ring-[#1C1C1E]/40" />
      <span className="text-[14px] leading-[1.6] text-[var(--color-foreground-secondary)]">
        {children}
      </span>
    </li>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-primary)] bg-white/60 px-3 py-1 text-[13px] font-medium text-[var(--color-foreground-secondary)]">
      {children}
    </div>
  );
}

/**
 * Beat 3 surface. A minimal, Granola-style meeting note for the meeting
 * that just started, with the pinned bullet at the top of the first section.
 * The content is intentionally sparse — this is a recording-just-started
 * state, not a fully-enhanced post-meeting note.
 */
export function MeetingNoteMock({
  meeting,
  pinned,
  onBackToBrief,
  onDismissPinned,
}: MeetingNoteMockProps) {
  return (
    <section className="flex w-full flex-col">
      <div className="flex items-start justify-between gap-6">
        <div>
          <button
            type="button"
            onClick={onBackToBrief}
            className="mb-3 text-[12.5px] font-medium text-[var(--color-foreground-tertiary)] transition hover:text-[var(--color-foreground-secondary)]"
          >
            ← Back to brief
          </button>

          <h1
            className="text-[36px] font-light leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground-strong)] lg:text-[40px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {meeting.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <MetaPill>📅 Today</MetaPill>
            <MetaPill>👤 Me</MetaPill>
            <MetaPill>+ Add to folder</MetaPill>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-primary)] bg-white/70 px-3 py-1 text-[12.5px] font-medium text-[var(--color-foreground-accent-strong)]">
            <WaveBars className="h-3 w-3.5" />
            Recording
          </div>
        </div>
      </div>

      <div className="mt-9 max-w-[720px] space-y-6">
        <div className="space-y-3">
          <SectionHeader>Agenda</SectionHeader>
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {pinned ? (
                <PinnedBullet
                  key="pinned"
                  text={pinned}
                  onDismiss={onDismissPinned}
                />
              ) : null}
            </AnimatePresence>
            <Bullet>Quick check-in</Bullet>
            <Bullet>Q2 numbers walkthrough</Bullet>
            <Bullet>Q3 launch status</Bullet>
            <SubBullet>Eng capacity update</SubBullet>
            <SubBullet>Customer fix follow-through</SubBullet>
            <Bullet>Anything Nakul wants to flag</Bullet>
          </ul>
        </div>

        <div className="space-y-3">
          <SectionHeader>Notes</SectionHeader>
          <ul className="space-y-1.5">
            <li className="flex gap-2.5">
              <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-foreground-tertiary)]/50" />
              <span className="text-[14.5px] italic leading-[1.6] text-[var(--color-foreground-tertiary)]">
                Granola is listening — notes will appear here as the meeting unfolds.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
