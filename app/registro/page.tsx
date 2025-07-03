"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, User, Utensils, AlertTriangle, Wine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface FormData {
  nombre: string
  cena: string
  alergias: string
  bebidas: string[]
}

const opcionesBebidas = [
  { id: "cerveza", label: "🍺 Cerveza", description: "La clásica de siempre" },
  { id: "tinto-verano", label: "🍷 Tinto de verano", description: "Refrescante y veraniego" },
  { id: "refrescos", label: "🥤 Refrescos que soy sanito", description: "Para los más saludables" },
  { id: "agua", label: "💧 Agua? En serio?", description: "Bueno... si insistes" },
]

export default function RegistroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    cena: "",
    alergias: "",
    bebidas: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleBebidaChange = (bebidaId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      bebidas: checked ? [...prev.bebidas, bebidaId] : prev.bebidas.filter((b) => b !== bebidaId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre.trim()) {
      alert("Por favor, introduce tu nombre")
      return
    }

    if (!formData.cena) {
      alert("Por favor, indica si te quedas a cenar")
      return
    }

    if (formData.bebidas.length === 0) {
      alert("Por favor, selecciona al menos una preferencia de bebida")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("📤 Enviando datos del formulario:", formData)

      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el formulario")
      }

      if (!result.success) {
        throw new Error(result.error || "Error al procesar el registro")
      }

      console.log("✅ Formulario enviado exitosamente:", result)
      setSubmitted(true)
    } catch (error) {
      console.error("❌ Error enviando formulario:", error)
      alert(`Error al enviar el formulario: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-full inline-block mb-6">
                    <Check className="h-16 w-16 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4 festival-text">¡Registro Completado! 🎉</h1>
                  <p className="text-xl text-gray-600 mb-6">
                    ¡Genial <strong>{formData.nombre}</strong>! Tu asistencia ha sido confirmada.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-100 to-cyan-100 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de tu registro:</h3>
                  <div className="space-y-2 text-left">
                    <p>
                      <strong>Nombre:</strong> {formData.nombre}
                    </p>
                    <p>
                      <strong>Cena:</strong>{" "}
                      {formData.cena === "si" ? "Sí, me quedo a cenar 🍽️" : "No, no me quedo a cenar"}
                    </p>
                    {formData.alergias && (
                      <p>
                        <strong>Alergias:</strong> {formData.alergias}
                      </p>
                    )}
                    <p>
                      <strong>Bebidas preferidas:</strong>
                    </p>
                    <ul className="ml-4">
                      {formData.bebidas.map((bebida) => {
                        const opcion = opcionesBebidas.find((b) => b.id === bebida)
                        return <li key={bebida}>• {opcion?.label}</li>
                      })}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    Te esperamos el <strong>12 de Julio a las 17:00</strong> en la Casa de Campo.
                  </p>
                  <p className="text-sm text-gray-500">Recibirás más información por email próximamente.</p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-bold px-8 py-3 rounded-full"
                    >
                      <Link href="/">Volver al inicio</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-bold px-8 py-3 rounded-full bg-transparent"
                    >
                      <Link href="/ranking">Ver ranking</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al inicio</span>
            </Link>

            <h1 className="poster-title text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-lg">
              ¡Regístrate!
            </h1>
            <p className="text-xl text-gray-700 mb-2">VillaGil fest 2025</p>
            <p className="text-lg text-gray-600">12 de Julio • 17:00h • ¡Carlitos cumple 28!</p>
          </div>

          {/* Formulario */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 festival-text">Confirma tu asistencia</CardTitle>
              <p className="text-gray-600">Completa los datos para reservar tu plaza</p>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Nombre */}
                <div className="space-y-3">
                  <Label htmlFor="nombre" className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
                    <User className="h-5 w-5 text-pink-500" />
                    <span>Nombre *</span>
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    className="text-lg p-4 border-2 border-pink-200 focus:border-pink-400 rounded-xl"
                    required
                  />
                </div>

                {/* Cena */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
                    <Utensils className="h-5 w-5 text-orange-500" />
                    <span>¿Te quedas a cenar? *</span>
                  </Label>
                  <Select
                    value={formData.cena}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, cena: value }))}
                  >
                    <SelectTrigger className="text-lg p-4 border-2 border-orange-200 focus:border-orange-400 rounded-xl">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">🍽️ Sí, me quedo a cenar</SelectItem>
                      <SelectItem value="no">❌ No, no me quedo a cenar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alergias */}
                <div className="space-y-3">
                  <Label htmlFor="alergias" className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>¿Alguna alergia?</span>
                  </Label>
                  <Textarea
                    id="alergias"
                    placeholder="Describe cualquier alergia alimentaria o restricción dietética (opcional)"
                    value={formData.alergias}
                    onChange={(e) => setFormData((prev) => ({ ...prev, alergias: e.target.value }))}
                    className="text-lg p-4 border-2 border-red-200 focus:border-red-400 rounded-xl min-h-[100px]"
                    rows={3}
                  />
                </div>

                {/* Preferencias de bebidas */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
                    <Wine className="h-5 w-5 text-purple-500" />
                    <span>Preferencia de bebidas * (puedes elegir varias)</span>
                  </Label>

                  <div className="grid gap-4">
                    {opcionesBebidas.map((opcion) => (
                      <div
                        key={opcion.id}
                        className="flex items-start space-x-3 p-4 border-2 border-purple-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                      >
                        <Checkbox
                          id={opcion.id}
                          checked={formData.bebidas.includes(opcion.id)}
                          onCheckedChange={(checked) => handleBebidaChange(opcion.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={opcion.id} className="text-lg font-medium text-gray-800 cursor-pointer">
                            {opcion.label}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{opcion.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de envío */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-bold text-xl py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Confirmando asistencia...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Check className="h-6 w-6" />
                        <span>Confirmar asistencia</span>
                      </div>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">* Campos obligatorios</p>
              </form>
            </CardContent>
          </Card>

          {/* Info adicional */}
          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-cyan-100 to-green-100 border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">📍 Información del evento</h3>
                <div className="space-y-1 text-gray-700">
                  <p>
                    <strong>Fecha:</strong> 12 de Julio, 2025
                  </p>
                  <p>
                    <strong>Hora:</strong> Apertura de puertas 17:00
                  </p>
                  <p>
                    <strong>Lugar:</strong> Casa de Campo, calle Luis Tristán 7, Toledo
                  </p>
                  <p>
                    <strong>Incluye:</strong> Barra libre, cena, piscina y actividades
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
