import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MixDesignInput } from "@/app/utils/calculate";

interface CementContentTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    calculated?: number;
    check?: string;
    minimum?: number;
  };
}

export default function CementContentTab(props: CementContentTabProps) {
  const { input, setInput, inputHandler, result } = props;
  const headingClass = "text-black font-bold";
  const fieldClass = "bg-white border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-sm";

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
        <CardTitle className={headingClass}>Calculation of Cement Content</CardTitle>
        <CardDescription>
          Cement content is calculated based on the adopted water-cement ratio and checked against the minimum required by IS code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasNaN && (
          <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
            Warning: Some inputs are incomplete or invalid. Please fill all required fields.
          </div>
        )}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-1 items-start">
              <span className="text-sm text-gray-700 font-semibold mb-2">Minimum Cement Content (kg/m³)</span>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.minimum)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg/m³</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-1 items-start">
              <span className="text-sm text-gray-700 font-semibold mb-2">Calculated Cement Content (kg/m³)</span>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.calculated)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg/m³</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-1 items-start">
              <span className="text-sm text-gray-700 font-semibold mb-2">Cement Check</span>
              <span className={`text-2xl font-bold mt-2 px-3 py-1 rounded ${
                result?.check === "OK" 
                  ? "bg-green-100 text-green-800" 
                  : result?.check 
                    ? "bg-red-100 text-red-800"
                    : ""
              }`}>
                {displayValue(result?.check)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
