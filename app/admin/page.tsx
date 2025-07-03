"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Save, AlertCircle, Shield, Edit3, Trash2, Plus, Lock, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Participant {
  nombre: string
  puntos: number
  position?: number
  rowNumber?: number
}

const ADMIN_PASSWORD = "villagil"
const QUICK_ADD_VALUES = [10, 20, 30, 40, 50, 100, 150, 200]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState("")

  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  // Verificar autenticación al cargar
  useEffect(() => {
    const savedAuth = localStorage.getItem("villagil-admin-auth")
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true)
      setLoading(true)
      fetchParticipants()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setAuthError("")
      localStorage.setItem("villagil-admin-auth", "authenticated")
      setLoading(true)
      fetchParticipants()
    } else {
      setAuthError("Contraseña incorrecta")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("villagil-admin-auth")
    setPassword("")
    setParticipants([])
    setHasChanges(false)
  }

  const fetchParticipants = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/ranking")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al obtener participantes")
      }

      if (!result.success) {
        throw new Error(result.error || "Error al procesar participantes")
      }

      // Agregar números de fila basados en la posición + 1 (para saltar header)
      const participantsWithRows = result.data.map((participant: Participant, index: number) => ({
        ...participant,
        position: index + 1,
        rowNumber: index + 2, // +2 porque empezamos desde fila 2 (saltamos header)
      }))

      setParticipants(participantsWithRows)
      setLastUpdated(result.timestamp)
      setHasChanges(false)
    } catch (error) {
      console.error("Error fetching participants:", error)
      setError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const handleParticipantChange = (index: number, field: "nombre" | "puntos", value: string | number) => {
    setParticipants((prev) => {
      const updated = [...prev]
      if (field === "puntos") {
        updated[index] = { ...updated[index], [field]: Number(value) || 0 }
      } else {
        updated[index] = { ...updated[index], [field]: value }
      }
      return updated
    })
    setHasChanges(true)
  }

  const handleQuickAdd = (index: number, points: number) => {
    setParticipants((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], puntos: updated[index].puntos + points }
      return updated
    })
    setHasChanges(true)

    toast({
      title: `+${points} puntos`,
      description: `Agregados ${points} puntos a ${participants[index].nombre}`,
    })
  }

  const addNewParticipant = () => {
    const newParticipant: Participant = {
      nombre: "",
      puntos: 0,
      position: participants.length + 1,
      rowNumber: participants.length + 2,
    }
    setParticipants((prev) => [...prev, newParticipant])
    setHasChanges(true)
  }

  const removeParticipant = (index: number) => {
    setParticipants((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      // Reajustar posiciones y números de fila
      return updated.map((participant, i) => ({
        ...participant,
        position: i + 1,
        rowNumber: i + 2,
      }))
    })
    setHasChanges(true)
  }

  const saveChanges = async () => {
    try {
      setSaving(true)

      // Filtrar participantes con nombre vacío
      const validParticipants = participants.filter((p) => p.nombre.trim())

      if (validParticipants.length === 0) {
        toast({
          title: "Error",
          description: "Debe haber al menos un participante con nombre",
          variant: "destructive",
        })
        return
      }

      console.log("💾 Guardando cambios:", validParticipants)

      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: validParticipants,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al guardar cambios")
      }

      if (!result.success) {
        throw new Error(result.error || "Error al procesar guardado")
      }

      toast({
        title: "✅ Cambios guardados",
        description: `Se actualizaron ${result.updatedCount} participantes correctamente`,
      })

      setHasChanges(false)
      // Refrescar datos
      await fetchParticipants()
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "❌ Error al guardar",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-400 p-4 rounded-full">
                <Lock className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Panel de Administración</CardTitle>
            <p className="text-gray-600">Acceso restringido - Introduce la contraseña</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setAuthError("")
                    }}
                    placeholder="Introduce la contraseña"
                    className="text-lg p-3 border-2 border-gray-200 focus:border-red-400 rounded-lg pr-12"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {authError && <p className="text-red-500 text-sm mt-2">❌ {authError}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-bold text-lg py-3 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Shield className="h-5 w-5 mr-2" />
                Acceder al Panel
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>🔒 Acceso Seguro:</strong> Este panel permite gestionar el ranking completo del festival.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-lg">
              Panel de Administración
            </h1>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-4 text-lg text-gray-600">Cargando datos...</span>
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
            <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-lg">
              Panel de Administración
            </h1>
          </div>
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <div className="text-red-500 text-lg mb-4">Error: {error}</div>
            <Button
              onClick={fetchParticipants}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Shield className="h-12 w-12 text-red-500 mr-4" />
            <h1 className="poster-title text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-lg">
              Panel de Administración
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">Gestión del ranking de participantes</p>

          <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
            <Button
              onClick={fetchParticipants}
              disabled={loading}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </Button>

            <Button
              onClick={saveChanges}
              disabled={saving || !hasChanges}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Save className={`h-4 w-4 ${saving ? "animate-pulse" : ""}`} />
              <span>{saving ? "Guardando..." : "Guardar Cambios"}</span>
            </Button>

            <Button
              onClick={addNewParticipant}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>Agregar Participante</span>
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: {new Date(lastUpdated).toLocaleString("es-ES")}
            </p>
          )}

          {hasChanges && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-medium">⚠️ Hay cambios sin guardar</p>
            </div>
          )}
        </div>

        {/* Participantes */}
        <div className="space-y-4">
          {participants.map((participant, index) => (
            <Card
              key={`${participant.nombre}-${index}`}
              className="bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">
                    Posición #{participant.position} (Fila {participant.rowNumber})
                  </span>
                  <Button
                    onClick={() => removeParticipant(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Campos de edición */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`nombre-${index}`} className="text-sm font-medium text-gray-700">
                        Nombre del Participante
                      </Label>
                      <Input
                        id={`nombre-${index}`}
                        type="text"
                        value={participant.nombre}
                        onChange={(e) => handleParticipantChange(index, "nombre", e.target.value)}
                        placeholder="Nombre del participante"
                        className="text-lg p-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`puntos-${index}`} className="text-sm font-medium text-gray-700">
                        Puntos
                      </Label>
                      <Input
                        id={`puntos-${index}`}
                        type="number"
                        value={participant.puntos}
                        onChange={(e) => handleParticipantChange(index, "puntos", e.target.value)}
                        placeholder="0"
                        className="text-lg p-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Botones de suma rápida */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Plus className="h-4 w-4 text-green-500" />
                      <span>Suma Rápida</span>
                    </Label>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                      {QUICK_ADD_VALUES.map((value) => (
                        <Button
                          key={value}
                          onClick={() => handleQuickAdd(index, value)}
                          variant="outline"
                          size="sm"
                          className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:border-green-300 font-semibold transition-all duration-200 transform hover:scale-105"
                        >
                          +{value}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {participants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No hay participantes en el ranking.</p>
            <Button
              onClick={addNewParticipant}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Agregar Primer Participante
            </Button>
          </div>
        )}

        {/* Información */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🔧 Panel de Administración</h3>
          <p className="text-gray-700 mb-2">
            Desde aquí puedes gestionar todos los participantes del ranking de forma segura.
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Los cambios se sincronizan directamente con Google Sheets</p>
            <p>• Puedes agregar, editar o eliminar participantes</p>
            <p>• Usa los botones de suma rápida para agregar puntos fácilmente</p>
            <p>• Los cambios se reflejan inmediatamente en el ranking público</p>
            <p>• Esta página está protegida con contraseña</p>
          </div>
        </div>
      </div>
    </div>
  )
}
