import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "ecommerce";

export async function GET() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const flashSales = await db.collection("flashsales")
      .find({ active: true })
      .sort({ order: 1 })
      .toArray();
    
    await client.close();
    
    return NextResponse.json(flashSales);
  } catch (error) {
    console.error("Error fetching flash sales:", error);
    return NextResponse.json(
      { error: "Failed to fetch flash sales" },
      { status: 500 }
    );
  }
}
