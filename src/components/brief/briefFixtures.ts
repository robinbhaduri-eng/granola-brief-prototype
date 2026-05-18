/**
 * Chris Pedregal's (CEO, Granola) plausible calendar for the Brief demo.
 *
 * Insight bodies, the Meeting-1 notification copy, and the Meeting-1 pinned
 * bullet are BRIEF Section 5/15 verbatim. Everything else (titles, rooms,
 * reveal copy, citations, drafts) is shaped to feel like Chris's actual
 * world — co-founder Sam Stephenson, lead investor Nakul Mandan at
 * Lightspeed, and small-startup team meetings. Surnames are only used for
 * publicly-known people; team members are first-name-only.
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

/** Meeting 1 — Catch-up with Nakul (Category A: assumption shift). */
const meeting1: Meeting = {
  id: "nakul-1on1",
  title: "Catch-up with Nakul",
  whenLabel: "in 10 min",
  clockLabel: "9:50 AM",
  minutesAway: 10,
  attendees: [
    {
      name: "Nakul Mandan",
      // Lead investor (Lightspeed Series A). The "owes him Q2 numbers"
      // framing fits a quarterly investor cadence.
      line: "GP, Lightspeed · last met two weeks ago · you owe him the Q2 numbers",
      initials: "N",
      tone: "blue",
    },
  ],
  insight: {
    category: "A",
    // BRIEF Section 5 Category A example + Section 15 step 1, verbatim.
    body: "Two assumptions behind your Q3 launch date have shifted this week — eng capacity dropped to 1, and the customer fix landed Tuesday.",
    reveal: {
      // BRIEF Section 15 step 1 — "Show what shifted".
      label: "Show what shifted",
      summary: [
        "Q3 eng capacity dropped from 2 to 1. Maya pulled onto the Linear-customer fix full-time Monday after the escalation.",
        "The fix landed Tuesday morning. The regression hasn't come back in 36 hours.",
        "So: 2 engineers and an open fix became 1 engineer and a shipped fix. Nakul will ask about the date.",
      ],
      citations: [
        {
          source: "Eng standup · Monday",
          detail: "Maya moved to the Linear fix. Q3 capacity now 1.",
        },
        {
          source: "Customer escalation · Tuesday",
          detail: "Hotfix shipped. No alarms since.",
        },
      ],
      fullNoteTitle: "Q3 launch — assumption log",
    },
    prep: {
      label: "Bring this up",
      // BRIEF Section 15 step 4, verbatim.
      noticeCopy: "Recording started — bring up: Q3 launch assumptions",
      // BRIEF Section 15 step 5, verbatim.
      pinnedBullet: "Bring up: Q3 launch assumptions (two have shifted this week)",
      confirmation: "Saved to your Nakul brief.",
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
      name: "Sam",
      // Co-founder & CTO Sam Stephenson — first name only is how Chris
      // would actually see this in a calendar row.
      line: "co-founder · pushing for the metered tier this quarter",
      initials: "S",
      tone: "green",
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
      name: "Sam",
      line: "co-founder · steering the H2 eng plan",
      initials: "S",
      tone: "green",
    },
    {
      name: "Alex",
      line: "design · cross-cutting on both threads",
      initials: "A",
      tone: "blue",
    },
    {
      name: "Maya",
      line: "growth · pushing the H2 retention bet",
      initials: "M",
      tone: "amber",
    },
    {
      name: "Nina",
      line: "enterprise · scoping data handling for SOC2",
      initials: "N",
      tone: "purple",
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
          detail: "Nina scoped the same surface for SOC2-eligible redaction.",
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
