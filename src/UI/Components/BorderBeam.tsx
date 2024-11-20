import * as React from "react";
import { cfx } from "classifyx";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}%`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cfx(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "border-[calc(var(--border-width))_solid_transparent]",
        "mask-clip-padding-box mask-border-box mask-composite-intersect mask-linear-gradient-transparent",
        "after:animation-border-beam after:absolute after:aspect-square after:w-[calc(var(--size))] after:[animation-delay:var(--delay)]",
        className,
      )}
    >
      <style>{` 
        @keyframes border-beam {
          100% {
            offset-distance: 100%;
          }
        }
        .animation-border-beam {
          animation: border-beam var(--duration) infinite linear;
        }
      `}</style>
    </div>
  );
}
