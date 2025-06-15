// API Route para obtener el ranking actual
import { NextResponse } from "next/server"
import { getParticipants } from "./sheets"

export async function GET() {
  try {
    const participants = await getParticipants()

    return NextResponse.json({
      success: true,
      data: participants,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in ranking API:", error)
    return NextResponse.json({ error: "Failed to fetch ranking data" }, { status: 500 })
  }
}
