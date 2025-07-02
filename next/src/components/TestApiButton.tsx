"use client";
import { useState } from "react";

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

// 파일 전송 API
async function sendFileToProphetAPI(formData: FormData) {
  const response = await fetch("/api/prophet", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  console.log(result); // Base64 이미지 리턴 확인
}

export default function TestApiButton() {
  // https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
  // 브라우저 파일 업로드
  // Upload, (csv, xls, xlsx)
  const [file, setFile] = useState<File>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    data.set(
      "options",
      // 플라스크에서 문자열형태로 받는중
      JSON.stringify({
        growth: "linear",
        cpScale: 0.05,
        cpList: [],
        holidayScale: 10,
        yearlyScale: "auto",
        weeklyScale: "auto",
        seasonMode: "additive",
        seasonScale: 10,
        holidays: "Korea",
        dfCap: null,
        dfFloor: null,
        ftCap: null,
        ftFloor: null,
        periods: 30,
        cpThreshold: 0.8,
      })
    );

    if (data) {
      sendFileToProphetAPI(data);
    }
  };

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
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
