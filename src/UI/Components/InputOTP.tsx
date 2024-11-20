import * as React from "react";
import { LuAsterisk, LuDot, LuMinus } from "react-icons/lu"; // Importing Dot icon from react-icons/lu
import { cfx } from "classifyx"; // Using cfx for class merging
import { FaDotCircle } from "react-icons/fa";

// Creating OTP Input context to share state between slots
const OTPInputContext = React.createContext<{
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  maxLength: number;
}>({
  otp: [],
  setOtp: () => {},
  maxLength: 0,
});

// Main OTP Input component
const InputOTP = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { maxLength?: number }
>(({ children, maxLength = 6, className, ...props }, ref) => {
  const [otp, setOtp] = React.useState(Array(maxLength).fill(""));

  return (
    <OTPInputContext.Provider value={{ otp, setOtp, maxLength }}>
      <div
        ref={ref}
        className={cfx("flex items-center gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </OTPInputContext.Provider>
  );
});
InputOTP.displayName = "InputOTP";

// OTP Input Group for custom layouts (can contain multiple slots)
const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cfx("flex items-center", className)} {...props}>
    {children}
  </div>
));
InputOTPGroup.displayName = "InputOTPGroup";

// OTP Input Slot Component, responsible for handling each individual input slot
const InputOTPSlot = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const { otp, setOtp, maxLength } = React.useContext(OTPInputContext);
  const char = otp[index] || "";

  const handleChange = (value: string) => {
    if (/^[0-9]*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Automatically move to next input if not empty
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput && value) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (char === "") {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      } else {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      }
    }
  };

  return (
    <input
      ref={ref}
      value={char}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={handleKeyDown}
      id={`otp-input-${index}`}
      maxLength={1}
      className={cfx(
        "relative flex h-10 w-10 items-center justify-center border-y border-r p-2 text-center text-xl font-medium transition-all first:rounded-l-2xl first:border-l last:rounded-r-2xl dark:border-[#ffffff33]",
        className,
      )}
      {...props}
    />
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

// OTP Input Separator, allows for custom separators between groups of OTP inputs
const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "line" | "star" | "dash" | "circledot";
  }
>(({ children, variant = "default", className, ...props }, ref) => {
  // Conditional classes for different variants
  const variantClasses = {
    default: " ",
    dash: "", // For rounded checkbox
    line: "", // For rounded checkbox
    star: " ", // For radio-like checkbox
    circledot: " ", // For radio-like checkbox
  };

  // Conditional rendering of icons based on variant
  const renderIcon = () => {
    if (variant === "star") {
      return <LuAsterisk className={cfx("h-5 w-5", className)} />;
    } else if (variant === "line") {
      return <LuMinus className={cfx("h-5 w-5 rotate-90", className)} />;
    } else if (variant === "circledot") {
      return <FaDotCircle className={cfx("", className)} />;
    } else if (variant === "dash") {
      return <LuMinus className={cfx("h-5 w-5", className)} />;
    }
    return <LuDot className={cfx("h-5 w-5", className)} />;
  };
  return (
    <div
      ref={ref}
      role="separator"
      {...props}
      className={cfx("", variantClasses[variant])}
    >
      {children ?? renderIcon()}
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";

// Exporting all components
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
