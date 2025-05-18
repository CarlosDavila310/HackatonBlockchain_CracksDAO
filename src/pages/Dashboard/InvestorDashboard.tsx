
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import Stats from "@/components/Dashboard/Stats";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenCard from "@/components/TokenCard";
import ContractCard from "@/components/ContractCard";
import { Link } from "react-router-dom";
import { AlertCircle, SearchIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InvestorDashboard = () => {
  const { currentUser, crops, tokens, smartContracts, users } = useAppContext();

  if (!currentUser) {
    return null;
  }

  // Filtrar contratos del inversionista actual
  const investorContracts = smartContracts.filter(contract => contract.investorId === currentUser.id);
  
  // Obtener tokens financiados por este inversionista
  const fundedTokenIds = investorContracts.map(contract => contract.tokenId);
  const fundedTokens = tokens.filter(token => fundedTokenIds.includes(token.id));
  
  // Calcular estadísticas
  const totalInvestment = investorContracts.reduce((total, contract) => total + contract.amount, 0);
  
  // Obtener agricultores únicos apoyados
  const uniqueFarmerIds = [...new Set(investorContracts.map(contract => contract.farmerId))];
  const impactedFarmers = uniqueFarmerIds.length;

  const stats = {
    activeTokens: fundedTokens.length,
    totalInvestment: totalInvestment,
    impactedFarmers: impactedFarmers,
  };

  // Ordenar por fecha más reciente
  const sortedContracts = [...investorContracts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Obtener todos los tokens disponibles (no financiados completamente)
  const availableTokens = tokens.filter(token => !token.funded && !fundedTokenIds.includes(token.id));
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-earth-800">Mi Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido, {currentUser.name}. Gestiona tus inversiones y su impacto.
            </p>
          </div>
          
          <Link to="/projects">
            <Button className="mt-4 sm:mt-0 bg-harvest-gold-600 hover:bg-harvest-gold-500 text-earth-800">
              <SearchIcon className="mr-2 h-4 w-4" />
              Buscar Proyectos
            </Button>
          </Link>
        </div>

        <Stats stats={stats} userType="investor" />

        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="w-full mb-6 bg-muted/60">
              <TabsTrigger value="portfolio" className="flex-1">Mi Portafolio</TabsTrigger>
              <TabsTrigger value="opportunities" className="flex-1">Oportunidades</TabsTrigger>
              <TabsTrigger value="impact" className="flex-1">Impacto</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              {sortedContracts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedContracts.map((contract) => {
                    const token = tokens.find((t) => t.id === contract.tokenId);
                    if (!token) return null;
                    
                    const crop = crops.find((c) => c.id === token.cropId);
                    if (!crop) return null;
                    
                    const farmer = users.find((u) => u.id === contract.farmerId);
                    if (!farmer) return null;
                    
                    return (
                      <Card key={contract.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Inversión Activa</CardTitle>
                          <CardDescription>
                            {crop.productType} - {farmer.name}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ContractCard
                            contract={contract}
                            token={token}
                            farmer={farmer}
                            crop={crop}
                            showFarmer={true}
                          />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Alert className="bg-muted/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No tienes inversiones activas</AlertTitle>
                  <AlertDescription>
                    Explora los proyectos disponibles para comenzar a invertir y generar impacto.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="opportunities">
              {availableTokens.length > 0 ? (
                <div>
                  <h3 className="text-xl font-medium mb-4">Proyectos recomendados para ti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {availableTokens.slice(0, 3).map((token) => {
                      const crop = crops.find((c) => c.id === token.cropId);
                      if (!crop) return null;
                      
                      const farmer = users.find((u) => u.id === token.farmerId);
                      if (!farmer) return null;
                      
                      return (
                        <TokenCard
                          key={token.id}
                          token={token}
                          crop={crop}
                          farmer={farmer}
                          onFund={() => {}}
                        />
                      );
                    })}
                  </div>
                  <div className="text-center mt-8">
                    <Link to="/projects">
                      <Button className="bg-amazon-green-600 hover:bg-amazon-green-700">
                        Ver todos los proyectos
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Alert className="bg-muted/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No hay proyectos disponibles</AlertTitle>
                  <AlertDescription>
                    Actualmente no hay proyectos disponibles para financiar. Vuelve a revisar pronto.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="impact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Tu Impacto Social</CardTitle>
                    <CardDescription>Contribución a comunidades y agricultores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-4xl font-bold text-amazon-green-600">
                          {impactedFarmers}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Agricultores apoyados directamente
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-4xl font-bold text-harvest-gold-600">
                          {sortedContracts.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Proyectos financiados
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm mb-2">
                          Tus inversiones están apoyando directamente a pequeños agricultores y cooperativas en la Amazonía peruana, ayudándoles a acceder a financiamiento justo y a mejorar sus prácticas de cultivo.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tu Impacto Ambiental</CardTitle>
                    <CardDescription>Contribución a la sostenibilidad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-4xl font-bold text-amazon-green-600">
                          {investorContracts.length * 2}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Hectáreas de cultivo sostenible
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-4xl font-bold text-earth-700">
                          {Math.round(totalInvestment * 0.015)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Toneladas de CO₂ compensadas (estimación)
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm mb-2">
                          Al apoyar prácticas agrícolas sostenibles, estás contribuyendo a la conservación del bosque amazónico, promoviendo la biodiversidad y ayudando a mitigar el cambio climático.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default InvestorDashboard;
