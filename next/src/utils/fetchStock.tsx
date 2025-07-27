// import handleForamatDate from "@/utils/handleForamatDate";

export async function getClosingPrice({ symbol }: { symbol: string }) {
  const response = await fetch(
    // `http://localhost:3000/api/stock?symbol=${symbol}`,
    `http://fwp-phi.vercel.app/api/stock?symbol=${symbol}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  return result;
}
