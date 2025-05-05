import React from "react";
import { MixDesignInput } from "@/app/utils/calculate";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface MixProportionsTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    cement?: number;
    water?: number;
    fineAgg?: number;
    coarseAgg?: number;
    admixture?: number;
    waterCementRatio?: number;
  };
}

export default function MixProportionsTab(props: MixProportionsTabProps) {
  const { result } = props;

  // Helper to display value or dash if NaN
  function displayValue(val: number | string | undefined) {
    if (val === undefined || val === null) return "-";
    if (typeof val === "number" && isNaN(val)) return "-";
    if (typeof val === "string" && (val === "NaN" || val.trim() === "")) return "-";
    return val;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mix Proportions</CardTitle>
        <CardDescription>Final mix proportions for the concrete mix.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cement</TableCell>
              <TableCell className="text-right">{displayValue(result?.cement)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Water</TableCell>
              <TableCell className="text-right">{displayValue(result?.water)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fine Aggregate</TableCell>
              <TableCell className="text-right">{displayValue(result?.fineAgg)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coarse Aggregate</TableCell>
              <TableCell className="text-right">{displayValue(result?.coarseAgg)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Admixture</TableCell>
              <TableCell className="text-right">{displayValue(result?.admixture)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Water-Cement Ratio</TableCell>
              <TableCell className="text-right">{displayValue(result?.waterCementRatio)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
