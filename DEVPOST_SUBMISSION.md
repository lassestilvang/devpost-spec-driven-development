# Devpost Submission Draft: Morgen-Lite

## Project Name
Morgen-Lite

## Tagline
A blazingly fast, local-first calendar + task manager — built for engineers, zero AI, instant interactions

## Description
Morgen-Lite was born out of frustration with subscription-based calendar/task managers that promise speed but deliver lag, bloat, and unnecessary AI features. As a full stack engineer, I wanted a tool that matched the polish and performance of Morgen/Akiflow, but without the recurring costs or cloud dependency.

The app features a split layout with a to-do sidebar and a full-featured calendar. You can switch between day, week, and month views, drag tasks from the sidebar directly onto the calendar (with buttery smooth drag-and-drop), click empty time slots to create events, and resize/drag to reschedule existing events. All data is stored locally in IndexedDB, so it survives app restarts with zero backend overhead.

Built with performance as the #1 priority, Morgen-Lite uses virtual scrolling where needed, has zero loading states, and delivers instant interactions. The design stays true to Morgen's clean, minimal aesthetic with a dark theme, neon blue/purple accents, subtle circuit board textures, and monospace typography. No AI, no cloud sync, no bloat — just a fast, focused tool for engineers.

## Built With
Next.js, TypeScript, React, Tailwind CSS, shadcn/ui, trud-calendar, Dexie.js

## Screenshots Needed
Upload the following 3-4 screenshots to the Devpost image gallery:
1. **Week View:** Default view showing the 24-hour grid with sample events
2. **Day View:** Single 24-hour column view with events
3. **Month View:** Date grid with colored event indicators
4. **Drag-to-Schedule Action Shot:** Dragging a to-do from the sidebar onto the calendar

### Screenshot Instructions
1. Run `npm run dev` in the project directory
2. Open http://localhost:3000 in your browser
3. Take screenshots of each required view (use browser full-page screenshot or windowed screenshot)
4. Save them as `week-view.png`, `day-view.png`, `month-view.png`, `drag-to-schedule.png`
5. Upload all screenshots to the Devpost submission's image gallery

## Docs to Upload
Upload the following artifacts from the `docs/` folder:
- `scope.md` (Project description/scope)
- `prd.md` (Product Requirements Document)
- `spec.md` (Technical Specification)
- `checklist.md` (Project Checklist)

## GitHub Repo Link
https://github.com/lassestilvang/Morgen-Lite (Note: Learner needs to create this repo and push code if not done via CLI)

## Demo Video (Optional)
Record a <3 minute demo video showing:
- Switching between calendar views
- Creating a to-do and dragging it to the calendar
- Clicking a time slot to create an event
- Resizing/dragging an event to reschedule
- Persistence (restart app, data remains)

Upload the video to YouTube/Vimeo and link it in the Devpost submission.
