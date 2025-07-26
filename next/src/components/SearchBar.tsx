"use client";
import { useRouter } from "next/navigation"; // https://velog.io/@meek/Error-NextRouter-was-not-mounted-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
import { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/chart?symbol=${input.trim()}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Symbol"
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
