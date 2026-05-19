/**
 * Chris Pedregal's (CEO, Granola) plausible calendar for the Brief demo.
 *
 * Insight bodies, the Meeting-1 notification copy, and the Meeting-1 pinned
 * bullet are BRIEF Section 5/15 verbatim. Everything else (titles, rooms,
 * reveal copy, citations, drafts) is shaped to feel like Chris's actual
 * world — CTO Nikola Otasevic, recruiter Elliot Nash, investor relationship
 * Michael Mignano at Union Square Ventures, and small-startup team
 * meetings. Surnames are only used for publicly-known people; other team
 * members are first-name-only.
 */

export type InsightCategory = "A" | "B" | "E";

export type Attendee = {
  name: string;
  /** Compact context line: "Role · recency · open thread". */
  line: string;
  initials: string;
  tone: "amber" | "blue" | "green" | "neutral" | "purple";
};

export type RevealCitation = {
  source: string;
  detail: string;
};

export type Reveal = {
  /** Action label, e.g. "Show what shifted". */
  label: string;
  /** 3-line summary cited to source meetings (BRIEF Section 15 step 2). */
  summary: string[];
  citations: RevealCitation[];
  /** Title of the "Open full note" target — purely cosmetic destination. */
  fullNoteTitle: string;
};

export type Prep = {
  /** Action label. Always "Bring this up" per BRIEF Section 6. */
  label: string;
  /** Copy that appears in the recording notification (Beat 2). */
  noticeCopy: string;
  /** Copy of the pinned bullet at the top of the meeting note (Beat 3). */
  pinnedBullet: string;
  /** Inline confirmation after click (BRIEF Section 15 step 3). */
  confirmation: string;
};

export type Outreach = {
  /** Section 7 — only exists for Category B. */
  label: string;
  recipient: string;
  /** Draft body the user reviews. Drafts, never sends. */
  draft: string;
};

export type Insight = {
  category: InsightCategory;
  /** The one-line insight, verbatim from BRIEF. */
  body: string;
  reveal: Reveal;
  prep: Prep;
  outreach?: Outreach;
};

export type Meeting = {
  id: string;
  title: string;
  /** Sidebar time chip — e.g. "in 10 min". */
  whenLabel: string;
  /** Clock time shown in the sidebar row. */
  clockLabel: string;
  /** How many minutes from now — used to decide whether the "Meeting detected" Chrome notif fires. */
  minutesAway: number;
  attendees: Attendee[];
  insight: Insight;
};

/** Meeting 1 — Catch-up with Michael (Category A: assumption shift). */
const meeting1: Meeting = {
  id: "michael-1on1",
  title: "Catch-up with Michael",
  whenLabel: "in 10 min",
  clockLabel: "9:50 AM",
  minutesAway: 10,
  attendees: [
    {
      name: "Michael Mignano",
      // Investor relationship now at USV. The "open thread" Chris owes
      // Michael a response on is the head-of-sales candidate Michael put
      // forward two weeks ago — Brief-tonal and the kind of thing a CEO
      // heads-down on launch would forget about.
      line: "Partner, USV · last met two weeks ago · waiting on your read of his head-of-sales candidate",
      initials: "M",
      tone: "blue",
    },
  ],
  insight: {
    category: "A",
    // Category A (assumption shift) applied to the actual open thread for
    // this meeting — the head-of-sales hire Michael put forward. The
    // pipeline assumptions Chris walked in with two weeks ago have moved.
    body: "Two assumptions behind the head-of-sales pipeline have shifted this week — Maddie has a competing offer, and your backup signed elsewhere on Tuesday.",
    reveal: {
      label: "Show what shifted",
      summary: [
        "Maddie — the candidate Michael sent — got a competing offer Monday. She's asking for a 48-hour decision.",
        "Your backup signed elsewhere Tuesday morning. Elliot caught it in his 1:1 with you.",
        "Net: the two-candidate pipeline you walked in with two weeks ago is now a one-candidate decision on a 48-hour clock.",
      ],
      citations: [
        {
          source: "Recruiter sync · Monday",
          detail: "Maddie flagged the competing offer to Elliot. Asked for 48 hours.",
        },
        {
          source: "Elliot 1:1 · Tuesday morning",
          detail: "Backup signed elsewhere. Came up in passing.",
        },
      ],
      fullNoteTitle: "Head-of-sales pipeline — candidate tracker",
    },
    prep: {
      label: "Bring this up",
      noticeCopy: "Recording started — bring up: head-of-sales pipeline",
      pinnedBullet:
        "Bring up: head-of-sales pipeline — Maddie has a competing offer (48hr), and your backup signed elsewhere",
      confirmation: "Saved to your Michael brief.",
    },
  },
};

