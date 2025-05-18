
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TreeDeciduous, Leaf, DollarSign, Users } from "lucide-react";

interface StatsProps {
  stats: {
    activeTokens: number;
    totalInvestment?: number;
    totalProducts: number;
    impactedFarmers?: number;
    pendingHarvest?: number;
    fundedAmount?: number;
  };
  userType: "farmer" | "investor";
}

const Stats: React.FC<StatsProps> = ({ stats, userType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            {userType === "farmer" ? "Tokens Activos" : "Proyectos Financiados"}
          </CardDescription>
          <CardTitle className="text-2xl flex items-center space-x-2">
            <TreeDeciduous className="h-5 w-5 text-amazon-green-600" />
            <span>{stats.activeTokens}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {userType === "farmer"
              ? "Tokens disponibles para financiamiento"
              : "Proyectos en los que has invertido"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            {userType === "farmer" ? "Productos Registrados" : "Capital Invertido"}
          </CardDescription>
          <CardTitle className="text-2xl flex items-center space-x-2">
            {userType === "farmer" ? (
              <Leaf className="h-5 w-5 text-amazon-green-600" />
            ) : (
              <DollarSign className="h-5 w-5 text-harvest-gold-600" />
            )}
            <span>
              {userType === "farmer"
                ? stats.totalProducts
                : `S/ ${stats.totalInvestment?.toFixed(2) || 0}`}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {userType === "farmer"
              ? "Total de cultivos que has registrado"
              : "Total de capital que has invertido"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            {userType === "farmer" ? "Financiamiento Recibido" : "Agricultores Apoyados"}
          </CardDescription>
          <CardTitle className="text-2xl flex items-center space-x-2">
            {userType === "farmer" ? (
              <DollarSign className="h-5 w-5 text-harvest-gold-600" />
            ) : (
              <Users className="h-5 w-5 text-amazon-green-600" />
            )}
            <span>
              {userType === "farmer"
                ? `S/ ${stats.fundedAmount?.toFixed(2) || 0}`
                : stats.impactedFarmers}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {userType === "farmer"
              ? "Total recibido por tus cultivos"
              : "Productores que has ayudado a financiar"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            {userType === "farmer" ? "Cosecha Pendiente" : "Retorno Estimado"}
          </CardDescription>
          <CardTitle className="text-2xl flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-harvest-gold-600" />
            <span>
              {userType === "farmer"
                ? `${stats.pendingHarvest || 0} kg`
                : `S/ ${(stats.totalInvestment ? stats.totalInvestment * 1.05 : 0).toFixed(2)}`}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {userType === "farmer"
              ? "Producción pendiente de entregar"
              : "Proyección de retorno total (+5%)"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
