import { type NextRequest, NextResponse } from "next/server"
import { getAccessToken } from "../sheets"

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!
const SHEET_NAME = "Ranking"

interface ParticipantUpdate {
  nombre: string
  puntos: number
  rowNumber: number
}

export async function PUT(request: NextRequest) {
  console.log("🚀 Iniciando petición PUT /api/admin")

  try {
    const body = await request.json()
    const { participants } = body as { participants: ParticipantUpdate[] }

    console.log("📝 Datos recibidos para actualización:", participants)

    if (!participants || !Array.isArray(participants)) {
      console.error("❌ Datos de participantes inválidos")
      return NextResponse.json({ error: "Invalid participants data" }, { status: 400 })
    }

    // Obtener access token
    const accessToken = await getAccessToken()

    // Preparar las actualizaciones en lote
    const updates = participants.map((participant) => ({
      range: `${SHEET_NAME}!A${participant.rowNumber}:B${participant.rowNumber}`,
      values: [[participant.nombre, participant.puntos.toString()]],
    }))

    console.log("📊 Actualizaciones preparadas:", updates)

    // Realizar actualización en lote
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        valueInputOption: "RAW",
        data: updates,
      }),
    })

    console.log("📡 Respuesta de actualización:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Error en actualización:", errorText)
      throw new Error(`Error updating participants: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()
    console.log("✅ Actualización exitosa:", result)

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${participants.length} participants`,
      updatedCount: participants.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error en admin API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update participants",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
