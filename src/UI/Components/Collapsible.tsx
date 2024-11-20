import * as React from "react";
import { cfx } from "classifyx";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open = false, onOpenChange, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open);

    const toggleOpen = () => {
      setIsOpen((prev) => {
        const newState = !prev;
        onOpenChange?.(newState);
        return newState;
      });
    };

    React.useEffect(() => setIsOpen(open), [open]);

    return (
      <div ref={ref} {...props}>
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            child.type === CollapsibleTrigger
          ) {
            return React.cloneElement(
              child as React.ReactElement<CollapsibleTriggerProps>,
              {
                isOpen,
                toggleOpen,
              },
            );
          }
          return child;
        })}
      </div>
    );
  },
);
Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  toggleOpen?: () => void;
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ isOpen, toggleOpen, children, ...props }, ref) => (
  <button ref={ref} onClick={toggleOpen} {...props}>
    {children}
  </button>
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ isOpen = false, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cfx(
      "transition-max-height overflow-hidden duration-300 ease-in-out",
      isOpen ? "max-h-[200px]" : "max-h-0",
    )}
    aria-hidden={!isOpen}
  >
    <div className="p-2">{children}</div>
  </div>
));
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
