export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
  const symbol = searchParams.get("symbol");
  const range = searchParams.get("range");
  const interval = "1d"; // 일일 주가
  const stockRes = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`,
    {
      method: "GET",
    }
  );
  const res = await stockRes.json();
  return Response.json({ res });
}
