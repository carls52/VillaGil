"use client"

import { useState } from "react"
import { useRanking } from "../hooks/useRanking"
import { Medal, Award, Crown, Star, RefreshCw, Plus } from "lucide-react"

interface Participant {
  nombre: string
  puntos: number
  position: number
}

export default function RankingTable() {
  const { participants, loading, error, lastUpdated, refetch, updateParticipant } = useRanking()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleUpdatePoints = async (participantName: string) => {
    try {
      setUpdating(participantName)
      await updateParticipant(participantName, 100)
    } catch (error) {
      console.error("Error updating points:", error)
      alert("Error al actualizar puntos. Inténtalo de nuevo.")
    } finally {
      setUpdating(null)
    }
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-500" />
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />
      default:
        return <Star className="h-6 w-6 text-purple-500" />
    }
  }

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "from-pink-400 to-pink-500"
      case 2:
        return "from-cyan-400 to-cyan-500"
      case 3:
        return "from-green-400 to-green-500"
      default:
        return "from-yellow-400 to-orange-500"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <span className="ml-4 text-lg text-gray-600">Cargando ranking...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <button
          onClick={refetch}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de actualizar */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 festival-text">Ranking en Vivo</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Última actualización: {new Date(lastUpdated).toLocaleString("es-ES")}
            </p>
          )}
        </div>
        <button
          onClick={refetch}
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Top 3 Podium */}
      {participants.length >= 3 && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {participants.slice(0, 3).map((participant) => (
            <div
              key={participant.nombre}
              className={`bg-gradient-to-br ${getPositionColor(participant.position)} text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300 rounded-xl p-6 ${
                participant.position === 1
                  ? "md:order-2 scale-110"
                  : participant.position === 2
                    ? "md:order-1"
                    : "md:order-3"
              }`}
            >
              <div className="text-center">
                <div className="mb-4">{getPositionIcon(participant.position)}</div>
                <div className="text-3xl font-bold mb-2">#{participant.position}</div>
                <h3 className="text-xl font-bold mb-2">{participant.nombre}</h3>
                <div className="text-2xl font-black mb-4">{participant.puntos.toLocaleString()} pts</div>

                {/* Botón para agregar puntos */}
                <button
                  onClick={() => handleUpdatePoints(participant.nombre)}
                  disabled={updating === participant.nombre}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>{updating === participant.nombre ? "Actualizando..." : "+100"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resto de participantes */}
      <div className="space-y-4">
        {participants.slice(3).map((participant) => (
          <div
            key={participant.nombre}
            className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${getPositionColor(participant.position)} p-3 rounded-full`}>
                  {getPositionIcon(participant.position)}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">#{participant.position}</div>
                  <h3 className="text-xl font-semibold text-gray-700">{participant.nombre}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-3xl font-black text-purple-600">{participant.puntos.toLocaleString()}</div>
                  <div className="text-gray-500 font-medium">puntos</div>
                </div>

                {/* Botón para agregar puntos */}
                <button
                  onClick={() => handleUpdatePoints(participant.nombre)}
                  disabled={updating === participant.nombre}
                  className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>{updating === participant.nombre ? "Actualizando..." : "+100"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Información técnica */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🔧 Sistema Dinámico</h3>
        <p className="text-gray-700 mb-2">Este ranking se actualiza en tiempo real desde Google Sheets.</p>
        <div className="text-sm text-gray-600">
          <p>
            • API Endpoint: <code className="bg-white px-2 py-1 rounded">/api/update?id=NombreParticipante</code>
          </p>
          <p>• Cada actualización suma 100 puntos al participante</p>
          <p>• Los datos se sincronizan automáticamente</p>
        </div>
      </div>
    </div>
  )
}
