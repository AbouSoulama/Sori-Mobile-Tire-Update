"use client";

import { useState } from "react";
import { yearOptions } from "@/lib/form-options";
import type { VehicleCatalog } from "@/lib/vehicles";
import { SelectField } from "./fields";

const OTHER = "Other / not listed";

export function VehicleFields({ catalog, errors }: { catalog: VehicleCatalog; errors: Record<string, string> }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const makes = Object.keys(catalog);
  const models = make ? [...(catalog[make] ?? []), OTHER] : [];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <SelectField label="Year" name="vehicleYear" errors={errors} options={yearOptions} optional placeholder="Select year" />
      <SelectField
        label="Make"
        name="vehicleMake"
        errors={errors}
        options={[...makes, OTHER]}
        optional
        placeholder="Select make"
        value={make}
        onChange={(v) => {
          setMake(v);
          setModel("");
        }}
      />
      <SelectField
        label="Model"
        name="vehicleModel"
        errors={errors}
        options={models}
        optional
        placeholder={make ? "Select model" : "Select a make first"}
        value={model}
        onChange={setModel}
        disabled={!make || make === OTHER}
      />
    </div>
  );
}
