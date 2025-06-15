"use client"

import { useState } from "react"
import { Medal, Award, Crown, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Participant {
  id: number
  name: string
  points: number
  position: number
}

export default function RankingPage() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "María González", points: 2850, position: 1 },
    { id: 2, name: "Carlos Rodríguez", points: 2720, position: 2 },
    { id: 3, name: "Ana Martínez", points: 2650, position: 3 },
    { id: 4, name: "Luis Fernández", points: 2480, position: 4 },
    { id: 5, name: "Sofia López", points: 2350, position: 5 },
    { id: 6, name: "Diego Ruiz", points: 2200, position: 6 },
    { id: 7, name: "Carmen Jiménez", points: 2150, position: 7 },
    { id: 8, name: "Pablo Moreno", points: 2050, position: 8 },
  ])

  const [isLoading, setIsLoading] = useState(false)

  // Función para actualizar datos desde API externa (preparada para el futuro)
  const updateRanking = async () => {
    setIsLoading(true)
    try {
      // Aquí se conectará a la API externa en Vercel
      // const response = await fetch('/api/update?id=123')
      // const data = await response.json()
      // setParticipants(data.participants)

      // Simulación de actualización por ahora
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Ranking actualizado (simulación)")
    } catch (error) {
      console.error("Error actualizando ranking:", error)
    } finally {
      setIsLoading(false)
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

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-lg">
            Leaderboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">¡Mira quién está dominando el festival!</p>
          <Button
            onClick={updateRanking}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-bold px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isLoading ? "Actualizando..." : "🔄 Actualizar Ranking"}
          </Button>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {participants.slice(0, 3).map((participant, index) => (
            <Card
              key={participant.id}
              className={`bg-gradient-to-br ${getPositionColor(participant.position)} text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300 ${
                participant.position === 1
                  ? "md:order-2 scale-110"
                  : participant.position === 2
                    ? "md:order-1"
                    : "md:order-3"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">{getPositionIcon(participant.position)}</div>
                <div className="text-3xl font-bold mb-2">#{participant.position}</div>
                <h3 className="text-xl font-bold mb-2">{participant.name}</h3>
                <div className="text-2xl font-black">{participant.points.toLocaleString()} pts</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of participants */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 festival-text">Resto de Participantes</h2>
          {participants.slice(3).map((participant) => (
            <Card
              key={participant.id}
              className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${getPositionColor(participant.position)} p-3 rounded-full`}>
                      {getPositionIcon(participant.position)}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">#{participant.position}</div>
                      <h3 className="text-xl font-semibold text-gray-700">{participant.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-purple-600">{participant.points.toLocaleString()}</div>
                    <div className="text-gray-500 font-medium">puntos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🔧 Información Técnica</h3>
          <p className="text-gray-700">
            Este ranking está preparado para conectarse a una API externa. Endpoint de ejemplo:{" "}
            <code className="bg-white px-2 py-1 rounded text-sm">/api/update?id=123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
