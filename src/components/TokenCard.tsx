
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Calendar, User } from "lucide-react";
import { Token, Crop, User as UserType } from "@/context/AppContext";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface TokenCardProps {
  token: Token;
  crop: Crop;
  farmer: UserType;
  onFund?: () => void;
  detailed?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, crop, farmer, onFund, detailed = false }) => {
  const progressPercentage = (token.fundedAmount / token.value) * 100;
  const formattedHarvestDate = new Date(crop.harvestDate).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Card className={`token-card ${detailed ? 'border-harvest-gold-500' : ''}`}>
      <CardHeader className="bg-gradient-to-r from-amazon-green-600 to-amazon-green-700 text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{token.tokenSymbol}</CardTitle>
            <CardDescription className="text-amazon-green-100 mt-1">
              {crop.productType} de {farmer.location}
            </CardDescription>
          </div>
          <Badge className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-500">
            {token.funded ? "Financiado" : "Disponible"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Leaf className="h-5 w-5 text-amazon-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Producto</p>
              <p className="font-medium">{crop.productType} - {crop.quantity} {crop.unit}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-amazon-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Cosecha estimada</p>
              <p className="font-medium">{formattedHarvestDate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-amazon-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Productor</p>
              <p className="font-medium">{farmer.name}</p>
            </div>
          </div>
          
          {farmer.certifications && farmer.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {farmer.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="border-earth-700 text-earth-700">
                  {cert}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex justify-between mb-1 items-center text-sm">
              <span>Financiamiento</span>
              <span className="font-medium">
                S/ {token.fundedAmount} de S/ {token.value}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-muted" />
          </div>
          
          {detailed && crop.description && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Descripción del cultivo:</h4>
              <p className="text-sm text-muted-foreground">{crop.description}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Link 
          to={`/farmer/${farmer.id}`} 
          className="text-amazon-green-600 hover:text-amazon-green-800 font-medium text-sm underline"
        >
          Conocer al productor
        </Link>
        
        {onFund && !token.funded && (
          <Button 
            onClick={onFund} 
            className="bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-700"
          >
            Financiar Proyecto
          </Button>
        )}
        
        {!onFund && (
          <Link to={`/token/${token.id}`}>
            <Button variant="outline" className="border-amazon-green-600 text-amazon-green-600 hover:bg-amazon-green-50">
              Ver Detalles
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default TokenCard;
