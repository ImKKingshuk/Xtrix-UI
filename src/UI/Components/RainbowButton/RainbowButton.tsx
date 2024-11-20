import * as React from "react";
import { cfx } from "classifyx";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({ children, ...props }: RainbowButtonProps) {
  return (
    <>
      <button
        className={cfx(
          "focus-visible:ring-ring animate-rainbow text-primary-foreground group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",

          // before styles
          "before:animate-rainbow before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

          // light mode colors
          "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

          // dark mode colors
          "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        )}
        {...props}
      >
        {children}
      </button>

      <style>{`
        :root {
          --color-1: 0 100% 63%;
          --color-2: 270 100% 63%;
          --color-3: 210 100% 63%;
          --color-4: 195 100% 63%;
          --color-5: 90 100% 63%;
        }

        @keyframes rainbow {
          0% {
            background-position: 0%;
          }
          100% {
            background-position: 200%;
          }
        }

        .animate-rainbow {
          animation: rainbow var(--speed, 2s) infinite linear;
        }
      `}</style>
    </>
  );
}
