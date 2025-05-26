"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="focus:outline-none"
    >
      {theme === "dark" ? (
        <Image src="/svg/icon-sun.svg" alt="Sun" width={24} height={24} />
      ) : (
        <Image src="/svg/icon-moon.svg" alt="Moon" width={24} height={24} />
      )}
    </button>
  );
}