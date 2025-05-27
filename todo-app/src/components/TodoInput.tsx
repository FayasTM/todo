"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Todo } from "types";
import { addTodoToLocalStorage, saveTodosToLocalStorage } from "lib/localStorage";



interface TodoInputProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

export default function TodoInput({ todos, setTodos }: TodoInputProps) {
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      userId: "global",
    };
    addTodoToLocalStorage(newTodo);
    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  return (
    <form onSubmit={addTodo} className="p-4 border-b border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 flex items-center">
      <Input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Create a new todo..."
        className="flex-grow p-2 text-very-dark-grayish-blue dark:text-dark-light-grayish-blue bg-transparent border-none focus:outline-none"
      />
      <Button type="submit" className="ml-2 p-2 bg-transparent border-none">
        Add
      </Button>
    </form>
  );
}