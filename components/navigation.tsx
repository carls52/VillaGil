"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Music, Trophy, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    {
      href: "/",
      label: "Inicio",
      icon: Music,
      active: pathname === "/",
    },
    {
      href: "/registro",
      label: "🎫 Registro",
      active: pathname === "/registro",
    },
    {
      href: "/ranking",
      label: "Ranking",
      icon: Trophy,
      active: pathname === "/ranking",
    },
  ]

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Music className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl festival-text">VillaGil fest</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  item.active ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button onClick={toggleMenu} variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-300 ${
                    item.active ? "bg-white/20 text-white" : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="font-medium text-lg">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
