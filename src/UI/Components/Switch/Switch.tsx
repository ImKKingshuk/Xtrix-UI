import * as React from "react";
import { cfx } from "classifyx";

interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "onChange"> {
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  classNameSwitchActive?: string;
  classNameSwitch?: string;
  classNameBG?: string;
  classNameBGActive?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      classNameSwitch,
      classNameSwitchActive,
      classNameBG,
      classNameBGActive,
      checked = false,
      onToggle,
      iconOn,
      iconOff,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const handleToggle = () => {
      const newState = !isChecked;
      setIsChecked(newState);
      onToggle?.(newState);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        className={cfx(
          "inline-flex h-6 w-11 cursor-pointer items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isChecked
            ? `bg-gray-800 ${classNameBGActive}`
            : `bg-gray-100 ${classNameBG}`,
          className,
        )}
        {...props}
      >
        <span
          className={cfx(
            "flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg transition-transform",
            isChecked
              ? `translate-x-5 ${classNameSwitchActive}`
              : "translate-x-0",
            classNameSwitch,
          )}
        >
          {isChecked ? iconOn : iconOff}
        </span>
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
