
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartContract, Token, User, Crop } from "@/context/AppContext";
import { Calendar, TreeDeciduous, DollarSign } from "lucide-react";

interface ContractCardProps {
  contract: SmartContract;
  token: Token;
  farmer: User;
  crop: Crop;
  showFarmer?: boolean;
}

const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  token,
  farmer,
  crop,
  showFarmer = false,
}) => {
  const formattedDate = new Date(contract.createdAt).toLocaleDateString(
    "es-PE",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Calcula la fecha de vencimiento (creación + plazo en meses)
  const dueDate = new Date(contract.createdAt);
  dueDate.setMonth(dueDate.getMonth() + contract.term);
  const formattedDueDate = dueDate.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
  });

  // Calcula el interés total
  const totalInterest = contract.amount * (contract.interestRate / 100) * (contract.term / 12);
  const totalReturn = contract.amount + totalInterest;

  return (
    <Card className="overflow-hidden border-l-4 border-l-harvest-gold-600">
      <CardHeader className="bg-muted pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>
            Contrato: {token.tokenSymbol} 
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            #{contract.id.substring(0, 8)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <TreeDeciduous className="h-4 w-4 mr-2 text-amazon-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Cultivo</p>
              <p>{crop.productType} ({crop.quantity} {crop.unit})</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-amazon-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Fecha</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
        
        {showFarmer && (
          <div className="pt-2 border-t border-dashed border-muted">
            <div className="text-xs text-muted-foreground mb-1">Productor</div>
            <div className="font-medium">{farmer.name}</div>
            {farmer.location && (
              <div className="text-xs text-muted-foreground">{farmer.location}</div>
            )}
          </div>
        )}
        
        <div className="pt-2 border-t border-dashed border-muted space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monto invertido:</span>
            <span className="font-medium">S/ {contract.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tasa anual:</span>
            <span>{contract.interestRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plazo:</span>
            <span>{contract.term} meses</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Término:</span>
            <span>{formattedDueDate}</span>
          </div>
        </div>
        
        <div className="bg-harvest-gold-50 p-3 rounded-md border border-harvest-gold-100 mt-3">
          <div className="text-sm font-medium flex items-center mb-1">
            <DollarSign className="h-4 w-4 mr-1 text-harvest-gold-600" />
            Retorno estimado
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Interés:</span>
            <span className="font-medium text-sm">S/ {totalInterest.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-harvest-gold-200 pt-1 mt-1">
            <span className="font-medium">Total:</span>
            <span className="font-bold">S/ {totalReturn.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractCard;
