import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Insight } from "./Insight";
import { MeetingNoteMock } from "./MeetingNoteMock";
import { RecordingNotification } from "./RecordingNotification";
import { TheRoom } from "./TheRoom";
import { meetings, type Meeting } from "./briefFixtures";

/**
 * The Brief demo (?demo=brief).
 *
 * Owns:
 * - Selected meeting state (drives the sidebar and the main canvas).
 * - Per-meeting brief state (revealed?, brought-up?).
 * - The arc:
 *     brief         → "Meeting detected" Chrome notification shown for the
 *                     meeting that's within 15 min (Meeting 1).
 *     starting      → meeting note view + transient "Recording started —
 *                     bring up: X" toast for 2s.
 *     in-meeting    → meeting note view + persistent wave-bars Recording
 *                     indicator in the note header.
 *   The Chrome notification IS the trigger — there is no separate
 *   "Simulate meeting start" affordance.
 * - The Ping Pat quiet draft modal (Meeting 2 only, BRIEF Section 7).
 */

type ArcStage = "brief" | "starting" | "in-meeting";

type MeetingState = {
  revealed: boolean;
  broughtUp: boolean;
  /** True for ~4s after broughtUp flips on — drives the inline "Undo" link. */
  undoVisible: boolean;
};

const UNDO_DURATION_MS = 4000;

const initialMeetingStates: Record<string, MeetingState> = Object.fromEntries(
  meetings.map((m) => [
    m.id,
    { revealed: false, broughtUp: false, undoVisible: false },
  ]),
);

