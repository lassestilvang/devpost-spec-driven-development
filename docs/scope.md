# Morgen-Lite: Personal Calendar & Task App

## Idea
A blazingly fast, local-first personal calendar and task manager — a Morgen/Akiflow-inspired tool built for one user (me), with zero AI features and instant interactions.

## Who It's For
Me — a full stack engineer who wants a polished, extremely fast calendar + to-do app without the subscription pricing of Morgen or Akiflow. Mix of work and personal tasks.

## Inspiration & References
- **Morgen** — The primary design reference. Clean, minimal, rounded corners, soft shadows, color-coded events, whitespace-rich. Tasks live alongside the calendar and can be dragged onto time slots. This is the interaction model to replicate.
- **Akiflow** — Similar space, same "tasks on a calendar" philosophy, but Morgen's design is the stronger reference.

**Design energy:**
- Base: Morgen's clean, minimal aesthetic — lots of whitespace, rounded corners, soft shadows
- High-tech touches: Circuit board textures subtly incorporated, monospace typography for a futuristic feel
- Dark theme with neon blue/purple accents — high-tech mood without going full cyberpunk theme
- Polished and professional, not playful

## Goals
Build a local-first calendar + task app where:
- **Performance is the #1 win condition.** Virtual scrolling, zero loading states, instant date navigation. If the drag-and-drop isn't buttery smooth, the project hasn't succeeded.
- Prove I can build something at Morgen's level of polish and speed.
- Learn effective prompting and steering techniques for coding agents along the way.

## What "Done" Looks Like
After 3-4 hours, a working app where:
- To-dos can be created with just a title
- Calendar displays day, week, and month views — all with virtual scrolling for performance
- To-dos appear in a sidebar and can be dragged onto the calendar to schedule them
- Time slots on the calendar can be clicked to create events directly
- Everything is local-first — no loading states, instant interactions
- Dark theme with clean/minimal design and subtle high-tech aesthetic touches
- Modern, well-maintained libraries (no legacy dependencies)

## What's Explicitly Cut
- **Google/Outlook Calendar integration** — no external calendar sync. Rationale: huge time sink, not needed for a personal local-first tool.
- **Subtasks** — to-dos are title-only for now. Rationale: core experience is calendar + task scheduling, not task hierarchy.
- **Smart/AI scheduling** — no "AI planner" or automated time-blocking. Rationale: explicitly building *without* AI features.
- **Multi-user support** — single-user only. Rationale: personal tool, eliminates auth/sync complexity.
- **Keyboard shortcuts** — nice-to-have, deferred to a future version. Rationale: mouse/drag workflow is the primary interaction model.

## Loose Implementation Notes
- **Stack:** TypeScript, React, Next.js, Tailwind, shadcn (matches existing experience)
- **Local-first storage:** Modern industry-standard approach — IndexedDB via Dexie.js or equivalent up-to-date library
- **Calendar rendering:** Modern React calendar library with virtual scrolling support, or custom if needed for performance control
- **State management:** Keep it simple — React Context or minimal solution
- **Performance approach:** Virtual scrolling for large event datasets, no server round-trips, all interactions feel instant
