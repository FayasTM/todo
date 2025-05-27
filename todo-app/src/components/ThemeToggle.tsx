"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button onClick={toggleTheme} className="focus:outline-none">
      <Image
        src={theme === "light" ? "/svg/icon-sun.svg" : "/svg/icon-moon.svg"}
        alt={theme === "light" ? "Sun Icon" : "Moon Icon"}
        width={24}
        height={24}
      />
    </button>
  );
}