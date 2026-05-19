# Brief — Demo Cheat Sheet

**Live:** <https://robinbhaduri-eng.github.io/granola-brief-prototype/?demo=brief>

---

## Setup *(do before Chris joins)*

- Cmd+Shift+R · window ≥ 1024px · land on Michael's brief
- Three meetings teed up: Michael (10 min) · Pricing (30 min) · Roadmap (1 hr)

## Lead with the problem — 10s

*Say this before clicking anything.*

> *"Granola sits in every meeting in your org. That's the most valuable knowledge graph any tool has. But the user can't access that intel at the moment it matters most — the seconds before they walk in. **Brief is what closes that loop.**"*

Backing it up if Chris pushes for specifics:

- Today, those seconds = the "ready to record" empty state. Useful for recording. Useless for prep.
- Brief replaces that empty state with **one thing worth knowing**, drawn from the org's transcripts, carriable in with one click.

## Beat 1 · The Brief — 15s

*The room + worth knowing.*

- **Room**: Michael Mignano at USV · last met two weeks ago · owes him a read on the head-of-sales candidate
- **Worth knowing**: those pipeline assumptions just moved — Maddie has a competing offer, backup is out
- **Land this**: the insight is *about the same thread the room flagged.* Not random — fits the meeting.

## Beat 2 · Reveal — 10s

- Click **Show what shifted** → 3 lines, cited to real meetings (Recruiter sync Mon + Elliot 1:1 Tue)
- Quiet "Open full note →" link — escape hatch, never auto-navigates

## Beat 3 · The arc — 20s

*One click, three places.*

- **Bring this up** → confirms inline · Undo for 4s
- **Take Notes** on the Chrome notif → meeting note opens
- Pinned bullet at top, same thread, same copy
- **Land this**: Brief isn't a passive sidebar. It follows you into the room.

## Meeting 2 · Pricing review — 20s

*Category B: who else cares.*

- Room: Nikola + Sam pushing from different angles ("Granola knows all of that")
- Insight: **Pat from infra has raised this in 6 prior meetings — not on the invite**
- Click **Ping Pat for a quick read** → drafts in your voice. **Never sends.** Only Brief action that touches the outside world, and only as a draft.

## Meeting 3 · Roadmap sync — 15s

*Category E: org divergence.*

- Six in the room — Elliot is waiting on PM finalist feedback (another open loop)
- Insight: **Growth and Trust have both been scoping Spaces warnings in parallel — neither knows.** Today's sync is the first room with both.

## Close — 10s

- 3 meetings · 3 categories (A / B / E) · 1 full arc end-to-end
- **Quiet over comprehensive.** Most meetings won't surface. When one does — it lands.
- **Callback to the opening**: *"Granola was already in those rooms. Brief is what closes the loop — you walk in with what it heard."*

---

## Trade-offs (own these before Chris asks)

- **Quiet most of the time** → may look "broken" or low-utility. That's the bet — rare + right is what earns trust. A Brief always full of insights trains the user to ignore it.
- **One insight per meeting, not many** → lose breadth, gain signal. The previous design had three always-on modules; users would scroll past.
- **Drafts, never sends** → adds a click before anything leaves Granola. Friction is the safety net.
- **Zero new chrome** (no tab, no icon, no setting) → not "discoverable" in the UI. That's *how* it stays invisible until you need it.
- **Pinned bullet is intentionally subtle** (olive accent, no "FROM YOUR BRIEF" label) → could be missed. Per BRIEF §12: "lightest possible mark." Discipline is the feature.
- **No external data** (no LinkedIn, CRM, Slack scrape) → narrower fact base. Counter: those would compromise trust and break Granola's positioning.
- **Categories C + D out of this demo** (open loops between two people · what they've been carrying) → in the portfolio for context, not on stage today.
- **Per-meeting insight fit means no canonical example** → harder to brand a single Brief moment. Counter: per-meeting fit *is* the moat — Michael's hiring insight wouldn't fire in the pricing review and vice versa.

---

## Likely Qs

- **How does Granola pick the one thing?** Five categories, ranked per meeting. If nothing clears the bar → the Brief is just "the room." Quiet by design.
- **Won't Pat be offended?** It's a draft *you* read and edit first. Pat-aware, not Pat-bypassing.
- **Isn't this just chat?** Chat = user asking. Brief = Granola surfacing. Opposite direction.
- **Why not a sidebar tab or three modules?** Both make users *look* for org intel. Brief flips it: one thing, at the moment it matters.
- **What if Granola is wrong?** Cheap retreat — Undo (4s), dismissable bullet, drafts that never send.
- **Why does the notification say "Chrome"?** That's today's Granola recording notification. Brief reuses it — only the copy carries the prep forward. No new surface.

---

## Deep links (sidebar nav backup)

- Default (Michael): `?demo=brief`
- Pricing: `?demo=brief&meeting=pricing-v3-review`
- Roadmap: `?demo=brief&meeting=h2-roadmap-sync`

**Time budget:** ~1 min 45s end-to-end (10s problem + 90s walkthrough + 10s close). Trade-offs + Qs are for when Chris drills in.
