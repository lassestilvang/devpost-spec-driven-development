import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Event } from '../lib/types';

export function useEvents() {
  const events = useLiveQuery(() => db.events.toArray(), [], db);

  const addEvent = async (event: Omit<Event, 'id'>) => {
    const id = crypto.randomUUID();
    await db.events.add({ ...event, id });
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    await db.events.update(id, updates);
  };

  const deleteEvent = async (id: string) => {
    await db.events.delete(id);
  };

  return { events, addEvent, updateEvent, deleteEvent };
}
