
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/Layout/MainLayout";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

// Esquema de validación
const loginFormSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { login } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const user = await login(values.email, values.password);
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido de vuelta, ${user.name}`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: "Email o contraseña incorrectos. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-earth-800 mb-2">Iniciar Sesión</h1>
            <p className="text-muted-foreground">
              Ingresa a tu cuenta para gestionar tus proyectos
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="tucorreo@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-amazon-green-600 hover:bg-amazon-green-700"
                >
                  Iniciar Sesión
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p>
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="text-amazon-green-600 hover:text-amazon-green-800 font-medium"
                >
                  Regístrate
                </Link>
              </p>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-muted-foreground text-center mb-4">Usuarios de prueba disponibles:</p>
              <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                <div className="p-2 bg-muted rounded">
                  <p><strong>Agricultor:</strong> juan@agricultor.com</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <strong>Cooperativa:</strong> info@nuevoamanecer.org
                </div>
                <div className="p-2 bg-muted rounded">
                  <strong>Inversionista:</strong> maria@inversiones.com
                </div>
                <p className="text-center mt-1">Cualquier contraseña funciona en este demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
