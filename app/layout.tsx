import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VillaGil fest 2025",
  description: "El festival de verano más vibrante del año",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen`}>
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
