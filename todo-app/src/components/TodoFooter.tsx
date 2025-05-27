"use client";

import { Todo } from "types";



interface TodoFooterProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export default function TodoFooter({ todos, setTodos, filter, setFilter }: TodoFooterProps) {
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filterTodos = (newFilter: string) => {
    setFilter(newFilter);
    let filteredTodos = [...todos];
    switch (newFilter) {
      case "Active":
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
      case "Completed":
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      default:
        filteredTodos = todos;
        break;
    }
    setTodos(filteredTodos);
  };

  return (
    <div className="p-4 text-dark-grayish-blue dark:text-dark-dark-grayish-blue flex justify-between items-center bg-white dark:bg-very-dark-desaturated-blue rounded-b-md">
      <span>{activeCount} items left</span>
      <div className="flex space-x-4">
        <button
          onClick={() => filterTodos("All")}
          className={`hover:text-very-dark-grayish-blue dark:hover:text-dark-light-grayish-blue ${filter === "All" ? "text-bright-blue" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => filterTodos("Active")}
          className={`hover:text-very-dark-grayish-blue dark:hover:text-dark-light-grayish-blue ${filter === "Active" ? "text-bright-blue" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => filterTodos("Completed")}
          className={`hover:text-very-dark-grayish-blue dark:hover:text-dark-light-grayish-blue ${filter === "Completed" ? "text-bright-blue" : ""}`}
        >
          Completed
        </button>
      </div>
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="hover:text-very-dark-grayish-blue dark:hover:text-dark-light-grayish-blue"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}