/** Meeting 2 — Pricing v3 review (Category B: who else cares). */
const meeting2: Meeting = {
  id: "pricing-v3-review",
  title: "Pricing v3 review",
  whenLabel: "in 30 min",
  clockLabel: "10:10 AM",
  minutesAway: 30,
  attendees: [
    {
      name: "Nikola",
      // Nikola Otasevic — Granola's CTO. First name only matches how Chris
      // would actually read his calendar.
      line: "CTO · pushing back on the metered-tier eng cost",
      initials: "N",
      tone: "green",
    },
    {
      name: "Sam",
      // Sam Stephenson — co-founder. His angle on pricing is positioning
      // (brand / indie-user trust), distinct from Nikola's eng-cost angle.
      line: "co-founder · worried the metered tier reads as enterprise-only to indie users",
      initials: "S",
      tone: "blue",
    },
    {
      name: "Maya",
      line: "growth · ran the willingness-to-pay test last week",
      initials: "M",
      tone: "amber",
    },
    {
      name: "Theo",
      line: "ops · drafting the legal review for the new tier",
      initials: "T",
      tone: "purple",
    },
  ],
  insight: {
    category: "B",
    // BRIEF Section 5 Category B example + Section 15 step 6, verbatim.
    body: "Pat from infra has been raising your exact concern in 6 prior meetings. They're not on this invite.",
    reveal: {
      // BRIEF Section 15 step 6 — "Show me Pat's notes".
      label: "Show me Pat's notes",
      summary: [
        "Pat has flagged the audio-retention metering edge case in 6 meetings since February. The most recent was the infra cost review two weeks ago.",
        "Their concern: the per-minute tier under-prices long meetings that exceed the retention window. That inflates the unit margins we've been showing the board.",
        "Pat has a fix sketch and a draft note. Neither has reached the pricing thread you're walking into.",
      ],
      citations: [
        {
          source: "Infra cost review · two weeks ago",
          detail: "Pat: 'we keep showing margins our retention policy doesn't support.'",
        },
        {
          source: "Eng all-hands · last month",
          detail: "Pat circulated a one-pager. No one from the pricing side was in the room.",
        },
      ],
      fullNoteTitle: "Infra cost review — Pat's notes",
    },
    prep: {
      label: "Bring this up",
      noticeCopy: "Recording started — bring up: Pat's audio-retention metering concern",
      pinnedBullet:
        "Bring up: Pat from infra has raised this in 6 prior meetings. Not on the invite.",
      confirmation: "Saved to your pricing brief.",
    },
    outreach: {
      // BRIEF Section 7 + Section 15 step 6 — "Ping Pat for a quick read".
      label: "Ping Pat for a quick read",
      recipient: "Pat · infra",
      draft:
        "Hey Pat, heading into the pricing v3 review in 30. I know you've raised the audio-retention metering thing a few times. Got a quick take you'd want me to carry in? Happy to flag it directly.",
    },
  },
};

/** Meeting 3 — H2 roadmap sync (Category E: org divergence). */
const meeting3: Meeting = {
  id: "h2-roadmap-sync",
  title: "H2 roadmap sync",
  whenLabel: "in 1 hour",
  clockLabel: "10:40 AM",
  minutesAway: 60,
  attendees: [
    {
      name: "Nikola",
      line: "CTO · steering the H2 eng plan",
      initials: "N",
      tone: "green",
    },
    {
      name: "Sam",
      // Sam Stephenson — co-founder. The classic founder concern in a
      // roadmap meeting: too many themes, not enough depth.
      line: "co-founder · pushing for fewer themes, deeper bets",
      initials: "S",
      tone: "blue",
    },
    {
      name: "Maya",
      line: "growth · pushing the H2 retention bet",
      initials: "M",
      tone: "amber",
    },
    {
      name: "Iris",
      line: "enterprise · scoping data handling for SOC2",
      initials: "I",
      tone: "purple",
    },
    {
      name: "Alex",
      line: "design · cross-cutting on both threads",
      initials: "A",
      tone: "neutral",
    },
    {
      name: "Elliot Nash",
      // Granola's recruiter — sits in this room because the H2 plan
      // depends on the PM hires landing. The open thread is concrete:
      // Chris owes him a read on the finalists.
      line: "recruiter · waiting on your feedback on the PM finalists",
      initials: "E",
      tone: "neutral",
    },
  ],
  insight: {
    category: "E",
    // BRIEF Section 5 Category E example + Section 15 step 7, verbatim.
    body: "Growth and Trust have both been discussing this feature this month — Growth treats it as retention; Trust treats it as safety. They haven't connected.",
    reveal: {
      // BRIEF Section 15 step 7 — "Show the other thread".
      label: "Show the other thread",
      summary: [
        "Growth has talked about the Spaces-warnings flow in 4 meetings this month. They see it as a retention lever — pulling at-risk teams back in.",
        "The enterprise side has talked about the same flow in 3 meetings. They see it as a safety surface for redacting sensitive content shared into team spaces.",
        "Same feature, two threads, no overlap in attendees. Today's sync is the first room with people from both.",
      ],
      citations: [
        {
          source: "Growth weekly · last Thursday",
          detail: "Maya pitched warnings as the H2 retention bet.",
        },
        {
          source: "Enterprise review · last Friday",
          detail: "Iris scoped the same surface for SOC2-eligible redaction.",
        },
      ],
      fullNoteTitle: "Enterprise review — Spaces warnings scope",
    },
    prep: {
      label: "Bring this up",
      noticeCopy: "Recording started — bring up: Spaces warnings — Growth vs Trust framing",
      pinnedBullet:
        "Bring up: Growth and the enterprise side are scoping Spaces warnings in parallel. Neither knows about the other.",
      confirmation: "Saved to your roadmap brief.",
    },
  },
};

export const meetings: Meeting[] = [meeting1, meeting2, meeting3];

export function meetingById(id: string): Meeting {
  const m = meetings.find((x) => x.id === id);
  if (!m) throw new Error(`Unknown meeting id: ${id}`);
  return m;
}
