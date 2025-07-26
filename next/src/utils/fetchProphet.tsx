export async function getForcastingResult({
  symbol,
  range,
}: {
  symbol: string;
  range: string;
}) {
  const response = await fetch(
    `http://localhost:3000/api/prophet?symbol=${symbol}&range=${range}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
