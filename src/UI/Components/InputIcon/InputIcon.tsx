import * as React from "react";
import { cfx } from "classifyx";

export interface InputIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode; // Icon as a prop
  iconPosition?: "left" | "right"; // Position variant for the icon
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  (
    { className, type = "text", icon, iconPosition = "right", ...props },
    ref,
  ) => {
    return (
      <div className="group relative">
        <div
          className={cfx(
            "flex items-center rounded-xl bg-gray-200 dark:bg-[#141417]",
            iconPosition === "left" ? "flex-row-reverse" : "flex-row",
          )}
        >
          <input
            ref={ref}
            type={type}
            className={cfx(
              "flex flex-grow bg-transparent p-3 outline-none",
              iconPosition === "left"
                ? "rounded-r-xl pl-4"
                : "rounded-l-xl pr-4",
              "text-xs duration-300",
              className,
            )}
            {...props}
          />
          <div
            className={cfx(
              "absolute top-0 rounded-xl bg-transparent p-2 duration-300",
              iconPosition === "right"
                ? "right-0 group-focus-within:-right-2 group-focus-within:bg-[#18191c]"
                : "left-0 group-focus-within:-left-2 group-focus-within:bg-[#18191c]",
            )}
          >
            {icon}
          </div>
        </div>
      </div>
    );
  },
);

InputIcon.displayName = "InputIcon";

export { InputIcon };
