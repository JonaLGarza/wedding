import { ChangeEvent, useState } from "react";
import { cn } from "../../../lib/utils";
import Radio from "../../atoms/Radio/Radio";
import { Label } from "../../atoms/Label/Label";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  layout?: "horizontal" | "vertical";
}

export const RadioGroup = ({
  name,
  options,
  defaultValue = "",
  onChange,
  className,
  layout = "vertical",
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div
      className={cn(
        "space-y-2",
        layout === "horizontal" && "flex space-x-4 space-y-0 items-center",
        className
      )}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Radio
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
          <Label htmlFor={`${name}-${option.value}`} className="text-[var(--brand-olive)]">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup; 