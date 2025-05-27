"use client";

import Image from "next/image";
import TodoList from "components/TodoList";
import ThemeToggle from "components/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-very-light-gray dark:bg-very-dark-blue ">
      <div className="relative h-64">
      <Image
        src="/png/bg-desktop-light.jpg"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        className="z-0 h-[64px]"
      />
      <div className="relative z-10 container mx-auto px-[502px] pt-[110px] gap-3 ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-widest">TODO</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
        <TodoList />
      </div>
      </div>
      
      
    </div>
  );
}