"use client";
import * as React from "react";
import { LuCheck, LuChevronRight, LuCircle } from "react-icons/lu";
import { cfx } from "classifyx";

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
}

const ContextMenuContext = React.createContext<{
  state: ContextMenuState;
  openMenu: (x: number, y: number) => void;
  closeMenu: () => void;
} | null>(null);

const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = React.useState<ContextMenuState>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  const openMenu = (x: number, y: number) => {
    setState({ isOpen: true, position: { x, y } });
  };

  const closeMenu = () => {
    setState({ ...state, isOpen: false });
  };

  return (
    <ContextMenuContext.Provider value={{ state, openMenu, closeMenu }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

const useContextMenu = () => {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenuProvider");
  }
  return context;
};

// ContextMenuTrigger handles right-click events
const ContextMenuTrigger: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { openMenu } = useContextMenu();

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    openMenu(event.clientX, event.clientY);
  };

  return (
    <div onContextMenu={handleContextMenu} className="inline-block">
      {children}
    </div>
  );
};

// ContextMenu container for the dropdown menu
const ContextMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, closeMenu } = useContextMenu();
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // Close the menu if clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (state.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.isOpen, closeMenu]);

  if (!state.isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{ top: state.position.y, left: state.position.x }}
      className="fixed z-50 rounded-xl border backdrop-blur-xl dark:border-[#ffffff33]"
    >
      <div>{children}</div>
    </div>
  );
};

// ContextMenuItem with focus and keyboard handling
const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    inset?: boolean;
    onSelect?: () => void;
  }
>(({ className, inset, children, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    role="menuitem"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
    className={cfx(
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-200",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ContextMenuItem.displayName = "ContextMenuItem";

// ContextMenuSub for nested menus
const ContextMenuSub = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <div
    ref={ref}
    role="menuitem"
    tabIndex={0}
    className={cfx(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-200",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <LuChevronRight className="ml-auto h-4 w-4" />
  </div>
));
ContextMenuSub.displayName = "ContextMenuSub";

// Checkbox item
const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    checked?: boolean;
  }
>(({ checked, children, ...props }, ref) => (
  <div
    ref={ref}
    role="menuitemcheckbox"
    aria-checked={checked}
    className={cfx(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-200",
      props.className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <LuCheck className="h-4 w-4" />}
    </span>
    {children}
  </div>
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

// Radio item for radio-style selection
const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    checked?: boolean;
  }
>(({ checked, children, ...props }, ref) => (
  <div
    ref={ref}
    role="menuitemradio"
    aria-checked={checked}
    className={cfx(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-200",
      props.className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <LuCircle className="h-2 w-2 fill-current" />}
    </span>
    {children}
  </div>
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// ContextMenuContent, the core content container
const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx("z-50 min-w-[8rem] overflow-hidden p-1", className)}
    role="menu"
    {...props}
  >
    {children}
  </div>
));
ContextMenuContent.displayName = "ContextMenuContent";

// Separator for visual separation
const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cfx("my-1 h-px bg-gray-200 dark:bg-gray-600", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

// Label for grouping menu items
const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    inset?: boolean;
  }
>(({ inset, className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    role="menuitem"
    {...props}
  >
    {children}
  </div>
));
ContextMenuLabel.displayName = "ContextMenuLabel";

// RadioGroup for managing radio items
const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, ...props }, ref) => (
  <div ref={ref} role="radiogroup" {...props}>
    {children}
  </div>
));
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

// Export components with ContextMenuProvider
export {
  ContextMenuProvider,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuRadioGroup,
  ContextMenuSub,
};
