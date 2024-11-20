import * as React from "react";
import { cfx } from "classifyx";

interface GradientBGProps {
  colors1?: string[];
  colors2?: string[];
  opacity?: string;
  blurAmount?: string;
  className?: string;
}

const GradientBG = React.forwardRef<HTMLDivElement, GradientBGProps>(
  (
    {
      colors1 = ["from-sky-400", "via-rose-400", "to-lime-400"],
      colors2 = ["from-green-300", "via-blue-500", "to-purple-600"],
      opacity = "opacity-80",
      blurAmount = "blur-[106px]",
      className = "",
    },
    ref,
  ) => (
    <div ref={ref} className={cfx("relative", className)}>
      <GradientLayer
        colors={colors1}
        blurAmount={blurAmount}
        opacity={opacity}
      />
      <GradientLayer
        colors={colors2}
        blurAmount={blurAmount}
        opacity={opacity}
      />
    </div>
  ),
);

GradientBG.displayName = "GradientBG";

// GradientLayer subcomponent
const GradientLayer = React.forwardRef<
  HTMLDivElement,
  { colors: string[]; blurAmount: string; opacity: string }
>(({ colors, blurAmount, opacity }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cfx(
      "absolute inset-0 grid -space-x-52",
      opacity,
      `${blurAmount} h-32 bg-[conic-gradient(var(--tw-gradient-stops))]`,
      colors.join(" "),
    )}
  />
));

GradientLayer.displayName = "GradientLayer";

export { GradientBG, GradientLayer };
