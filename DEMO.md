# Brief — Demo Script

A ~90-second walkthrough of the Brief prototype for Chris.
Live demo URL: <https://robinbhaduri-eng.github.io/granola-brief-prototype/?demo=brief>

---

## Before you start

- **Hard-reload** (Cmd+Shift+R) so the "Meeting detected" Chrome notification animates in cleanly.
- **Resize browser to ≥ 1024px** so the sidebar shows (it intentionally hides below 1024px — per BRIEF Section 16 "responsive below 1024px is out of scope").
- The demo runs in the order **Meeting 1 → 2 → 3** to deliver the full arc on Meeting 1 first, then demonstrate portfolio breadth on Meetings 2 and 3.
- If you ever need to reset, just hit the URL again.

---

## Opening (5 s)

> *"It's Tuesday morning. You've got Michael in 10 minutes, a pricing review at 10:10, and the roadmap sync at 10:40. Today, when you click Michael, Granola shows you 'ready to record.' Here's what we're proposing instead."*

Open the URL. The **"Meeting detected"** Chrome notification appears top-right within a beat — that's the trigger for the full arc.

---

## Meeting 1 · Catch-up with Michael *(the full arc)*

### Beat 1 — The Brief itself (20 s)

Point at the canvas, don't click yet.

> *"This is the meeting canvas. But instead of an empty 'ready to record' state, Granola hands you one thing worth knowing. Two parts.*
>
> *The room at the top — Michael Mignano, Partner at USV, last met two weeks ago — and the open thread: **you owe him a reaction to the head-of-sales candidate he sent.** Granola knows that because it heard him send the intro on the last call and watched it never come back through your reply.*
>
> *Then below — **worth knowing** — Granola noticed that **two assumptions behind that head-of-sales pipeline have shifted this week.** Maddie has a competing offer. Your backup signed elsewhere Tuesday. You're walking in thinking you have two finalists — you don't."*

### Beat 2 — Reveal (15 s)

Click **Show what shifted**. Three lines unfold inline with citations.

> *"Three lines, cited to the actual meetings the data came from. **Recruiter sync Monday — Maddie called Elliot about the competing offer, asked for 48 hours.** Elliot's 1:1 with you Tuesday morning — your backup signed elsewhere, came up in passing and you almost missed it. **Net: the two-candidate pipeline you walked in two weeks ago is now a one-candidate decision on a 48-hour clock.**"*

(If asked: clicking `Open full note →` would take you to the candidate tracker — out of scope to navigate during the demo.)

### Beat 3 — The full arc (25 s) · the wow moment

> *"OK, I want to bring this up with Michael. One click."*

Click **Bring this up**. Inline confirmation: `✓ Saved to your Michael brief.` Undo is there for 4 s.

> *"This is where it stops being a passive sidebar. That one click follows me into the meeting."*

Click **Take Notes** on the Chrome notification.

> *"…Recording started — bring up: head-of-sales pipeline. Granola's existing recording notification just carried the prep forward. And when the note opens —"*

The meeting note view appears with the pinned bullet at the top.

> *"— it's already at the top of the agenda. Subtle olive mark on the left, no badge — reads like a normal note bullet. The full thread: **Maddie has a competing offer on a 48-hour clock, and the backup signed elsewhere.** Ready to reference mid-conversation. **One click, three places it shows up.**"*

Optional: point at the agenda items below the pinned bullet —

> *"And the rest of the agenda is investor-shaped: Q3 launch status, ARR ramp + round timing, anything Michael is hearing."*

---

## Meeting 2 · Pricing v3 review *(demonstrate breadth — Category B)*

Click **← Back to brief**, then in the sidebar click **Pricing v3 review** (or in the URL bar append `&meeting=pricing-v3-review`).

> *"Different meeting, different category. Pricing review in 30 minutes.*
>
> *Look at the top of the room — **Nikola and Sam are both there, pushing from different angles.** Your CTO is worried about the eng cost of metering. Your co-founder Sam is worried about how it reads to your indie users — Granola's brand grew on indie + SMB and a metered tier could feel enterprise-only. Maya ran the willingness-to-pay test, Theo's drafting the legal review.*
>
> *Granola knows all of that — and yet the Brief surfaces none of them as the insight. The bigger thing is that **Pat from infra has been raising your exact concern in 6 prior meetings, and Pat's not on this invite.**"*

