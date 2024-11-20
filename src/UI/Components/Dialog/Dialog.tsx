"use client";
import * as React from "react";
import { LuX } from "react-icons/lu";
import { cfx } from "classifyx";

// Dialog Context to manage dialog state
const DialogContext = React.createContext<any>(null);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const toggleDialog = () => setIsOpen((prev) => !prev);

  return (
    <DialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, toggleDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};

// Main Dialog component
const Dialog = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  const { isOpen } = React.useContext(DialogContext);
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cfx(
        "fixed inset-0 z-50 flex items-center justify-center",
        className,
      )}
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  );
});
Dialog.displayName = "Dialog";

// Dialog Trigger Component
const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => {
  const { toggleDialog } = React.useContext(DialogContext);

  return (
    <button ref={ref} onClick={toggleDialog} className={cfx(className)}>
      {children}
    </button>
  );
});
DialogTrigger.displayName = "DialogTrigger";

// Dialog Content Component
const DialogContent = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => {
  const { closeDialog } = React.useContext(DialogContext);

  return (
    <div
      ref={ref}
      className={cfx(
        "relative z-50 w-[20rem] rounded-2xl border bg-white p-6 shadow-md backdrop-blur-xl dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
    >
      {/* Close button */}
      <button
        onClick={closeDialog}
        className="absolute -right-1 -top-1 rounded-lg border bg-white p-1.5 duration-200 hover:right-0 hover:top-0 dark:bg-slate-400"
      >
        <LuX className="h-6 w-6" />
      </button>
      {children}
    </div>
  );
});
DialogContent.displayName = "DialogContent";

// Dialog Header Component
const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx("text-primary space-y-1 text-center", className)}
    {...props}
  >
    {children}
  </div>
));
DialogHeader.displayName = "DialogHeader";

// Dialog Footer Component
const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "mt-4 flex items-center justify-center space-x-2",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
DialogFooter.displayName = "DialogFooter";

// Dialog Overlay Component
const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
      className,
    )}
  >
    {children}
  </div>
));
DialogOverlay.displayName = "DialogOverlay";

// Button Component with Variants
const DialogButton = React.forwardRef<
  HTMLButtonElement,
  {
    variant?: "default" | "border" | "transparent";
    children: React.ReactNode;
    className?: string;
  }
>(({ variant = "default", children, className }, ref) => {
  const variants = {
    default: "bg-blue-500 text-white",
    border:
      "border border-[#1a5cff] bg-transparent text-[#1a5cff] active:bg-opacity-80",
    transparent: "bg-transparent text-blue-500",
  };

  return (
    <button
      ref={ref}
      className={cfx(
        "text-md rounded-2xl px-4 py-2 shadow-md duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
});
DialogButton.displayName = "Button";

// Export Components
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogOverlay,
  DialogButton,
  DialogProvider,
};
