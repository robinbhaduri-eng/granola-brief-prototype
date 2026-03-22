import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { FlowState } from "../App";
import { ChartArtifact } from "./ChartArtifact";
import { DashcamSuggestion } from "./DashcamSuggestion";

type EditorPanelProps = {
  flowState: FlowState;
  onAttach: () => void;
  onDismiss: () => void;
};

function MetaPill({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-primary)] bg-white/60 px-3 py-1 text-[13px] font-medium text-[var(--color-foreground-secondary)]">
      {icon ? (
        <span className="text-[var(--color-foreground-tertiary)]">{icon}</span>
      ) : null}
      {children}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M5 1v3M11 1v3M2 7h12" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2.5" />
      <path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <circle cx="11.5" cy="5.5" r="1.8" />
      <path d="M14 13c0-1.7-1.1-3.1-2.5-3.5" />
    </svg>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-semibold leading-[1.5] text-[var(--oats-ink-secondary-strong)]">
      {children}
    </h2>
  );
}

function Bullet({
  children,
  tone = "enhanced",
}: {
  children: React.ReactNode;
  tone?: "raw" | "enhanced" | "enhancing";
}) {
  const textClass =
    tone === "raw"
      ? "text-[#1C1C1E]"
      : tone === "enhancing"
        ? "granola-shimmer-text"
        : "text-[var(--oats-ink-secondary)]";

  return (
    <li className="flex gap-2.5">
      <span
        className={`mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full ${
          tone === "raw" ? "bg-[#1C1C1E]/60" : "bg-[var(--oats-ink-secondary)]/40"
        }`}
      />
      <span className={`text-[15px] leading-[1.6] tracking-[-0.006em] ${textClass}`}>
        {children}
      </span>
    </li>
  );
}

function SubBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 pl-5">
      <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[var(--oats-ink-tertiary)]/40" />
      <span className="text-[14px] leading-[1.6] text-[var(--oats-ink-secondary)]">
        {children}
      </span>
    </li>
  );
}

