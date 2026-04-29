'use client';

import { Todo } from '../lib/types';
import TodoItem from './TodoItem';

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
