# Morgen-Lite — Technical Spec

## Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | TypeScript | Matches learner's experience; trud-calendar and Dexie are TypeScript-native |
| Framework | Next.js (App Router) | Learner's preferred stack; single-page app, no routing needed beyond `/` |
| UI | React 18+ | Core rendering layer |
| Styling | Tailwind CSS + shadcn/ui | Learner's stack; trud-calendar has built-in shadcn theming |
| Calendar | trud-calendar v0.1.4 | MIT, TypeScript-first, built-in drag-drop/resize, 5 views (day/week/month/agenda/year), shadcn theming, ~95kb, actively maintained (March 2026) |
| Local Storage | Dexie.js v4.4.2 + dexie-react-hooks v4.4.0 | Industry-standard IndexedDB wrapper; `useLiveQuery` provides reactive state to React; Apache 2.0 |
| State Management | React Context + Dexie useLiveQuery | Minimal; Dexie's live queries eliminate need for external state management |

**Documentation links:**
- [trud-calendar Docs](https://trud-calendar-docs.vercel.app/)
- [trud-calendar GitHub](https://github.com/trudapp/trud-calendar)
- [Dexie.js Docs](https://dexie.org/)
- [dexie-react-hooks](https://dexie.org/docs/react)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## Runtime & Deployment

- **Runtime:** Web (Next.js dev server `localhost:3000`)
- **Deployment target:** Local only — no deployed URL, no Vercel/etc.
- **Environment:** Node.js 18+, modern browser with IndexedDB support
- **No API keys, no environment variables, no backend**

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Browser (Local Only)                                   │
│                                                          │
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │  Sidebar     │  │  CalendarView (trud-calendar) │   │
│  │              │  │                                │   │
│  │ TodoInput    │  │  Day/Week/Month Views         │   │
│  │ TodoList     │◄─┼── TodoItem (draggable)        │   │
│  │ (unscheduled)│  │                                │   │
│  └──────┬───────┘  │  Events (drag, resize, edit)  │   │
│         │           └──────────┬─────────────────────┘   │
│         │                      │                          │
│  ┌──────┴──────────────────────┴──────────┐            │
│  │        Dexie.js / IndexedDB              │            │
│  │                                         │            │
│  │  todos { id, title, completed, ... }    │            │
│  │  events { id, title, start, end, ... }  │            │
│  └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

**Data flow:**
- Todos added via `TodoInput` → saved to Dexie `todos` table → `useLiveQuery` re-renders `TodoList`
- Drag todo onto calendar → deleted from `todos`, created in `events` (30min, color) → sidebar updates, calendar renders event
- Click empty slot → `useEvents.addEvent()` → event appears at clicked time (30min default)
- Resize/drag events → trud-calendar handlers → `useEvents.updateEvent()` → calendar re-renders
- Edit/delete event → `EventEdit` interface → update or delete in Dexie → calendar re-renders

## Calendar Views

### trud-calendar Setup
Implements `prd.md > Calendar Views`.

- **Library:** trud-calendar with shadcn theming enabled
- **Default view:** Week (matches PRD: "Week view is the default view on app load")
- **Views configured:** day, week, month (trud-calendar supports all three natively)
- **View switching:** Three buttons at the top of the calendar area (Day / Week / Month). Switching preserves current date selection.
- **Navigation:** Smooth horizontal scroll between weeks/days. "Jump to today" button resets to current date.
- **Day view:** Single 24-hour column, time labels on left, events render at correct time and span duration
- **Week view:** 24-hour grid (0:00–23:59 vertical axis), all 7 days horizontal
- **Month view:** Standard month grid, events as colored bars/dots on date cells, click date → navigates to day/week view
- **Performance:** trud-calendar core handles virtual scrolling; no loading states

### CalendarView Component
Wraps trud-calendar configuration. Props: current view state, date state, events array, event handlers (onSlotClick, onEventDrop, onEventResize, onEventClick). Applies dark theme with neon blue/purple accent overrides via Tailwind + trud-calendar's shadcn theming.

## To-Do Management

### Sidebar Component
Implements `prd.md > To-Do Management`.

- **Layout:** Left sidebar (fixed width ~320px), split layout with calendar on the right
- **Input:** `TodoInput` at top — single text input, Enter key creates todo
- **List:** `TodoList` below input — scrollable container, renders only unscheduled todos (items NOT in events table)
- **Items:** `TodoItem` — checkbox (unchecked default) + title, draggable via HTML5 drag API or trud-calendar's drop zone
- **Empty state:** Blank (no message — single user who knows the app)
- **Data source:** `useTodos` hook with `useLiveQuery` on Dexie `todos` table where `completed: false`

### Todo Drag Configuration
Each `TodoItem` is configured as a drag source. On drag start, sets `dataTransfer` with todo ID and title. `CalendarView` configures trud-calendar to accept drops, mapping the dropped position to a new event (30min duration, auto-assigned color).

## Scheduling

### Drag-to-Schedule
Implements `prd.md > Scheduling`.

- **Source:** `TodoItem` in sidebar (draggable)
- **Target:** trud-calendar drop zones (time slots)
- **Drop behavior:** Read todo data from drag event → `db.todos.delete(id)` + `db.events.add({ title, start: dropTime, end: dropTime + 30min, color })` → trud-calendar re-renders, sidebar re-renders (todo gone)
- **Default duration:** 30 minutes (configurable in `drag-utils.ts`)
- **Visual feedback:** Drag provides visual cue (trud-calendar native + custom drag preview)
- **Color-coding:** Auto-assigned from `colors.ts` palette (neon blue, purple, etc.) on event creation

### Click-to-Create
Implements `prd.md > Scheduling`.

- **Trigger:** Click on empty time slot in calendar
- **Behavior:** `onSlotClick` handler → `db.events.add({ title: "New Event", start: clickedTime, end: clickedTime + 30min, color })` → event appears immediately
- **Default duration:** 30 minutes
- **Title:** Defaults to "New Event" — user edits via click-to-edit (see Event Management)

## Event Management

### Event Resize
Implements `prd.md > Event Management`.

- **Interaction:** Drag bottom edge of event (trud-calendar built-in resize)
- **Behavior:** `onEventResize` handler → `db.events.update(id, { start, end })` → calendar re-renders
- **Grid resolution:** 15-minute minimum (trud-calendar config)
- **Immediate update:** No debounce — PRD requires "instant interactions"

### Event Drag (Reschedule)
Implements `prd.md > Event Management`.

- **Same day:** Drag event to new time slot, updates `start`/`end` preserving duration
- **Different day:** Drag event to different day column, updates date portion of `start`/`end`
- **Visual feedback:** trud-calendar native drag preview
- **Overlapping events:** Layer but remain readable (trud-calendar default behavior, may need z-index/opacity tuning)

### Event Edit
Implements `prd.md > Event Management`.

- **Trigger:** Click on event
- **Interface:** Inline edit or popover (trud-calendar's built-in event click + custom `EventEdit` component)
- **Edit title:** Input field, Enter/Escape to save/cancel, updates via `db.events.update(id, { title })`
- **Delete:** Delete button in edit interface → `db.events.delete(id)` → event removed permanently (NOT returned to sidebar)

## Data Model

### events (Dexie collection)
```
{
  id: string          // uuid v4
  title: string       // event title
  start: Date         // start time
  end: Date           // end time
  color: string       // hex color for calendar display (e.g., "#00d4ff")
}
```

Dexie schema: `events: '++id, start, end'`

### todos (Dexie collection)
```
{
  id: string          // uuid v4
  title: string       // todo title
  completed: boolean  // default false (checkbox state, unused but stored)
  createdAt: Date     // creation timestamp
}
```

Dexie schema: `todos: '++id, createdAt'`

### State Flow
- **Events state:** `useLiveQuery(() => db.events.toArray())` → passed to trud-calendar as `events` prop
- **Todos state:** `useLiveQuery(() => db.todos.where({ completed: false }).toArray())` → passed to TodoList
- **No React state management library needed** — Dexie live queries drive all reactive updates

## File Structure

```
morgen-lite/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: dark theme, Tailwind, shadcn provider, fonts
│   │   ├── page.tsx            # Main page: sidebar + calendar split layout (flex row)
│   │   └── globals.css         # Tailwind directives + dark theme + custom colors
│   │                               (neon blue: #00d4ff, neon purple: #b44aff)
│   ├── components/
│   │   ├── Sidebar.tsx         # Left panel container: TodoInput + TodoList
│   │   ├── TodoInput.tsx       # Text input, Enter key → useTodos.addTodo()
│   │   ├── TodoList.tsx        # Scrollable list, filters unscheduled todos
│   │   ├── TodoItem.tsx        # Single todo: checkbox + title, draggable config
│   │   ├── CalendarView.tsx    # trud-calendar wrapper: view state, event handlers, theming
│   │   ├── EventEdit.tsx       # Edit interface: title input, delete button, save/cancel
│   │   └── ui/                 # shadcn components (button, input, checkbox, popover)
│   ├── lib/
│   │   ├── db.ts               # Dexie instance: events & todos tables, schema definition
│   │   ├── types.ts            # Event, Todo TypeScript interfaces
│   │   ├── colors.ts           # Event color palette (neon blue, purple, etc.)
│   │   └── drag-utils.ts       # Drag-and-drop helpers: todo→event transformation
│   └── hooks/
│       ├── useEvents.ts        # useLiveQuery for events, addEvent/updateEvent/deleteEvent
│       └── useTodos.ts         # useLiveQuery for todos, addTodo/deleteTodo
├── docs/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   └── spec.md                 # THIS FILE
├── process-notes.md
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Key Technical Decisions

1. **trud-calendar over FullCalendar/react-big-calendar.** Chosen for: MIT license with all features free, built-in drag-drop/resize, shadcn theming (matches our UI stack), TypeScript-native, actively maintained (March 2026). Tradeoff: very new library (v0.1.4, 0 GitHub stars) — smaller community, potential undiscovered bugs. Acceptable for a local-first personal tool.

2. **Dexie useLiveQuery instead of React state management.** Dexie's reactive queries eliminate the need for Zustand/Redux/Context-based state — the database IS the state. Tradeoff: tight coupling to Dexie, but this is a local-only app where that's a feature, not a bug.

3. **15-minute grid resolution for resize.** PRD open question resolved: 15-minute increments balance precision with usability. Configured in trud-calendar's time slot settings.

4. **Event color auto-assigned on creation.** PRD open question resolved: colors pulled from a fixed palette in `colors.ts`, assigned by creation order (modulo palette length). No user picker needed for v1.

5. **Inline/popover edit over modal.** PRD open question resolved: trud-calendar's event click + a lightweight popover (shadcn-based) keeps the interaction fast and local — no modal overlay disrupting the calendar context.

## Dependencies & External Services

| Dependency | Version | Docs | Purpose |
|-----------|---------|------|---------|
| trud-calendar | ^0.1.4 | [Docs](https://trud-calendar-docs.vercel.app/) | Calendar rendering, views, drag-drop, resize |
| trud-calendar-core | ^0.1.4 | [GitHub](https://github.com/trudapp/trud-calendar) | Headless core (zero-dependency) |
| dexie | ^4.4.2 | [Docs](https://dexie.org/) | IndexedDB wrapper |
| dexie-react-hooks | ^4.4.0 | [Docs](https://dexie.org/docs/react) | useLiveQuery for React |
| next | ^14+ | [Docs](https://nextjs.org/docs) | App framework |
| react | ^18+ | [Docs](https://react.dev/) | UI library |
| tailwindcss | ^3.4+ | [Docs](https://tailwindcss.com/) | Styling |
| shadcn/ui | latest | [Docs](https://ui.shadcn.com/) | UI components |

**No external services, no API keys, no cloud dependencies.**

## Open Issues

1. **trud-calendar stability.** v0.1.4 is extremely new. If show-stopping bugs surface during /build, fallback options: FullCalendar (mature, drag-drop in core) or react-big-calendar (lighter, community-maintained). Document any issues found.

2. **Edit interface specifics.** Inline edit vs popover vs modal — PRD had this as open. Spec resolves to popover (shadcn-based) for speed, but trud-calendar's built-in event rendering may influence the final UX. Validate during /build.

3. **Overlapping event readability.** PRD says "layer but remain readable." trud-calendar's default behavior needs visual validation — may require custom CSS (opacity, z-index, width adjustment) to achieve the Morgen-like layered look.
