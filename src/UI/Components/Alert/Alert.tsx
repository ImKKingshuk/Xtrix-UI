import * as React from "react";
import { cfx } from "classifyx";

// Alert Component
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "error" | "success" | "warning";
  }
>(({ className, variant = "default", ...props }, ref) => {
  // Base styles
  const baseStyles =
    "relative w-full rounded-2xl bg-white dark:bg-[#202020] dark:border-[#ffffff33] border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground";

  // Variant styles
  const variantStyles = {
    default: "",
    error: "border-red-500/50 text-red-500  [&>svg]:text-destructive",
    success: "border-green-500/50 text-green-500  [&>svg]:text-destructive",
    warning: "border-yellow-500/50 text-yellow-500  [&>svg]:text-destructive",
  };

  // Construct the final class name
  const alertClass = cfx(baseStyles, variantStyles[variant], className); // Merge classes

  return <div ref={ref} role="alert" className={alertClass} {...props} />;
});
Alert.displayName = "Alert";

// AlertTitle Component
const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      className={cfx("mb-1 font-medium leading-none tracking-tight", className)} // Merge classes
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

// AlertDescription Component
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cfx("text-sm [&_p]:leading-relaxed", className)} // Merge classes
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
