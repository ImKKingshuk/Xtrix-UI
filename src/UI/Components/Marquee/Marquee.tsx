import * as React from "react";
import { cfx } from "classifyx";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      reverse,
      pauseOnHover = true,
      vertical = false,
      repeat = 4,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cfx(
        "relative flex overflow-hidden p-2 [--duration:20s] [--gap:1rem] [gap:var(--gap)]",
        { "group flex-row": !vertical, "group flex-col": vertical },
        className,
      )}
      {...props}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <MarqueeItem
          key={i}
          vertical={vertical}
          reverse={reverse}
          pauseOnHover={pauseOnHover}
        >
          {children}
        </MarqueeItem>
      ))}

      <MarqueeOverlay position="left" />
      <MarqueeOverlay position="right" />

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--gap)));
          }
        }
        @keyframes marqueeVertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-100% - var(--gap)));
          }
        }
      `}</style>
    </div>
  ),
);
Marquee.displayName = "Marquee";

interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
}

const MarqueeItem = React.forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className, reverse, pauseOnHover, vertical, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cfx(
        "flex shrink-0 justify-around [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover, // Pauses animation on hover
        },
        className,
      )}
      style={{
        animation: `${vertical ? "marqueeVertical" : "marquee"} var(--duration) linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
        animationPlayState: pauseOnHover ? "running" : "paused",
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
MarqueeItem.displayName = "MarqueeItem";

interface MarqueeOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  position: "left" | "right";
}

const MarqueeOverlay = React.forwardRef<HTMLDivElement, MarqueeOverlayProps>(
  ({ position, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cfx(
        "pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-l",
        {
          "right-0 from-white dark:from-[#121212]": position === "right",
          "left-0 bg-gradient-to-r from-white dark:from-[#121212]":
            position === "left",
        },
        className,
      )}
      {...props}
    />
  ),
);
MarqueeOverlay.displayName = "MarqueeOverlay";

export { Marquee, MarqueeItem, MarqueeOverlay };
