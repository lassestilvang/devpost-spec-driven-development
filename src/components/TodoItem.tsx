'use client';

import { Todo } from '../lib/types';

export default function TodoItem({ todo }: { todo: Todo }) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('todoId', todo.id);
    e.dataTransfer.setData('todoTitle', todo.title);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className="flex items-center gap-3 p-3 hover:bg-accent/50 rounded-md cursor-grab active:cursor-grabbing border-b border-border/50 last:border-b-0"
    >
      <input
        type="checkbox"
        checked={false}
        readOnly
        className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary accent-primary"
      />
      <span className="text-foreground text-sm flex-1 truncate">{todo.title}</span>
    </div>
  );
}
