'use client';

import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export default function TodoInput() {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodos();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-4 border-b border-border">
      <input
        type="text"
        placeholder="Add a todo..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}
