import { NextResponse } from "next/server"
import { getParticipants } from "../sheets"

export async function GET() {
  console.log("🚀 Iniciando petición GET /api/ranking")
  console.log("🌍 Entorno:", process.env.NODE_ENV)
  console.log("⏰ Timestamp:", new Date().toISOString())

  try {
    console.log("📊 Llamando a getParticipants()...")
    const participants = await getParticipants()

    console.log(`✅ Ranking obtenido exitosamente: ${participants.length} participantes`)

    const response = {
      success: true,
      data: participants,
      timestamp: new Date().toISOString(),
    }

    console.log("📤 Enviando respuesta exitosa")
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Error completo en ranking API:", error)
    console.error("📍 Error stack:", error instanceof Error ? error.stack : "No stack available")

    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch ranking data",
      timestamp: new Date().toISOString(),
    }

    console.log("📤 Enviando respuesta de error:", errorResponse)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
