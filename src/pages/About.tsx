
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, TreeDeciduous, HandCoins, Globe, BadgeCheck, Users } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-earth-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">¿Qué es Sharitoken?</h1>
          <p className="text-xl md:max-w-3xl">
            Sharitoken es una plataforma de tokenización agrícola que conecta a pequeños agricultores y cooperativas de la selva peruana con financiamiento justo y transparente.
          </p>
        </div>
      </div>
      
      {/* Cómo Funciona - Detallado */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-earth-800 text-center">¿Cómo funciona Sharitoken?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amazon-green-100 rounded-full p-4 mb-6">
                <Leaf className="h-10 w-10 text-amazon-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-earth-800">1. Registro de cultivos</h3>
              <p className="text-muted-foreground">
                Los agricultores registran sus cultivos futuros especificando producto, cantidad, ubicación y fecha estimada de cosecha.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-harvest-gold-100 rounded-full p-4 mb-6">
                <TreeDeciduous className="h-10 w-10 text-harvest-gold-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-earth-800">2. Tokenización</h3>
              <p className="text-muted-foreground">
                El sistema genera automáticamente un token digital que representa el valor futuro de la cosecha registrada.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-river-blue-100 rounded-full p-4 mb-6">
                <HandCoins className="h-10 w-10 text-river-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-earth-800">3. Financiamiento</h3>
              <p className="text-muted-foreground">
                Los inversionistas pueden explorar los proyectos disponibles, conocer a los productores y financiar directamente los tokens.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-amazon-green-100 rounded-full p-4 mb-6">
                <Globe className="h-10 w-10 text-amazon-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-earth-800">4. Contratos inteligentes</h3>
              <p className="text-muted-foreground">
                Se generan contratos automatizados que establecen las condiciones del financiamiento: monto, tasa de interés y plazo.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-harvest-gold-100 rounded-full p-4 mb-6">
                <BadgeCheck className="h-10 w-10 text-harvest-gold-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-earth-800">5. Cosecha y retorno</h3>
              <p className="text-muted-foreground">
                Los agricultores entregan la cosecha al término del plazo, y los inversionistas reciben su retorno financiero con un interés justo.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-river-blue-100 rounded-full p-4 mb-6">
                <Users className="h-10 w-10 text-river-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-earth-800">6. Impacto sostenible</h3>
              <p className="text-muted-foreground">
                Este ciclo genera impacto social y ambiental positivo al promover prácticas sostenibles y fortalecer economías locales.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beneficios */}
      <section className="py-12 bg-amazon-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-earth-800 text-center">Beneficios de Sharitoken</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="shipibo-border p-6 bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-amazon-green-700">Para los agricultores</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amazon-green-100 flex items-center justify-center text-amazon-green-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Acceso a financiamiento justo y transparente</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amazon-green-100 flex items-center justify-center text-amazon-green-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Mejora de técnicas agrícolas y sostenibilidad</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amazon-green-100 flex items-center justify-center text-amazon-green-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Precios más justos por sus productos</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amazon-green-100 flex items-center justify-center text-amazon-green-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Acceso a nuevos mercados y contactos</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amazon-green-100 flex items-center justify-center text-amazon-green-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Visibilidad de su trabajo y su historia</p>
                </li>
              </ul>
            </div>
            
            <div className="shipibo-border p-6 bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-harvest-gold-700">Para los inversionistas</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-harvest-gold-100 flex items-center justify-center text-harvest-gold-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Retorno financiero con impacto social y ambiental</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-harvest-gold-100 flex items-center justify-center text-harvest-gold-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Trazabilidad total de la inversión</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-harvest-gold-100 flex items-center justify-center text-harvest-gold-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Diversificación de portafolio en el sector agrícola</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-harvest-gold-100 flex items-center justify-center text-harvest-gold-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Conexión directa con productores amazónicos</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-harvest-gold-100 flex items-center justify-center text-harvest-gold-600 mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p>Métricas claras de impacto generado</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visión y Misión */}
      <section className="py-12 bg-earth-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-harvest-gold-400">Nuestra Misión</h3>
              <p className="text-lg mb-4">
                Conectar a agricultores amazónicos con el financiamiento justo que merecen, mientras preservamos los ecosistemas vitales de la selva peruana.
              </p>
              <p className="italic border-l-4 border-amazon-green-500 pl-4 py-2">
                "Cada Sharitoken es una semilla digital que representa el futuro de la selva."
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-harvest-gold-400">Nuestra Visión</h3>
              <p className="text-lg mb-4">
                Transformar la forma en que se financia la agricultura amazónica, creando un ecosistema donde el valor generado se distribuye equitativamente entre todos los actores.
              </p>
              <p className="italic border-l-4 border-amazon-green-500 pl-4 py-2">
                "Apoya con propósito, cultiva impacto."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-shipibo-pattern">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para formar parte de Sharitoken?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y participa en este ecosistema que está cambiando la forma de conectar el campo con la inversión.
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

export default About;
