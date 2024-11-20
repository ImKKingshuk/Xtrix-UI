import * as React from "react";
import { cfx } from "classifyx";

interface MeteorsProps {
  number?: number;
}

export function Meteors({ number = 20 }: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = React.useState<
    Array<React.CSSProperties>
  >([]);

  React.useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: `${Math.random() * window.innerHeight}px`,
      left: `${Math.random() * window.innerWidth}px`,
      animationDelay: `${Math.random() * 1 + 0.2}s`,
      animationDuration: `${Math.random() * 5 + 2}s`,
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={cfx(
            "animate-meteor pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}

      {/* Inline keyframes */}
      <style>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
        .animate-meteor {
          animation: meteor 5s linear infinite;
        }
      `}</style>
    </>
  );
}
