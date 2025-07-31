export async function getForcastingResult({
  symbol,
  range,
}: {
  symbol: string;
  range: string;
}) {
  try {
    const response = await fetch(
      // `http://localhost:3000/api/prophet?symbol=${symbol}&range=${range}`,
      `https://fwp-phi.vercel.app/api/prophet?symbol=${symbol}&range=${range}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`error : ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      error: error,
    };
  }
}
