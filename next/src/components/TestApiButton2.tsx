"use client";

import handleForamatDate from "@/utils/handleForamatDate";

async function fetchDailyPrice({
  symbol,
  range,
}: {
  symbol: string;
  range: string;
}) {
  const response = await fetch(`/api/stock?symbol=${symbol}&range=${range}`, {
    method: "GET",
  });

  const result = await response.json();
  console.log(
    handleForamatDate(result.res.chart.result[0].timestamp[0] * 1000)
  ); // 날짜
  console.log(result.res.chart.result[0].indicators.quote[0].close); // 종가
}

export default function TestApiButton2() {
  return (
    <div>
      <button onClick={() => fetchDailyPrice({ symbol: "tsla", range: "1y" })}>
        TestApiButton2
      </button>
    </div>
  );
}
