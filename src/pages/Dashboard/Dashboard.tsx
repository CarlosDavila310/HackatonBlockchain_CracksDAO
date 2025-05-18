
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import FarmerDashboard from "./FarmerDashboard";
import InvestorDashboard from "./InvestorDashboard";

const Dashboard = () => {
  const { currentUser } = useAppContext();
  
  // Redirigir al login si no hay usuario autenticado
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Mostrar dashboard según el tipo de usuario
  switch (currentUser.role) {
    case "farmer":
    case "cooperative":
      return <FarmerDashboard />;
    case "investor":
      return <InvestorDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default Dashboard;
