import { type NextRequest, NextResponse } from "next/server"
import { updateParticipantPoints } from "../sheets"

export async function GET(request: NextRequest) {
  console.log("🚀 Iniciando petición GET /api/update")

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    console.log("📝 Parámetros recibidos:", { id })

    if (!id) {
      console.error("❌ ID de participante faltante")
      return NextResponse.json({ error: "Missing participant ID" }, { status: 400 })
    }

    console.log(`🔄 Actualizando participante: ${id}`)
    await updateParticipantPoints(id, 100)

    const response = {
      success: true,
      message: `Successfully added 100 points to ${id}`,
      participant: id,
      pointsAdded: 100,
    }

    console.log("✅ Actualización exitosa:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Error en update API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update participant points",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  console.log("🚀 Iniciando petición POST /api/update")

  try {
    const body = await request.json()
    const { id, points = 100 } = body

    console.log("📝 Datos recibidos:", { id, points })

    if (!id) {
      console.error("❌ ID de participante faltante")
      return NextResponse.json({ error: "Missing participant ID" }, { status: 400 })
    }

    console.log(`🔄 Actualizando participante: ${id} con ${points} puntos`)
    await updateParticipantPoints(id, points)

    const response = {
      success: true,
      message: `Successfully added ${points} points to ${id}`,
      participant: id,
      pointsAdded: points,
    }

    console.log("✅ Actualización exitosa:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Error en update API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update participant points",
      },
      { status: 500 },
    )
  }
}
