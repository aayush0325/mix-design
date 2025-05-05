import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MixDesignInput } from "@/app/utils/calculate";

interface BulkDensityTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
      volumes?: {
        cement?: number;
        fineAgg?: number;
        ca20?: number;
        ca10?: number;
      };
      caSplit?: {
        ca20Fraction?: number;
        ca10Fraction?: number;
        weightCa20?: number;
        weightCa10?: number;
      };
      bulkDensities?: {
        cement?: number;
        fineAgg?: number;
        ca20?: number;
        ca10?: number;
      };
      volumeBatchRatios?: {
        water?: number;
        cement?: number;
        sand?: number;
        ca20?: number;
        ca10?: number;
      };
      weightBatchRatios?: {
        water?: number;
        cement?: number;
        sand?: number;
        ca20?: number;
        ca10?: number;
      };
    };
}

const BulkDensityTab: React.FC<BulkDensityTabProps> = ({ input, setInput, inputHandler, result }) => {
  // Helper to display value or dash if NaN
  function displayValue(val: number | string | undefined) {
    if (val === undefined || val === null) return "-";
    if (typeof val === "number" && (isNaN(val) || !isFinite(val))) return "-";
    if (typeof val === "string" && (val === "NaN" || val === "Infinity" || val === "-Infinity" || val.trim() === "")) return "-";
    return val;
  }

  // Recursively check if any result value is NaN (including nested objects)
  function hasAnyNaN(obj: any): boolean {
    console.log(result)
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
        <CardTitle className="text-black font-bold">Volume of aggregate and cement as per bulk density</CardTitle>
        <CardDescription>Enter bulk densities (highlighted) and view the calculated volumes and weights.</CardDescription>
      </CardHeader>
      <CardContent>
        {hasNaN && (
          <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
            Warning: Some inputs are incomplete or invalid. Please fill all required fields.
          </div>
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="font-semibold">Volume of cement</div>
            <div>{displayValue(result?.volumes?.cement)} m³</div>
            <div className="font-semibold">Volume of fine aggregate</div>
            <div>{displayValue(result?.volumes?.fineAgg)} m³</div>
            <div className="font-semibold">Volume of CA20</div>
            <div>{displayValue(result?.volumes?.ca20)} m³</div>
            <div className="font-semibold">Volume of CA10</div>
            <div>{displayValue(result?.volumes?.ca10)} m³</div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-lg mt-6">
            <div className="font-semibold">bulk density cement</div>
            <Input type="number" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" step="any" value={input.bulk_density_cement ?? ""} onChange={e => { if (/^\d*\.?\d*$/.test(e.target.value) || e.target.value === '') inputHandler(input, setInput, "bulk_density_cement", e.target.value === '' ? '' : Number(e.target.value)); }} className="w-24" style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'textfield' }} />
            <div className="font-semibold">bulk density fine aggregate</div>
            <Input type="number" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" step="any" value={input.bulk_density_fa ?? ""} onChange={e => { if (/^\d*\.?\d*$/.test(e.target.value) || e.target.value === '') inputHandler(input, setInput, "bulk_density_fa", e.target.value === '' ? '' : Number(e.target.value)); }} className="w-24" style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'textfield' }} />
            <div className="font-semibold">bulk density CA20</div>
            <Input type="number" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" step="any" value={input.bulk_density_ca20 ?? ""} onChange={e => { if (/^\d*\.?\d*$/.test(e.target.value) || e.target.value === '') inputHandler(input, setInput, "bulk_density_ca20", e.target.value === '' ? '' : Number(e.target.value)); }} className="w-24" style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'textfield' }} />
            <div className="font-semibold">bulk density CA10</div>
            <Input type="number" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" step="any" value={input.bulk_density_ca10 ?? ""} onChange={e => { if (/^\d*\.?\d*$/.test(e.target.value) || e.target.value === '') inputHandler(input, setInput, "bulk_density_ca10", e.target.value === '' ? '' : Number(e.target.value)); }} className="w-24" style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'textfield' }} />
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-lg mt-6">
            <div className="font-semibold">ca20 fraction (0-1)</div>
            <Input 
              type="number" 
              inputMode="decimal" 
              pattern="[0-9]*\.?[0-9]*" 
              step="0.01" 
              min="0" 
              max="1"
              value={input.ca20_fraction} 
              onChange={e => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                if (value >= 0 && value <= 1) {
                  inputHandler(input, setInput, "ca20_fraction", value);
                  // Update ca10_fraction to complement ca20_fraction
                  inputHandler(input, setInput, "ca10_fraction", 1 - value);
                }
              }}
              className="w-24" 
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'textfield' }} 
            />
            <div className="font-semibold">ca10 fraction (0-1)</div>
            <Input 
              type="number" 
              inputMode="decimal" 
              pattern="[0-9]*\.?[0-9]*" 
              step="0.01" 
              min="0" 
              max="1"
              value={input.ca10_fraction}
              onChange={e => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                if (value >= 0 && value <= 1) {
                  inputHandler(input, setInput, "ca10_fraction", value);
                  // Update ca20_fraction to complement ca10_fraction
                  inputHandler(input, setInput, "ca20_fraction", 1 - value);
                }
              }}
              className="w-24" 
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'textfield' }} 
            />
          </div>
          <div className="mt-8">
            <table className="w-full text-base border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Ratio of</th>
                  <th className="border px-4 py-2">CA20</th>
                  <th className="border px-4 py-2">CA10</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Ratio (%)</td>
                  <td className="border px-4 py-2">{displayValue((result?.caSplit?.ca20Fraction ?? 0) * 100)}</td>
                  <td className="border px-4 py-2">{displayValue((result?.caSplit?.ca10Fraction ?? 0) * 100)}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Weight (kg)</td>
                  <td className="border px-4 py-2">{displayValue(result?.caSplit?.weightCa20)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.caSplit?.weightCa10)}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Volume (m³)</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumes?.ca20)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumes?.ca10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <table className="w-full text-base border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">water</th>
                  <th className="border px-4 py-2">cement</th>
                  <th className="border px-4 py-2">sand</th>
                  <th className="border px-4 py-2">CA20</th>
                  <th className="border px-4 py-2">CA10</th>
                  <th className="border px-4 py-2">remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">{displayValue(result?.weightBatchRatios?.water)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.weightBatchRatios?.cement)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.weightBatchRatios?.sand)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.weightBatchRatios?.ca20)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.weightBatchRatios?.ca10)}</td>
                  <td className="border px-4 py-2">wt. batching</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">{displayValue(result?.volumeBatchRatios?.water)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeBatchRatios?.cement)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeBatchRatios?.sand)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeBatchRatios?.ca20)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeBatchRatios?.ca10)}</td>
                  <td className="border px-4 py-2">vol. batching</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkDensityTab;
