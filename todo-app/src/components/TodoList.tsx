"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { Todo } from "types";


export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(allTodos.filter((todo: Todo) => todo.userId === "global"));
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id && over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id.toString());
      const newIndex = todos.findIndex((todo) => todo.id === over.id.toString());
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newOrder = arrayMove(todos, oldIndex, newIndex);
        setTodos(newOrder);
        localStorage.setItem("todos", JSON.stringify(newOrder));
      }
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    if (selectedTodoId === id) setSelectedTodoId(null);
  };

  const updateTodoText = (id: string, newText: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <div className="bg-white dark:bg-very-dark-desaturated-blue rounded-md shadow-lg">
      <div className="gap-y-4"> {/* Added gap-y-4 to create vertical spacing */}
        <TodoInput todos={todos} setTodos={setTodos} />
        <div className="space-y-2">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredTodos} strategy={verticalListSortingStrategy}>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  updateTodoText={updateTodoText}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      {todos.length > 0 && <TodoFooter todos={todos} setTodos={setTodos} filter={filter} setFilter={setFilter} />}
    </div>
  );
}