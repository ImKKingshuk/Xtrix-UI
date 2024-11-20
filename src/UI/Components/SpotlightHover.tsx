import * as React from "react";
import { cfx } from "classifyx";

interface SpotlightHoverProps {
  children: React.ReactNode;
}

const SpotlightHover = React.forwardRef<HTMLDivElement, SpotlightHoverProps>(
  ({ children }, ref) => {
    const divRef = ref || React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !divRef ||
        !(divRef as React.MutableRefObject<HTMLDivElement>).current
      )
        return;

      const rect = (
        divRef as React.MutableRefObject<HTMLDivElement>
      ).current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
      <div
        ref={divRef as React.RefObject<HTMLDivElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cfx(
          "relative size-full overflow-hidden rounded-xl",
          "flex items-center justify-center",
        )}
      >
        {/* Spotlight Effect Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 182, 255, .15), transparent 40%)`,
          }}
        />

        {/* Children Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

SpotlightHover.displayName = "SpotlightHover";

export default SpotlightHover;
