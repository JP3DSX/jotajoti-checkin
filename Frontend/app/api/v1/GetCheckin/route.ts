import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request)  {
  try {
    const client = await clientPromise;
    const db = client.db("jotajotijp-dev");

    const data = await db.collection("check-ins").find({}).limit(20).toArray();

    console.log("[API] GetCheckin Resolved");
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    throw new Error().message;
  }
};