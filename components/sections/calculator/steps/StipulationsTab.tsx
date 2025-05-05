import React from "react";
import { MixDesignInput } from "@/app/utils/calculate";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface StipulationsTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
}

const StipulationsTab: React.FC<StipulationsTabProps> = ({ input, setInput, inputHandler }) => {
  // Custom class for white select/input with border
  const fieldClass = "bg-white border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-sm";
  // Use the darkest Tailwind text color for headings
  const headingClass = "text-black font-bold";
  const fieldHeadingClass = "text-sm text-gray-700 font-semibold mb-2";

  return (
    <Card>
      <CardHeader>
        <CardTitle className={headingClass}>Stipulations for Proportioning</CardTitle>
        <CardDescription>Enter the basic stipulations and requirements for the mix design.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="grade-designation" className={fieldHeadingClass}>Grade Designation</Label>
              <Select value={input.grade_designation} onValueChange={v => inputHandler(input, setInput, "grade_designation", v)}>
                <SelectTrigger id="grade-designation" className={`mt-2 w-48 ${fieldClass}`}>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {["M15", "M20", "M25", "M30", "M35", "M40"].map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="cement-type" className={fieldHeadingClass}>Type of Cement</Label>
              <Select value={input.cement_type} onValueChange={v => inputHandler(input, setInput, "cement_type", v)}>
                <SelectTrigger id="cement-type" className={`mt-2 w-48 ${fieldClass}`}>
                  <SelectValue placeholder="Select cement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opc-33">OPC 33 Grade</SelectItem>
                  <SelectItem value="opc-43">OPC 43 Grade</SelectItem>
                  <SelectItem value="opc-53">OPC 53 Grade</SelectItem>
                  <SelectItem value="ppc">PPC</SelectItem>
                  <SelectItem value="psc">PSC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="max-agg-size" className={fieldHeadingClass}>Maximum Nominal Size of Aggregate (mm)</Label>
              <Input id="max-agg-size" type="number" placeholder="20" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.max_agg_size} onChange={e => inputHandler(input, setInput, "max_agg_size", Number(e.target.value))} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="workability" className={fieldHeadingClass}>Workability (mm slump)</Label>
              <Input id="workability" type="number" placeholder="140" className={`mt-2 w-40 no-spinner ${fieldClass} text-right font-semibold`} value={input.workability_slump} onChange={e => inputHandler(input, setInput, "workability_slump", Number(e.target.value))} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <Label htmlFor="exposure-condition" className={fieldHeadingClass}>Exposure Condition</Label>
              <Select value={input.exposure_condition} onValueChange={v => inputHandler(input, setInput, "exposure_condition", v)}>
                <SelectTrigger id="exposure-condition" className={`mt-2 w-48 ${fieldClass}`}>
                  <SelectValue placeholder="Select exposure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                  <SelectItem value="very-severe">Very Severe</SelectItem>
                  <SelectItem value="extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StipulationsTab;