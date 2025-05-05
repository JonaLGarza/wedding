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
  hasMealOptions?: boolean;
}

export interface RSVPFormData {
  name: string;
  email: string;
  attending: "yes" | "no";
  guestCount: number;
  mealPreference?: string;
}

export const RSVPForm = ({
  onSubmit,
  className,
  hasMealOptions = true,
}: RSVPFormProps) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    attending: "yes",
    guestCount: 1,
    mealPreference: "",
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
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (formData.attending === "yes" && hasMealOptions && !formData.mealPreference) {
      newErrors.mealPreference = "Please select a meal preference";
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Your Name"
          htmlFor="name"
          error={errors.name}
        >
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your full name"
          />
        </FormField>
        
        <FormField
          label="Email Address"
          htmlFor="email"
          error={errors.email}
        >
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your.email@example.com"
          />
        </FormField>
        
        <FormField
          label="Will you be attending?"
          htmlFor="attending"
        >
          <RadioGroup
            name="attending"
            options={[
              { label: "Yes, I'll be there", value: "yes" },
              { label: "Sorry, I can't make it", value: "no" },
            ]}
            defaultValue={formData.attending}
            onChange={(value) => handleChange("attending", value)}
          />
        </FormField>
        
        {formData.attending === "yes" && (
          <>
            <FormField
              label="Number of Guests (including yourself)"
              htmlFor="guestCount"
            >
              <Select
                id="guestCount"
                value={formData.guestCount.toString()}
                onChange={(e) => handleChange("guestCount", parseInt(e.target.value, 10))}
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </FormField>
            
            {hasMealOptions && (
              <FormField
                label="Meal Preference"
                htmlFor="mealPreference"
                error={errors.mealPreference}
              >
                <Select
                  id="mealPreference"
                  value={formData.mealPreference}
                  onChange={(e) => handleChange("mealPreference", e.target.value)}
                >
                  <option value="">Select a meal preference</option>
                  <option value="meat">Meat</option>
                  <option value="fish">Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </Select>
              </FormField>
            )}
          </>
        )}
        
        <Button type="submit" className="w-full">
          Submit RSVP
        </Button>
      </form>
    </div>
  );
};

export default RSVPForm; 