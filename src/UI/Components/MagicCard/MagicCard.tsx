import * as React from "react";
import { cfx } from "classifyx";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface MagicContainerProps {
  children?: React.ReactNode;
  className?: string;
}

function MagicContainer({ children, className }: MagicContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = React.useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = React.useState<Array<HTMLElement>>([]);

  React.useEffect(() => {
    init();
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map(
          (el) => el as HTMLElement,
        ),
      );
  }, []);

  React.useEffect(() => {
    init();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
    };
  }, [setBoxes]);

  React.useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const init = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;

      mouse.current.x = x;
      mouse.current.y = y;
      boxes.forEach((box) => {
        const boxX =
          -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
        const boxY =
          -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
        box.style.setProperty("--mouse-x", `${boxX}px`);
        box.style.setProperty("--mouse-y", `${boxY}px`);

        if (inside) box.style.setProperty("--opacity", `1`);
        else box.style.setProperty("--opacity", `0`);
      });
    }
  };

  return (
    <div className={cfx("size-full", className)} ref={containerRef}>
      {children}
    </div>
  );
}

interface MagicCardProps {
  /**
   * @default <div />
   * @type React.ReactElement
   * @description
   * The component to be rendered as the card
   */
  as?: React.ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type React.ReactNode
   * @description
   * The children of the card
   */
  children?: React.ReactNode;

  /**
   * @default 600
   * @type number
   * @description
   * The size of the spotlight effect in pixels
   */
  size?: number;

  /**
   * @default true
   * @type boolean
   * @description
   * Whether to show the spotlight
   */
  spotlight?: boolean;

  /**
   * @default "rgba(255,255,255,0.03)"
   * @type string
   * @description
   * The color of the spotlight
   */
  spotlightColor?: string;

  /**
   * @default true
   * @type boolean
   * @description
   * Whether to isolate the card which is being hovered
   */
  isolated?: boolean;

  /**
   * @default "rgba(255,255,255,0.03)"
   * @type string
   * @description
   * The background of the card
   */
  background?: string;

  [key: string]: any;
}

const MagicCard: React.FC<MagicCardProps> = ({
  className,
  children,
  size = 600,
  spotlight = true,
  borderColor = "hsl(0 0% 98%)",
  isolated = true,
  ...props
}) => {
  return (
    <div
      style={
        {
          "--mask-size": `${size}px`,
          "--border-color": `${borderColor}`,
        } as React.CSSProperties
      }
      className={cfx(
        "relative z-0 size-full rounded-2xl p-6",
        "bg-gray-300 dark:bg-gray-700",
        "bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--border-color),transparent_100%)]",
        className,
      )}
      {...props}
    >
      {children}

      {/* Background */}
      <div className="absolute inset-px -z-20 rounded-2xl bg-white dark:bg-black/95" />
    </div>
  );
};

export { MagicCard, MagicContainer };
