
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/Layout/MainLayout";
import { Leaf, TreeDeciduous, HandCoins } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import TokenCard from "@/components/TokenCard";

const Index = () => {
  const { tokens, crops, users } = useAppContext();
  
  // Obtener algunos tokens para mostrar en la página de inicio
  const featuredTokens = tokens.slice(0, 3);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-earth-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-shipibo-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tokeniza el futuro de la selva amazónica
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Cada Sharitoken es una semilla digital que representa el futuro de la selva. 
              Conecta agricultores amazónicos con el financiamiento justo que merecen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-500 px-6 py-2 h-12 text-lg">
                  Comienza ahora
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 px-6 py-2 h-12 text-lg">
                  Conocer más
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo funciona? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-earth-800">¿Cómo funciona Sharitoken?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amazon-green-100 text-amazon-green-600 mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-earth-800">Agricultores registran su producción</h3>
              <p className="text-muted-foreground">
                Los agricultores registran sus cultivos futuros, especificando producto, cantidad y fecha de cosecha.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-harvest-gold-100 text-harvest-gold-600 mb-4">
                <TreeDeciduous className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-earth-800">Se emiten tokens digitales</h3>
              <p className="text-muted-foreground">
                Convertimos la producción en tokens digitales que representan el valor futuro de la cosecha.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-earth-100 text-earth-700 mb-4">
                <HandCoins className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-earth-800">Inversionistas financian proyectos</h3>
              <p className="text-muted-foreground">
                Los inversionistas pueden apoyar directamente a los agricultores, recibiendo retornos justos y generando impacto.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tokens Destacados */}
      {featuredTokens.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-earth-800">Proyectos Destacados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTokens.map((token) => {
                const crop = crops.find((c) => c.id === token.cropId);
                const farmer = users.find((u) => u.id === token.farmerId);
                
                if (!crop || !farmer) return null;
                
                return (
                  <TokenCard 
                    key={token.id}
                    token={token}
                    crop={crop}
                    farmer={farmer}
                  />
                );
              })}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/projects">
                <Button className="bg-amazon-green-600 hover:bg-amazon-green-700 text-white">
                  Ver todos los proyectos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Impacto */}
      <section className="py-16 bg-gradient-to-br from-earth-800 to-earth-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Impacto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-harvest-gold-400 mb-2">120+</p>
              <p className="text-lg">Agricultores <br />Beneficiados</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-harvest-gold-400 mb-2">S/150,000</p>
              <p className="text-lg">Financiamiento <br />Generado</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-harvest-gold-400 mb-2">500+</p>
              <p className="text-lg">Hectáreas <br />Sostenibles</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-harvest-gold-400 mb-2">12</p>
              <p className="text-lg">Comunidades <br />Impactadas</p>
            </div>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-xl mb-6">
              "Apoya con propósito, cultiva impacto. Cada inversión fortalece comunidades amazónicas y protege nuestros bosques."
            </p>
            <Link to="/register">
              <Button className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-500">
                Únete al Impacto
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-earth-800">Testimonios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 relative">
              <div className="text-4xl text-amazon-green-300 absolute top-4 left-4">"</div>
              <p className="text-lg mt-6 mb-4 text-earth-700">
                Gracias a Sharitoken pude financiar mi cosecha de café orgánico y mejorar mis técnicas de cultivo. Ahora recibo precio justo y tengo acceso a mercados internacionales.
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-gray-300 h-12 w-12 rounded-full"></div>
                <div>
                  <p className="font-semibold text-earth-800">Miguel Sangama</p>
                  <p className="text-sm text-muted-foreground">Agricultor de café, Moyobamba</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 relative">
              <div className="text-4xl text-amazon-green-300 absolute top-4 left-4">"</div>
              <p className="text-lg mt-6 mb-4 text-earth-700">
                Como inversionista, valoro la transparencia de Sharitoken y la conexión directa con los productores. Sé exactamente qué impacto genera mi inversión en las comunidades amazónicas.
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-gray-300 h-12 w-12 rounded-full"></div>
                <div>
                  <p className="font-semibold text-earth-800">Claudia Mendoza</p>
                  <p className="text-sm text-muted-foreground">Inversionista de impacto, Lima</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-shipibo-pattern bg-earth-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-earth-800">
            ¿Listo para ser parte del cambio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-earth-700">
            Únete a nuestra comunidad y forma parte de esta revolución que conecta el campo amazónico con financiamiento justo y sostenible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-amazon-green-600 hover:bg-amazon-green-700 text-white px-6 py-2 h-12 text-lg">
                Registrarme
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="border-amazon-green-600 text-amazon-green-600 hover:bg-amazon-green-50 px-6 py-2 h-12 text-lg">
                Ver Proyectos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