Click **Ping Pat for a quick read**. Modal opens with a drafted message.

> *"Two actions. I can bring it up myself. Or, since Pat's not in the room, I can ping Pat for a quick read. **Drafts. Never sends.** I read it, edit if I want, copy it out manually. The only Brief action that touches the outside world, and even then only as a draft."*

Close modal.

---

## Meeting 3 · H2 roadmap sync *(demonstrate breadth — Category E)*

Click **← Back** (or `&meeting=h2-roadmap-sync` in URL).

> *"Different category again. Roadmap sync in an hour. Five people from across the org are in the room — Nikola steering eng, Sam pushing for fewer themes, Maya pushing the H2 retention bet, Iris scoping data handling for SOC2, Alex cross-cutting on design. And **Elliot, your recruiter, is waiting on your feedback on the PM finalists** — that's three days stale.*
>
> *But the insight Granola surfaces is none of those. It's that **Growth and Trust have both been discussing the Spaces warnings flow this month, from opposite framings. Retention vs safety. They haven't connected.** Today's sync is the first room with people from both."*

---

## Close (5 s)

> *"Three meetings, three insight categories, one full arc end-to-end. The bet is **quiet over comprehensive.** Most meetings won't have a hero insight — and that's the point. When one appears — like the Pat thing today — it lands."*

---

## Demo time budget

| Section | Estimate |
|---|---|
| Opening | 5 s |
| Meeting 1 Beat 1 (Brief) | 20 s |
| Meeting 1 Beat 2 (Reveal) | 15 s |
| Meeting 1 Beat 3 (the arc) | 25 s |
| Meeting 2 (Pat + Ping) | 20 s |
| Meeting 3 (Growth/Trust) | 15 s |
| Close | 5 s |
| **Total** | **~1 min 45 s** |

---

## Anticipated questions + back-pocket answers

**Q: How does Granola pick the "one thing"?**
> The portfolio is five categories (Section 5 of the brief — A/B/C/D/E). Per meeting Granola ranks them by how strongly the data supports a real surprise, and picks the top one. If nothing clears the bar, the Brief is just "the room" — which is the deliberate quiet-over-comprehensive design.

**Q: What about Pat — would they be offended you didn't invite them?**
> The action is *Ping Pat for a quick read* — a draft, never sent. You decide whether to send. It's Pat-aware, not Pat-bypassing.

**Q: Is this just chat with a different UI?**
> No. Chat is the user asking. The Brief is Granola surfacing one thing — unprompted, at the moment it matters. It's the inverse direction.

**Q: Why not three modules / a sidebar tab?**
> Section 10 of the brief — modules make the user *look for* the org intel Granola has. The Brief flips that: one load-bearing thing at the moment the user needs it, then it gets out of the way.

**Q: What happens if Granola is wrong?**
> The micro-actions are designed for cheap retreat. *Bring this up* is undoable. The pinned bullet is dismissable on hover. *Ping Pat* never sends. The only cost of a bad surface is two seconds of attention.

**Q: Why does the recording notification say "Chrome"?**
> That's the existing Granola notification — it surfaces when Granola detects a meeting in your browser. The Brief reuses it (Beat 2 of the arc), only the copy carries forward the prep — see Section 12 of the brief: "visually indistinguishable from today's Granola recording notification except for the appended bring-up copy."

---

## Deep links (skip the click-around in a re-run)

- Meeting 1 (default): `?demo=brief`
- Meeting 2: `?demo=brief&meeting=pricing-v3-review`
- Meeting 3: `?demo=brief&meeting=h2-roadmap-sync`

---

## What's deliberately not in this demo

- Category C (*what they've been carrying*) and D (*open loops between you two*) — in the portfolio for context, but the three meetings cover A, B, and E to demonstrate breadth (per BRIEF Section 17 acceptance criteria).
- Mobile / responsive below 1024 px.
- Empty-Brief state — there is no "quiet meeting" in this demo even though the design bet calls for one. Worth flagging to Chris that "most meetings will be quiet" is a bet to test; the demo intentionally over-indexes on loaded meetings to demonstrate the portfolio.
- Any new chrome in the existing Granola app. Per Section 17: "The Brief adds zero new pieces of chrome to the existing app."
