// https://nextjs.org/docs/app/api-reference/file-conventions/route
// export async function GET() {
//   return Response.json({
//     message: "https://nextjs.org/docs/app/api-reference/file-conventions/route",
//   });
// }

// export async function GET() {
//   const flaskRes = await fetch("http://localhost:5000/api/flask/test");
//   return Response.json({
//     message: flaskRes.text(),
//   });
// }

// ######## Quickstart 4.Query database ###############
// import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//   console.log("@@@@GET");
//   // Fetch paginated posts
//   const users = await prisma.user.findMany({
//     where: {},
//   });

//   return NextResponse.json({ users });
// }
