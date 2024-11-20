import React from "react";
import { cfx } from "classifyx";

// Timeline component
interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  positions?: "left" | "right" | "center"; // Define available positions
}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, className, positions = "left", ...props }, ref) => {
    return (
      <ul
        className={cfx(
          "grid",
          {
            left: "[&>li]:grid-cols-[0_min-content_1fr]",
            right: "[&>li]:grid-cols-[1fr_min-content]",
            center: "[&>li]:grid-cols-[1fr_min-content_1fr]",
          },
          { positions },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    );
  },
);
Timeline.displayName = "Timeline";

// TimelineItem component
interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  status?: "done" | "default"; // Define available statuses
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status = "default", ...props }, ref) => (
    <li
      className={cfx(
        "grid items-center gap-x-2",
        {
          done: "text-primary",
          default: "text-muted-foreground",
        },
        { status },
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TimelineItem.displayName = "TimelineItem";

// TimelineDot component
interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "default" | "current" | "done" | "error" | "custom";
  customIcon?: React.ReactNode; // Optional custom icon
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, status = "default", customIcon, ...props }, ref) => (
    <div
      role="status"
      className={cfx(
        "col-start-2 col-end-3 row-start-1 row-end-1 flex size-4 items-center justify-center rounded-full border border-current",
        {
          default: "[&>*]:hidden",
          current:
            "[&>*:not(.radix-circle)]:hidden [&>.radix-circle]:bg-current [&>.radix-circle]:fill-current",
          done: "bg-primary [&>*:not(.radix-check)]:hidden [&>.radix-check]:text-background",
          error:
            "border-destructive bg-destructive [&>*:not(.radix-cross)]:hidden [&>.radix-cross]:text-background",
          custom: "[&>*:not(:nth-child(4))]:hidden [&>*:nth-child(4)]:block",
        },
        { status },
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="radix-circle size-2.5 rounded-full" />
      {/* Icons should be defined or imported as needed */}
      <span className="radix-check size-3" />
      <span className="radix-cross size-2.5" />
      {customIcon}
    </div>
  ),
);
TimelineDot.displayName = "TimelineDot";

// TimelineContent component
interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "right" | "left"; // Define available sides
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, side = "right", ...props }, ref) => (
    <div
      className={cfx(
        "text-muted-foreground row-start-2 row-end-2 pb-8",
        {
          right: "col-start-3 col-end-4 mr-auto text-left",
          left: "col-start-1 col-end-2 ml-auto text-right",
        },
        { side },
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TimelineContent.displayName = "TimelineContent";

// TimelineHeading component
interface TimelineHeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  side?: "right" | "left";
  variant?: "primary" | "secondary"; // Define available variants
}

const TimelineHeading = React.forwardRef<
  HTMLParagraphElement,
  TimelineHeadingProps
>(({ className, side = "right", variant = "primary", ...props }, ref) => (
  <p
    role="heading"
    aria-level={variant === "primary" ? 2 : 3}
    className={cfx(
      "row-start-1 row-end-1 line-clamp-1 max-w-full truncate",
      {
        primary: "text-primary text-base font-medium",
        secondary: "text-muted-foreground text-sm font-light",
      },
      { side, variant },
      className,
    )}
    ref={ref}
    {...props}
  />
));
TimelineHeading.displayName = "TimelineHeading";

// TimelineLine component
interface TimelineLineProps extends React.HTMLAttributes<HTMLHRElement> {
  done?: boolean;
}

const TimelineLine = React.forwardRef<HTMLHRElement, TimelineLineProps>(
  ({ className, done = false, ...props }, ref) => {
    return (
      <hr
        role="separator"
        aria-orientation="vertical"
        className={cfx(
          "col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full",
          done ? "bg-primary" : "bg-muted",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
TimelineLine.displayName = "TimelineLine";

// Export all components
export {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineHeading,
  TimelineLine,
};
