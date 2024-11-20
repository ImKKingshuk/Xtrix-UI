import * as React from "react";
import { cfx } from "classifyx";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  variant?: "solid" | "dashed" | "dotted";
  thickness?: string;
  color?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant = "solid",
      thickness = "1px",
      color = "border", // Default to Tailwind's border color, customizable by users
      ...props
    },
    ref,
  ) => {
    const orientationClasses =
      orientation === "horizontal"
        ? "w-full h-0 border-t"
        : "h-full w-0 border-l rotate-90";

    return (
      <div
        ref={ref}
        role={decorative ? undefined : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cfx(
          "shrink-0",
          orientationClasses, // Handles border direction based on orientation
          variantClasses[variant], // Variant classes (solid, dashed, dotted)
          className,
        )}
        style={{
          borderWidth: thickness,
          borderColor: color, // Users can pass custom color here
        }}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

// Classes for different variants
const variantClasses = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

export { Separator };
