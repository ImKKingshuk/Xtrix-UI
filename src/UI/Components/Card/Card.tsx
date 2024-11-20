import * as React from "react";
import { cfx } from "classifyx";

const cardVariants = {
  variant: {
    default: "border ",
    shadow: "shadow-2xl bg-white text-black",
    outline: "border-2 border-gray-300",
    flat: "border-none shadow-xl",
  },

  shadowLevel: {
    low: "shadow-sm",
    medium: "shadow-md",
    high: "shadow-lg",
    ultra: "shadow-xl",
  },
};

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: " default" | "shadow" | "outline" | "flat";
    shadowLevel?: "low" | "medium" | "high" | "ultra";
  }
>(({ className, variant = "default", shadowLevel = "low", ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "rounded-2xl bg-white dark:border-[#ffffff33] dark:bg-[#202020] dark:text-white",
      { variants: cardVariants },
      { variant, shadowLevel },
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cfx(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cfx("text-muted-foreground text-sm", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cfx("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
