"use client";
// import { useRouter } from "next/navigation"; // https://velog.io/@meek/Error-NextRouter-was-not-mounted-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const symbolParam = params.get("symbol");
      if (symbolParam) {
        setInput(symbolParam.toUpperCase());
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement.id !== "search") return;

    if (input.trim()) {
      //   router.push(`/chart?symbol=${input.trim()}`);
      // → 클라이언트 사이드 라우팅만 실행되므로,
      // 서버 컴포넌트인 /chart 페이지의 데이터 로딩이 재실행되지 않음.
      // 이로 인해 /chart 페이지가 이미 렌더된 상태에서 NotFound 컴포넌트가 계속 보이게 됨.`

      // window.location.href를 사용하면 전체 새로고침이 발생하여,
      // /chart 페이지의 서버 컴포넌트가 새롭게 SSR 렌더링되며 올바른 데이터 fetch 및 notFound 판단이 가능해짐.
      window.location.href = `/chart?symbol=${input.trim()}`;
    }
  };

  return (
    <>
      {/* https://flowbite.com/docs/forms/input-field/ */}
      <form onSubmit={handleSubmit} className="m-3 w-xs mx-auto">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Symbol"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default SearchBar;
