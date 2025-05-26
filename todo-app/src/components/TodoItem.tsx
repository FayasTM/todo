"use client";

import { Todo } from "../types";
import { updateTodoInLocalStorage } from "../lib/localStorage";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleTodo = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodoInLocalStorage(updatedTodo);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-4 border-b border-very-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 bg-very-light-gray dark:bg-very-dark-desaturated-blue"
    >
      <div className="flex items-center">
        <button
          onClick={toggleTodo}
          className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
            todo.completed
              ? "bg-check-gradient"
              : "border-light-grayish-blue dark:border-dark-dark-grayish-blue"
          }`}
        >
          {todo.completed && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
        <span
          className={`${
            todo.completed
              ? "line-through text-light-grayish-blue dark:text-dark-dark-grayish-blue"
              : "text-very-dark-grayish-blue dark:text-dark-light-grayish-blue"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => {
          const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
          const updatedTodos = allTodos.filter((t: Todo) => t.id !== todo.id);
          localStorage.setItem("todos", JSON.stringify(updatedTodos));
        }}
        className="text-dark-grayish-blue dark:text-dark-dark-grayish-blue"
      >
        ✕
      </button>
    </div>
  );
}