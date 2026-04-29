import Dexie, { Table } from 'dexie';
import { Event, Todo } from './types';

export class MorgenLiteDB extends Dexie {
  events!: Table<Event, string>;
  todos!: Table<Todo, string>;

  constructor() {
    super('MorgenLiteDB');
    this.version(1).stores({
      events: '++id, start, end',
      todos: '++id, createdAt',
    });
  }
}

export const db = new MorgenLiteDB();
