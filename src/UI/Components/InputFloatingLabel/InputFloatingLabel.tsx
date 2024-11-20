import * as React from "react";
import { cfx } from "classifyx";

export interface InputFloatingLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputFloatingLabel = React.forwardRef<
  HTMLInputElement,
  InputFloatingLabelProps
>(({ className, type = "text", label, ...props }, ref) => {
  return (
    <div className="group relative">
      <label
        htmlFor={label}
        className={cfx(
          "absolute left-0 top-0 flex h-full w-full items-center pl-[10px] text-sm duration-200",
          "group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs",
        )}
      >
        {label}
      </label>
      <input
        id={label}
        ref={ref}
        type={type}
        className={cfx(
          "w-[15rem] rounded-xl bg-gray-200 px-4 py-3 text-xs outline-none placeholder:text-center dark:bg-[#202020] md:w-[25rem]",
          className,
        )}
        {...props}
      />
    </div>
  );
});

InputFloatingLabel.displayName = "InputFloatingLabel";

export { InputFloatingLabel };
