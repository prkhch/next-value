// https://nextjs.org/docs/app/api-reference/file-conventions/route
// export async function GET() {
//   return Response.json({
//     message: "https://nextjs.org/docs/app/api-reference/file-conventions/route",
//   });
// }

export async function GET() {
  const flaskRes = await fetch("http://localhost:5000/api/flask/test");
  return Response.json({
    message: flaskRes.text(),
  });
}
