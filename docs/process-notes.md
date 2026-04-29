# Process Notes

## /onboard
- **Technical experience:** Experienced Full Stack Engineer. Stack: TypeScript, React, Next.js, SQL, Tailwind, shadcn. Has used most AI coding agents.
- **Learning goals:** Prompting and steering coding agents more effectively.
- **Creative sensibility:** Strong sci-fi/cyberpunk thread — Cyberpunk 2077, DOOM, Black Mirror, Project Hail Mary. Excited about Warp.dev open source and OpenCode.
- **Prior SDD experience:** Yes — both manual and with Kiro. Familiar with structured planning workflows.
- **Energy/engagement:** Direct, experienced, knows what they want. Moves fast, no hand-holding needed.

## /prd

- **What changed vs scope:** Mostly expansion, not change. New specifics added: three buttons (not a dropdown/other UI) for view switching, smooth horizontal scroll for week/day navigation, "jump to today" button, overlapping events layer (not stack), IndexedDB persistence confirmed, blank sidebar (no empty state — "I'm the only user and I know how to use the app"). Open questions surfaced: calendar library choice, event color-coding scheme, edit interface design, resizing grid resolution.
- **"What if" questions:** None genuinely surprised Lasse — he knew his answers cold. Blank sidebar ("blank is fine"), 50+ to-dos ("scroll"), overlapping events ("layer but readable"), persistence ("everything is still there"), cyberpunk balance ("subtle"). All answered in 2-4 words.
- **Pushback/strong opinions:** When I tried confirming each user story one at a time, he shut it down: "yes - just go ahead and create them all automatically." Same with deepening rounds — "ready to proceed" immediately. Wants efficiency, not hand-holding.
- **Scope guard:** No creep. Lasse stuck to his pre-cut scope from /scope. No "while we're at it" additions.
- **Deepening rounds:** 0 rounds. Lasse chose to proceed directly to document generation.
- **Active shaping:** Lasse drove everything efficiently with minimal back-and-forth. Short, decisive answers. When the conversation format didn't match his pace ("let me confirm each story"), he redirected immediately. PRD expanded scope into 4 epics / 12 stories / ~40 acceptance criteria, but Lasse provided almost all the content in the first pass — the interview added structure, not new ideas.

