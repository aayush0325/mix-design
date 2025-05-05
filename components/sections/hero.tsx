import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Concrete Mix Design Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get precise concrete mix designs that meet your strength, durability, and workability requirements with our engineer-approved calculator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">Try Calculator</Button>
            <Button size="lg" variant="outline">Watch Demo</Button>
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Sample Mix Design</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">M25 Grade</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Quantity (kg/m³)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Cement (OPC 43)</TableCell>
                <TableCell className="text-right">383</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Water</TableCell>
                <TableCell className="text-right">172</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fine Aggregate</TableCell>
                <TableCell className="text-right">672</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coarse Aggregate</TableCell>
                <TableCell className="text-right">1126</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>W/C Ratio: 0.45 | Mix Proportion: 1 : 1.75 : 2.94</p>
          </div>
        </div>
      </div>
    </section>
  );
}
