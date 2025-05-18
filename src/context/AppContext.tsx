
import React, { createContext, useContext, useState, useEffect } from "react";

// Definición de tipos
export type UserRole = "farmer" | "cooperative" | "investor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  location?: string;
  story?: string;
  createdAt: Date;
  certifications?: string[];
}

export interface Crop {
  id: string;
  farmerId: string;
  productType: string;
  quantity: number;
  unit: string;
  location: string;
  harvestDate: Date;
  description?: string;
  images?: string[];
  createdAt: Date;
}

export interface Token {
  id: string;
  cropId: string;
  farmerId: string;
  value: number;
  funded: boolean;
  fundedAmount: number;
  investors: string[];
  createdAt: Date;
  tokenSymbol: string;
}

export interface SmartContract {
  id: string;
  tokenId: string;
  investorId: string;
  farmerId: string;
  amount: number;
  interestRate: number;
  term: number;
  createdAt: Date;
}

interface ContextProps {
  currentUser: User | null;
  crops: Crop[];
  tokens: Token[];
  smartContracts: SmartContract[];
  users: User[];
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (userData: Omit<User, "id" | "createdAt"> & { password: string }) => Promise<User>;
  addCrop: (cropData: Omit<Crop, "id" | "createdAt">) => Promise<Crop>;
  fundToken: (tokenId: string, investorId: string, amount: number) => Promise<SmartContract>;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

// Datos de ejemplo
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Juan Ríos",
    email: "juan@agricultor.com",
    role: "farmer",
    profileImage: "/placeholder.svg",
    location: "Tarapoto, San Martín",
    story: "Mi familia ha cultivado café orgánico por tres generaciones en las laderas de la selva alta.",
    createdAt: new Date("2023-01-15"),
    certifications: ["Orgánico", "Comercio Justo"]
  },
  {
    id: "2",
    name: "Cooperativa Nuevo Amanecer",
    email: "info@nuevoamanecer.org",
    role: "cooperative",
    profileImage: "/placeholder.svg",
    location: "Moyobamba, San Martín",
    story: "Unimos a 120 familias productoras de cacao orgánico desde 2010.",
    createdAt: new Date("2022-08-10"),
    certifications: ["Orgánico", "Rainforest Alliance"]
  },
  {
    id: "3",
    name: "María Inversiones Sostenibles",
    email: "maria@inversiones.com",
    role: "investor",
    profileImage: "/placeholder.svg",
    location: "Lima, Perú",
    story: "Buscamos generar impacto positivo apoyando a pequeños productores.",
    createdAt: new Date("2023-03-22")
  }
];

const sampleCrops: Crop[] = [
  {
    id: "1",
    farmerId: "1",
    productType: "Café",
    quantity: 500,
    unit: "kg",
    location: "Tarapoto, San Martín",
    harvestDate: new Date("2023-12-15"),
    description: "Café orgánico arábica, cultivado bajo sombra a 1200 msnm",
    images: ["/placeholder.svg"],
    createdAt: new Date("2023-08-01")
  },
  {
    id: "2",
    farmerId: "1",
    productType: "Plátano",
    quantity: 1000,
    unit: "kg",
    location: "Tarapoto, San Martín",
    harvestDate: new Date("2023-10-30"),
    description: "Plátano orgánico variedad Isla",
    images: ["/placeholder.svg"],
    createdAt: new Date("2023-09-05")
  }
];

const sampleTokens: Token[] = [
  {
    id: "1",
    cropId: "1",
    farmerId: "1",
    value: 2500,
    funded: false,
    fundedAmount: 0,
    investors: [],
    createdAt: new Date("2023-08-02"),
    tokenSymbol: "CAFE-JR-23"
  },
  {
    id: "2",
    cropId: "2",
    farmerId: "1",
    value: 1500,
    funded: false,
    fundedAmount: 0,
    investors: [],
    createdAt: new Date("2023-09-06"),
    tokenSymbol: "PLAT-JR-23"
  }
];

const sampleContracts: SmartContract[] = [];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [crops, setCrops] = useState<Crop[]>(sampleCrops);
  const [tokens, setTokens] = useState<Token[]>(sampleTokens);
  const [smartContracts, setSmartContracts] = useState<SmartContract[]>(sampleContracts);

  // Cargar el usuario de localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("sharitoken_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
        localStorage.removeItem("sharitoken_user");
      }
    }
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<User> => {
    // Simulamos autenticación
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    
    // En un sistema real verificaríamos la contraseña
    setCurrentUser(user);
    localStorage.setItem("sharitoken_user", JSON.stringify(user));
    return user;
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("sharitoken_user");
  };

  // Función para registrar usuario
  const register = async (userData: Omit<User, "id" | "createdAt"> & { password: string }): Promise<User> => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date()
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem("sharitoken_user", JSON.stringify(newUser));
    return newUser;
  };

  // Función para agregar cultivo
  const addCrop = async (cropData: Omit<Crop, "id" | "createdAt">): Promise<Crop> => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`,
      createdAt: new Date()
    };
    
    setCrops(prevCrops => [...prevCrops, newCrop]);
    
    // Crear token automáticamente al registrar cultivo
    const productSymbol = cropData.productType.substring(0, 4).toUpperCase();
    const farmerInitials = currentUser?.name.split(' ').map(n => n[0]).join('') || 'XX';
    const year = new Date().getFullYear().toString().substr(-2);
    
    const newToken: Token = {
      id: `token-${Date.now()}`,
      cropId: newCrop.id,
      farmerId: cropData.farmerId,
      value: cropData.quantity * 5, // Valor simple basado en la cantidad
      funded: false,
      fundedAmount: 0,
      investors: [],
      createdAt: new Date(),
      tokenSymbol: `${productSymbol}-${farmerInitials}-${year}`
    };
    
    setTokens(prevTokens => [...prevTokens, newToken]);
    
    return newCrop;
  };

  // Función para financiar token
  const fundToken = async (tokenId: string, investorId: string, amount: number): Promise<SmartContract> => {
    // Actualizar el token
    setTokens(prevTokens => 
      prevTokens.map(token => {
        if (token.id === tokenId) {
          const newFundedAmount = token.fundedAmount + amount;
          return {
            ...token,
            fundedAmount: newFundedAmount,
            funded: newFundedAmount >= token.value,
            investors: [...token.investors, investorId]
          };
        }
        return token;
      })
    );
    
    // Crear contrato
    const token = tokens.find(t => t.id === tokenId);
    if (!token) throw new Error("Token no encontrado");
    
    const newContract: SmartContract = {
      id: `contract-${Date.now()}`,
      tokenId,
      investorId,
      farmerId: token.farmerId,
      amount,
      interestRate: 5, // Tasa de interés fija para el demo
      term: 12, // Plazo en meses
      createdAt: new Date()
    };
    
    setSmartContracts(prevContracts => [...prevContracts, newContract]);
    
    return newContract;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        crops,
        tokens,
        smartContracts,
        users,
        login,
        logout,
        register,
        addCrop,
        fundToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext debe ser usado dentro de un AppProvider");
  }
  return context;
};
