# Morgen-Lite — Product Requirements

## Problem Statement
Full stack engineers who want a polished, extremely fast calendar + task manager are forced to choose between expensive subscriptions (Morgen, Akiflow) or bloated tools that don't fit their workflow. Morgen-Lite solves this by delivering a local-first, blazingly fast calendar with drag-to-schedule tasks — built by an engineer, for an engineer, with zero AI features and instant interactions.

## User Stories

### Epic: Calendar Views

- As a user, I want to see a week view with a 24-hour grid so that I can see my full week at a glance.
  - [ ] Week view is the default view on app load
  - [ ] Grid displays all 24 hours (0:00–23:59) on the vertical axis
  - [ ] Three buttons at the top switch between day/week/month views
  - [ ] Switching views preserves the current date selection
  - [ ] Smooth horizontal scroll navigates between weeks (previous/next)
  - [ ] A "jump to today" button returns the view to the current date

- As a user, I want to see a day view as a single 24-hour column so that I can focus on one day.
  - [ ] Day view shows a single 24-hour column for the selected day
  - [ ] Grid displays all 24 hours with time labels on the left
  - [ ] Events render at their correct time and span their duration
  - [ ] Smooth horizontal scroll navigates between days

- As a user, I want to see a month view grid with events as colored indicators so that I can see my month at a high level.
  - [ ] Month view displays a grid of dates (standard calendar month layout)
  - [ ] Scheduled events appear as colored bars or dots on their respective date cells
  - [ ] Clicking a date in month view navigates to that date in day/week view

### Epic: To-Do Management

- As a user, I want to create to-dos via an input in the sidebar so that I can build a queue of unscheduled tasks.
  - [ ] Input field is at the top of the left sidebar
  - [ ] Typing a title and pressing enter adds the to-do to the list
  - [ ] New to-dos appear in the sidebar list
  - [ ] Empty sidebar is blank (no empty state message — user knows the app)

- As a user, I want to see my to-dos as checkbox + title items in the sidebar so that I can scan my unscheduled tasks.
  - [ ] Each to-do displays a checkbox (unchecked by default) and the title
  - [ ] To-dos are displayed in a scrollable list when the list exceeds visible height
  - [ ] Only unscheduled to-dos appear in the sidebar
  - [ ] When a to-do is dragged onto the calendar, it disappears from the sidebar immediately

### Epic: Scheduling

- As a user, I want to drag a to-do from the sidebar onto the calendar so that it becomes a scheduled event.
  - [ ] Dragging a to-do from the sidebar provides visual feedback during the drag
  - [ ] Dropping onto a time slot places the event at the dropped time
  - [ ] Dropped events default to 30 minutes duration
  - [ ] The to-do is removed from the sidebar after being dropped
  - [ ] Events are color-coded on the calendar

- As a user, I want to click empty time slots to create a new event so that I can quickly schedule without using the sidebar.
  - [ ] Clicking an empty time slot opens an interface to create a new event
  - [ ] Click-created events default to 30 minutes duration
  - [ ] New events appear on the calendar at the clicked time immediately

### Epic: Event Management

- As a user, I want to resize events on the calendar so that I can adjust their duration.
  - [ ] Events can be resized by dragging the bottom edge
  - [ ] Resizing updates the event duration on the grid immediately
  - [ ] Minimum event duration respects the grid resolution

- As a user, I want to drag events to different time slots so that I can reschedule them.
  - [ ] Events can be dragged to a new time on the same day
  - [ ] Events can be dragged to a different day
  - [ ] Dragging provides visual feedback showing the new position
  - [ ] Overlapping events layer but remain readable

- As a user, I want to click an event to edit its title so that I can correct or update it.
  - [ ] Clicking an event shows an edit interface (inline or modal)
  - [ ] Title can be edited and saved
  - [ ] Changes are reflected on the calendar immediately

- As a user, I want to delete events from the calendar so that I can remove tasks I no longer need.
  - [ ] Events can be deleted from the edit interface
  - [ ] Deleted events disappear from the calendar immediately
  - [ ] Deleting an event does not return it to the sidebar (it is permanently removed)

## What We're Building

After 3-4 hours, a working app where:

- **Split layout:** To-do sidebar on the left, calendar on the right
- **Three calendar views:** Day (single 24-hour column), Week (default, 24-hour grid), Month (date grid with colored event indicators)
- **View switching:** Three buttons at the top; smooth horizontal scroll for navigation; "jump to today" button
- **To-do creation:** Input field at top of sidebar; checkbox + title items; scrollable list
- **Drag-to-schedule:** To-dos dragged from sidebar onto calendar; 30min default duration; removed from sidebar on drop
- **Click-to-create:** Empty time slots clickable; creates event at clicked time; 30min default
- **Event interactions:** Resize (drag bottom edge), drag to reschedule (same day or different day), edit title (click event), delete event
- **Overlapping events:** Layer but remain readable
- **Persistence:** All data stored locally (IndexedDB); survives app restarts
- **Performance:** Virtual scrolling where needed; zero loading states; instant interactions; buttery smooth drag-and-drop
- **Design:** Dark theme with neon blue/purple accents; subtle circuit board textures; monospace typography; Morgen-inspired clean/minimal aesthetic with rounded corners and soft shadows

## What We'd Add With More Time

- **Google/Outlook Calendar integration** — sync with external calendars for a complete picture
- **Subtasks** — break to-dos into smaller actionable items with their own checkboxes
- **Smart/AI scheduling** — automated time-blocking and daily plan generation
- **Multi-user support** — auth, sharing, and collaborative scheduling
- **Keyboard shortcuts** — vim-style or Morgen-style hotkeys for power users
- **Recurring events** — daily/weekly/monthly repetition without manual re-creation
- **Event categories/tags** — beyond color-coding, add semantic labels (work, personal, health)
- **Search** — find events and to-dos across the calendar by keyword

## Non-Goals

- **No Google/Outlook Calendar integration** — huge time sink, not needed for a personal local-first tool
- **No subtasks** — to-dos are title-only; core experience is calendar + task scheduling, not task hierarchy
- **No AI/smart scheduling** — explicitly building without AI features; no "AI planner" or automated time-blocking
- **No multi-user support** — single-user only; eliminates auth/sync complexity
- **No keyboard shortcuts** — mouse/drag workflow is the primary interaction model; deferred to future
- **No cloud sync** — everything is local-first via IndexedDB; no backend, no accounts
- **No mobile responsiveness** — desktop-only experience targeting the developer's own workflow
- **No empty states or onboarding** — single user who knows the app; blank sidebar is fine

## Open Questions

- **Which calendar library to use?** Needs virtual scrolling support and performance guarantees. Should be resolved before /spec — the library choice drives component architecture.
- **Event color-coding scheme?** How are colors assigned — random, per-creation order, or user-picked? Can wait until /build; low risk.
- **Edit interface design?** Inline editing vs modal vs popover for editing event titles. Can wait until /build; aesthetic choice.
- **Resizing grid resolution?** 15-minute, 30-minute, or free-form? Should be resolved before /spec to inform the calendar component setup.
