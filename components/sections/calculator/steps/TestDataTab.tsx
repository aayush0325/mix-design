import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MixDesignInput } from "@/app/utils/calculate";

interface TestDataTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
}

const TestDataTab: React.FC<TestDataTabProps> = ({ input, setInput, inputHandler }) => {
  const headingClass = "text-black font-bold";
  const fieldClass = "bg-white border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-sm";
  const fieldHeadingClass = "text-sm text-gray-700 font-semibold mb-2";

  return (
    <Card>
      <CardHeader>
        <CardTitle className={headingClass}>Test Data for Materials</CardTitle>
        <CardDescription>Enter the test data for each material used in the mix design.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cement Type - removed as per user request */}
            {/* <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="cement-type" className={fieldHeadingClass}>Cement Used</Label>
              <Select value={input.cement_type} onValueChange={v => inputHandler(input, setInput, "cement_type", v)}>
                <SelectTrigger id="cement-type" className={`mt-2 w-48 ${fieldClass}`}>
                  <SelectValue placeholder="Select cement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opc-33">OPC 33 Grade</SelectItem>
                  <SelectItem value="opc-43">OPC 43 Grade</SelectItem>
                  <SelectItem value="opc-53">OPC 53 Grade</SelectItem>
                  <SelectItem value="ppc-43">PPC 43 Grade</SelectItem>
                  <SelectItem value="ppc-53">PPC 53 Grade</SelectItem>
                  <SelectItem value="psc">PSC</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            {/* Specific Gravity of Cement */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="cement-sg" className={fieldHeadingClass}>Specific Gravity of Cement</Label>
              <Input id="cement-sg" type="number" step="0.01" placeholder="2.9" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.cement_sg} onChange={e => inputHandler(input, setInput, "cement_sg", Number(e.target.value))} />
            </div>
            {/* Chemical Admixture */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="admixture-type" className={fieldHeadingClass}>Chemical Admixture</Label>
              <Select value={input.admixture_sg ? "superplasticizer" : "none"} onValueChange={v => inputHandler(input, setInput, "admixture_sg", v === "superplasticizer" ? 1.2 : 0)} disabled={!input.use_superplasticizer}>
                <SelectTrigger id="admixture-type" className={`mt-2 w-48 ${fieldClass}`} disabled={!input.use_superplasticizer}>
                  <SelectValue placeholder="Select admixture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="plasticizer">Plasticizer</SelectItem>
                  <SelectItem value="superplasticizer">Superplasticizer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Admixture Used? */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="admixture-used" className={fieldHeadingClass}>Admixture Used?</Label>
              <Select value={input.use_superplasticizer ? "yes" : "no"} onValueChange={v => inputHandler(input, setInput, "use_superplasticizer", v === "yes") }>
                <SelectTrigger id="admixture-used" className={`mt-2 w-48 ${fieldClass}`}>
                  <SelectValue placeholder="Used?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Specific Gravity of Fine Aggregate */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="fa-sg" className={fieldHeadingClass}>Specific Gravity of Fine Aggregate</Label>
              <Input id="fa-sg" type="number" step="0.01" placeholder="2.65" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.fa_sg} onChange={e => inputHandler(input, setInput, "fa_sg", Number(e.target.value))} />
            </div>
            {/* Specific Gravity of Coarse Aggregate */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="ca-sg" className={fieldHeadingClass}>Specific Gravity of Coarse Aggregate</Label>
              <Input id="ca-sg" type="number" step="0.01" placeholder="2.7" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.ca_sg} onChange={e => inputHandler(input, setInput, "ca_sg", Number(e.target.value))} />
            </div>
            {/* Fine Aggregate Absorption */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="fa-absorption" className={fieldHeadingClass}>Fine Aggregate Absorption (%)</Label>
              <Input id="fa-absorption" type="number" step="0.01" placeholder="0.5" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.fa_absorption} onChange={e => inputHandler(input, setInput, "fa_absorption", Number(e.target.value))} />
            </div>
            {/* Coarse Aggregate Absorption */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="ca-absorption" className={fieldHeadingClass}>Coarse Aggregate Absorption (%)</Label>
              <Input id="ca-absorption" type="number" step="0.01" placeholder="0.5" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.ca_absorption} onChange={e => inputHandler(input, setInput, "ca_absorption", Number(e.target.value))} />
            </div>
            {/* Fine Aggregate Moisture Content */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="fa-moisture" className={fieldHeadingClass}>Fine Aggregate Moisture Content (%)</Label>
              <Input id="fa-moisture" type="number" step="0.01" placeholder="0.3" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.fa_moisture} onChange={e => inputHandler(input, setInput, "fa_moisture", Number(e.target.value))} />
            </div>
            {/* Coarse Aggregate Moisture Content */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="ca-moisture" className={fieldHeadingClass}>Coarse Aggregate Moisture Content (%)</Label>
              <Input id="ca-moisture" type="number" step="0.01" placeholder="0.3" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.ca_moisture} onChange={e => inputHandler(input, setInput, "ca_moisture", Number(e.target.value))} />
            </div>
            {/* Bulk Density of Cement - removed as per user request */}
            {/* <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="bulk-density-cement" className={fieldHeadingClass}>Bulk Density of Cement (kg/m³)</Label>
              <Input id="bulk-density-cement" type="number" placeholder="1440" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.bulk_density_cement} onChange={e => inputHandler(input, setInput, "bulk_density_cement", Number(e.target.value))} />
            </div> */}
            {/* Bulk Density of Fine Aggregate - removed as per user request */}
            {/* <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="bulk-density-fa" className={fieldHeadingClass}>Bulk Density of Fine Aggregate (kg/m³)</Label>
              <Input id="bulk-density-fa" type="number" placeholder="1600" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.bulk_density_fa} onChange={e => inputHandler(input, setInput, "bulk_density_fa", Number(e.target.value))} />
            </div> */}
            {/* Bulk Density of 20mm Coarse Aggregate - removed as per user request */}
            {/* <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="bulk-density-ca20" className={fieldHeadingClass}>Bulk Density of 20mm Coarse Aggregate (kg/m³)</Label>
              <Input id="bulk-density-ca20" type="number" placeholder="1500" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.bulk_density_ca20} onChange={e => inputHandler(input, setInput, "bulk_density_ca20", Number(e.target.value))} />
            </div> */}
            {/* Bulk Density of 10mm Coarse Aggregate - removed as per user request */}
            {/* <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="bulk-density-ca10" className={fieldHeadingClass}>Bulk Density of 10mm Coarse Aggregate (kg/m³)</Label>
              <Input id="bulk-density-ca10" type="number" placeholder="1550" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.bulk_density_ca10} onChange={e => inputHandler(input, setInput, "bulk_density_ca10", Number(e.target.value))} />
            </div> */}
            {/* Use Superplasticizer? */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="use-superplasticizer" className={fieldHeadingClass}>Use Superplasticizer?</Label>
              <Select value={input.use_superplasticizer ? "yes" : "no"} onValueChange={v => inputHandler(input, setInput, "use_superplasticizer", v === "yes") }>
                <SelectTrigger id="use-superplasticizer" className={`mt-2 w-48 ${fieldClass}`}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Admixture Specific Gravity */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="admixture-sg" className={fieldHeadingClass}>Admixture Specific Gravity</Label>
              <Input id="admixture-sg" type="number" step="0.01" placeholder="1.2" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.admixture_sg} onChange={e => inputHandler(input, setInput, "admixture_sg", Number(e.target.value))} disabled={!input.use_superplasticizer} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestDataTab;
