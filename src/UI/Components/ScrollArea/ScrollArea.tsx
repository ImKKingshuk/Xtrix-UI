import * as React from "react";
import { cfx } from "classifyx";

// ScrollArea component
const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "relative h-full w-full overflow-auto rounded-lg",
      className,
    )}
    {...props}
  >
    <div className="relative h-full w-full">{children}</div>
  </div>
));
ScrollArea.displayName = "ScrollArea";

// ScrollBar component
const ScrollBar = React.forwardRef<
  HTMLDivElement,
  {
    orientation: "vertical" | "horizontal";
  } & React.HTMLAttributes<HTMLDivElement>
>(({ className, orientation, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "absolute rounded-full opacity-50 transition-opacity duration-150 hover:opacity-100",
      orientation === "vertical"
        ? "right-0 top-0 h-full w-2"
        : "bottom-0 left-0 h-2 w-full",
      className,
    )}
    {...props}
  >
    <div className="h-full w-full rounded-full bg-gray-400 dark:bg-gray-600" />
  </div>
));
ScrollBar.displayName = "ScrollBar";

// ScrollOverlay component
const ScrollOverlay = React.forwardRef<
  HTMLDivElement,
  {
    position: "left" | "right" | "top" | "bottom";
  } & React.HTMLAttributes<HTMLDivElement>
>(({ position, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "pointer-events-none absolute transition-opacity",
      position === "left" &&
        "inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#121212]",
      position === "right" &&
        "inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#121212]",
      position === "top" &&
        "inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-[#121212]",
      position === "bottom" &&
        "inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-[#121212]",
    )}
    {...props}
  />
));
ScrollOverlay.displayName = "ScrollOverlay";

export { ScrollArea, ScrollBar, ScrollOverlay };
