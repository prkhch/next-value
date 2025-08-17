export async function getSearchResult({ query }: { query: string }) {
  const response = await fetch(
    `http://localhost:3000/api/search?query=${query}`,
    // `https://nextvalue.vercel.app/api/search?query=${query}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