export function EditorPanel({
  flowState,
  onAttach,
  onDismiss,
}: EditorPanelProps) {
  const hasEnhancedText =
    flowState === "suggested" ||
    flowState === "attached" ||
    flowState === "dismissed";
  const showSuggestion = flowState === "suggested";
  const showAttachment = flowState === "attached";
  const chartLayoutId = "dashcam-shared-chart";

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1
            className="text-[36px] font-light leading-[1.1] tracking-[-0.03em] text-[var(--color-foreground-strong)] lg:text-[42px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Q3 Strategy Review
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <MetaPill icon={<CalendarIcon />}>Yesterday</MetaPill>
            <MetaPill icon={<PeopleIcon />}>Sarah Chen</MetaPill>
            <MetaPill>+ Add to folder</MetaPill>
          </div>
        </div>

        <div className="hidden items-center gap-2 pt-1 md:flex">
          {hasEnhancedText ? (
            <div className="rounded-full border border-[var(--color-border-primary)] bg-white/60 px-3 py-1 text-[13px] font-medium text-[var(--color-foreground-secondary)]">
              Enhanced
            </div>
          ) : null}

          <button
            type="button"
            className="rounded-full border border-[var(--color-border-primary)] bg-white/60 px-4 py-1.5 text-[13px] font-medium text-[var(--color-foreground-primary)] transition hover:bg-white"
          >
            Share
          </button>

          <button
            type="button"
            aria-label="More actions"
            className="rounded-full border border-[var(--color-border-primary)] bg-white/60 px-2.5 py-1.5 text-[13px] text-[var(--color-foreground-tertiary)] transition hover:bg-white"
          >
            ···
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-[720px]">
        <AnimatePresence initial={false}>
          {flowState === "enhancing" ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-6 flex max-w-[580px] items-center gap-3 rounded-2xl border border-[var(--color-border-primary)] bg-white/78 px-4 py-3 text-[13px] font-medium text-[var(--color-foreground-accent-strong)] shadow-[var(--shadow-window)] backdrop-blur-xl"
            >
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--oats-fill-accent)]/25" />
                <span className="relative rounded-full bg-[var(--oats-fill-accent)] px-1.5 py-1.5" />
              </span>
              Analyzing transcript
            </motion.div>
          ) : null}
        </AnimatePresence>

        <LayoutGroup>
          <AnimatePresence mode="wait" initial={false}>
            {hasEnhancedText ? (
              <motion.div
                key="enhanced-note"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* --- Section 1: Revenue & Retention --- */}
                <div className="space-y-2">
                  <SectionHeader>Revenue & Retention Overview</SectionHeader>
                  <ul className="space-y-1.5">
                    <Bullet>
                      Sarah walked through the Q3 revenue chart and highlighted a clear churn spike in August
                    </Bullet>

                    {/* Dashcam suggestion or attached chart anchored here */}
                    <AnimatePresence initial={false}>
                      {showSuggestion ? (
                        <li className="list-none pl-7">
                          <DashcamSuggestion
                            chartLayoutId={chartLayoutId}
                            onAttach={onAttach}
                            onDismiss={onDismiss}
                          />
                        </li>
                      ) : null}
                    </AnimatePresence>

                    <AnimatePresence initial={false}>
                      {showAttachment ? (
                        <motion.li
                          className="list-none pl-7"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
                        >
                          <div className="mt-2 max-w-[600px]">
                            <motion.div layoutId={chartLayoutId}>
                              <ChartArtifact mode="embedded" />
                            </motion.div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.08, duration: 0.24 }}
                              className="mt-2 text-[12px] font-medium text-[var(--color-foreground-tertiary)]"
                            >
                              Shared screen · 14:02
                            </motion.p>
                          </div>
                        </motion.li>
                      ) : null}
                    </AnimatePresence>

                    <Bullet>
                      Overall Q3 revenue tracking 4% below plan, largely driven by the August dip
                    </Bullet>
                    <SubBullet>
                      July was on-target; September showing early signs of recovery
                    </SubBullet>
                    <Bullet>
                      Churn concentrated in mid-market segment (50–200 seat accounts)
                    </Bullet>
                    <SubBullet>
                      Enterprise retention remains strong at 96%
                    </SubBullet>
                    <SubBullet>
                      SMB churn was flat — the spike is segment-specific, not platform-wide
                    </SubBullet>
                  </ul>
                </div>

                {/* --- Section 2: Root Cause --- */}
                <div className="space-y-2">
                  <SectionHeader>Root Cause Discussion</SectionHeader>
                  <ul className="space-y-1.5">
                    <Bullet>
                      Team identified a pricing migration in late July as the likely trigger
                    </Bullet>
                    <SubBullet>
                      Mid-market accounts moved from legacy annual plans to the new usage-based tier
                    </SubBullet>
                    <SubBullet>
                      Several accounts saw 15–30% price increases without advance notice
                    </SubBullet>
                    <Bullet>
                      Sarah noted that competitor win-back offers from Lattice and Rippling coincided with the migration window
                    </Bullet>
                    <Bullet>
                      No single product issue flagged — this appears to be a go-to-market problem, not a product one
                    </Bullet>
                  </ul>
                </div>

                {/* --- Section 3: Actions --- */}
                <div className="space-y-2">
                  <SectionHeader>Agreed Next Steps</SectionHeader>
                  <ul className="space-y-1.5">
                    <Bullet>
                      Sarah to pull a cohort analysis of churned mid-market accounts by migration date
                    </Bullet>
                    <Bullet>
                      James to draft a win-back offer for accounts that left in August — target re-engagement by Oct 1
                    </Bullet>
                    <Bullet>
                      Revisit pricing migration comms playbook before Q4 enterprise wave
                    </Bullet>
                    <SubBullet>
                      Proposal: 60-day advance notice + price-lock option for annual renewals
                    </SubBullet>
                    <Bullet>
                      Follow-up review scheduled for next Thursday to assess September trajectory
                    </Bullet>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="raw-note"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <ul className="space-y-1.5">
                  <Bullet tone={flowState === "enhancing" ? "enhancing" : "raw"}>
                    Sarah showed the Q3 revenue chart here. It looks like churn spiked in August.
                  </Bullet>
                  <Bullet tone={flowState === "enhancing" ? "enhancing" : "raw"}>
                    We're 4% below plan. July was fine but August killed us.
                  </Bullet>
                  <Bullet tone={flowState === "enhancing" ? "enhancing" : "raw"}>
                    Mostly mid-market accounts churning. Enterprise is okay.
                  </Bullet>
                  <Bullet tone={flowState === "enhancing" ? "enhancing" : "raw"}>
                    Probably related to the pricing migration. Some accounts got big price increases.
                  </Bullet>
                  <Bullet tone={flowState === "enhancing" ? "enhancing" : "raw"}>
                    Lattice and Rippling doing win-back offers at the same time didn't help.
                  </Bullet>
                  <Bullet tone={flowState === "enhancing" ? "enhancing" : "raw"}>
                    Sarah doing cohort analysis. James doing win-back offer. Review again next Thursday.
                  </Bullet>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
