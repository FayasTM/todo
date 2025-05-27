"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import { Todo } from "types";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodoText: (id: string, newText: string) => void;
  selectedTodoId: string | null;
  setSelectedTodoId: (id: string | null) => void;
}

export default function TodoItem({ todo, deleteTodo, updateTodoText, selectedTodoId, setSelectedTodoId }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim()) {
        updateTodoText(todo.id, editText);
      } else {
        setEditText(todo.text);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleRadioChange = () => {
    setSelectedTodoId(todo.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center p-4 border-b border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 bg-white dark:bg-very-dark-desaturated-blue"
    >
      <input
        type="radio"
        checked={selectedTodoId === todo.id}
        onChange={handleRadioChange}
        name="todo"
        className="mr-4 h-5 w-5 rounded-full border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
          className="flex-grow p-1 text-very-dark-grayish-blue dark:text-dark-light-grayish-blue bg-transparent border-b border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 focus:outline-none"
        />
      ) : (
        <span
          className={`flex-grow ${
            todo.completed
              ? "line-through text-light-grayish-blue dark:text-dark-dark-grayish-blue"
              : "text-very-dark-grayish-blue dark:text-dark-light-grayish-blue"
          }`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <div className="flex space-x-2">
        <Button
          onClick={handleEdit}
          className="p-1 text-bright-blue hover:underline"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          onClick={handleDelete}
          className="p-1 text-red-500 hover:underline"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}