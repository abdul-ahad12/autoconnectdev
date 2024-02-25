import React from "react";
import { Checkbox } from "./Checkbox";

export function CheckboxDemo({ id, label, className }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
