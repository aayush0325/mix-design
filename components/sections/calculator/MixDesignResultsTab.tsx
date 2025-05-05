import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function MixDesignResultsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mix Design Results</CardTitle>
        <CardDescription>Calculated proportions for 1 cubic meter of concrete</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">Cement</p>
              <p className="text-2xl font-bold">383 kg</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">Water</p>
              <p className="text-2xl font-bold">172 kg</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">Fine Aggregate</p>
              <p className="text-2xl font-bold">672 kg</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">Coarse Aggregate</p>
              <p className="text-2xl font-bold">1126 kg</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3">Mix Proportions</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-lg font-medium">1 : 1.75 : 2.94</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">(Cement : Fine Aggregate : Coarse Aggregate)</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3">Key Parameters</h4>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Water-Cement Ratio</TableCell>
                  <TableCell className="text-right">0.45</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Target Mean Strength</TableCell>
                  <TableCell className="text-right">31.6 MPa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cement Content</TableCell>
                  <TableCell className="text-right">383 kg/m³</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
