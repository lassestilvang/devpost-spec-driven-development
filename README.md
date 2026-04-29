# Morgen-Lite
A blazingly fast, local-first calendar + task manager — built for engineers, zero AI, instant interactions

## Built With
Next.js, TypeScript, React, Tailwind CSS, shadcn/ui, trud-calendar, Dexie.js

## Setup Instructions
Follow these steps to run the app locally:
```bash
git clone https://github.com/lassestilvang/Morgen-Lite.git
cd Morgen-Lite
npm install
npm run dev
# Open http://localhost:3000 in your browser
```

## Features
- **Split Layout:** To-do sidebar (left) + calendar (right)
- **Three Calendar Views:** Day (single 24-hour column), Week (default 24-hour grid), Month (date grid with colored event indicators)
- **View Switching:** Top navigation buttons, smooth horizontal scroll, "jump to today" button
- **To-Do Management:** Create tasks via input field, checkbox + title items, scrollable list
- **Drag-to-Schedule:** Drag to-dos from sidebar to calendar (30min default duration, removed from sidebar on drop)
- **Click-to-Create:** Click empty time slots to create events at clicked time (30min default)
- **Event Interactions:** Resize (drag bottom edge), drag to reschedule (same/不同 day), edit title (click event), delete event
- **Overlapping Events:** Layered but readable design
- **Local Persistence:** All data stored in browser IndexedDB, survives app restarts
- **Performance:** Virtual scrolling where needed, zero loading states, instant interactions, buttery smooth drag-and-drop

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, shadcn/ui
- **Calendar:** trud-calendar
- **Persistence:** Dexie.js (IndexedDB wrapper)
- **Styling:** Dark theme with neon blue/purple accents, circuit board textures, monospace typography

## Design
Morgen-inspired clean/minimal aesthetic with:
- Dark theme base
- Neon blue/purple accent colors
- Subtle circuit board textures
- Monospace typography
- Rounded corners and soft shadows

## Note
This is a local-first app — all data is stored in your browser's IndexedDB. No backend, no cloud sync.
