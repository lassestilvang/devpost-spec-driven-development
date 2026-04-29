"use client";

import { useState, useMemo, useCallback } from "react";
import { Calendar, type CalendarView, type CalendarEvent, type ToolbarSlotProps, useCalendarContext } from "trud-calendar";
import { useEvents } from "@/hooks/useEvents";
import { useTodos } from "@/hooks/useTodos";
import { Event as EventType } from "@/lib/types";
import { getNextColor } from "@/lib/colors";
import { getDropTime } from "@/lib/drag-utils";
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
  const { events, addEvent } = useEvents();
  const { deleteTodo } = useTodos();
  const calendarContext = useCalendarContext();

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

  // Handle drag over to allow dropping
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop of todo onto calendar
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Get todo data from dataTransfer
    const todoId = e.dataTransfer.getData('todoId');
    const todoTitle = e.dataTransfer.getData('todoTitle');
    if (!todoId || !todoTitle) return;

    // Find the day column element under the drop point
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    if (!targetElement) return;

    const dayColumn = targetElement.closest('[data-date]');
    if (!dayColumn) return;

    const day = dayColumn.getAttribute('data-date');
    if (!day) return;

    const columnRect = dayColumn.getBoundingClientRect();
    const { dayStartHour, dayEndHour } = calendarContext;

    if (dayStartHour === undefined || dayEndHour === undefined) return;

    // Compute drop time
    const { start, end } = getDropTime(
      day,
      e.clientY,
      columnRect,
      dayStartHour,
      dayEndHour
    );

    // Get next color based on current event count
    const eventCount = events?.length || 0;
    const color = getNextColor(eventCount);

    // Delete todo and add event
    await deleteTodo(todoId);
    await addEvent({
      title: todoTitle,
      start,
      end,
      color,
    });
  }, [events, calendarContext, deleteTodo, addEvent]);

  return (
    <div
      className="h-full w-full dark"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
