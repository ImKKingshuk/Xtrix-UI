import * as React from "react";
import {
  LuCommand,
  LuOption,
  LuArrowBigUpDash,
  LuChevronUp,
} from "react-icons/lu";
import { cfx } from "classifyx";

// Icon mapping
const keyIcons: { [key: string]: React.ReactNode } = {
  command: <LuCommand className="size-5" />,
  option: <LuOption className="size-5" />,
  shift: <LuArrowBigUpDash className="size-5" />,
  control: <LuChevronUp className="size-5" />,
};

// Types for keyboard key props
interface KeyboardKeyProps extends React.HTMLAttributes<HTMLDivElement> {
  keys?: string[]; // Keys like ["command"], ["shift", "option"], etc.
}

// Keyboard Key Component
const KeyboardKey = React.forwardRef<HTMLDivElement, KeyboardKeyProps>(
  ({ keys, className, children, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(false);

    // Event handling for key presses
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (keys?.includes(event.key.toLowerCase())) setIsPressed(true);
      };
      const handleKeyUp = (event: KeyboardEvent) => {
        if (keys?.includes(event.key.toLowerCase())) setIsPressed(false);
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, [keys]);

    return (
      <div
        ref={ref}
        className={cfx(
          "inline-flex items-center justify-center rounded-xl border px-2 py-1 text-xs font-medium shadow-sm dark:border-[#ffffff33]",
          isPressed
            ? "bg-gray-200 dark:bg-gray-700" // active state
            : "bg-gray-100 dark:bg-gray-800",
          className,
        )}
        {...props}
      >
        {keys?.map((key, idx) => (
          <React.Fragment key={key}>
            {keyIcons[key.toLowerCase()] || key.toUpperCase()}
            {idx < keys.length - 1 && <span className="mx-0.5">+</span>}
          </React.Fragment>
        ))}
        {children && <span className="ml-1">{children}</span>}
      </div>
    );
  },
);
KeyboardKey.displayName = "KeyboardKey";

export { KeyboardKey };
