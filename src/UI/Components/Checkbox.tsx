import * as React from "react";
import { LuCheck, LuCheckCheck } from "react-icons/lu";
import { FaDotCircle } from "react-icons/fa";
import { cfx } from "classifyx";

// Checkbox Context to handle state management
const CheckboxContext = React.createContext<any>(null);

const CheckboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkedState, setCheckedState] = React.useState<{
    [key: string]: boolean;
  }>({});

  const toggleCheckbox = (id: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <CheckboxContext.Provider value={{ checkedState, toggleCheckbox }}>
      {children}
    </CheckboxContext.Provider>
  );
};

// Checkbox Component
const Checkbox = React.forwardRef<
  HTMLButtonElement,
  {
    id?: string;
    variant?: "default" | "doublecheck" | "circle";
  } & React.ComponentPropsWithoutRef<"button">
>(({ id, variant = "default", className, ...props }, ref) => {
  const { checkedState, toggleCheckbox } = React.useContext(CheckboxContext);
  const isChecked = checkedState[id || ""];

  const handleClick = () => {
    if (id) toggleCheckbox(id);
  };

  // Conditional classes for different variants
  const variantClasses = {
    default: "rounded-md ",
    doublecheck: "rounded-xl",
    circle: "rounded-full",
  };

  // Conditional rendering of icons based on variant
  const renderIcon = () => {
    if (isChecked) {
      if (variant === "circle") {
        return <FaDotCircle className="h-5 w-5" />;
      } else if (variant === "doublecheck") {
        return <LuCheckCheck className="h-5 w-5" />;
      }
      return <LuCheck className="h-5 w-5" />;
    }
    return null;
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-checked={isChecked}
      className={cfx(
        "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#ffffff33]",
        isChecked
          ? "bg-slate-700 text-white"
          : "bg-transparent text-transparent",
        variantClasses[variant], // Apply the variant style
        className,
      )}
      {...props}
    >
      {renderIcon()}
    </button>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox, CheckboxProvider };
