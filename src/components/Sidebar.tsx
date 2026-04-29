'use client';

import { useTodos } from '../hooks/useTodos';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default function Sidebar() {
  const { todos } = useTodos();

  return (
    <div className="w-80 h-screen bg-background border-r border-border flex flex-col shadow-lg">
      <TodoInput />
      <TodoList todos={todos || []} />
    </div>
  );
}
