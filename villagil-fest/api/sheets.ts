// Configuración y funciones para Google Sheets API
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY!
const SHEET_NAME = "Ranking" // Nombre de la hoja en Google Sheets

interface Participant {
  nombre: string
  puntos: number
}

// Función para leer datos de Google Sheets
export async function getParticipants(): Promise<Participant[]> {
  try {
console.error("get participants");
    const range = `${SHEET_NAME}!A:B` // Columnas A (Nombre) y B (Puntos)
    console.error(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText} \n ${url}`)
    }

    const data = await response.json()
    const rows = data.values || []

    // Saltar la primera fila (headers) y convertir a objetos
    const participants: Participant[] = rows
      .slice(1)
      .map((row: string[]) => ({
        nombre: row[0] || "",
        puntos: Number.parseInt(row[1]) || 0,
      }))
      .filter((p) => p.nombre) // Filtrar filas vacías

    // Ordenar por puntos de mayor a menor
    return participants.sort((a, b) => b.puntos - a.puntos)
  } catch (error) {
    console.error("Error reading from Google Sheets:", error)
    throw error
  }
}

// Función para actualizar puntos de un participante
export async function updateParticipantPoints(nombre: string, puntosAAgregar = 100): Promise<boolean> {
  try {
    // Primero, obtener todos los datos para encontrar la fila del participante
    const participants = await getAllParticipantsWithRowNumbers()
    const participant = participants.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase())

    if (!participant) {
      throw new Error(`Participant ${nombre} not found`)
    }

    const newPoints = participant.puntos + puntosAAgregar
    const rowNumber = participant.rowNumber

    // Actualizar la celda específica
    const range = `${SHEET_NAME}!B${rowNumber}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[newPoints.toString()]],
      }),
    })

    if (!response.ok) {
      throw new Error(`Error updating data: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error("Error updating Google Sheets:", error)
    throw error
  }
}

// Función auxiliar para obtener participantes con números de fila
async function getAllParticipantsWithRowNumbers() {
  const range = `${SHEET_NAME}!A:B`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`

  const response = await fetch(url)
  const data = await response.json()
  const rows = data.values || []

  return rows
    .slice(1)
    .map((row: string[], index: number) => ({
      nombre: row[0] || "",
      puntos: Number.parseInt(row[1]) || 0,
      rowNumber: index + 2, // +2 porque empezamos desde la fila 2 (saltamos header)
    }))
    .filter((p) => p.nombre)
}
