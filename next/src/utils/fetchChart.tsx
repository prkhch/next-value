// import handleForamatDate from "@/utils/handleForamatDate";

export async function getClosingPrice({ symbol }: { symbol: string }) {
  const response = await fetch(
    // `http://localhost:3000/api/chart?symbol=${symbol}`,
    `https://nextvalue.vercel.app/api/chart?symbol=${symbol}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  return result;
}
