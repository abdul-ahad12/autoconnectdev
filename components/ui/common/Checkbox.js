import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(function Checkbox(
  { className, ...props },
  ref
) {
  return /*#__PURE__*/ React.createElement(
    CheckboxPrimitive.Root,
    Object.assign(
      {
        ref: ref,
        className: cn(
          "peer h-4 w-4 shrink-0 rounded-full border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:text-white",
          className
        ),
      },
      props
    ),
    /*#__PURE__*/ React.createElement(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
      },
      /*#__PURE__*/ React.createElement(CheckIcon, {
        className: "h-3 w-4",
      })
    )
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
