
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-earth-800 text-white border-t-4 border-harvest-gold-600 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sharitoken</h3>
            <p className="text-gray-300 mb-4">
              Plataforma de tokenización que conecta agricultores amazónicos con financiamiento justo.
            </p>
            <div className="shipibo-border inline-block px-6 py-2">
              <p className="text-harvest-gold-500 font-medium">
                "Cada Sharitoken es una semilla digital que representa el futuro de la selva."
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-harvest-gold-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-harvest-gold-500 transition-colors">
                  ¿Cómo funciona?
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-harvest-gold-500 transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-harvest-gold-500 transition-colors">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-gray-300">
              <p>Comunidad Agrícola San Martín</p>
              <p>Tarapoto, Perú</p>
              <p className="mt-2">
                <a href="mailto:info@sharitoken.com" className="text-harvest-gold-500 hover:underline">
                  info@sharitoken.com
                </a>
              </p>
              <p>
                <a href="tel:+51987654321" className="text-harvest-gold-500 hover:underline">
                  +51 987 654 321
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Sharitoken. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
