import { NextResponse } from "next/server";

export async function GET() {
  return new Response("Logged out", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
    },
  });
}