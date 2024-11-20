import * as React from "react";
import { cfx } from "classifyx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"; // Define variants
  size?: "default" | "sm" | "md" | "lg" | "xl" | "icon"; // Define sizes
  asChild?: boolean; // For rendering as a different component
}

// Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const ButtonComp = asChild ? "span" : "button"; // Use span if asChild is true, otherwise use button

    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Variant styles
    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    // Size styles
    const sizeStyles = {
      default: "h-10 px-3 py",
      sm: "h-8 rounded-md px-4 py-2",
      md: "h-10 rounded-md px-6 py-3",
      lg: "h-12 rounded-md px-6 py-4",
      xl: "h-14 rounded-md px-8 py-5",
      icon: "h-10 w-10",
    };

    // Construct the final class name
    const buttonClass = cfx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className, // Allow users to add their own styles
    );

    return <ButtonComp className={buttonClass} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
