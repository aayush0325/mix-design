import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MixDesignInput } from "@/app/utils/calculate";

interface MixCalculationsTabProps {
  input: MixDesignInput;
  setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>;
  inputHandler: (input: MixDesignInput, setInput: React.Dispatch<React.SetStateAction<MixDesignInput>>, field: string, value: string | number | boolean) => void;
  result?: {
    volumeConcrete?: number;
    volumeAirEntrapped?: number;
    volumeCement?: number;
    volumeWater?: number;
    volumeAdmixture?: number;
    volumeCoarseAgg?: number;
    volumeFineAgg?: number;
    massFA?: number;
    massCA?: number;
  };
}

export default function MixCalculationsTab(props: MixCalculationsTabProps) {
  const { result } = props;

  function displayValue(val: number | undefined) {
    if (val === undefined || isNaN(val)) return "-";
    return val.toFixed(5);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mix Calculations</CardTitle>
        <CardDescription>Volume and mass calculations for the concrete mix.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Concrete Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeConcrete)} m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Air Entrapped Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeAirEntrapped)} %</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cement Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeCement)} m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Water Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeWater)} m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Admixture Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeAdmixture)} m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coarse Aggregate Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeCoarseAgg)} m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fine Aggregate Volume</TableCell>
              <TableCell className="text-right">{displayValue(result?.volumeFineAgg)} m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fine Aggregate Mass</TableCell>
              <TableCell className="text-right">{displayValue(result?.massFA)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coarse Aggregate Mass</TableCell>
              <TableCell className="text-right">{displayValue(result?.massCA)} kg</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
