// src/lib/localStorage.ts
import { Todo } from "../types";

export const getTodosFromLocalStorage = (userId: string): Todo[] => {
  if (typeof window === "undefined") return [];
  const todos = localStorage.getItem("todos");
  if (!todos) return [];
  const allTodos: Todo[] = JSON.parse(todos);
  return allTodos.filter((todo) => todo.userId === userId);
};

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const addTodoToLocalStorage = (todo: Todo) => {
  const existingTodos = getTodosFromLocalStorage(todo.userId);
  const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  saveTodosToLocalStorage([...allTodos, todo]);
};

export const updateTodoInLocalStorage = (updatedTodo: Todo) => {
  const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  const updatedTodos = allTodos.map((todo: Todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  saveTodosToLocalStorage(updatedTodos);
};

export const deleteCompletedTodos = (userId: string) => {
  const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  const updatedTodos = allTodos.filter(
    (todo: Todo) => !(todo.userId === userId && todo.completed)
  );
  saveTodosToLocalStorage(updatedTodos);
};