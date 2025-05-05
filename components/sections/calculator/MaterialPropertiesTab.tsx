import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MaterialPropertiesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="cement-type">Cement Type</Label>
        <Select defaultValue="opc-43">
          <SelectTrigger id="cement-type">
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
      <div className="space-y-2">
        <Label htmlFor="cement-specific-gravity">Specific Gravity of Cement</Label>
        <Input id="cement-specific-gravity" type="number" placeholder="3.15" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fine-agg-type">Fine Aggregate Type</Label>
        <Select defaultValue="natural-sand">
          <SelectTrigger id="fine-agg-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="natural-sand">Natural Sand</SelectItem>
            <SelectItem value="crushed-sand">Crushed Sand</SelectItem>
            <SelectItem value="m-sand">Manufactured Sand</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fine-agg-sg">Specific Gravity of Fine Aggregate</Label>
        <Input id="fine-agg-sg" type="number" placeholder="2.65" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coarse-agg-type">Coarse Aggregate Type</Label>
        <Select defaultValue="crushed">
          <SelectTrigger id="coarse-agg-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crushed">Crushed Stone</SelectItem>
            <SelectItem value="gravel">Gravel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="coarse-agg-sg">Specific Gravity of Coarse Aggregate</Label>
        <Input id="coarse-agg-sg" type="number" placeholder="2.70" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fa-absorption">Fine Aggregate Absorption (%)</Label>
        <Input id="fa-absorption" type="number" step="0.01" placeholder="0.5" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ca-absorption">Coarse Aggregate Absorption (%)</Label>
        <Input id="ca-absorption" type="number" step="0.01" placeholder="0.5" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fa-moisture">Fine Aggregate Moisture Content (%)</Label>
        <Input id="fa-moisture" type="number" step="0.01" placeholder="0.3" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ca-moisture">Coarse Aggregate Moisture Content (%)</Label>
        <Input id="ca-moisture" type="number" step="0.01" placeholder="0.3" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bulk-density-cement">Bulk Density of Cement (kg/m³)</Label>
        <Input id="bulk-density-cement" type="number" placeholder="1440" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bulk-density-fa">Bulk Density of Fine Aggregate (kg/m³)</Label>
        <Input id="bulk-density-fa" type="number" placeholder="1600" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bulk-density-ca20">Bulk Density of 20mm Coarse Aggregate (kg/m³)</Label>
        <Input id="bulk-density-ca20" type="number" placeholder="1500" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bulk-density-ca10">Bulk Density of 10mm Coarse Aggregate (kg/m³)</Label>
        <Input id="bulk-density-ca10" type="number" placeholder="1550" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="use-superplasticizer">Use Superplasticizer?</Label>
        <Select defaultValue="yes">
          <SelectTrigger id="use-superplasticizer">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="superplasticizer-pct">Superplasticizer Dosage (% by weight of cement)</Label>
        <Input id="superplasticizer-pct" type="number" step="0.01" placeholder="1.0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="admixture-sg">Admixture Specific Gravity</Label>
        <Input id="admixture-sg" type="number" step="0.01" placeholder="1.2" />
      </div>
    </div>
  );
}
