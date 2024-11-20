import * as React from "react";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number; // The aspect ratio as a width/height ratio
  children: React.ReactNode; // The content inside the aspect ratio container
}

// AspectRatio Component
const AspectRatio: React.FC<AspectRatioProps> = React.forwardRef<
  HTMLDivElement,
  AspectRatioProps
>(({ ratio, children, className, ...props }, ref) => {
  // Calculate aspect ratio height based on width

  return (
    <div ref={ref} className={`relative w-full ${className}`} {...props}>
      <div className="absolute inset-0">{children}</div>{" "}
    </div>
  );
});
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
