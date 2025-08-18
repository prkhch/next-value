"use client";

import { useEffect, useState } from "react";
import { getSearchResult } from "@/utils/fetchSearch";

const Searchdropdown = ({
  input,
  focused,
}: {
  input: string;
  focused: boolean;
}) => {
  const [searchResults, setSearchResults] = useState<
    {
      symbol: string;
      name: string;
      exchange: string;
    }[]
  >([]);

  // https://1two13.tistory.com/entry/JS-Promise%EC%97%90%EC%84%9C-PromiseResult-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%BA%BC%EB%82%B4%EB%8A%94-%EB%B2%95
  useEffect(() => {
    console.log(input);

    async function getPromise(input: string) {
      const res = await getSearchResult({ query: input });
      setSearchResults(res.searchRes);
    }
    getPromise(input);
  }, [input]);

  const handleSelect = (symbol: string) => {
    if (input.trim()) {
      window.location.href = `/chart?symbol=${symbol.trim()}`;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {focused && input.length > 0 && (
        <div className="absolute z-10 w-xs">
          {searchResults.map((result, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(result.symbol)}
              className="flex justify-between gap-2 p-2 bg-background border border-gray-300 rounded-lg shadow-sm dark:bg-gray-600 dark:border-gray-400 cursor-pointer hover:bg-surface"
            >
              <p className="font-serif">{result.symbol}</p>
              <p className="text-gray-500 truncate">{result.name}</p>
              <p className="text-gray-400 font-thin text-xs">
                {result.exchange}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchdropdown;
