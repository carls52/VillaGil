"use client"
import { useRanking } from "../../hooks/useRanking"
import { Medal, Award, Crown, Star, RefreshCw, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RankingPage() {
  const { participants, loading, error, lastUpdated, refetch } = useRanking()

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
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="poster-title text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-lg">
              Leaderboard
            </h1>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            <span className="ml-4 text-lg text-gray-600">Cargando ranking desde Google Sheets...</span>
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
              Leaderboard
            </h1>
          </div>
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <div className="text-red-500 text-lg mb-4">Error: {error}</div>
            <p className="text-gray-600 mb-6">
              Verifica que las variables de entorno estén configuradas correctamente:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-left max-w-md mx-auto mb-6">
              <code className="text-sm">
                GOOGLE_SHEETS_ID=tu_spreadsheet_id
                <br />
                GOOGLE_SHEETS_API_KEY=tu_api_key
              </code>
            </div>
            <Button
              onClick={refetch}
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
            Leaderboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">¡Mira quién está dominando el festival!</p>
          <p className="text-lg text-gray-600 mb-6">Ranking en tiempo real desde Google Sheets</p>

          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={refetch}
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </Button>
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: {new Date(lastUpdated).toLocaleString("es-ES")}
            </p>
          )}
        </div>

        {participants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No hay participantes en el ranking aún.</p>
            <p className="text-gray-500 mt-2">Los datos se cargarán desde Google Sheets cuando estén disponibles.</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {participants.length >= 3 && (
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {participants.slice(0, 3).map((participant) => (
                  <Card
                    key={participant.nombre}
                    className={`bg-gradient-to-br ${getPositionColor(participant.position!)} text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300 ${
                      participant.position === 1
                        ? "md:order-2 scale-110"
                        : participant.position === 2
                          ? "md:order-1"
                          : "md:order-3"
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">{getPositionIcon(participant.position!)}</div>
                      <div className="text-3xl font-bold mb-2">#{participant.position}</div>
                      <h3 className="text-xl font-bold mb-2">{participant.nombre}</h3>
                      <div className="text-2xl font-black mb-4">{participant.puntos.toLocaleString()} pts</div>

                      {participant.position === 1 && (
                        <div className="mt-4">
                          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            👑 Campeón
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Resto de participantes */}
            <div className="space-y-4">
              {participants.length > 3 && (
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 festival-text">
                  Resto de Participantes
                </h2>
              )}
              {participants.slice(3).map((participant) => (
                <Card
                  key={participant.nombre}
                  className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`bg-gradient-to-r ${getPositionColor(participant.position!)} p-3 rounded-full`}>
                          {getPositionIcon(participant.position!)}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-800">#{participant.position}</div>
                          <h3 className="text-xl font-semibold text-gray-700">{participant.nombre}</h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-3xl font-black text-purple-600">
                            {participant.puntos.toLocaleString()}
                          </div>
                          <div className="text-gray-500 font-medium">puntos</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">{participants.length}</div>
                  <div className="text-gray-700 font-medium">Participantes Totales</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-100 to-cyan-200 shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">
                    {participants[0]?.puntos.toLocaleString() || 0}
                  </div>
                  <div className="text-gray-700 font-medium">Puntuación Máxima</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100 to-green-200 shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {participants.length > 0
                      ? Math.round(
                          participants.reduce((acc, p) => acc + p.puntos, 0) / participants.length,
                        ).toLocaleString()
                      : 0}
                  </div>
                  <div className="text-gray-700 font-medium">Puntuación Media</div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Información técnica */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🔧 Sistema Dinámico</h3>
          <p className="text-gray-700 mb-2">
            Este ranking se actualiza desde Google Sheets y se puede gestionar desde el panel de administración.
          </p>
        </div>
      </div>
    </div>
  )
}
