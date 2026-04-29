# Build Checklist

## Build Preferences

- **Build mode:** Autonomous
- **Comprehension checks:** N/A (autonomous mode)
- **Git:** Commit after each item with message: "Complete step N: [title]"
- **Verification:** No. Autonomous mode, no checkpoints — build straight through.
- **Check-in cadence:** N/A (autonomous mode)

## Checklist

- [x] **1. Project setup + base layout**
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`, `spec.md > Architecture Overview`
  What to build: Scaffold the Next.js (App Router) project with TypeScript, Tailwind CSS, and shadcn/ui. Configure dark theme with custom neon blue (#00d4ff) and neon purple (#b44aff) accents in `globals.css`. Create the root layout (`layout.tsx`) with shadcn provider and monospace font. Create the main page (`page.tsx`) with a split flex layout: fixed-width (~320px) sidebar on the left, calendar area on the right. Create the placeholder file structure per spec: `components/`, `lib/`, `hooks/` directories with stub files for all components listed in the file structure.
  Acceptance: App loads at localhost:3000 with a dark background. Split layout visible (sidebar left, content area right). shadcn provider active (confirm via a shadcn button rendering with dark theme). All planned files exist in the correct directories.
  Verify: Run `npm run dev`, open localhost:3000, confirm dark theme with split layout renders.

- [x] **2. Dexie database + types + hooks**
  Spec ref: `spec.md > Data Model`, `spec.md > Runtime & Deployment`
  What to build: Create `lib/types.ts` with `Event` (id, title, start, end, color) and `Todo` (id, title, completed, createdAt) interfaces. Create `lib/colors.ts` with a palette of neon colors (blue, purple, green, pink, orange — 6-8 colors) and a function to auto-assign by creation order. Create `lib/db.ts` with Dexie instance: `events` table (schema: `++id, start, end`) and `todos` table (schema: `++id, createdAt`). Create `hooks/useEvents.ts` with `useLiveQuery` for events array, plus `addEvent`, `updateEvent`, `deleteEvent` functions. Create `hooks/useTodos.ts` with `useLiveQuery` for unscheduled todos (where completed: false), plus `addTodo`, `deleteTodo` functions.
  Acceptance: Database initializes in browser IndexedDB. `useLiveQuery` returns empty arrays for both events and todos. All types compile cleanly. `addTodo` writes to Dexie and `useTodos` re-renders reactively.
  Verify: Run `npm run dev`, open browser console, manually call `db.todos.add({ id: crypto.randomUUID(), title: "test", completed: false, createdAt: new Date() })` and confirm it appears in IndexedDB.

- [x] **3. CalendarView — trud-calendar setup with three views**
  Spec ref: `spec.md > Calendar Views`, `spec.md > CalendarView Component`
  What to build: Install `trud-calendar` and `trud-calendar-core`. Create `CalendarView.tsx` wrapping trud-calendar. Configure three views (day, week, month) with shadcn theming enabled. Default view: week. Wire up view-switching buttons (Day / Week / Month) at the top of the calendar area — switching preserves current date. Add smooth horizontal scroll navigation (prev/next) and a "Jump to Today" button. Pass events array from `useEvents` to trud-calendar's `events` prop. Apply dark theme overrides: neon blue/purple accent colors for the calendar UI. Configure 15-minute grid resolution.
  Acceptance: Week view renders as default with 24-hour grid (0:00–23:59). Day/Week/Month buttons switch views and preserve date. Prev/next navigate between weeks. "Jump to Today" returns to current date. Month view shows date grid. All views render in dark theme with neon accents.
  Verify: Run `npm run dev`, confirm week view loads, click each view button and navigate prev/next, click "Jump to Today".

- [x] **4. Sidebar components — TodoInput + TodoList + TodoItem**
  Spec ref: `spec.md > To-Do Management > Sidebar Component`, `spec.md > To-Do Management > Todo Drag Configuration`
  What to build: Create `Sidebar.tsx` — left panel container with `TodoInput` at top and `TodoList` below in a scrollable container. `TodoInput.tsx` — single text input, Enter key calls `useTodos.addTodo()`, clears input on success. `TodoList.tsx` — renders array from `useTodos` (unscheduled only, i.e., items NOT in events table) in a scrollable list. `TodoItem.tsx` — displays checkbox (unchecked default) + title. Configure each `TodoItem` as HTML5 drag source: on drag start, set `dataTransfer` with todo `id` and `title`. Empty sidebar is blank (no empty state message).
  Acceptance: Typing in input and pressing Enter adds a todo to the sidebar list. List scrolls when items exceed visible height. Each item shows checkbox + title. Items are draggable (verify via browser devtools or drag attempt). Only unscheduled todos appear (once scheduled, they shouldn't show — handled in next step).
  Verify: Run `npm run dev`, add 3-4 todos via the input, confirm they appear in the sidebar list, confirm empty state is blank.

- [x] **5. Drag-to-Schedule — todo from sidebar onto calendar**
  Spec ref: `spec.md > Scheduling > Drag-to-Schedule`, `spec.md > Scheduling > Todo Drag Configuration`
  What to build: Configure `CalendarView` to accept HTML5 drop events on time slots. On drop: read todo `id` and `title` from `dataTransfer`, call `db.todos.delete(id)` + `db.events.add({ id: newId, title, start: dropTime, end: dropTime + 30min, color: nextColorFromPalette })`. Create `lib/drag-utils.ts` with helpers to compute drop time from trud-calendar drop event and to assign next color from palette. After drop, sidebar re-renders (todo gone) and calendar re-renders (event appears). Events render with their assigned color. Default duration: 30 minutes.
  Acceptance: Dragging a todo from sidebar onto a calendar time slot places a colored event at that time. Todo disappears from sidebar immediately. Event spans 30 minutes. Color is auto-assigned from palette. Dropping on different days works correctly.
  Verify: Run `npm run dev`, create a todo, drag it onto the week view calendar, confirm it becomes a colored event and disappears from sidebar.

- [x] **6. Click-to-Create events on empty time slots**
  Spec ref: `spec.md > Scheduling > Click-to-Create`
  What to build: Wire up trud-calendar's `onSlotClick` handler. On click: call `db.events.add({ id: newId, title: "New Event", start: clickedTime, end: clickedTime + 30min, color: nextColorFromPalette })`. Event appears immediately at the clicked time with 30-minute default duration. Title defaults to "New Event" — user edits it later via event click (next step).
  Acceptance: Clicking any empty time slot in any view creates a new event at that time. Event is colored, spans 30 minutes, and appears immediately without page refresh. Clicking multiple slots creates multiple events.
  Verify: Run `npm run dev`, click several empty time slots in week view and day view, confirm events appear at clicked times.

- [x] **7. Event management — resize, drag, edit, delete**
  Spec ref: `spec.md > Event Management > Event Resize`, `spec.md > Event Management > Event Drag (Reschedule)`, `spec.md > Event Management > Event Edit`
  What to build: Wire up trud-calendar's `onEventResize` — drag bottom edge of event, update `start`/`end` in Dexie via `useEvents.updateEvent()`. Configure 15-minute minimum grid resolution. Wire up `onEventDrop` — drag event to new time slot (same day or different day), update dates in Dexie. Create `EventEdit.tsx` — shadcn popover triggered by clicking an event. Popover contains: title input (editable, Enter to save), and a delete button. Delete calls `db.events.delete(id)` — event is permanently removed (NOT returned to sidebar). Overlapping events: apply CSS for layering with readability (z-index, opacity, width adjustment).
  Acceptance: Events resize by dragging bottom edge (15min snaps). Events drag to new time slots on same day and across days. Click event → popover opens with title input. Editing title and pressing Enter updates the event on calendar. Delete button removes event permanently. Overlapping events are readable (not completely obscured).
  Verify: Run `npm run dev`, create several events, test resize, drag to reschedule, click to edit title, delete an event. Confirm overlapping events remain readable.

- [x] **8. Polish — performance, theme, and visual fidelity**
  Spec ref: `spec.md > What We're Building` (Performance, Design), `spec.md > Open Issues`
  What to build: Audit and tune the app: verify virtual scrolling works in trud-calendar for large event sets. Ensure dark theme + neon blue/purple accents are consistent across all components (sidebar, calendar, popover, buttons). Add subtle circuit board texture background (CSS `background-image` with SVG data URI or similar). Apply monospace typography globally. Tune overlapping event CSS for the Morgen-like layered look (may need z-index, opacity, or width tweaks in trud-calendar's event rendering). Check for any trud-calendar v0.1.4 bugs — if show-stopping, document and consider fallback to FullCalendar. Ensure zero loading states — all interactions feel instant. Test the full flow: create todos → drag to calendar → resize → drag → edit → delete.
  Acceptance: App feels "buttery smooth" — no visible lag on drag, resize, or navigation. Dark theme is polished with neon accents throughout. Circuit board texture is subtle and high-tech. Overlapping events are readable. No loading spinners or delays. Full user flow works end-to-end.
  Verify: Run `npm run dev`, execute the full flow: add 5+ todos, drag 3 onto calendar, resize one, drag one to different day, edit a title, delete one, switch between all three views, navigate weeks.

- [ ] **9. Submit your project to Devpost**
  Spec ref: `prd.md > What We're Building` (core story), `docs/scope.md` (project description)
  What to build: Initialize git repo (if not already), create a GitHub repo, and push all code. Take screenshots: week view, day view, month view, and drag-to-schedule action shot. Write a compelling Devpost submission: project name "Morgen-Lite", tagline (e.g., "A blazingly fast, local-first calendar + task manager — built for engineers, zero AI, instant interactions"). Draft the project story using scope.md and prd.md as source material. List "built with" tags: Next.js, TypeScript, React, Tailwind, shadcn/ui, trud-calendar, Dexie.js. Upload screenshots to the image gallery. Upload docs/ folder artifacts (scope.md, prd.md, spec.md, checklist.md). Link the GitHub repo. Since the app is local-only, add clear setup instructions in README.md so judges know how to run it (`npm install && npm run dev`). Optionally record a <3 min demo video and upload to YouTube/Vimeo, then link it. Review everything and submit.
  Acceptance: Submission is live on Devpost with project name, tagline, description, built-with tags, 3-4 screenshots, docs artifacts, and GitHub repo link. Setup instructions in README. All required fields complete. Green "Submitted" badge visible.
  Verify: Open your Devpost submission page and confirm the green "Submitted" badge appears. Read the project description — would someone who knows nothing about your project understand what it does and why it matters?
