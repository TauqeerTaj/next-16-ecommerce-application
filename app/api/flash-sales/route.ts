import { NextResponse } from "next/server";
import { getFlashSales } from "@/lib/db_requests/getFlashSales";

export async function GET() {
  try {
    const flashSales = await getFlashSales();
    return NextResponse.json(flashSales);
  } catch (error) {
    console.error("Error fetching flash sales:", error);
    return NextResponse.json(
      { error: "Failed to fetch flash sales" },
      { status: 500 }
    );
  }
}