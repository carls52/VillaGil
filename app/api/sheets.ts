// Configuración y funciones para Google Sheets API
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY!
const SHEET_NAME = "Ranking" // Nombre de la hoja en Google Sheets

interface Participant {
  nombre: string
  puntos: number
}

// Función para verificar variables de entorno
function checkEnvironmentVariables() {
  console.log("🔍 Verificando variables de entorno...")
  console.log("GOOGLE_SHEETS_ID:", SPREADSHEET_ID ? "✅ Configurado" : "❌ No configurado")
  console.log("GOOGLE_SHEETS_API_KEY:", GOOGLE_SHEETS_API_KEY ? "✅ Configurado" : "❌ No configurado")

  if (!SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEETS_ID no está configurado en las variables de entorno")
  }

  if (!GOOGLE_SHEETS_API_KEY) {
    throw new Error("GOOGLE_SHEETS_API_KEY no está configurado en las variables de entorno")
  }

  console.log("✅ Variables de entorno verificadas correctamente")
}

// Función para leer datos de Google Sheets
export async function getParticipants(): Promise<Participant[]> {
  try {
    console.log("📊 Iniciando obtención de participantes...")

    // Verificar variables de entorno
    checkEnvironmentVariables()

    const range = `${SHEET_NAME}!A:B` // Columnas A (Nombre) y B (Puntos)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`

    console.log("🌐 URL de la API:", url.replace(GOOGLE_SHEETS_API_KEY, "[API_KEY_HIDDEN]"))
    console.log("📋 Rango solicitado:", range)

    const response = await fetch(url)

    console.log("📡 Respuesta de la API:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Error en la respuesta de la API:", errorText)
      throw new Error(`Error fetching data: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log("📄 Datos recibidos:", {
      hasValues: !!data.values,
      rowCount: data.values ? data.values.length : 0,
      firstRow: data.values ? data.values[0] : null,
    })

    const rows = data.values || []

    // Saltar la primera fila (headers) y convertir a objetos
    const participants: Participant[] = rows
      .slice(1)
      .map((row: string[], index: number) => {
        const participant = {
          nombre: row[0] || "",
          puntos: Number.parseInt(row[1]) || 0,
        }
        console.log(`👤 Participante ${index + 1}:`, participant)
        return participant
      })
      .filter((p) => p.nombre) // Filtrar filas vacías

    console.log(`✅ Total de participantes procesados: ${participants.length}`)

    // Ordenar por puntos de mayor a menor
    const sortedParticipants = participants.sort((a, b) => b.puntos - a.puntos)
    console.log(
      "🏆 Ranking ordenado:",
      sortedParticipants.map((p, i) => `${i + 1}. ${p.nombre}: ${p.puntos}`),
    )

    return sortedParticipants
  } catch (error) {
    console.error("❌ Error completo en getParticipants:", error)
    console.error("📍 Stack trace:", error instanceof Error ? error.stack : "No stack trace available")
    throw error
  }
}

// Función para actualizar puntos de un participante
export async function updateParticipantPoints(nombre: string, puntosAAgregar = 100): Promise<boolean> {
  try {
    console.log(`🔄 Actualizando puntos para: ${nombre} (+${puntosAAgregar})`)

    // Verificar variables de entorno
    checkEnvironmentVariables()

    // Primero, obtener todos los datos para encontrar la fila del participante
    const participants = await getAllParticipantsWithRowNumbers()
    const participant = participants.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase())

    if (!participant) {
      console.error(`❌ Participante no encontrado: ${nombre}`)
      throw new Error(`Participant ${nombre} not found`)
    }

    console.log(`👤 Participante encontrado:`, participant)

    const newPoints = participant.puntos + puntosAAgregar
    const rowNumber = participant.rowNumber

    console.log(`📊 Actualizando fila ${rowNumber}: ${participant.puntos} → ${newPoints}`)

    // Actualizar la celda específica
    const range = `${SHEET_NAME}!B${rowNumber}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`

    console.log("🌐 URL de actualización:", url.replace(GOOGLE_SHEETS_API_KEY, "[API_KEY_HIDDEN]"))

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[newPoints.toString()]],
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
      throw new Error(`Error updating data: ${response.status} ${response.statusText} - ${errorText}`)
    }

    console.log(`✅ Puntos actualizados correctamente para ${nombre}`)
    return true
  } catch (error) {
    console.error("❌ Error en updateParticipantPoints:", error)
    throw error
  }
}

// Función auxiliar para obtener participantes con números de fila
async function getAllParticipantsWithRowNumbers() {
  console.log("📋 Obteniendo participantes con números de fila...")

  const range = `${SHEET_NAME}!A:B`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    const errorText = await response.text()
    console.error("❌ Error obteniendo datos para actualización:", errorText)
    throw new Error(`Error fetching data for update: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const rows = data.values || []

  const participantsWithRows = rows
    .slice(1)
    .map((row: string[], index: number) => ({
      nombre: row[0] || "",
      puntos: Number.parseInt(row[1]) || 0,
      rowNumber: index + 2, // +2 porque empezamos desde la fila 2 (saltamos header)
    }))
    .filter((p) => p.nombre)

  console.log("📊 Participantes con números de fila:", participantsWithRows)
  return participantsWithRows
}
