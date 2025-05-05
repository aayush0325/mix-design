import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MixDesignInput } from "@/app/utils/calculate";

interface BulkDensityTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    weightRatio?: {
      cement?: number;
      sand?: number;
      agg?: number;
    };
    volumes?: {
      cement?: number;
      fineAgg?: number;
      CA20?: number;
      CA10?: number;
    };
    caSplit?: {
      ca20Fraction?: number;
      ca10Fraction?: number;
      weightCA20?: number;
      weightCA10?: number;
    };
    bulkDensities?: {
      cement?: number;
      fineAgg?: number;
      CA20?: number;
      CA10?: number;
    };
    volumeRatio?: {
      water?: number;
      cement?: number;
      sand?: number;
      CA20?: number;
      CA10?: number;
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
            <div>{displayValue(result?.volumes?.cement ?? (input.bulk_density_cement && result?.weightRatio?.cement ? (result.weightRatio.cement / input.bulk_density_cement).toFixed(5) : "-"))} m³</div>
            <div className="font-semibold">Volume of fine aggregate</div>
            <div>{displayValue(result?.volumes?.fineAgg ?? (input.bulk_density_fa && result?.weightRatio?.sand ? (result.weightRatio.sand / input.bulk_density_fa).toFixed(5) : "-"))} m³</div>
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
                  <td className="border px-4 py-2">{displayValue(result?.caSplit?.ca20Fraction ?? 60)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.caSplit?.ca10Fraction ?? 40)}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Weight (kg)</td>
                  <td className="border px-4 py-2">{displayValue(result?.caSplit?.weightCA20 ?? (result?.weightRatio?.agg ? (result.weightRatio.agg * (result?.caSplit?.ca20Fraction ?? 60) / 100).toFixed(2) : "-"))}</td>
                  <td className="border px-4 py-2">{displayValue(result?.caSplit?.weightCA10 ?? (result?.weightRatio?.agg ? (result.weightRatio.agg * (result?.caSplit?.ca10Fraction ?? 40) / 100).toFixed(2) : "-"))}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Volume (m³)</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumes?.CA20 ?? (input.bulk_density_ca20 && result?.weightRatio?.agg ? ((result.weightRatio.agg * (result?.caSplit?.ca20Fraction ?? 60) / 100) / input.bulk_density_ca20).toFixed(5) : "-"))}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumes?.CA10 ?? (input.bulk_density_ca10 && result?.weightRatio?.agg ? ((result.weightRatio.agg * (result?.caSplit?.ca10Fraction ?? 40) / 100) / input.bulk_density_ca10).toFixed(5) : "-"))}</td>
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
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.water ?? 0.4)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.cement ?? 1)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.sand ?? 1.43212)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.CA20 ?? 1.53336)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.CA10 ?? 1.02224)}</td>
                  <td className="border px-4 py-2">wt. batching</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.water ?? 0.52)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.cement ?? 1)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.sand ?? 1.05781)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.CA20 ?? 1.24585)}</td>
                  <td className="border px-4 py-2">{displayValue(result?.volumeRatio?.CA10 ?? 0.85736)}</td>
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
