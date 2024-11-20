import * as React from "react";
import { cfx } from "classifyx";

// ToggleContext for managing state
interface ToggleContextType {
  isActive: boolean;
  toggle: () => void;
}

const ToggleContext = React.createContext<ToggleContextType | null>(null);

// Custom hook to use Toggle context
const useToggle = () => {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};

// ToggleProvider Component
const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isActive, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Toggle Component
interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classNameToggleActive?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  children,
  classNameToggleActive,

  className,
  ...props
}) => {
  const { isActive, toggle } = useToggle();

  return (
    <button
      type="button"
      className={cfx(
        "inline-flex size-8 items-center justify-center rounded-md border bg-white dark:border-[#ffffff33] dark:bg-[#202020]",

        isActive ? `bg-gray-200 dark:bg-black ${classNameToggleActive}` : "",
        className,
      )}
      aria-pressed={isActive}
      onClick={toggle}
      {...props}
    >
      {children}
    </button>
  );
};

export { ToggleProvider, Toggle };
