"use client";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function NotFound() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol");

  return (
    <main>
      <h1>404</h1>
      <p>No results for &apos;{symbol}&apos;</p>
      <SearchBar />
    </main>
  );
}
