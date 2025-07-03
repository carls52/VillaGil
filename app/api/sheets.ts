// Configuración y funciones para Google Sheets API
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY!
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!
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
  console.log("GOOGLE_SERVICE_ACCOUNT_EMAIL:", GOOGLE_SERVICE_ACCOUNT_EMAIL ? "✅ Configurado" : "❌ No configurado")
  console.log("GOOGLE_PRIVATE_KEY:", GOOGLE_PRIVATE_KEY ? "✅ Configurado" : "❌ No configurado")

  if (!SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEETS_ID no está configurado en las variables de entorno")
  }

  if (!GOOGLE_SHEETS_API_KEY) {
    throw new Error("GOOGLE_SHEETS_API_KEY no está configurado en las variables de entorno")
  }

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL no está configurado en las variables de entorno")
  }

  if (!GOOGLE_PRIVATE_KEY) {
    throw new Error("GOOGLE_PRIVATE_KEY no está configurado en las variables de entorno")
  }

  console.log("✅ Variables de entorno verificadas correctamente")
}

// Función para generar JWT token para Service Account
async function getAccessToken(): Promise<string> {
  console.log("🔐 Generando access token...")

  // Crear JWT header
  const header = {
    alg: "RS256",
    typ: "JWT",
  }

  // Crear JWT payload
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600, // 1 hora
    iat: now,
  }

  // Codificar header y payload
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")

  // Crear signature
  const signatureInput = `${encodedHeader}.${encodedPayload}`

  // Importar la clave privada
  const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  const keyData = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "")

  // Convertir la clave a formato que puede usar Web Crypto API
  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  )

  // Firmar
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(signatureInput))

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

  // Crear JWT completo
  const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`

  // Intercambiar JWT por access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text()
    console.error("❌ Error obteniendo access token:", error)
    throw new Error(`Failed to get access token: ${error}`)
  }

  const tokenData = await tokenResponse.json()
  console.log("✅ Access token obtenido exitosamente")

  return tokenData.access_token
}

// Función para leer datos de Google Sheets (usando API Key - solo lectura)
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

// Función para actualizar puntos de un participante (usando Service Account - escritura)
export async function updateParticipantPoints(nombre: string, puntosAAgregar = 100): Promise<boolean> {
  try {
    console.log(`🔄 Actualizando puntos para: ${nombre} (+${puntosAAgregar})`)

    // Verificar variables de entorno
    checkEnvironmentVariables()

    // Obtener access token
    const accessToken = await getAccessToken()

    // Primero, obtener todos los datos para encontrar la fila del participante
    const participants = await getAllParticipantsWithRowNumbers(accessToken)
    const participant = participants.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase())

    if (!participant) {
      console.error(`❌ Participante no encontrado: ${nombre}`)
      throw new Error(`Participant ${nombre} not found`)
    }

    console.log(`👤 Participante encontrado:`, participant)

    const newPoints = participant.puntos + puntosAAgregar
    const rowNumber = participant.rowNumber

    console.log(`📊 Actualizando fila ${rowNumber}: ${participant.puntos} → ${newPoints}`)

    // Actualizar la celda específica usando Service Account
    const range = `${SHEET_NAME}!B${rowNumber}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW`

    console.log("🌐 URL de actualización:", url)

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

// Función para guardar respuestas del formulario
export async function saveFormResponse(formData: {
  nombre: string
  cena: string
  alergias: string
  bebidas: string[]
}): Promise<boolean> {
  try {
    console.log(`📝 Guardando respuesta del formulario para: ${formData.nombre}`)

    // Verificar variables de entorno
    checkEnvironmentVariables()

    // Obtener access token
    const accessToken = await getAccessToken()

    // Buscar si el participante ya existe en la columna D
    const existingRow = await findParticipantInFormResponses(accessToken, formData.nombre)

    let rowNumber: number
    if (existingRow) {
      console.log(`👤 Participante encontrado en fila ${existingRow.rowNumber}, actualizando...`)
      rowNumber = existingRow.rowNumber
    } else {
      console.log(`👤 Participante nuevo, buscando primera fila vacía...`)
      rowNumber = await findFirstEmptyRowInFormResponses(accessToken)
      console.log(`📍 Primera fila vacía encontrada: ${rowNumber}`)
    }

    // Preparar los datos para guardar
    const bebidasString = formData.bebidas.join(", ")
    const values = [[formData.nombre, formData.cena, formData.alergias, bebidasString]]

    // Actualizar las celdas D, E, F, G de la fila correspondiente
    const range = `${SHEET_NAME}!D${rowNumber}:G${rowNumber}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW`

    console.log("🌐 URL de guardado:", url)
    console.log("📊 Datos a guardar:", values)

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        values: values,
      }),
    })

    console.log("📡 Respuesta de guardado:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Error en guardado:", errorText)
      throw new Error(`Error saving form data: ${response.status} ${response.statusText} - ${errorText}`)
    }

    console.log(`✅ Respuesta del formulario guardada correctamente para ${formData.nombre}`)
    return true
  } catch (error) {
    console.error("❌ Error en saveFormResponse:", error)
    throw error
  }
}

// Función para buscar un participante en las respuestas del formulario (columna D)
async function findParticipantInFormResponses(accessToken: string, nombre: string) {
  console.log(`🔍 Buscando participante ${nombre} en respuestas del formulario...`)

  const range = `${SHEET_NAME}!D:D` // Solo columna D
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("❌ Error buscando participante:", errorText)
    throw new Error(`Error searching participant: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const rows = data.values || []

  // Buscar el nombre en la columna D
  for (let i = 0; i < rows.length; i++) {
    const cellValue = rows[i][0] || ""
    if (cellValue.toLowerCase() === nombre.toLowerCase()) {
      console.log(`👤 Participante encontrado en fila ${i + 1}`)
      return {
        rowNumber: i + 1,
        nombre: cellValue,
      }
    }
  }

  console.log(`👤 Participante no encontrado`)
  return null
}

