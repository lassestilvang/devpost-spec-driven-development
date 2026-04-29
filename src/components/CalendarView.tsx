"use client";

import { useState, useMemo, useCallback } from "react";
import { Calendar, type CalendarView, type CalendarEvent, type ToolbarSlotProps } from "trud-calendar";
import { useEvents } from "@/hooks/useEvents";
import { Event as EventType } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Custom toolbar component with view switching and navigation
function CustomToolbar({ view, onViewChange, onPrev, onNext, onToday, formattedDate }: ToolbarSlotProps) {
  const views: { key: CalendarView; label: string }[] = [
    { key: "day", label: "Day" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
        >
          Jump to Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
        >
          Next
        </Button>
      </div>

      <h2 className="text-lg font-semibold">{formattedDate}</h2>

      <div className="flex items-center gap-1">
        {views.map((v) => (
          <Button
            key={v.key}
            variant={view === v.key ? "default" : "outline"}
            size="sm"
            onClick={() => onViewChange(v.key)}
          >
            {v.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Convert Event (from useEvents) to CalendarEvent (for trud-calendar)
function toCalendarEvent(event: EventType): CalendarEvent {
  return {
    id: event.id,
    title: event.title,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    color: event.color,
  };
}

export default function CalendarView() {
  const { events } = useEvents();

  // State for view and date (controlled mode)
  const [view, setView] = useState<CalendarView>("week");
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0]; // YYYY-MM-DD format
  });

  // Convert events to calendar format
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    if (!events) return [];
    return events.map(toCalendarEvent);
  }, [events]);

  // Handle view change - preserve current date
  const handleViewChange = useCallback((newView: CalendarView) => {
    setView(newView);
  }, []);

  // Handle date change
  const handleDateChange = useCallback((newDate: string) => {
    setDate(newDate);
  }, []);

  return (
    <div className="h-full w-full dark">
      <Calendar
        events={calendarEvents}
        view={view}
        date={date}
        onViewChange={handleViewChange}
        onDateChange={handleDateChange}
        dayStartHour={0}
        dayEndHour={24}
        enableDnD
        slots={{
          toolbar: CustomToolbar,
        }}
        onEventClick={(event) => {
          console.log("Event clicked:", event);
        }}
        onSlotClick={(dateTime) => {
          console.log("Slot clicked:", dateTime);
        }}
        onEventDrop={(event, newStart, newEnd) => {
          console.log("Event dropped:", event, newStart, newEnd);
        }}
        onEventResize={(event, newStart, newEnd) => {
          console.log("Event resized:", event, newStart, newEnd);
        }}
      />
    </div>
  );
}
