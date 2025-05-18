
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import Stats from "@/components/Dashboard/Stats";
import { useAppContext, Crop, Token } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenCard from "@/components/TokenCard";
import ContractCard from "@/components/ContractCard";
import CropForm from "@/components/CropForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FarmerDashboard = () => {
  const { currentUser, crops, tokens, smartContracts, users } = useAppContext();

  if (!currentUser) {
    return null;
  }

  // Filtrar cultivos, tokens y contratos del agricultor actual
  const farmerCrops = crops.filter(crop => crop.farmerId === currentUser.id);
  const farmerTokens = tokens.filter(token => token.farmerId === currentUser.id);
  const farmerContracts = smartContracts.filter(contract => contract.farmerId === currentUser.id);

  // Calcular estadísticas
  const pendingHarvest = farmerCrops.reduce((total, crop) => total + crop.quantity, 0);
  const fundedAmount = farmerContracts.reduce((total, contract) => total + contract.amount, 0);

  const stats = {
    activeTokens: farmerTokens.length,
    totalProducts: farmerCrops.length,
    pendingHarvest: pendingHarvest,
    fundedAmount: fundedAmount,
  };

  // Ordenar por fecha más reciente
  const sortedTokens = [...farmerTokens].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const sortedContracts = [...farmerContracts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-earth-800">Mi Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido, {currentUser.name}. Gestiona tus cultivos y tokens.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0 bg-amazon-green-600 hover:bg-amazon-green-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Registrar Cultivo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Cultivo</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles de tu cultivo para crear un nuevo Sharitoken.
                </DialogDescription>
              </DialogHeader>
              <CropForm />
            </DialogContent>
          </Dialog>
        </div>

        <Stats stats={stats} userType="farmer" />

        <div className="mt-8">
          <Tabs defaultValue="tokens" className="w-full">
            <TabsList className="w-full mb-6 bg-muted/60">
              <TabsTrigger value="tokens" className="flex-1">Mis Tokens</TabsTrigger>
              <TabsTrigger value="contracts" className="flex-1">Financiamiento</TabsTrigger>
              <TabsTrigger value="crops" className="flex-1">Mis Cultivos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tokens">
              {sortedTokens.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedTokens.map((token) => {
                    const crop = farmerCrops.find((c) => c.id === token.cropId);
                    if (!crop) return null;
                    
                    return (
                      <TokenCard
                        key={token.id}
                        token={token}
                        crop={crop}
                        farmer={currentUser}
                      />
                    );
                  })}
                </div>
              ) : (
                <Alert className="bg-muted/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No tienes tokens activos</AlertTitle>
                  <AlertDescription>
                    Registra un nuevo cultivo para crear tu primer Sharitoken.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="contracts">
              {sortedContracts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedContracts.map((contract) => {
                    const token = farmerTokens.find((t) => t.id === contract.tokenId);
                    if (!token) return null;
                    
                    const crop = farmerCrops.find((c) => c.id === token.cropId);
                    if (!crop) return null;
                    
                    const investor = users.find((u) => u.id === contract.investorId);
                    if (!investor) return null;
                    
                    return (
                      <Card key={contract.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Financiamiento recibido</CardTitle>
                          <CardDescription>
                            De {investor.name} para {crop.productType}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ContractCard
                            contract={contract}
                            token={token}
                            farmer={currentUser}
                            crop={crop}
                          />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Alert className="bg-muted/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No tienes financiamiento activo</AlertTitle>
                  <AlertDescription>
                    Cuando un inversionista financie tus tokens, los contratos aparecerán aquí.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="crops">
              {farmerCrops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {farmerCrops.map((crop) => (
                    <Card key={crop.id} className="overflow-hidden">
                      <CardHeader className="bg-amazon-green-600 text-white pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{crop.productType}</span>
                          <span className="text-sm font-normal">
                            {crop.quantity} {crop.unit}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <p>
                            <span className="text-sm text-muted-foreground">Ubicación:</span>
                            <br />
                            <span className="font-medium">{crop.location}</span>
                          </p>
                          <p>
                            <span className="text-sm text-muted-foreground">Fecha de cosecha:</span>
                            <br />
                            <span className="font-medium">
                              {new Date(crop.harvestDate).toLocaleDateString('es-PE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </p>
                          {crop.description && (
                            <p>
                              <span className="text-sm text-muted-foreground">Descripción:</span>
                              <br />
                              <span>{crop.description}</span>
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert className="bg-muted/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No tienes cultivos registrados</AlertTitle>
                  <AlertDescription>
                    Registra un nuevo cultivo para empezar a usar Sharitoken.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default FarmerDashboard;
