"use client"

import { useState, useEffect, useCallback } from "react"

interface Participant {
  nombre: string
  puntos: number
  position?: number
}

interface RankingData {
  participants: Participant[]
  loading: boolean
  error: string | null
  lastUpdated: string | null
}

export function useRanking() {
  const [data, setData] = useState<RankingData>({
    participants: [],
    loading: true,
    error: null,
    lastUpdated: null,
  })

  // Función para obtener el ranking
  const fetchRanking = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/ranking")

      if (!response.ok) {
        throw new Error("Failed to fetch ranking")
      }

      const result = await response.json()

      // Agregar posiciones a los participantes
      const participantsWithPositions = result.data.map((participant: Participant, index: number) => ({
        ...participant,
        position: index + 1,
      }))

      setData({
        participants: participantsWithPositions,
        loading: false,
        error: null,
        lastUpdated: result.timestamp,
      })
    } catch (error) {
      console.error("Error fetching ranking:", error)
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }))
    }
  }, [])

  // Función para actualizar puntos de un participante
  const updateParticipant = useCallback(
    async (participantId: string, points = 100) => {
      try {
        const response = await fetch("/api/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: participantId,
            points: points,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to update participant")
        }

        const result = await response.json()

        // Refrescar el ranking después de la actualización
        await fetchRanking()

        return result
      } catch (error) {
        console.error("Error updating participant:", error)
        throw error
      }
    },
    [fetchRanking],
  )

  // Cargar datos iniciales
  useEffect(() => {
    fetchRanking()
  }, [fetchRanking])

  return {
    ...data,
    refetch: fetchRanking,
    updateParticipant,
  }
}
