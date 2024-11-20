import * as React from "react";
import { cfx } from "classifyx";

// Main Wrapper
const ReviewCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "relative cursor-pointer overflow-hidden rounded-xl border border-gray-950/[.1] bg-white p-4 hover:bg-gray-50 dark:border-[#ffffff33] dark:bg-[#202020]",
      className,
    )}
    {...props}
  />
));
ReviewCard.displayName = "ReviewCard";

// Header with Image and Info
const ReviewCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx("flex items-center gap-2", className)}
    {...props}
  />
));
ReviewCardHeader.displayName = "ReviewCardHeader";

// Avatar Component
const ReviewCardAvatar = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { size?: "sm" | "md" | "lg" }
>(({ className, size = "md", ...props }, ref) => (
  <img
    ref={ref}
    className={cfx("rounded-full", className)}
    width={size === "sm" ? 24 : size === "lg" ? 40 : 32}
    height={size === "sm" ? 24 : size === "lg" ? 40 : 32}
    {...props}
  />
));
ReviewCardAvatar.displayName = "ReviewCardAvatar";

// Title (Name) Component
const ReviewCardName = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cfx("text-sm font-medium dark:text-white", className)}
    {...props}
  />
));
ReviewCardName.displayName = "ReviewCardName";

// Username Component
const ReviewCardUsername = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cfx(
      "text-xs font-medium text-gray-600 dark:text-white/40",
      className,
    )}
    {...props}
  />
));
ReviewCardUsername.displayName = "ReviewCardUsername";

// Body Text Component
const ReviewCardBody = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cfx("mt-2 text-sm text-gray-700 dark:text-gray-300", className)}
    {...props}
  />
));
ReviewCardBody.displayName = "ReviewCardBody";

// Export all components
export {
  ReviewCard,
  ReviewCardHeader,
  ReviewCardAvatar,
  ReviewCardName,
  ReviewCardUsername,
  ReviewCardBody,
};
