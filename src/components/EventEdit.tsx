"use client";

import { useState, useEffect } from "react";
import { useEvents } from "@/hooks/useEvents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarEvent } from "trud-calendar";

interface EventEditProps {
  event: CalendarEvent;
  onClose: () => void;
}

export default function EventEdit({ event, onClose }: EventEditProps) {
  const { updateEvent, deleteEvent } = useEvents();
  const [title, setTitle] = useState(event.title);

  // Reset title when event changes
  useEffect(() => {
    setTitle(event.title);
  }, [event.title]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateEvent(event.id, { title });
      onClose();
    } else if (e.key === "Escape") {
      setTitle(event.title);
      onClose();
    }
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border rounded-md shadow-lg w-64">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mb-4"
        autoFocus
      />
      <Button
        variant="destructive"
        onClick={handleDelete}
        className="w-full"
      >
        Delete Event
      </Button>
    </div>
  );
}
