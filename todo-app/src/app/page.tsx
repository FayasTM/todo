"use client";

import Image from "next/image";
import TodoList from "components/TodoList";
import ThemeToggle from "components/ThemeToggle";
import AuthButton from "components/AuthButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-very-light-gray dark:bg-very-dark-blue">
      <div className="relative h-64">
        <Image
          src="/png/bg-desktop-dark.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="container mx-auto px-4 -mt-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-widest">
            TODO
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
        {session ? (
          <TodoList />
        ) : (
          <p className="text-center text-dark-grayish-blue dark:text-dark-dark-grayish-blue">
            Please sign in to view your todos.
          </p>
        )}
      </div>
    </div>
  );
}