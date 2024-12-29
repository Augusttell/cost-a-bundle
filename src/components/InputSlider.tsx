import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  formatValue?: (value: number) => string;
}

const InputSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = "",
  formatValue = (v) => v.toString(),
}: InputSliderProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-24 text-right"
            min={min}
            max={max}
            step={step}
          />
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        className="my-4"
      />
    </div>
  );
};

export default InputSlider;