import * as React from "react";
import { cfx } from "classifyx";

// Tooltip Context to manage hover state
const TooltipContext = React.createContext({
  isVisible: false,
  setIsVisible: (_: boolean) => {},
});

const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ isVisible, setIsVisible }}>
      <div ref={ref} {...props} className="relative flex flex-col items-center">
        {children}
      </div>
    </TooltipContext.Provider>
  );
});
Tooltip.displayName = "Tooltip";

// TooltipTrigger Component
const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { setIsVisible } = React.useContext(TooltipContext);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

// TooltipContent Component
const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    classNameTolltipArrow?: string;
  }
>(({ children, className, classNameTolltipArrow, ...props }, ref) => {
  const { isVisible, setIsVisible } = React.useContext(TooltipContext);

  // Handle mouse enter and leave on content to keep tooltip visible
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return isVisible ? (
    <div
      ref={ref}
      className="absolute bottom-4 mb-6 flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className={cfx(
          "relative z-10 rounded-2xl border p-2 text-xs backdrop-blur-md dark:border-[#ffffff33]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
      <div
        className={cfx(
          "-mt-2 h-4 w-4 rotate-45 border backdrop-blur-md dark:border-[#ffffff33]",
          classNameTolltipArrow,
        )}
      />
    </div>
  ) : null;
});
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent };
