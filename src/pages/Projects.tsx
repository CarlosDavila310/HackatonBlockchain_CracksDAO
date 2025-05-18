import React, { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { useAppContext, Token, Crop, User } from "@/context/AppContext";
import TokenCard from "@/components/TokenCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Search } from "lucide-react";

interface FundDialogProps {
  token: Token;
  crop: Crop;
  farmer: User;
  onSuccess: () => void;
}

const FundDialog: React.FC<FundDialogProps> = ({ token, crop, farmer, onSuccess }) => {
  const { currentUser, fundToken } = useAppContext();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFund = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para financiar proyectos",
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
    
    const remainingAmount = token.value - token.fundedAmount;
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
      onSuccess();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-500">
          Financiar Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Financiar Proyecto</DialogTitle>
          <DialogDescription>
            Estás invirtiendo en {token.tokenSymbol} - {crop.productType} de {farmer.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Información del proyecto</p>
            <div className="bg-muted p-3 rounded-md">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="font-medium">Producto:</div>
                <div>{crop.productType}</div>
                <div className="font-medium">Cantidad:</div>
                <div>{crop.quantity} {crop.unit}</div>
                <div className="font-medium">Cosecha estimada:</div>
                <div>
                  {new Date(crop.harvestDate).toLocaleDateString('es-PE', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
                <div className="font-medium">Monto total:</div>
                <div>S/ {token.value.toFixed(2)}</div>
                <div className="font-medium">Financiado hasta ahora:</div>
                <div>S/ {token.fundedAmount.toFixed(2)}</div>
                <div className="font-medium">Pendiente por financiar:</div>
                <div className="font-bold text-amazon-green-700">
                  S/ {(token.value - token.fundedAmount).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">¿Cuánto deseas invertir?</p>
            <Input
              type="number"
              placeholder="Monto en soles"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Monto máximo disponible: S/ {(token.value - token.fundedAmount).toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Términos de inversión</p>
            <div className="text-xs space-y-1">
              <p>• Tasa anual: 5%</p>
              <p>• Plazo: 12 meses</p>
              <p>• Retorno estimado: S/ {(amount ? Number(amount) * 1.05 : 0).toFixed(2)}</p>
            </div>
          </div>
          
          <Button 
            className="w-full bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-700"
            onClick={handleFund}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Procesando..." : "Confirmar Inversión"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const { tokens, crops, users, currentUser } = useAppContext();
  const { toast } = useToast();
  
  // Estado para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  
  // Filtrar y ordenar tokens
  let filteredTokens = [...tokens].filter((token) => !token.funded);
  
  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filteredTokens = filteredTokens.filter((token) => {
      const crop = crops.find(c => c.id === token.cropId);
      const farmer = users.find(u => u.id === token.farmerId);
      
      if (!crop || !farmer) return false;
      
      return (
        token.tokenSymbol.toLowerCase().includes(lowerCaseSearchTerm) ||
        crop.productType.toLowerCase().includes(lowerCaseSearchTerm) ||
        farmer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        crop.location.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }
  
  if (productType) {
    filteredTokens = filteredTokens.filter((token) => {
      const crop = crops.find(c => c.id === token.cropId);
      return crop?.productType === productType;
    });
  }
  
  // Ordenar tokens
  switch (sortBy) {
    case "recent":
      filteredTokens.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "amount":
      filteredTokens.sort((a, b) => b.value - a.value);
      break;
    case "progress":
      filteredTokens.sort((a, b) => (b.fundedAmount / b.value) - (a.fundedAmount / a.value));
      break;
  }
  
  // Obtener tipos de productos únicos para el filtro
  const productTypes = [...new Set(crops.map(crop => crop.productType))];
  
  const handleFundSuccess = () => {
    toast({
      title: "Proyecto financiado exitosamente",
      description: "Tu inversión ha sido registrada y puedes verla en tu dashboard.",
    });
  };
  
  return (
    <MainLayout>
      <div className="bg-amazon-green-600 py-10 mb-6">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold mb-4">Proyectos Disponibles</h1>
          <p className="text-xl">
            Explora los proyectos agrícolas disponibles para financiar e invierte con impacto en la Amazonía peruana.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 bg-white shadow-sm rounded-lg border p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute top-[10px] left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, tipo de cultivo o ubicación..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo de cultivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los cultivos</SelectItem>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="amount">Mayor monto</SelectItem>
                <SelectItem value="progress">Mayor progreso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredTokens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTokens.map((token) => {
              const crop = crops.find(c => c.id === token.cropId);
              const farmer = users.find(u => u.id === token.farmerId);
              
              if (!crop || !farmer) return null;
              
              return (
                <TokenCard
                  key={token.id}
                  token={token}
                  crop={crop}
                  farmer={farmer}
                  onFund={currentUser && currentUser.role === "investor" ? 
                    () => {
                      if (!currentUser) {
                        toast({
                          title: "Inicia sesión para invertir",
                          description: "Necesitas una cuenta de inversionista para financiar proyectos.",
                          variant: "destructive",
                        });
                        return;
                      }
                    } : undefined
                  }
                  detailed
                />
              );
            })}
          </div>
        ) : (
          <Alert className="bg-muted/50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No se encontraron proyectos</AlertTitle>
            <AlertDescription>
              No hay proyectos que coincidan con tus filtros de búsqueda. Intenta con otros criterios.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </MainLayout>
  );
};

export default Projects;
