"use client";

async function testApi() {
  const response = await fetch("/api/test");
  const jsonData = await response.json();
  console.log(jsonData);
}

export default function TestApiButton() {
  return (
    <button
      onClick={() => {
        testApi();
      }}
    >
      TestApiButton
    </button>
  );
}
