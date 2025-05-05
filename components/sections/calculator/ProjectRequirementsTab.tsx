import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectRequirementsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="concrete-grade">Concrete Grade</Label>
        <Select defaultValue="m25">
          <SelectTrigger id="concrete-grade">
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m20">M20</SelectItem>
            <SelectItem value="m25">M25</SelectItem>
            <SelectItem value="m30">M30</SelectItem>
            <SelectItem value="m35">M35</SelectItem>
            <SelectItem value="m40">M40</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="exposure-condition">Exposure Condition</Label>
        <Select defaultValue="moderate">
          <SelectTrigger id="exposure-condition">
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
      <div className="space-y-2">
        <Label htmlFor="max-aggregate-size">Maximum Aggregate Size (mm)</Label>
        <Select defaultValue="20">
          <SelectTrigger id="max-aggregate-size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 mm</SelectItem>
            <SelectItem value="20">20 mm</SelectItem>
            <SelectItem value="40">40 mm</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="slump">Workability (Slump in mm)</Label>
        <Input id="slump" type="number" placeholder="100" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="design-method">Design Method</Label>
        <Select defaultValue="is-10262">
          <SelectTrigger id="design-method">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="is-10262">IS 10262</SelectItem>
            <SelectItem value="aci-211">ACI 211</SelectItem>
            <SelectItem value="bs-8500">BS 8500</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="quality-control">Degree of Supervision</Label>
        <Select defaultValue="good">
          <SelectTrigger id="quality-control">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fa-zone">Fine Aggregate Zone</Label>
        <Select defaultValue="II">
          <SelectTrigger id="fa-zone">
            <SelectValue placeholder="Select zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="I">Zone I</SelectItem>
            <SelectItem value="II">Zone II</SelectItem>
            <SelectItem value="III">Zone III</SelectItem>
            <SelectItem value="IV">Zone IV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="adopted-wc-ratio">Adopted Water-Cement Ratio</Label>
        <Input id="adopted-wc-ratio" type="number" step="0.01" placeholder="0.45" />
      </div>
    </div>
  );
}
