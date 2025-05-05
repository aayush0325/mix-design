"use client";

import React, {useEffect, useState} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StipulationsTab from "./steps/StipulationsTab";
import TestDataTab from "./steps/TestDataTab";
import TargetStrengthTab from "./steps/TargetStrengthTab";
import WaterCementRatioTab from "./steps/WaterCementRatioTab";
import WaterContentTab from "./steps/WaterContentTab";
import CementContentTab from "./steps/CementContentTab";
import ProportionVolumeTab from "./steps/ProportionVolumeTab";
import MixCalculationsTab from "./steps/MixCalculationsTab";
import MixProportionsTab from "./steps/MixProportionsTab";
import BulkDensityTab from "./steps/BulkDensityTab";
import { MixDesignInput } from "@/app/utils/calculate";
import { concreteMixDesignIS10262} from "@/app/utils/calculate";

// Define a type for the result object returned by concreteMixDesignIS10262
export interface CalculatorResult {
  targetStrengthTab?: any;
  waterCementRatioTab?: any;
  waterContentTab?: any;
  cementContentTab?: any;
  proportionVolumeTab?: any;
  mixCalcTab?: any;
  mixPropTab?: any;
  batchingTab?: any;
}

interface CalculatorTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (field: string, value: string | number | boolean) => void;
  result?: CalculatorResult;
}

function inputHandler(input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) {
  setInput(prev => {
    return {...prev, [field]: value};
  });
}

export default function CalculatorTabs() {
  const [input, setInput] = useState<MixDesignInput>({
    grade_designation: "",
    exposure_condition: "",
    max_agg_size: 20,
    cement_type: "",
    cement_sg: 0,
    fa_zone: "II",
    fa_sg: 0,
    ca_sg: 0,
    workability_slump: 0,
    adopted_wc_ratio: 0,
    use_superplasticizer: false,
    superplasticizer_pct: 0,
    water_reduction_pct: 0,
    admixture_sg: 0,
    ca_absorption: 0,
    fa_absorption: 0,
    ca_moisture: 0,
    fa_moisture: 0,
    bulk_density_cement: 0,
    bulk_density_fa: 0,
    bulk_density_ca20: 0,
    bulk_density_ca10: 0,
    ca20_fraction: 0.60,
    ca10_fraction: 0.40,
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);

  useEffect(() => {
    // Only run calculation if grade_designation is valid
    const validGrades = ["M15", "M20", "M25", "M30", "M35", "M40"];
    if (validGrades.includes(input.grade_designation)) {
      const result = concreteMixDesignIS10262(input);
      setResult(result);
    } else {
      setResult(null);
    }
  }, [input]);

  const [showInput, setShowInput] = useState(false);
  const [showResult, setShowResult] = useState(false);

  return (
    <Tabs defaultValue="stipulations" className="w-full">
      <div className="relative w-full mb-6">
        <TabsList className="flex w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-2 gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex min-w-max">
            <TabsTrigger value="stipulations">Stipulations</TabsTrigger>
            <TabsTrigger value="testdata">Test Data</TabsTrigger>
            <TabsTrigger value="targetstrength">Target Strength</TabsTrigger>
            <TabsTrigger value="wc-ratio">W/C Ratio</TabsTrigger>
            <TabsTrigger value="watercontent">Water Content</TabsTrigger>
            <TabsTrigger value="cementcontent">Cement Content</TabsTrigger>
            <TabsTrigger value="proportionvolume">Proportion Volume</TabsTrigger>
            <TabsTrigger value="mixcalculations">Mix Calcs</TabsTrigger>
            <TabsTrigger value="mixproportions">Mix Props</TabsTrigger>
            <TabsTrigger value="bulk-density">Bulk Density</TabsTrigger>
          </div>
        </TabsList>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent" />
      </div>
      <div className="flex gap-2 mb-4 justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowInput((prev) => !prev)}
        >
          {showInput ? "Hide Input" : "Show Input"}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowResult((prev) => !prev)}
        >
          {showResult ? "Hide Result" : "Show Result"}
        </button>
      </div>
      {showInput && (
        <pre className="bg-gray-100 p-3 rounded mb-4 text-xs overflow-x-auto">
          {JSON.stringify(input, null, 2)}
        </pre>
      )}
      {showResult && (
        <pre className="bg-gray-100 p-3 rounded mb-4 text-xs overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      <TabsContent value="stipulations"><StipulationsTab input={input} setInput={setInput} inputHandler={inputHandler} /></TabsContent>
      <TabsContent value="testdata"><TestDataTab input={input} setInput={setInput} inputHandler={inputHandler} /></TabsContent>
      <TabsContent value="targetstrength"><TargetStrengthTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.targetStrengthTab} /></TabsContent>
      <TabsContent value="wc-ratio">
        <WaterCementRatioTab 
          input={input}
          setInput={setInput}
          inputHandler={inputHandler}
          result={result?.waterCementRatioTab}
        />
      </TabsContent>
      <TabsContent value="watercontent"><WaterContentTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.waterContentTab} /></TabsContent>
      <TabsContent value="cementcontent"><CementContentTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.cementContentTab} /></TabsContent>
      <TabsContent value="proportionvolume"><ProportionVolumeTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.proportionVolumeTab} /></TabsContent>
      <TabsContent value="mixcalculations"><MixCalculationsTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.mixCalcTab} /></TabsContent>
      <TabsContent value="mixproportions"><MixProportionsTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.mixPropTab} /></TabsContent>
      <TabsContent value="bulk-density"><BulkDensityTab input={input} setInput={setInput} inputHandler={inputHandler} result={result?.batchingTab} /></TabsContent>
    </Tabs>
  );
}
