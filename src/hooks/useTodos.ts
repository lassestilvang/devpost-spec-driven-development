import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Todo } from '../lib/types';

export function useTodos() {
  const todos = useLiveQuery(() => db.todos.where({ completed: false }).toArray(), []);

  const addTodo = async (title: string) => {
    const id = crypto.randomUUID();
    await db.todos.add({
      id,
      title,
      completed: false,
      createdAt: new Date(),
    });
  };

  const deleteTodo = async (id: string) => {
    await db.todos.delete(id);
  };

  return { todos, addTodo, deleteTodo };
}
