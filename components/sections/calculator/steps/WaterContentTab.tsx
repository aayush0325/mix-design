import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MixDesignInput } from "@/app/utils/calculate";

interface WaterContentTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    base?: number;
    targetSlump?: number;
    adjustedForSlump?: number;
    afterSP?: number;
    final?: number;
    corrected?: number;
  };
}

export default function WaterContentTab(props: WaterContentTabProps) {
  const { result } = props;
  const headingClass = "text-sm text-gray-700 font-semibold mb-2";
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
        <CardTitle className="text-black font-bold">Selection of Water Content</CardTitle>
        <CardDescription>
          Calculate the water content required for the mix based on slump and admixture.
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
            {/* Base Water Content */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <label htmlFor="base-water-content" className={headingClass}>Base Water Content (50mm slump)</label>
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(props.result?.base)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg</span>
            </div>
            {/* Required Slump */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <label htmlFor="required-slump" className={headingClass}>Required Slump (mm)</label>
              <span className="text-2xl font-bold text-gray-900 mt-2">{displayValue(props.result?.targetSlump)}</span>
            </div>
            {/* Superplasticizer at the rate by weight of cement */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <label htmlFor="sp-percent" className={headingClass}>Amount of superplasticizer at the rate by weight of cement</label>
              <Input
                id="sp-percent"
                type="number"
                step="0.01"
                placeholder="1.0"
                value={props.input.superplasticizer_pct}
                onChange={e => props.inputHandler(props.input, props.setInput, "superplasticizer_pct", Number(e.target.value))}
                className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`}
                disabled={!props.input.use_superplasticizer}
              />
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">%</span>
            </div>
            {/* Superplasticizer Reduction */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <label htmlFor="sp-reduction" className={headingClass}>Superplasticizer Reduction (%)</label>
              <Input
                id="sp-reduction"
                type="number"
                value={props.input.water_reduction_pct}
                onChange={e => props.inputHandler(props.input, props.setInput, "water_reduction_pct", Number(e.target.value))}
                className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`}
                disabled={!props.input.use_superplasticizer}
              />
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">%</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Estimated Water Content for Slump */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <span className={headingClass}>Estimated Water Content for Slump</span>
              <span className="text-2xl font-bold text-black mt-2 block">{displayValue(props.result?.adjustedForSlump)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg</span>
            </div>
            {/* Final Water Content (after SP reduction) */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <span className={headingClass}>Final Water Content (after SP reduction)</span>
              <span className="text-2xl font-bold text-black mt-2 block">{displayValue(props.result?.afterSP)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Final */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <span className={headingClass}>Final</span>
              <span className="text-2xl font-bold text-black mt-2 block">{displayValue(props.result?.final)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg</span>
            </div>
            {/* Corrected */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <span className={headingClass}>Corrected</span>
              <span className="text-2xl font-bold text-black mt-2 block">{displayValue(props.result?.corrected)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">kg</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
