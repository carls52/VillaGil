import { MapPin, Music, Instagram, Twitter, Facebook, Sparkles, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

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
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
              >
                <Link href="/registro">🎫 ¡Consigue tu entrada!</Link>
              </Button>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                12 de Julio, 2025 • Apertura de puertas 17:00 • ¡Carlitos cumple 28!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Description Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-300 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-300 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 poster-title">Descripción del Evento</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Introducción General */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-pink-500 to-cyan-400 p-4 rounded-full">
                      <Music className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 festival-text">
                    🎉 El Evento del Verano
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
                    VillaGil Fest 2025 no es solo un festival, es <strong>LA experiencia</strong> que definirá tu
                    verano. Prepárate para vivir una jornada épica donde la música, la diversión y los momentos
                    inolvidables se fusionan en el evento más esperado del año.
                  </p>
                  <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Disfruta de piscina refrescante, competiciones de dardos, beer pong, billar y ping pong, todo
                    acompañado de una barra libre que te mantendrá con energía. Además, contamos con
                    <span className="font-semibold text-pink-600"> 3 escenarios activos</span> durante todo el día con
                    los mejores artistas del momento.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dress Code */}
              <Card className="bg-gradient-to-br from-pink-100 to-purple-100 shadow-2xl border-0 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full inline-block mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 festival-text">🎟️ Dress Code</h3>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <p className="text-lg font-medium text-center text-pink-700">
                      Ven como irías a tu festival favorito... porque este lo es.
                    </p>

                    <p className="text-md leading-relaxed">
                      Camisas extravagantes, brillos de todos los tipos y looks inolvidables son más que bienvenidos.
                      ¡Queremos verte brillar tanto como la música que sonará!
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                      <p className="text-red-700 font-semibold items-center">
                        <span className="text-2xl mr-2">🚫</span>
                        Pero cuidado: <strong>queda prohibida la purpurina</strong> por el bien de la piscina y las
                        instalaciones.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comida y Bebida */}
              <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 shadow-2xl border-0 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-600 p-3 rounded-full inline-block mb-4">
                      <Utensils className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 festival-text">🍹 Barra Libre & Cena</h3>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <p className="text-lg font-medium text-center text-orange-700">
                      Todo incluido para que solo te preocupes de disfrutar
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">🍺</span>
                        <p className="text-md">
                          <strong>Barra libre</strong> con cervezas, refrescos y mojitos (hasta fin de existencias)
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="text-xl">🍽️</span>
                        <p className="text-md">
                          La <strong>cena está incluida</strong> en tu entrada
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="text-xl">🤝</span>
                        <p className="text-md">¡Y si quieres traer algo para compartir, será más que bienvenido!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
                  <div className="font-semibold">• Boikot a la Dieta</div>
                  <div className="font-semibold">• Cownoise</div>
                  <div className="font-semibold">• El Canto del Cuerdo</div>
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
                  <div className="font-semibold">• Juan Illescas</div>
                  <div className="font-semibold">• La Rodilla de Picasso</div>
                  <div className="font-semibold">• Lincoln Park</div>
                  <div className="font-semibold">• Los Cantos Rodados</div>
                  <div className="font-semibold">• Los Chorizos Picantes</div>
                  <div className="font-semibold">• Los Escarabajos</div>
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
                  <div className="font-semibold">• Noloé</div>
                  <div className="font-semibold">• Omar Montañas</div>
                  <div className="font-semibold">• Pimientos Rojos Picantes</div>
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
                    <a href="https://maps.app.goo.gl/sLW7HyLWBtHtsB2g9">Ver en Google Maps</a>
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
