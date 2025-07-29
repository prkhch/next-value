"use client";
// https://coding-je.com/entry/Nextjs-next-themes%EB%A1%9C-Nextjs%EC%97%90%EC%84%9C-%EA%B0%84%EB%8B%A8%ED%9E%88-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat-tailwind
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
