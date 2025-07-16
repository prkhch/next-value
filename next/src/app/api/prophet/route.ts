// https://sangsangjin.tistory.com/29
export async function POST(request: Request) {
  const formData = await request.formData();
  // const flaskRes = await fetch("http://127.0.0.1:5000/api/flask/prophet", {
  //   method: "POST",
  //   body: formData,
  // });
  const flaskRes = await fetch(
    "https://fwp-te66.onrender.com/api/flask/prophet",
    {
      method: "POST",
      body: formData,
    }
  );

  const res = await flaskRes.json();
  return Response.json({ res });
}

// json { file : , options : }
/*
    growth: "linear",
    dfCap: 6,
    dfFloor: 1.5,
    ftCap: 6,
    ftFloor: 1.5,
    cpScale: 0.05,
    cpList: [],
    cpThreshold: 0.01,
    periods: 365,
    holidays: "none",
    holidayScale: 10,
    yearlyScale: "auto",
    weeklyScale: "auto",
    seasonMode: "additive",
    seasonScale: 10,
*/
