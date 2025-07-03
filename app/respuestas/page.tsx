"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Users, AlertCircle } from "lucide-react"
import Link from "next/link"

interface FormResponse {
  nombre: string
  cena: string
  alergias: string
  bebidas: string
  rowNumber: number
}

export default function RespuestasPage() {
  const [responses, setResponses] = useState<FormResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchResponses = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/registro")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al obtener respuestas")
      }

      if (!result.success) {
        throw new Error(result.error || "Error al procesar respuestas")
      }

      setResponses(result.data)
      setLastUpdated(result.timestamp)
    } catch (error) {
      console.error("Error fetching responses:", error)
      setError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResponses()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-lg">
              Respuestas del Formulario
            </h1>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            <span className="ml-4 text-lg text-gray-600">Cargando respuestas...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-lg">
              Respuestas del Formulario
            </h1>
          </div>
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <div className="text-red-500 text-lg mb-4">Error: {error}</div>
            <Button
              onClick={fetchResponses}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-lg">
            Respuestas del Formulario
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">Registros de asistencia al festival</p>

          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={fetchResponses}
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </Button>
            <Button asChild variant="outline" className="px-6 py-3 rounded-full bg-transparent">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: {new Date(lastUpdated).toLocaleString("es-ES")}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-pink-600 mb-2">{responses.length}</div>
              <div className="text-gray-700 font-medium">Registros Totales</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-200 shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {responses.filter((r) => r.cena === "si").length}
              </div>
              <div className="text-gray-700 font-medium">Se quedan a cenar</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {responses.filter((r) => r.alergias && r.alergias.trim()).length}
              </div>
              <div className="text-gray-700 font-medium">Con alergias</div>
            </CardContent>
          </Card>
        </div>

        {/* Respuestas */}
        {responses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No hay respuestas del formulario aún.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((response, index) => (
              <Card
                key={`${response.nombre}-${response.rowNumber}`}
                className="bg-white/80 backdrop-blur-sm shadow-lg border-0"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">{response.nombre}</span>
                    <span className="text-sm text-gray-500">Fila {response.rowNumber}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">🍽️ Cena:</h4>
                      <p className="text-gray-600">
                        {response.cena === "si" ? "Sí, se queda a cenar" : "No se queda a cenar"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">🍹 Bebidas:</h4>
                      <p className="text-gray-600">{response.bebidas || "No especificado"}</p>
                    </div>
                    {response.alergias && (
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-700 mb-1">⚠️ Alergias:</h4>
                        <p className="text-gray-600">{response.alergias}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
