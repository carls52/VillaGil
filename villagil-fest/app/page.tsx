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
                src="/villagil-poster-new.jpg"
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
                  Música, Piscina, Beer Pong, Dardos, Billar y Barra Libre
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

      {/* Escenarios Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full text-2xl font-bold mb-6">
              ESCENARIOS
            </div>
            <p className="text-lg text-gray-600">3 escenarios únicos con los mejores artistas</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Escenario Piscina */}
            <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🏊‍♂️</div>
                  <h3 className="text-2xl font-bold">Escenario Piscina</h3>
                  <p className="text-cyan-100 mt-2">Música refrescante junto al agua</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold">• Amor de Lesbiana</div>
                  <div className="font-semibold">• Aparkamientos</div>
                  <div className="font-semibold">• Arde Toledo</div>
                  <div className="font-semibold">• Bosket a la Dieta</div>
                  <div className="font-semibold">• Cownoise</div>
                  <div className="font-semibold">• El Canto del Cuerpo</div>
                  <div className="font-semibold">• El Sticker</div>
                  <div className="font-semibold">• Enrique Stilos</div>
                  <div className="font-semibold">• Gansos Rosas</div>
                  <div className="font-semibold">• Good Gyal</div>
                </div>
              </CardContent>
            </Card>

            {/* Escenario Barbacoa */}
            <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🔥</div>
                  <h3 className="text-2xl font-bold">Escenario Barbacoa</h3>
                  <p className="text-orange-100 mt-2">Sabor y música al fuego</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold">• Good Puppy</div>
                  <div className="font-semibold">• Ha Ha Hate You</div>
                  <div className="font-semibold">• Imagine Unicorns</div>
                  <div className="font-semibold">• Juan Ellegas</div>
                  <div className="font-semibold">• La Rodella de Pegasso</div>
                  <div className="font-semibold">• Lengua Park</div>
                  <div className="font-semibold">• Los Gantos Rodados</div>
                  <div className="font-semibold">• Los Chorizos Picantes</div>
                  <div className="font-semibold">• Los Desgarrados</div>
                  <div className="font-semibold">• Los Mojitos de Medianoche</div>
                </div>
              </CardContent>
            </Card>

            {/* Escenario Billar */}
            <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🎱</div>
                  <h3 className="text-2xl font-bold">Escenario Billar</h3>
                  <p className="text-purple-100 mt-2">Ritmo y precisión</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold">• Miguel Torres</div>
                  <div className="font-semibold">• Nata y Warra</div>
                  <div className="font-semibold">• Noloe</div>
                  <div className="font-semibold">• Omar Montañas</div>
                  <div className="font-semibold">• Penientos Rosos Picantes</div>
                  <div className="font-semibold">• Rels A</div>
                  <div className="font-semibold">• Sons of Ayuso</div>
                  <div className="font-semibold">• The Aftersuns</div>
                  <div className="font-semibold">• Verano del 97</div>
                  <div className="font-semibold">• Viva Suiza</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full text-2xl font-bold mb-6">
              ACTIVIDADES
            </div>
            <p className="text-lg text-gray-600">Diversión garantizada para todos los gustos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Piscina */}
            <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏊‍♂️</div>
                <h3 className="text-xl font-bold mb-3">Piscina</h3>
                <p className="text-sm">Refréscate mientras disfrutas de la mejor música</p>
              </CardContent>
            </Card>

            {/* Dardos */}
            <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Dardos</h3>
                <p className="text-sm">Demuestra tu puntería en nuestro torneo de dardos</p>
              </CardContent>
            </Card>

            {/* Beer Pong */}
            <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🍺</div>
                <h3 className="text-xl font-bold mb-3">Beer Pong</h3>
                <p className="text-sm">El clásico juego que nunca pasa de moda</p>
              </CardContent>
            </Card>

            {/* Billar */}
            <Card className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎱</div>
                <h3 className="text-xl font-bold mb-3">Billar</h3>
                <p className="text-sm">Mesas profesionales para los amantes del billar</p>
              </CardContent>
            </Card>

            {/* Ping Pong */}
            <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏓</div>
                <h3 className="text-xl font-bold mb-3">Ping Pong</h3>
                <p className="text-sm">Competiciones rápidas y emocionantes</p>
              </CardContent>
            </Card>

            {/* Barra Libre */}
            <Card className="bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🍹</div>
                <h3 className="text-xl font-bold mb-3">Barra Libre</h3>
                <p className="text-sm">Bebidas ilimitadas durante todo el evento</p>
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
              <p>🌐 villa-gil.vercel.app</p>
              <p>📧 hello@reallygreatsite.com</p>
              <p>📱 648 05 73 00</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/80">© 2025 VillaGil fest. Todos los derechos reservados.</p>
              <p className="text-sm text-white/60 mt-2">Get your ticket at villa-gil.vercel.app</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
