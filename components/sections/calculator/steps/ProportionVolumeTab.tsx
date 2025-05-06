import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MixDesignInput } from "@/app/utils/calculate";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProportionVolumeTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    coarseAggProportion?: number;
    fineAggProportion?: number;
    volumeOfAggregates?: number;
    volumeOfCement?: number;
    volumeOfWater?: number;
    volumeOfAdmixture?: number;
    aggregateSize?: number;
    zone?: string;
    referenceWCratio?: number;
    baseVolume?: number;
    actualWCratio?: number;
    correctedVolumeCA?: number;
    coarseAgg?: number;
    fineAgg?: number;
  };
}

export default function ProportionVolumeTab(props: ProportionVolumeTabProps) {
  const { result } = props;
  const headingClass = "text-black font-bold";
  const fieldClass = "bg-white border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-sm";
  const fieldHeadingClass = "text-sm text-gray-700 font-semibold mb-2";

  const [aggregateSize, setAggregateSize] = useState<number>(20);
  const [zone, setZone] = useState<string>("2");
  const [referenceWCRatio, setReferenceWCRatio] = useState<number>(0.5);
  const [baseVolume, setBaseVolume] = useState<number>(0.62);
  const [actualWCRatio, setActualWCRatio] = useState<number>(0.4);
  const [correctedVolume, setCorrectedVolume] = useState<number>(0.64);

  useEffect(() => {
    const adjustment = ((referenceWCRatio - actualWCRatio) / 0.05) * 0.01;
    const newCorrectedVolume = baseVolume + adjustment;
    setCorrectedVolume(Number(newCorrectedVolume.toFixed(2)));
  }, [baseVolume, referenceWCRatio, actualWCRatio]);

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
        <CardTitle className={headingClass}>Proportion of Volume of Coarse Aggregate and Fine Aggregate Content</CardTitle>
        <CardDescription>
          Calculate the corrected proportion of coarse and fine aggregate by IS method.
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
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Aggregate Size</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.aggregateSize ?? aggregateSize)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">mm</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Fine Aggregate Zone</p>
              <Select value={props.input.fa_zone} onValueChange={(value) => props.inputHandler(props.input, props.setInput, "fa_zone", value)}>
                <SelectTrigger className="mt-2 bg-white text-xl py-3">
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">Zone I</SelectItem>
                  <SelectItem value="II">Zone II</SelectItem>
                  <SelectItem value="III">Zone III</SelectItem>
                  <SelectItem value="IV">Zone IV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Corrected Volume of CA</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.correctedVolumeCA ?? correctedVolume)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">m³</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Reference W/C Ratio</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.referenceWCratio ?? referenceWCRatio)}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Base Volume</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.baseVolume ?? baseVolume)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">m³</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Actual W/C Ratio</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.actualWCratio ?? actualWCRatio)}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Volume of Coarse Aggregate</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.coarseAgg ?? correctedVolume)}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">m³</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col">
              <p className={fieldHeadingClass}>Volume of Fine Aggregate Content</p>
              <span className="text-3xl font-bold text-gray-900 mt-2">{displayValue(result?.fineAgg ?? (1 - correctedVolume).toFixed(2))}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">m³</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
