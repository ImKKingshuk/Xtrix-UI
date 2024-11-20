import * as React from "react";
import { cfx } from "classifyx";

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
}

const Popover = ({ children, className }: PopoverProps) => {
  return <div className={cfx("relative", className)}>{children}</div>;
};

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <button
      ref={ref}
      onClick={(e) => {
        handleToggle();
        onClick?.(e);
      }}
      className={cfx("cursor-pointer", className)}
      {...props}
    />
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverAnchor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cfx("inline-block", className)} {...props} />
));
PopoverAnchor.displayName = "PopoverAnchor";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  sideOffset?: number;
  open?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { className, align = "center", sideOffset = 4, style, open, ...props },
    ref,
  ) => {
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          open = false;
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div
        ref={contentRef}
        className={cfx(
          `bg-popover text-popover-foreground absolute z-50 rounded-md border p-4 shadow-md outline-none ${align === "center" ? "left-1/2 -translate-x-1/2" : ""} ${align === "start" ? "left-0" : ""} ${align === "end" ? "right-0" : ""}`,
          open ? "block" : "hidden",
          className,
        )}
        style={{ top: sideOffset, ...style }}
        {...props}
      />
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
