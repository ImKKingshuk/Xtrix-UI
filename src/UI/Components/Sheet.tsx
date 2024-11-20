"use client";
import * as React from "react";
import { LuX } from "react-icons/lu";
import { cfx } from "classifyx";

// Create a Context for managing Sheet state
interface SheetContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SheetContext = React.createContext<SheetContextType | null>(null);

const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};

// SheetProvider Component to manage state
const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SheetContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SheetContext.Provider>
  );
};

// Sheet Root Component (Visibility controlled by the provider)
const Sheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useSheet();
  return isOpen ? <div className="fixed inset-0 z-50">{children}</div> : null;
};

// Sheet Trigger Component (to open the Sheet)
const SheetTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const { open } = useSheet();
  return (
    <button
      onClick={open}
      className={cfx("cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Sheet Close Component (to close the Sheet)
const SheetClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { close } = useSheet();
  return (
    <button
      onClick={close}
      className={cfx(
        "absolute right-4 top-4 rounded-lg border p-1 hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      <LuX className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </button>
  );
};

// Sheet Overlay Component
const SheetOverlay = React.forwardRef<
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
SheetOverlay.displayName = "SheetOverlay";
// Variants for the sheet sides (top, bottom, left, right)
const sheetVariants = {
  top: "inset-x-0 top-0 border-b ",
  bottom: "inset-x-0 bottom-0 border-t ",
  left: "inset-y-0 left-0 h-full w-3/4 border-r  sm:max-w-sm",
  right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
};

// Sheet Content Component with side variants

const SheetContent = React.forwardRef<
  HTMLDivElement,
  {
    variant?: "top" | "bottom" | "left" | "right";
    className?: string;
    children?: React.ReactNode;
  }
>(({ variant = "right", className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "fixed z-50 gap-4 p-6 backdrop-blur-lg",
      sheetVariants[variant],
      className,
    )}
    {...props}
  >
    {children}
    <SheetClose />
  </div>
));
SheetContent.displayName = "SheetContent";

// Sheet Header Component
const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cfx(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

// Sheet Footer Component
const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cfx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

// Sheet Title Component
const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h2 className={cfx("text-lg font-semibold", className)} {...props} />;

// Sheet Description Component
const SheetDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p className={cfx("text-muted-foreground text-sm", className)} {...props} />
);

export {
  SheetProvider,
  SheetOverlay,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
