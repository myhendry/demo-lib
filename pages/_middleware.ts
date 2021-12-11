import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // return new Response("Hello, world!");
  console.log("Hello World");
}
