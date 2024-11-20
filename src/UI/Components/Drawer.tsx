import * as React from "react";
import { cfx } from "classifyx"; // Utility for merging classes
import { LuX } from "react-icons/lu";

// Context to manage the state of the drawer (open/close functions)
const DrawerContext = React.createContext<{
  openDrawer: () => void;
  closeDrawer: () => void;
  isOpen: boolean;
} | null>(null);

// DrawerProvider component to handle state and provide context
const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, isOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

// DrawerOverlay Component (handles closing the drawer when clicked)
const DrawerOverlay = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    const { closeDrawer, isOpen } = React.useContext(DrawerContext)!;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cfx(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-md",
          className,
        )}
        onClick={closeDrawer} // Closes the drawer when clicked
      />
    );
  },
);
DrawerOverlay.displayName = "DrawerOverlay";

// Drawer Component (handles the visibility of the drawer)
const Drawer = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
  }
>(({ children, className, position = "bottom" }, ref) => {
  const { isOpen } = React.useContext(DrawerContext)!;

  // Define drawer positioning styles based on the position prop
  const drawerPositionClass = {
    top: "top-0 left-0 right-0 rounded-b-3xl h-auto max-h-[80vh] w-full",
    bottom: "bottom-0 left-0 rounded-t-3xl right-0 h-auto max-h-[80vh] w-full",
    left: "top-0 left-0 bottom-0 rounded-r-3xl h-full max-w-xs",
    right: "top-0 right-0 bottom-0 rounded-l-3xl h-full max-w-xs",
  }[position];

  if (!isOpen) return null; // Don't render if the drawer is closed

  return (
    <div
      ref={ref}
      className={cfx(
        `fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-[#202020]`,
        drawerPositionClass,
        isOpen ? "transform-none" : "translate-x-full",
        className,
      )}
    >
      <div className="mx-auto mt-2 h-1.5 w-[6rem] rounded-full bg-gray-200 dark:bg-[#ffffff33]"></div>

      {children}
    </div>
  );
});
Drawer.displayName = "Drawer";

// DrawerTrigger component (triggers the opening of the drawer)
const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  const { openDrawer } = React.useContext(DrawerContext)!;

  return (
    <button
      ref={ref}
      className={cfx(
        "rounded-2xl border bg-white p-1.5 px-3 dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
      onClick={openDrawer}
    >
      {children}
    </button>
  );
});
DrawerTrigger.displayName = "DrawerTrigger";

// DrawerClose component (closes the drawer)
const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  { children?: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  const { closeDrawer } = React.useContext(DrawerContext)!;

  return (
    <button
      ref={ref}
      className={cfx(
        "absolute right-2 top-2 rounded-2xl border p-2 hover:bg-gray-100 dark:border-[#ffffff33]",
        className,
      )}
      onClick={closeDrawer}
    >
      {children ?? <LuX className="size-6" />}
    </button>
  );
});
DrawerClose.displayName = "DrawerClose";

// DrawerContent to wrap the actual content of the drawer
const DrawerContent = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cfx("p-6", className)}>
      {children}
    </div>
  );
});
DrawerContent.displayName = "DrawerContent";

// DrawerHeader for the header section
const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div ref={ref} className={cfx("p-4 text-center", className)}>
    {children}
  </div>
));
DrawerHeader.displayName = "DrawerHeader";

// DrawerFooter for the footer section
const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div ref={ref} className={cfx("mt-auto flex flex-col gap-2 p-4", className)}>
    {children}
  </div>
));
DrawerFooter.displayName = "DrawerFooter";

// DrawerTitle for the title section
const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <h2
    ref={ref}
    className={cfx(
      "text-center text-lg font-semibold leading-none tracking-tight",
      className,
    )}
  >
    {children}
  </h2>
));
DrawerTitle.displayName = "DrawerTitle";

// DrawerDescription for the description section
const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <p ref={ref} className={cfx("text-muted-foreground text-sm", className)}>
    {children}
  </p>
));
DrawerDescription.displayName = "DrawerDescription";

// Export all the components
export {
  DrawerProvider,
  Drawer,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
