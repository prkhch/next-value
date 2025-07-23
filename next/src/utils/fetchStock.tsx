// import handleForamatDate from "@/utils/handleForamatDate";

export async function getClosingPrice({
  symbol,
  range,
}: {
  symbol: string;
  range: string;
}) {
  const response = await fetch(
    `http://localhost:3000/api/stock?symbol=${symbol}&range=${range}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  return result;
}