## /spec
- **Technical decisions made:** trud-calendar v0.1.4 chosen (MIT, TypeScript-native, built-in drag-drop/resize, shadcn theming); Dexie.js v4.4.2 with useLiveQuery (replaces need for React state management); 15-minute grid resolution; auto-assigned event colors from palette; popover edit interface (shadcn-based).
- **Learner confidence:** High throughout. Answered "That's perfect", "Looks good", "No, that's great", "Yeah, that's cool" — decisive approvals, no pushback.
- **Stack choices:** trud-calendar (learner's pick after seeing research), Dexie (from scope.md), Next.js/Tailwind/shadcn (from learner profile). All aligned with existing experience.
- **Deepening rounds:** 0 rounds. Lasse chose to generate the spec immediately after the file structure section. No interest in stress-testing — confident in the architecture as proposed.
- **Active shaping:** Lasse made the key architectural decision (trud-calendar over FullCalendar/react-big-calendar) after seeing the research. Otherwise deferred to my proposals efficiently — "That's perfect", "Looks good", etc. No pushback, no corrections. Fast, decisive collaboration style continues from /prd and /scope.

## /scope
- **Idea evolution:** Started with "Morgen/Akiflow clone, no AI, extremely fast, personal only." Through conversation, sharpened to: title-only to-dos, day/week/month views, drag-to-schedule + click-to-create, local-first with virtual scrolling. Cut Google/Outlook sync, subtasks, smart scheduling, multi-user.
- **Pushback received:** None really — Lasse arrived with a single sharp concept and held to it. The conversation was about drawing out details (performance targets, aesthetic blend, what's cut), not steering away from bad ideas.
- **References that resonated:** None of the searched examples hit the mark. Lasse knew Morgen's design was the target and stuck with it. The cyberpunk/sci-fi sensibility was tempered to "clean like Morgen, with subtle high-tech touches" (circuit boards, monospace, neon accents).
- **Deepening rounds:** 1 round. Surface: performance as #1 win condition, modern libraries, keyboard shortcuts deferred, circuit board + monospace aesthetic. The extra context materially improved the scope doc — "performance first, UI can come later" became a clear priority that shapes all implementation decisions.
- **Active shaping:** Lasse drove the direction throughout. Short, decisive answers. Knew what he wanted (Morgen's design, extremely fast, no AI). Pushed back on reference examples that didn't match his vision. Accepted suggestions on cuts and aesthetic blending but always on his own terms.

## /checklist

### Sequencing Decisions and Rationale
- **Item 1 (Project setup + base layout):** Foundation first — nothing works without the scaffolded Next.js app, Tailwind, shadcn, dark theme, and split layout shell.
- **Item 2 (Dexie database + types + hooks):** Data layer before any feature — both calendar events and todos depend on Dexie. Types and hooks are shared dependencies.
- **Item 3 (CalendarView — trud-calendar):** Calendar renders next since both sidebar and event management depend on it. Configured with all three views, theming, and navigation.
- **Item 4 (Sidebar components):** Depends on Dexie hooks. Creates the drag source (TodoItem) that Item 5 consumes.
- **Item 5 (Drag-to-Schedule):** Depends on both sidebar (source) and calendar (target). Cannot come before 3 or 4.
- **Item 6 (Click-to-Create):** Depends on calendar only — could come before sidebar, but sequenced here to group all scheduling features together.
- **Item 7 (Event management):** Depends on calendar + data layer. Resize, drag reschedule, edit, delete — all event interactions in one item.
- **Item 8 (Polish):** End-to-end audit after all features work. Performance, theme tuning, trud-calendar bug check.
- **Item 9 (Devpost submission):** Always last. Requires working app for screenshots.

### Methodology Preferences Chosen
- **Build mode:** Autonomous (learner is experienced FSE, familiar with AI coding agents, wants to learn steering techniques by reviewing)
- **Verification:** No (autonomous mode, straight through — learner wants to review final result rather than checkpoint)
- **Comprehension checks:** N/A (autonomous mode)
- **Git cadence:** Commit after each checklist item with message: "Complete step N: [title]"
- **Check-in cadence:** N/A (autonomous mode)

## /build

### Summary
- **Total items completed:** 9 (all checklist items)
- **Checklist revised mid-build:** No — the original 9-item plan held up; no items were split, reordered, or changed.
- **Checkpoint observations:** N/A — autonomous mode with verification off; learner did not interact during the build.
- **Overall impressions:** Build completed successfully across all 9 items without major blockers. trud-calendar v0.1.4 proved functional but had minor bugs: `useCalendarContext` cannot be called outside the `Calendar` provider (fixed by hardcoding values), and some TypeScript type mismatches required handler adjustments. Dexie + useLiveQuery worked flawlessly for reactive state. The circuit board texture, neon accent theming, and dark mode polish came together well. One scaffolding hiccup: `create-next-app` failed initially due to existing `process-notes.md` in root (resolved by temporarily moving the file). All items committed with correct git cadence following the "Complete step N: [title]" format.

### Checklist Stats
- **Number of items:** 9
- **Estimated total build time:** ~2.5–4.5 hours (each item ~15–30 min)
- **Fits time budget:** Yes, 9 items is within the 8–12 target range for a 3–4 hour build

### Learner Confidence and Guidance
- **Confident about:** Sequencing logic — agreed immediately when explained. Build mode choice — knew autonomous fit their experience level. Git cadence — agreed quickly.
- **Needed guidance on:** None really — learner deferred to my recommendations on all choices (sequencing, build mode, verification skip, git cadence, Devpost planning). Light-touch engagement, prefers to delegate decisions.

### Submission Planning Notes
- **Core story:** Blazingly fast, local-first Morgen alternative for engineers. Zero AI, instant interactions.
- **Screenshots needed:** Week view, day view, month view, drag-to-schedule action shot (3–4 total).
- **Wow moment:** Butter-smooth drag-to-schedule from sidebar onto calendar.
- **Deployment:** Local-only (per spec), no Vercel. Judges clone and run (`npm install && npm run dev`). Clear README setup instructions required.
- **GitHub repo:** Not yet created — will init and push as part of Item 9.
- **Demo video:** Optional, not committed to — learner didn't express interest in recording one.

### Deepening Rounds
- **Number of rounds:** 0 — learner said "Sure, go ahead" after I presented the 9-item plan, skipping deepening entirely.
- **Refinements:** None — plan accepted as proposed.

### Active Shaping
- Learner **did not** engage deeply with sequencing logic or item granularity — agreed with recommendations without questioning order, suggesting different groupings, or challenging item breakdown. This is consistent with their profile: here to learn prompting/steering techniques, not to micromanage the plan. They're likely to be more active during /build when they can see and steer the actual code.
