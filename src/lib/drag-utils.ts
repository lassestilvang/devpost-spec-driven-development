import { computeDropPosition } from 'trud-calendar-core';
import { colorPalette } from './colors';

// 30 minutes in milliseconds
export const TODO_TO_EVENT_DURATION = 30 * 60 * 1000;

/**
 * Get the next color from the palette based on the number of existing events.
 * Uses the colorPalette from colors.ts and modulo to cycle through colors.
 */
export function getNextColor(eventCount: number): string {
  return colorPalette[eventCount % colorPalette.length];
}

/**
 * Compute the drop time for a todo dragged onto the calendar.
 * Uses trud-calendar-core's computeDropPosition to calculate start and end times
 * based on the drop position within a day column.
 */
export function getDropTime(
  day: string,
  clientY: number,
  columnRect: DOMRect,
  dayStartHour: number,
  dayEndHour: number
): { start: Date; end: Date } {
  const { newStart, newEnd } = computeDropPosition(
    day,
    clientY,
    columnRect,
    dayStartHour,
    dayEndHour,
    TODO_TO_EVENT_DURATION
  );
  return {
    start: new Date(newStart),
    end: new Date(newEnd),
  };
}
