"use client"

import { Medal, Award, Crown, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Participant {
  nombre: string
  puntos: number
  position: number
}

interface RankingTableProps {
  participants?: Participant[]
}

export default function RankingTable({ participants = [] }: RankingTableProps) {
  // Datos por defecto si no se pasan participantes
  const defaultParticipants: Participant[] = [
    { nombre: "María González", puntos: 2850, position: 1 },
    { nombre: "Carlos Rodríguez", puntos: 2720, position: 2 },
    { nombre: "Ana Martínez", puntos: 2650, position: 3 },
    { nombre: "Luis Fernández", puntos: 2480, position: 4 },
    { nombre: "Sofia López", puntos: 2350, position: 5 },
    { nombre: "Diego Ruiz", puntos: 2200, position: 6 },
  ]

  const data = participants.length > 0 ? participants : defaultParticipants

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
    <div className="space-y-6">
      {/* Top 3 Podium */}
      {data.length >= 3 && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {data.slice(0, 3).map((participant) => (
            <Card
              key={participant.nombre}
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
                <h3 className="text-xl font-bold mb-2">{participant.nombre}</h3>
                <div className="text-2xl font-black">{participant.puntos.toLocaleString()} pts</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Resto de participantes */}
      <div className="space-y-4">
        {data.slice(3).map((participant) => (
          <Card
            key={participant.nombre}
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
                    <h3 className="text-xl font-semibold text-gray-700">{participant.nombre}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-purple-600">{participant.puntos.toLocaleString()}</div>
                  <div className="text-gray-500 font-medium">puntos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
