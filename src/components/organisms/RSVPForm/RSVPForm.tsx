import { FormEvent, useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { Select } from "../../atoms/Select/Select";
import FormField from "../../molecules/FormField/FormField";
import RadioGroup from "../../molecules/RadioGroup/RadioGroup";
import Heading from "../../atoms/Heading/Heading";

interface RSVPFormProps {
  onSubmit: (formData: RSVPFormData) => void;
  className?: string;
}

export interface RSVPFormData {
  name: string;
  phone: string;
  attending: "yes" | "no";
  guestCount: number;
}

export const RSVPForm = ({
  onSubmit,
  className,
}: RSVPFormProps) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    phone: "",
    attending: "yes",
    guestCount: 1,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({});

  const handleChange = (field: keyof RSVPFormData, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RSVPFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={cn("space-y-6 max-w-xl mx-auto", className)}>
      <Heading level={2} className="text-center">RSVP</Heading>
      
      <div className="text-center mb-6">
        <p className="text-[var(--muted-fg)] mb-4">
          ¡Queremos compartir este momento tan esperado contigo!
        </p>
        <p className="text-[var(--muted-fg)] mb-4">
          Por favor ayúdanos confirmando tu asistencia.
        </p>
        <div className="bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/30 rounded-lg p-4">
          <p className="text-[var(--brand-brown)] font-medium">- No niños -</p>
        </div>
      </div>
      
      <div className="bg-[var(--brand-olive)]/10 border border-[var(--brand-olive)]/30 rounded-lg p-4 mb-6">
        <p className="text-[var(--brand-olive)] text-sm">
          <strong>Instrucciones:</strong> Escribe las primeras 3 letras de tu nombre y da clic en la sugerencia que aparecerá desplegada. 
          Posteriormente puedes mantener o reducir la cantidad de invitados que asistirán (incluyéndote). 
          Captura todos los campos antes de dar clic en "ENVIAR"
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Nombre(s)"
          htmlFor="name"
          error={errors.name}
        >
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Escribe las primeras 3 letras de tu nombre"
          />
        </FormField>
        
        <FormField
          label="Teléfono"
          htmlFor="phone"
          error={errors.phone}
        >
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Tu número de teléfono"
          />
        </FormField>
        
        <FormField
          label="Confirmación de asistencia"
          htmlFor="attending"
        >
          <RadioGroup
            name="attending"
            options={[
              { label: "Asistiré", value: "yes" },
              { label: "No Asistiré", value: "no" },
            ]}
            defaultValue={formData.attending}
            onChange={(value) => handleChange("attending", value)}
          />
        </FormField>
        
        {formData.attending === "yes" && (
          <>
            <FormField
              label="# de Personas"
              htmlFor="guestCount"
            >
              <Select
                id="guestCount"
                value={formData.guestCount.toString()}
                onChange={(e) => handleChange("guestCount", parseInt(e.target.value, 10))}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </FormField>
            

          </>
        )}
        
        <Button type="submit" className="w-full" variant="primary">
          ENVIAR
        </Button>
      </form>
    </div>
  );
};

export default RSVPForm; 