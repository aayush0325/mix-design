import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MixDesignInput } from "@/app/utils/calculate";

interface TargetStrengthTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    targetStrength?: number;
    standardDeviation?: number;
    xValue?: number;
    characteristicStrength?: number;
  };
}

const TargetStrengthTab: React.FC<TargetStrengthTabProps> = ({ input, setInput, inputHandler, result }) => {
  // Use fck, standardDeviation, xValue from input if available, otherwise fallback to sensible defaults
  const [fck, setFck] = useState<number>(input.grade_designation ? parseInt(input.grade_designation.replace(/\D/g, "")) : 35);
  const [standardDeviation, setStandardDeviation] = useState<number>(5); // Could be made dynamic if needed
  const [xValue, setXValue] = useState<number>(6.5); // Could be made dynamic if needed

  // Calculate both formulas
  const formula1Result = fck + 1.65 * standardDeviation;
  const formula2Result = fck + xValue;

  // Determine which is higher
  const targetStrength = Math.max(formula1Result, formula2Result);

  const headingClass = "text-black font-bold";
  const fieldClass = "bg-white border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-sm";
  const fieldHeadingClass = "text-sm text-gray-700 font-semibold mb-2";

  // Helper to display value or dash if NaN
  function displayValue(val: number | string | undefined) {
    if (val === undefined || val === null) return "-";
    if (typeof val === "number" && isNaN(val)) return "-";
    if (typeof val === "string" && (val === "NaN" || val.trim() === "")) return "-";
    return val;
  }
  // Recursively check if any result value is NaN (including nested objects)
  function hasAnyNaN(obj: any): boolean {
    if (!obj) return true; // treat missing/undefined result as invalid
    if (typeof obj !== "object") return false;
    return Object.values(obj).some(v =>
      (typeof v === "number" && isNaN(v)) ||
      (typeof v === "object" && v !== null && hasAnyNaN(v))
    );
  }
  const hasNaN = hasAnyNaN(result);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={headingClass}>Target Strength for Mix Proportioning</CardTitle>
        <CardDescription>Calculate the target mean strength for the mix design.</CardDescription>
      </CardHeader>
      <CardContent>
        {hasNaN && (
          <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
            Warning: Some inputs are incomplete or invalid. Please fill all required fields.
          </div>
        )}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-md flex flex-col">
              <Label htmlFor="fck" className={fieldHeadingClass}>Characteristic Strength (fck) MPa</Label>
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(result?.characteristicStrength)}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex flex-col">
              <Label htmlFor="standard-deviation" className={fieldHeadingClass}>Standard Deviation (S)</Label>
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(result?.standardDeviation)}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex flex-col">
              <Label htmlFor="x-value" className={fieldHeadingClass}>X Value</Label>
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(result?.xValue)}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-md col-span-3">
              <p className={fieldHeadingClass}>Target Mean Strength (max of fck + 1.65×S or fck + X):</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{displayValue(result?.targetStrength) !== '-' ? `${displayValue(result?.targetStrength)} MPa` : '-'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TargetStrengthTab;
