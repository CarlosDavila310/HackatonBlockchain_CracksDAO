
import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Leaf, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const Header = () => {
  const { toast } = useToast();
  const { currentUser, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
  };

  return (
    <header className="bg-amazon-green-600 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white p-1.5 rounded-full">
              <Leaf className="h-6 w-6 text-amazon-green-600" />
            </div>
            <span className="text-white text-xl font-bold">Sharitoken</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-white hover:text-harvest-gold-300 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-harvest-gold-300 transition-colors">
                  ¿Cómo funciona?
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white hover:text-harvest-gold-300 transition-colors">
                  Proyectos
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Mi Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Ingresar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-500">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