// Función para encontrar la primera fila vacía en las respuestas del formulario
async function findFirstEmptyRowInFormResponses(accessToken: string): Promise<number> {
  console.log("📍 Buscando primera fila vacía en respuestas del formulario...")

  const range = `${SHEET_NAME}!D:D` // Solo columna D
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("❌ Error buscando fila vacía:", errorText)
    throw new Error(`Error finding empty row: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const rows = data.values || []

  // Encontrar la primera fila vacía
  for (let i = 0; i < rows.length; i++) {
    const cellValue = rows[i][0] || ""
    if (!cellValue.trim()) {
      console.log(`📍 Primera fila vacía encontrada: ${i + 1}`)
      return i + 1
    }
  }

  // Si no hay filas vacías, usar la siguiente fila después de la última con datos
  const nextRow = rows.length + 1
  console.log(`📍 No hay filas vacías, usando siguiente fila: ${nextRow}`)
  return nextRow
}

// Función para obtener todas las respuestas del formulario
export async function getFormResponses(): Promise<
  Array<{
    nombre: string
    cena: string
    alergias: string
    bebidas: string
    rowNumber: number
  }>
> {
  try {
    console.log("📋 Obteniendo respuestas del formulario...")

    // Verificar variables de entorno
    checkEnvironmentVariables()

    const range = `${SHEET_NAME}!D:G` // Columnas D, E, F, G
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`

    console.log("🌐 URL de la API:", url.replace(GOOGLE_SHEETS_API_KEY, "[API_KEY_HIDDEN]"))

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Error en la respuesta de la API:", errorText)
      throw new Error(`Error fetching form responses: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    const rows = data.values || []

    const responses = rows
      .map((row: string[], index: number) => ({
        nombre: row[0] || "",
        cena: row[1] || "",
        alergias: row[2] || "",
        bebidas: row[3] || "",
        rowNumber: index + 1,
      }))
      .filter((r) => r.nombre.trim()) // Filtrar filas vacías

    console.log(`✅ Total de respuestas del formulario: ${responses.length}`)
    return responses
  } catch (error) {
    console.error("❌ Error en getFormResponses:", error)
    throw error
  }
}

// Función auxiliar para obtener participantes con números de fila (usando Service Account)
async function getAllParticipantsWithRowNumbers(accessToken: string) {
  console.log("📋 Obteniendo participantes con números de fila...")

  const range = `${SHEET_NAME}!A:B`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

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
