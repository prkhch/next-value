"use client";

import DarkMode from "@/components/DarkMode";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center ">
      <DarkMode />
    </header>
  );
}
