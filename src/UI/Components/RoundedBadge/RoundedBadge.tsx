import * as React from "react";
import { cfx } from "classifyx";

// Define variants, colors, and sizes for the RoundedBadge
type RoundedBadgeVariants = "solid" | "outline" | "ghost";
type RoundedBadgeColors =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";
type RoundedBadgeSizes = "sm" | "md" | "lg";

interface RoundedBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: RoundedBadgeVariants;
  color?: RoundedBadgeColors;
  size?: RoundedBadgeSizes;
  rounded?: boolean;
}

// Helper function for variant classes
const getVariantClasses = (
  variant: RoundedBadgeVariants,
  color: RoundedBadgeColors,
) => {
  const base = {
    solid: `bg-${color}-500 text-white`,
    outline: `border border-${color}-500 text-${color}-500`,
    ghost: `bg-${color}-100 text-${color}-500`,
  };
  return base[variant];
};

// RoundedBadge component definition
const RoundedBadge = React.forwardRef<HTMLSpanElement, RoundedBadgeProps>(
  (
    {
      variant = "solid",
      color = "primary",
      size = "md",
      rounded = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cfx(
          "inline-flex items-center font-medium",
          rounded ? "rounded-full" : "rounded-md",
          size === "sm" && "px-2 py-0.5 text-xs",
          size === "md" && "px-2.5 py-1 text-sm",
          size === "lg" && "px-3 py-1.5 text-base",
          getVariantClasses(variant, color),
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
RoundedBadge.displayName = "RoundedBadge";

export { RoundedBadge };
