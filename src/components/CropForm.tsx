
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppContext, Crop } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

// Esquema de validación con zod
const cropFormSchema = z.object({
  productType: z.string().min(2, "Ingresa un producto válido"),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La cantidad debe ser un número mayor a 0",
  }),
  unit: z.string().min(1, "Selecciona una unidad"),
  location: z.string().min(2, "Ingresa una ubicación válida"),
  harvestDate: z.date({
    required_error: "Selecciona la fecha estimada de cosecha",
  }),
  description: z.string().optional(),
});

type CropFormValues = z.infer<typeof cropFormSchema>;

interface CropFormProps {
  onSuccess?: (crop: Crop) => void;
}

const CropForm: React.FC<CropFormProps> = ({ onSuccess }) => {
  const { currentUser, addCrop } = useAppContext();
  const { toast } = useToast();
  
  const form = useForm<CropFormValues>({
    resolver: zodResolver(cropFormSchema),
    defaultValues: {
      productType: "",
      quantity: "",
      unit: "kg",
      location: currentUser?.location || "",
      description: "",
    },
  });

  const onSubmit = async (values: CropFormValues) => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para registrar cultivos",
        variant: "destructive",
      });
      return;
    }

    try {
      const newCrop = await addCrop({
        farmerId: currentUser.id,
        productType: values.productType,
        quantity: Number(values.quantity),
        unit: values.unit,
        location: values.location,
        harvestDate: values.harvestDate,
        description: values.description,
        images: [],
      });

      toast({
        title: "Cultivo registrado",
        description: "Tu cultivo ha sido registrado exitosamente y se ha generado un token Sharitoken.",
      });

      if (onSuccess) {
        onSuccess(newCrop);
      }

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al registrar el cultivo. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de cultivo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el cultivo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Café">Café</SelectItem>
                    <SelectItem value="Cacao">Cacao</SelectItem>
                    <SelectItem value="Plátano">Plátano</SelectItem>
                    <SelectItem value="Yuca">Yuca</SelectItem>
                    <SelectItem value="Maíz">Maíz</SelectItem>
                    <SelectItem value="Piña">Piña</SelectItem>
                    <SelectItem value="Papaya">Papaya</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Selecciona el tipo de producto que vas a cultivar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad esperada</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="Cantidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                      <SelectItem value="ton">Toneladas (ton)</SelectItem>
                      <SelectItem value="qq">Quintales (qq)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación del cultivo</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Tarapoto, San Martín" {...field} />
              </FormControl>
              <FormDescription>
                Indica la ubicación específica donde se encuentra tu cultivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="harvestDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha estimada de cosecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      {field.value ? (
                        format(field.value, "PP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                La fecha aproximada cuando esperas cosechar este cultivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del cultivo</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe detalles sobre tu cultivo, la variedad, técnicas de cultivo, etc."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Esta información ayudará a los inversionistas a entender mejor tu cultivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="shipibo-pattern p-4 rounded-lg border border-earth-700/20 bg-earth-50 text-earth-800">
          <h3 className="font-medium mb-2">¿Qué sucede después?</h3>
          <p className="text-sm">
            Al registrar tu cultivo, crearemos automáticamente un Sharitoken que representa el valor de tu producción futura.
            Este token podrá ser financiado por inversionistas interesados en apoyar tu trabajo.
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-amazon-green-600 hover:bg-amazon-green-700 text-white"
        >
          Registrar Cultivo
        </Button>
      </form>
    </Form>
  );
};

export default CropForm;
