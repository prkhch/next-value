"use client";

async function testApi() {
  const response = await fetch("/api/test");
  console.log(response);
  const jsonData = await response.json();
  console.log(jsonData);
}

// CORS
async function testApi2() {
  const response = await fetch("http://localhost:5000/api/flask/test");
  console.log(response);
}

export default function TestApiButton() {
  return (
    <div>
      <button
        onClick={() => {
          testApi();
        }}
      >
        TestApiButton
      </button>
      <button
        onClick={() => {
          testApi2();
        }}
      >
        TestApiButton2
      </button>
    </div>
  );
}
