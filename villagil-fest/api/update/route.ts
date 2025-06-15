// API Route para actualizar puntos
import { type NextRequest, NextResponse } from "next/server"
import { updateParticipantPoints } from "../sheets"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing participant ID" }, { status: 400 })
    }

    await updateParticipantPoints(id, 100)

    return NextResponse.json({
      success: true,
      message: `Successfully added 100 points to ${id}`,
      participant: id,
      pointsAdded: 100,
    })
  } catch (error) {
    console.error("Error in update API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update participant points",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, points = 100 } = body

    if (!id) {
      return NextResponse.json({ error: "Missing participant ID" }, { status: 400 })
    }

    await updateParticipantPoints(id, points)

    return NextResponse.json({
      success: true,
      message: `Successfully added ${points} points to ${id}`,
      participant: id,
      pointsAdded: points,
    })
  } catch (error) {
    console.error("Error in update API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update participant points",
      },
      { status: 500 },
    )
  }
}
