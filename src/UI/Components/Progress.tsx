import * as React from "react";
import { cfx } from "classifyx";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showStatus?: boolean;
  statusInside?: boolean; // Controls whether the status is shown inside or outside
  children?: React.ReactNode;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      showStatus = false,
      statusInside = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const normalizedValue = Math.min(Math.max(value, 0), max); // Ensures value is within range
    const progressPercentage = (normalizedValue / max) * 100;

    return (
      <div ref={ref} className={cfx("relative w-full", className)} {...props}>
        {children}
        {/* Conditionally render status */}
        {showStatus && statusInside && (
          <ProgressIndicator
            value={normalizedValue}
            max={max}
            className="absolute inset-0 flex items-center justify-center text-xs text-white"
          />
        )}
        {showStatus && !statusInside && (
          <ProgressIndicator
            value={normalizedValue}
            max={max}
            className="mt-2 text-center text-sm"
          />
        )}
      </div>
    );
  },
);
Progress.displayName = "Progress";

// ProgressBar for users to style the bar
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cfx("h-4 w-full overflow-hidden bg-gray-300", className)}
        {...props}
      />
    );
  },
);
ProgressBar.displayName = "ProgressBar";

// ProgressFill for the actual indicator inside the progress bar
interface ProgressFillProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const ProgressFill = React.forwardRef<HTMLDivElement, ProgressFillProps>(
  ({ value = 0, max = 100, className, ...props }, ref) => {
    const width = `${(Math.min(Math.max(value, 0), max) / max) * 100}%`;

    return (
      <div
        ref={ref}
        className={cfx("h-full bg-blue-500 transition-all", className)}
        style={{ width }}
        {...props}
      />
    );
  },
);
ProgressFill.displayName = "ProgressFill";

// ProgressIndicator to show the percentage or status
interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(({ value = 0, max = 100, className, ...props }, ref) => {
  const percentage = ((value / max) * 100).toFixed(0); // Converts value to percentage

  return (
    <div ref={ref} className={cfx(className)} {...props}>
      {percentage}%
    </div>
  );
});
ProgressIndicator.displayName = "ProgressIndicator";

export { Progress, ProgressBar, ProgressFill, ProgressIndicator };
