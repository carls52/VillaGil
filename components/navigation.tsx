"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Music, Trophy } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl festival-text">VillaGil fest</span>
          </Link>

          <div className="flex space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                pathname === "/" ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Music className="h-4 w-4" />
              <span className="font-medium">Inicio</span>
            </Link>
            <Link
              href="/registro"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                pathname === "/registro" ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="font-medium">🎫 Registro</span>
            </Link>
            <Link
              href="/ranking"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                pathname === "/ranking" ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span className="font-medium">Ranking</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
