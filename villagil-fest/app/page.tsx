import { MapPin, Music, Instagram, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Poster Display */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Poster Image */}
            <div className="relative mb-8">
              <Image
                src="/villagil-poster.png"
                alt="VillaGil fest 2025 - Cartel oficial del festival"
                width={800}
                height={1000}
                className="w-full h-auto rounded-2xl shadow-2xl mx-auto"
                priority
              />
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
              >
                🎫 ¡Consigue tu entrada!
              </Button>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                12 de Julio, 2025 • Apertura de puertas 17:00 • ¡Carlitos cumple 28!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-cyan-400 p-4 rounded-full">
                    <Music className="h-16 w-16 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 poster-title">
                  Festival de Música, Piscina, Beer Pong, Dardos y Barra Libre
                </h2>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  VillaGil fest 2025 es la celebración más épica del verano. Música en vivo, piscina refrescante, juegos
                  divertidos y una barra libre que te hará bailar hasta el amanecer. ¡Una experiencia tropical que no
                  olvidarás jamás!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full text-2xl font-bold mb-6">
              LINEUP
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">🎵 Artistas</h3>
                <div className="space-y-3 text-lg">
                  <div className="font-semibold">• James Chastain</div>
                  <div className="font-semibold">• Olivia Wilson</div>
                  <div className="font-semibold">• Pedro Fernandes</div>
                  <div className="font-semibold">• Phyllis Schwaiger</div>
                  <div className="font-semibold">• Rachelle Beaudry</div>
                  <div className="font-semibold">• Reese Miller</div>
                  <div className="font-semibold">• Richard Sanchez</div>
                  <div className="font-semibold">• Rosa María Aguado</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">👨‍🍳 Pop-up Kitchen</h3>
                <div className="space-y-3 text-lg">
                  <div className="font-semibold">• Chef Noah Schumacher</div>
                  <div className="font-semibold">• Chef Rachelle Beaudry</div>
                  <div className="font-semibold">• Chef Reese Miller</div>
                </div>
                <div className="mt-6 p-4 bg-white/20 rounded-lg">
                  <p className="text-sm">Gastronomía de primera clase para acompañar la mejor música</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🏊‍♂️</div>
                <h3 className="text-2xl font-bold mb-4">Piscina</h3>
                <p className="text-lg">Refréscate en nuestra piscina mientras suena la mejor música</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🍺</div>
                <h3 className="text-2xl font-bold mb-4">Beer Pong & Dardos</h3>
                <p className="text-lg">Compite con tus amigos en los juegos más divertidos</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🍹</div>
                <h3 className="text-2xl font-bold mb-4">Barra Libre</h3>
                <p className="text-lg">Disfruta de bebidas ilimitadas durante todo el evento</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 to-green-50">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-cyan-400 to-green-400 text-white shadow-2xl border-0 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6">📍 Ubicación</h3>
                <div className="space-y-4 text-lg">
                  <p className="text-xl font-semibold">Casa de Campo, calle Luis Tristán 7, 45008, Toledo</p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h4 className="font-bold mb-2">🚗 En coche</h4>
                      <p>Estacionamiento disponible en la zona</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">📞 Más información</h4>
                      <p>648 05 73 00</p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-white text-cyan-600 hover:bg-cyan-50 font-bold mt-6 px-8 py-3"
                  >
                    Ver en Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 poster-title">¡Síguenos para más info!</h3>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="transform hover:scale-110 transition-all duration-300">
                <Instagram className="h-12 w-12 hover:text-pink-200" />
              </a>
              <a href="#" className="transform hover:scale-110 transition-all duration-300">
                <Twitter className="h-12 w-12 hover:text-cyan-200" />
              </a>
              <a href="#" className="transform hover:scale-110 transition-all duration-300">
                <Facebook className="h-12 w-12 hover:text-blue-200" />
              </a>
            </div>
            <div className="space-y-2 text-lg">
              <p>🌐 www.reallygreatsite.com</p>
              <p>📧 hello@reallygreatsite.com</p>
              <p>📱 648 05 73 00</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/80">© 2025 VillaGil fest. Todos los derechos reservados.</p>
              <p className="text-sm text-white/60 mt-2">Get your ticket at www.reallygreatsite.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
