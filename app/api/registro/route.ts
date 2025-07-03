import { type NextRequest, NextResponse } from "next/server"
import { saveFormResponse } from "../sheets"

export async function POST(request: NextRequest) {
  console.log("🚀 Iniciando petición POST /api/registro")

  try {
    const body = await request.json()
    const { nombre, cena, alergias, bebidas } = body

    console.log("📝 Datos del formulario recibidos:", { nombre, cena, alergias, bebidas })

    // Validar datos requeridos
    if (!nombre || !nombre.trim()) {
      console.error("❌ Nombre faltante")
      return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 })
    }

    if (!cena) {
      console.error("❌ Respuesta de cena faltante")
      return NextResponse.json({ error: "Respuesta sobre la cena es requerida" }, { status: 400 })
    }

    if (!bebidas || !Array.isArray(bebidas) || bebidas.length === 0) {
      console.error("❌ Preferencias de bebidas faltantes")
      return NextResponse.json({ error: "Al menos una preferencia de bebida es requerida" }, { status: 400 })
    }

    // Guardar en Google Sheets
    console.log(`💾 Guardando respuesta del formulario para: ${nombre}`)
    await saveFormResponse({
      nombre: nombre.trim(),
      cena,
      alergias: alergias || "",
      bebidas,
    })

    const response = {
      success: true,
      message: `Registro guardado exitosamente para ${nombre}`,
      data: {
        nombre,
        cena,
        alergias,
        bebidas,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("✅ Registro completado exitosamente:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Error en registro API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save registration",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("🚀 Iniciando petición GET /api/registro")

  try {
    // Importar la función aquí para evitar problemas de importación circular
    const { getFormResponses } = await import("../sheets")

    console.log("📋 Obteniendo respuestas del formulario...")
    const responses = await getFormResponses()

    const response = {
      success: true,
      data: responses,
      count: responses.length,
      timestamp: new Date().toISOString(),
    }

    console.log(`✅ Respuestas obtenidas exitosamente: ${responses.length} registros`)
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Error obteniendo respuestas del formulario:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch form responses",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
