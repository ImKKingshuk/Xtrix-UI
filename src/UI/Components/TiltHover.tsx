import * as React from "react";
import { cfx } from "classifyx";

interface TiltHoverProps {
  children: React.ReactNode;
}

function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

const TiltHover = React.forwardRef<HTMLDivElement, TiltHoverProps>(
  ({ children }, ref) => {
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

    const onMouseMove = React.useCallback(
      throttle((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = (y - centerY) / 4;
        const rotateY = (centerX - x) / 4;

        setRotate({ x: rotateX, y: rotateY });
      }, 100),
      [],
    );

    const onMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    return (
      <div
        ref={ref}
        className={cfx(
          "transition-transform duration-[400ms] ease-[cubic-bezier(0.03,0.98,0.52,0.99)]",
        )}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        {/* Child components with tilt effect */}
        <div className={cfx("flex size-full items-center justify-center")}>
          {children}
        </div>
      </div>
    );
  },
);

TiltHover.displayName = "TiltHover";

export default TiltHover;
