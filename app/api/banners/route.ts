import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

export async function GET() {
  try {
    await connectDB();
    
    const mongoose = await import("mongoose");
    const db = mongoose.connection.db;
    const banners = await db?.collection("banners")
      .find({ active: true })
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}
