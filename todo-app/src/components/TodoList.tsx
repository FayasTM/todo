"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Todo } from "../types";
import {
  getTodosFromLocalStorage,
  addTodoToLocalStorage,
  saveTodosToLocalStorage,
  deleteCompletedTodos,
} from "../lib/localStorage";
import TodoItem from "./TodoItem";
import { Button } from "./ui/button";

export default function TodoList() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    if (session?.user?.userId) {
      const userTodos = getTodosFromLocalStorage(session.user.userId);
      setTodos(userTodos);
    }
  }, [session]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim() || !session?.user?.userId) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      userId: session.user.userId,
    };
    addTodoToLocalStorage(newTodo);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex((todo) => todo.id === active.id);
        const newIndex = prevTodos.findIndex((todo) => todo.id === over.id);
        const newOrder = arrayMove(prevTodos, oldIndex, newIndex);
        saveTodosToLocalStorage(newOrder);
        return newOrder;
      });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    saveTodosToLocalStorage(todos); // Save after toggling
  };

  const clearCompleted = () => {
    if (!session?.user?.userId) return;
    deleteCompletedTodos(session.user.userId);
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !(todo.completed && todo.userId === session.user.userId))
    );
  };

  if (!session) return null; // Return null if not authenticated

  return (
    <div className="bg-white dark:bg-very-dark-desaturated-blue rounded-t-md shadow-lg">
      <form onSubmit={addTodo} className="p-4 border-b border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 flex items-center">
        <input
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
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
            />
          ))}
        </SortableContext>
      </DndContext>
      {todos.some((todo) => todo.completed) && (
        <div className="p-4 text-dark-grayish-blue dark:text-dark-dark-grayish-blue text-center">
          <button
            onClick={clearCompleted}
            className="underline hover:text-very-dark-grayish-blue dark:hover:text-dark-light-grayish-blue"
          >
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
}