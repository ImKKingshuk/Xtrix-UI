import * as React from "react";
import { cfx } from "classifyx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  classNameTextError?: string; // Optional error prop to handle validation errors
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, classNameTextError, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cfx(
          "flex min-h-[80px] w-full rounded-2xl border px-3 py-2 text-sm placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", // Base styles
          error
            ? `border-red-500 focus-visible:ring-red-500 ${classNameTextError}` // Error styles
            : "", // Default focus styles
          className, // Allow for custom classNames
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
