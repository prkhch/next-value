"use client";
// import { useRouter } from "next/navigation"; // https://velog.io/@meek/Error-NextRouter-was-not-mounted-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
import { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      //   router.push(`/chart?symbol=${input.trim()}`);
      // → 클라이언트 사이드 라우팅만 실행되므로,
      // 서버 컴포넌트인 /chart 페이지의 데이터 로딩이 재실행되지 않음.
      // 이로 인해 /chart 페이지가 이미 렌더된 상태에서 NotFound 컴포넌트가 계속 보이게 됨.

      // window.location.href를 사용하면 전체 새로고침이 발생하여,
      // /chart 페이지의 서버 컴포넌트가 새롭게 SSR 렌더링되며 올바른 데이터 fetch 및 notFound 판단이 가능해짐.
      window.location.href = `/chart?symbol=${input.trim()}`;
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
