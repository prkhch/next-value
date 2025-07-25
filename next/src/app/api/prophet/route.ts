// https://sangsangjin.tistory.com/29
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
  const symbol = searchParams.get("symbol");
  const range = searchParams.get("range");

  const flaskRes = await fetch(
    // "https://fwp-te66.onrender.com/api/flask/prophet",
    `http://127.0.0.1:5000/api/flask/prophet?symbol=${symbol}&range=${range}`,
    {
      method: "GET",
    }
  );
  const res = await flaskRes.json();

  return Response.json({ res });
}
