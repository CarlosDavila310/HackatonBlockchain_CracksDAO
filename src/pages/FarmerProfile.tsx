
import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import ProfileCard from "@/components/ProfileCard";
import TokenCard from "@/components/TokenCard";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FarmerProfile = () => {
  const { id: farmerId } = useParams<{ id: string }>();
  const { users, crops, tokens } = useAppContext();
  
  // Buscar el agricultor por ID
  const farmer = users.find(user => user.id === farmerId);
  
  if (!farmer) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              No se encontró el perfil del productor. Por favor, intenta nuevamente.
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
  
  // Filtrar cultivos y tokens del agricultor
  const farmerCrops = crops.filter(crop => crop.farmerId === farmerId);
  const farmerTokens = tokens.filter(token => token.farmerId === farmerId);
  
  // Ordenar tokens por fecha de creación (más recientes primero)
  const sortedTokens = [...farmerTokens].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Obtener tokens disponibles (no financiados completamente)
  const availableTokens = sortedTokens.filter(token => !token.funded);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/projects" className="inline-flex items-center text-amazon-green-600 hover:text-amazon-green-800 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a proyectos
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <ProfileCard user={farmer} />
            
            {farmer.role === "farmer" && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium mb-3">Información adicional</h3>
                
                <div className="space-y-4">
                  {farmer.certifications && farmer.certifications.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Certificaciones</p>
                      <div className="flex flex-wrap gap-2">
                        {farmer.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="border-amazon-green-600 text-amazon-green-700">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tipos de Cultivo</p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(farmerCrops.map(crop => crop.productType))].map((type, index) => (
                        <Badge key={index} className="bg-earth-700">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">En Sharitoken desde</p>
                    <p>
                      {new Date(farmer.createdAt).toLocaleDateString('es-PE', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Acerca de {farmer.name}</h2>
              
              {farmer.story ? (
                <div className="prose max-w-none">
                  <p>{farmer.story}</p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No hay información adicional disponible sobre este productor.
                </p>
              )}
            </div>
            
            {availableTokens.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Proyectos disponibles para financiar</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {availableTokens.map((token) => {
                    const crop = farmerCrops.find((c) => c.id === token.cropId);
                    if (!crop) return null;
                    
                    return (
                      <TokenCard
                        key={token.id}
                        token={token}
                        crop={crop}
                        farmer={farmer}
                        onFund={() => {}}
                        detailed
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {availableTokens.length === 0 && farmerTokens.length > 0 && (
              <Alert className="bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sin proyectos disponibles</AlertTitle>
                <AlertDescription>
                  Actualmente este productor no tiene proyectos disponibles para financiar.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FarmerProfile;
