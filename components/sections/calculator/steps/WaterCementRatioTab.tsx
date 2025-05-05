import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MixDesignInput } from "@/app/utils/calculate";

interface WaterCementRatioTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    maxWcRatio?: number;
    adoptedWcRatio?: number;
    wcCheck?: string;
  };
}

export default function WaterCementRatioTab(props: WaterCementRatioTabProps) {
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
        <div className="flex justify-between items-center w-full">
          <div>
            <CardTitle className={headingClass}>Selection of Water-Cement Ratio</CardTitle>
            <CardDescription>
              Enter the maximum and adopted water-cement ratios and check compliance per IS 456 Table 5.
            </CardDescription>
          </div>
        </div>
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
              <p className="text-sm text-gray-500">Max Water-Cement Ratio (IS 456 Table 5)</p>
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(result?.maxWcRatio)}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-500">Adopted Water-Cement Ratio</p>
              <Input
                type="number"
                step="0.01"
                className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`}
                value={input.adopted_wc_ratio}
                onChange={e => inputHandler(input, setInput, "adopted_wc_ratio", parseFloat(e.target.value) || 0)}
              />
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(result?.adoptedWcRatio)}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex flex-col justify-center items-center">
              <p className="text-sm text-gray-500 mb-2">Compliance Check</p>
              {typeof result?.maxWcRatio === "number" && typeof input.adopted_wc_ratio === "number" && !isNaN(result.maxWcRatio) && !isNaN(input.adopted_wc_ratio) ? (
                result.maxWcRatio === 0 ? (
                  <span className="w-32 text-center font-bold rounded px-4 py-1 bg-gray-500 text-white">No Limit Set</span>
                ) : input.adopted_wc_ratio < 0.1 ? (
                  <span className="w-32 text-center font-bold rounded px-4 py-1 bg-gray-500 text-white">Enter a Value</span>
                ) : input.adopted_wc_ratio <= result.maxWcRatio ? (
                  <span className="w-32 text-center font-bold rounded px-4 py-1 bg-green-500 text-white">OK</span>
                ) : (
                  <span className="w-32 text-center font-bold rounded px-4 py-1 bg-red-500 text-white">NOT OK</span>
                )
              ) : (
                <span className="w-32 text-center font-bold rounded px-4 py-1 bg-gray-500 text-white">Incomplete</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
