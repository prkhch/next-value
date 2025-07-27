"use client";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";

export default function NotFound() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol");

  return (
    <main>
      <Logo />

      <SearchBar />
      <div className="pt-10">
        <div className="text-center font-thin text-6xl">404</div>
        <div className="text-center font-thin">
          No results for &apos;{symbol}&apos;
        </div>
      </div>
    </main>
  );
}