export default function BriefCanvas() {
  const initialId = useMemo(() => {
    if (typeof window === "undefined") return meetings[0].id;
    const requested = new URLSearchParams(window.location.search).get("meeting");
    return meetings.find((m) => m.id === requested)?.id ?? meetings[0].id;
  }, []);

  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [meetingStates, setMeetingStates] =
    useState<Record<string, MeetingState>>(initialMeetingStates);
  const [arcStage, setArcStage] = useState<ArcStage>("brief");
  const [pingOpen, setPingOpen] = useState(false);

  const notifTimer = useRef<number | null>(null);
  // One undo timer per meeting — switching meetings doesn't cancel a
  // running undo window for another meeting.
  const undoTimers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    return () => {
      if (notifTimer.current) window.clearTimeout(notifTimer.current);
      undoTimers.current.forEach((t) => window.clearTimeout(t));
      undoTimers.current.clear();
    };
  }, []);

  function clearUndoTimer(id: string) {
    const t = undoTimers.current.get(id);
    if (t) {
      window.clearTimeout(t);
      undoTimers.current.delete(id);
    }
  }

  const meeting = useMemo(
    () => meetings.find((m) => m.id === selectedId) ?? meetings[0],
    [selectedId],
  );
  const state = meetingStates[meeting.id];

  function updateMeeting(id: string, partial: Partial<MeetingState>) {
    setMeetingStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...partial },
    }));
  }

  function handleSelect(id: string) {
    setSelectedId(id);
    setArcStage("brief");
  }

  function handleReveal() {
    updateMeeting(meeting.id, { revealed: !state.revealed });
  }

  function handleBringUp() {
    if (state.broughtUp) return;
    const id = meeting.id;
    clearUndoTimer(id);
    updateMeeting(id, { broughtUp: true, undoVisible: true });
    const t = window.setTimeout(() => {
      updateMeeting(id, { undoVisible: false });
      undoTimers.current.delete(id);
    }, UNDO_DURATION_MS);
    undoTimers.current.set(id, t);
  }

  function handleUndo() {
    clearUndoTimer(meeting.id);
    updateMeeting(meeting.id, { broughtUp: false, undoVisible: false });
  }

  function handleDismissPinned() {
    // Dismissing the pinned bullet from inside the meeting is the same
    // signal as "I changed my mind about bringing it up" — revert the prep
    // state so the brief is consistent if the user navigates back.
    clearUndoTimer(meeting.id);
    updateMeeting(meeting.id, { broughtUp: false, undoVisible: false });
  }

  function handlePing() {
    setPingOpen(true);
  }

  function handleTakeNotes() {
    if (notifTimer.current) window.clearTimeout(notifTimer.current);
    setArcStage("starting");
    notifTimer.current = window.setTimeout(() => {
      setArcStage("in-meeting");
    }, 3400);
  }

  function handleBackToBrief() {
    if (notifTimer.current) window.clearTimeout(notifTimer.current);
    setArcStage("brief");
  }

  // The "Meeting detected" Chrome notification only surfaces when (a) we're
  // on the brief view and (b) the meeting is imminent — Granola wouldn't
  // detect the meeting an hour before it starts.
  const showDetectedNotif =
    arcStage === "brief" && meeting.minutesAway <= 15;
  const showRecordingToast = arcStage === "starting";
  const inMeetingView = arcStage === "starting" || arcStage === "in-meeting";

  return (
    <div className="min-h-screen bg-[var(--color-background-window)] text-[var(--color-foreground-primary)]">
      <div className="flex min-h-screen">
        <BriefSidebar
          selectedId={meeting.id}
          onSelect={handleSelect}
          meetingStates={meetingStates}
        />

        <main className="relative flex min-h-screen flex-1 overflow-hidden">
          <div className="mx-auto flex min-h-screen w-full max-w-[1100px] px-6 pb-32 pt-10 lg:px-12 lg:pt-12">
            <AnimatePresence mode="wait">
              {inMeetingView ? (
                <motion.div
                  key={`note-${meeting.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <MeetingNoteMock
                    meeting={meeting}
                    pinned={
                      state.broughtUp ? meeting.insight.prep.pinnedBullet : undefined
                    }
                    onBackToBrief={handleBackToBrief}
                    onDismissPinned={handleDismissPinned}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`brief-${meeting.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <BriefView
                    meeting={meeting}
                    revealed={state.revealed}
                    broughtUp={state.broughtUp}
                    undoVisible={state.undoVisible}
                    onReveal={handleReveal}
                    onBringUp={handleBringUp}
                    onUndo={handleUndo}
                    onPing={handlePing}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pointer-events-none fixed right-6 top-6 z-30">
            <AnimatePresence mode="wait">
              {showRecordingToast ? (
                <RecordingNotification
                  key="rec-recording"
                  variant="recording"
                  title={meeting.insight.prep.noticeCopy}
                  source="Granola"
                />
              ) : showDetectedNotif ? (
                <RecordingNotification
                  key="rec-detected"
                  variant="detected"
                  title="Meeting detected"
                  source="Chrome"
                  onPrimary={handleTakeNotes}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {pingOpen && meeting.insight.outreach ? (
          <PingDraftModal
            recipient={meeting.insight.outreach.recipient}
            draft={meeting.insight.outreach.draft}
            onClose={() => setPingOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Brief view (the meeting canvas — replaces "ready to record" empty state)  */
/* -------------------------------------------------------------------------- */

type BriefViewProps = {
  meeting: Meeting;
  revealed: boolean;
  broughtUp: boolean;
  undoVisible: boolean;
  onReveal: () => void;
  onBringUp: () => void;
  onUndo: () => void;
  onPing: () => void;
};

function BriefView({
  meeting,
  revealed,
  broughtUp,
  undoVisible,
  onReveal,
  onBringUp,
  onUndo,
  onPing,
}: BriefViewProps) {
  return (
    <section className="flex w-full flex-col">
      <header>
        <div className="text-[12.5px] font-medium text-[var(--color-foreground-tertiary)]">
          {meeting.whenLabel} · {meeting.clockLabel}
        </div>

        <h1
          className="mt-2 text-[36px] font-light leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground-strong)] lg:text-[42px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {meeting.title}
        </h1>
      </header>

      <div className="mt-10 max-w-[680px] space-y-10">
        <TheRoom attendees={meeting.attendees} />

        <Insight
          insight={meeting.insight}
          revealed={revealed}
          broughtUp={broughtUp}
          undoVisible={undoVisible}
          onReveal={onReveal}
          onBringUp={onBringUp}
          onUndo={onUndo}
          onPing={meeting.insight.outreach ? onPing : undefined}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                   */
/* -------------------------------------------------------------------------- */

const sidebarToneClasses: Record<string, string> = {
  amber: "bg-[#f5e7bf] text-[#8b6922]",
  blue: "bg-[#dbe6ff] text-[#5974b7]",
  green: "bg-[#dfeccb] text-[#5f7d1d]",
  neutral: "bg-[#ece9df] text-[#6a6656]",
  purple: "bg-[#e8e1f8] text-[#7965a8]",
};

function BriefSidebar({
  selectedId,
  onSelect,
  meetingStates,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  meetingStates: Record<string, MeetingState>;
}) {
  return (
    <aside className="hidden w-[286px] shrink-0 flex-col border-r border-[var(--color-border-primary)] bg-[rgba(252,252,248,0.6)] px-4 py-5 lg:flex">
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
        {[
          { label: "Home", glyph: "⌂" },
          { label: "Shared with me", glyph: "↗" },
          { label: "Chat", glyph: "✦" },
        ].map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm transition ${
              index === 0
                ? "bg-white/80 text-[var(--color-foreground-strong)] shadow-[var(--shadow-subtle)]"
                : "text-[var(--color-foreground-secondary)] hover:bg-white/55"
            }`}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[var(--color-border-primary)] bg-[var(--color-background-elevated)]/82 text-[10px] font-semibold text-[var(--color-foreground-secondary)]">
              {item.glyph}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-7 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
        Coming up
      </div>

      <div className="mt-3 flex-1 space-y-1 overflow-y-auto pr-1">
        {meetings.map((m) => {
          const isSelected = m.id === selectedId;
          const broughtUp = meetingStates[m.id]?.broughtUp;
          const lead = m.attendees[0];

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.id)}
              className={`group flex w-full items-start gap-3 rounded-[20px] px-3 py-3 text-left transition ${
                isSelected
                  ? "bg-white/86 shadow-[var(--shadow-subtle)]"
                  : "hover:bg-white/55"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${sidebarToneClasses[lead.tone]}`}
              >
                {lead.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`truncate text-[13px] leading-5 ${
                    isSelected
                      ? "font-semibold text-[var(--color-foreground-strong)]"
                      : "font-medium text-[var(--color-foreground-primary)]"
                  }`}
                >
                  {m.title}
                </div>
                <div className="flex items-center gap-1.5 truncate text-[12px] text-[var(--color-foreground-secondary)]">
                  <span className="truncate">{m.whenLabel}</span>
                  {broughtUp ? (
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--oats-fill-accent)]/70"
                      title="Has brief item brought up"
                    />
                  ) : null}
                </div>
              </div>

              <div className="pt-0.5 text-[11px] text-[var(--color-foreground-tertiary)]">
                {m.clockLabel}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto border-t border-[var(--color-border-primary)] px-2 pt-4">
        <div className="flex items-center justify-between rounded-[18px] px-2 py-1.5">
          <div>
            <div className="text-sm font-medium text-[var(--color-foreground-primary)]">
              Granola
            </div>
            <div className="text-xs text-[var(--color-foreground-secondary)]">
              Brief — prototype
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

/* -------------------------------------------------------------------------- */
/*  Ping Pat draft modal (Meeting 2 only)                                     */
/* -------------------------------------------------------------------------- */

function PingDraftModal({
  recipient,
  draft,
  onClose,
}: {
  recipient: string;
  draft: string;
  onClose: () => void;
}) {
  const [body, setBody] = useState(draft);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    void navigator.clipboard?.writeText(body).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <motion.div
      key="ping-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#1a181433] backdrop-blur-[2px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.2, 1, 0.3, 1] }}
        className="w-[460px] max-w-[92vw] rounded-2xl border border-[var(--oats-border-solid)] bg-white p-5 shadow-[0_30px_60px_rgba(71,67,42,0.18)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Draft message to ${recipient}`}
      >
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
              Draft
            </div>
            <div className="mt-0.5 text-[14px] font-medium text-[var(--color-foreground-strong)]">
              To: {recipient}
            </div>
          </div>
          <div className="text-[11.5px] text-[var(--color-foreground-tertiary)]">
            Granola never sends.
          </div>
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="mt-4 w-full resize-none rounded-xl border border-[var(--oats-border-solid)] bg-[var(--oats-surface)]/60 p-3 text-[14px] leading-[1.55] text-[var(--color-foreground-primary)] outline-none focus:border-[var(--oats-border-focus)]"
        />

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--color-foreground-secondary)] transition hover:bg-[var(--color-background-sunken)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full bg-[var(--oats-fill-accent)] px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[var(--oats-fill-accent-hover)]"
          >
            {copied ? "Copied" : "Copy draft"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
