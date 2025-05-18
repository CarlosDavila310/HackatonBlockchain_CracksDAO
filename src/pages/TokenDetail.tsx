
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, ChevronLeft, Leaf, Calendar, MapPin, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ProfileCard from "@/components/ProfileCard";

const TokenDetail = () => {
  const { id: tokenId } = useParams<{ id: string }>();
  const { tokens, crops, users, currentUser, fundToken } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Buscar el token por ID
  const token = tokens.find(t => t.id === tokenId);
  
  if (!token) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              No se encontró el token especificado. Por favor, intenta nuevamente.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Link to="/projects">
              <Button>Volver a proyectos</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Obtener información del cultivo y el agricultor
  const crop = crops.find(c => c.id === token.cropId);
  const farmer = users.find(u => u.id === token.farmerId);
  
  if (!crop || !farmer) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              La información del token está incompleta. Por favor, intenta nuevamente.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Link to="/projects">
              <Button>Volver a proyectos</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const progressPercentage = (token.fundedAmount / token.value) * 100;
  const remainingAmount = token.value - token.fundedAmount;
  
  const formattedHarvestDate = new Date(crop.harvestDate).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleFund = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para financiar proyectos",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (currentUser.role !== "investor") {
      toast({
        title: "Error",
        description: "Solo los inversionistas pueden financiar proyectos",
        variant: "destructive",
      });
      return;
    }
    
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Error",
        description: "Ingresa un monto válido",
        variant: "destructive",
      });
      return;
    }
    
    if (numAmount > remainingAmount) {
      toast({
        title: "Error",
        description: `El monto máximo que puedes financiar es S/ ${remainingAmount.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await fundToken(token.id, currentUser.id, numAmount);
      toast({
        title: "Financiamiento exitoso",
        description: `Has invertido S/ ${numAmount.toFixed(2)} en el proyecto ${token.tokenSymbol}`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar el financiamiento",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/projects" className="inline-flex items-center text-amazon-green-600 hover:text-amazon-green-800 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a proyectos
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow border">
              <div className="bg-gradient-to-r from-amazon-green-600 to-amazon-green-700 text-white p-6 rounded-t-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{token.tokenSymbol}</h1>
                    <p className="text-amazon-green-100 mt-1">
                      {crop.productType} - {farmer.name}
                    </p>
                  </div>
                  <Badge className={token.funded ? "bg-green-600" : "bg-harvest-gold-600 text-earth-800"}>
                    {token.funded ? "Financiado" : "Disponible"}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-amazon-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Producto</p>
                      <p className="font-medium">{crop.productType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-amazon-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cosecha estimada</p>
                      <p className="font-medium">{formattedHarvestDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-amazon-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p className="font-medium">{crop.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h2 className="text-xl font-medium mb-4">Detalles del cultivo</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Cantidad</p>
                      <p className="font-medium">{crop.quantity} {crop.unit}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha de registro</p>
                      <p className="font-medium">
                        {new Date(crop.createdAt).toLocaleDateString('es-PE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    {farmer.certifications && farmer.certifications.length > 0 && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Certificaciones</p>
                        <div className="flex flex-wrap gap-2">
                          {farmer.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="border-amazon-green-600 text-amazon-green-700">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {crop.description && (
                    <div className="bg-muted/50 p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Descripción</p>
                      <p>{crop.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-xl font-medium mb-4">Estado de financiamiento</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Progreso de financiamiento</span>
                      <span className="font-medium">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-muted" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor total</p>
                      <p className="font-medium">S/ {token.value.toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Financiado hasta ahora</p>
                      <p className="font-medium">S/ {token.fundedAmount.toFixed(2)}</p>
                    </div>
                    
                    {!token.funded && (
                      <div>
                        <p className="text-sm text-muted-foreground">Por financiar</p>
                        <p className="font-medium text-harvest-gold-700">
                          S/ {remainingAmount.toFixed(2)}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Inversionistas actuales</p>
                      <p className="font-medium">{token.investors.length}</p>
                    </div>
                  </div>
                  
                  {!token.funded && currentUser && currentUser.role === "investor" && (
                    <div className="bg-muted/50 p-4 rounded-md">
                      <h3 className="font-medium mb-3">Financiar este proyecto</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm mb-2">Monto a invertir (S/)</p>
                          <div className="flex gap-4">
                            <Input
                              type="number"
                              placeholder={`Máximo: S/ ${remainingAmount.toFixed(2)}`}
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                            <Button
                              className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-500"
                              onClick={handleFund}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Procesando..." : "Financiar"}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Tasa anual: 5% • Plazo: 12 meses
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!currentUser && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Inicia sesión para financiar</AlertTitle>
                      <AlertDescription className="flex gap-4 items-center">
                        <span>Debes tener una cuenta de inversionista para financiar este proyecto.</span>
                        <Link to="/login">
                          <Button size="sm">Iniciar sesión</Button>
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
            
            {crop.images && crop.images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Imágenes del cultivo</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {crop.images.map((image, i) => (
                      <div key={i} className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <img src={image} alt={`Cultivo de ${crop.productType}`} className="w-full h-full object-cover rounded-md" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-earth-700 mr-2" />
                <h2 className="text-xl font-medium">Acerca del Productor</h2>
              </div>
              
              <ProfileCard user={farmer} />
              
              <div className="mt-4 text-center">
                <Link to={`/farmer/${farmer.id}`}>
                  <Button variant="outline" className="w-full">
                    Ver perfil completo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TokenDetail;
