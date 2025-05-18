
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/AppContext";
import { MapPin, Calendar, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  user: User;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, className = "" }) => {
  // Extraer iniciales para el avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Función para mostrar el tipo de usuario en formato legible
  const getUserRoleLabel = (role: string) => {
    switch (role) {
      case "farmer":
        return "Agricultor";
      case "cooperative":
        return "Cooperativa";
      case "investor":
        return "Inversionista";
      default:
        return role;
    }
  };

  // Función para obtener color de badge según rol
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "farmer":
        return "bg-amazon-green-600 hover:bg-amazon-green-700";
      case "cooperative":
        return "bg-river-blue-600 hover:bg-river-blue-700";
      case "investor":
        return "bg-harvest-gold-600 text-earth-800 hover:bg-harvest-gold-700";
      default:
        return "";
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-earth-600 to-earth-800 text-white pb-12 relative">
        <div className="absolute top-4 right-4">
          <Badge className={getRoleBadgeClass(user.role)}>
            {getUserRoleLabel(user.role)}
          </Badge>
        </div>
        <CardTitle className="text-xl">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 relative">
        <div className="avatar-container absolute -top-10 left-6">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback className="text-xl bg-amazon-green-600 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-12 space-y-4">
          {user.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-earth-700" />
              <span>{user.location}</span>
            </div>
          )}

          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-earth-700" />
            <span>
              Miembro desde{" "}
              {new Date(user.createdAt).toLocaleDateString("es-PE", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>

          {user.certifications && user.certifications.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center text-sm mb-2">
                <Award className="h-4 w-4 mr-2 text-earth-700" />
                <span>Certificaciones</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-amazon-green-600 text-amazon-green-700"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {user.story && (
            <div className="mt-4 pt-4 border-t border-muted">
              <p className="text-sm text-muted-foreground">{user.story}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
