import * as React from "react";
import { cfx } from "classifyx";

// Context to manage hover state
interface HoverCardState {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

const HoverCardContext = React.createContext<HoverCardState | null>(null);

const HoverCardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = React.useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <HoverCardContext.Provider value={{ visible, show, hide }}>
      {children}
    </HoverCardContext.Provider>
  );
};

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("useHoverCard must be used within a HoverCardProvider");
  }
  return context;
};

// Main HoverCard component container
const HoverCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

// Trigger Component for HoverCard
const HoverCardTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { show, hide } = useHoverCard();

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      className={cfx("inline-block", className)}
    >
      {children}
    </div>
  );
};

// Content Component for HoverCard
const HoverCardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left" | "right" | "top";
  sideOffset?: number;
  variant?: "default" | "outlined" | "shadowed";
}> = ({
  children,
  className,
  align = "center",
  sideOffset = 4,
  variant = "default",
}) => {
  const { visible } = useHoverCard();

  if (!visible) return null;

  const alignClasses = {
    center: "left-1/2 transform -translate-x-1/2",
    left: "right-full transform -translate-y-1/2",
    right: "left-full transform -translate-y-1/2",
    top: "bottom-full transform -translate-y-1/2",
  };

  const variantClasses = {
    default: " ",
    outlined: " border-2 border-gray-300",
    shadowed: " shadow-lg",
  };

  return (
    <div
      className={cfx(
        `absolute rounded-2xl border bg-white dark:border-[#ffffff33] dark:bg-[#202020] ${alignClasses[align]} mt-${sideOffset} z-50 w-64 p-4 transition-opacity duration-200 ${variantClasses[variant]}`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export { HoverCardProvider, HoverCard, HoverCardTrigger, HoverCardContent };
