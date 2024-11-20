import * as React from "react";
import { cfx } from "classifyx";
import { LuChevronDown } from "react-icons/lu";

interface AccordionProps {
  children: React.ReactNode;
  defaultValue?: string;
  multiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultValue,
  className,
  multiple = false,
}) => {
  const [openItems, setOpenItems] = React.useState<string[]>(
    defaultValue ? [defaultValue] : [],
  );

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      multiple
        ? prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
        : prev[0] === value
          ? []
          : [value],
    );
  };

  return (
    <div className={cfx("w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement<AccordionItemProps>(child) &&
        child.type === AccordionItem
          ? React.cloneElement(
              child as React.ReactElement<AccordionItemProps>,
              {
                openItems,
                toggleItem,
              },
            )
          : child,
      )}
    </div>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  openItems?: string[];
  toggleItem?: (value: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  openItems = [],
  toggleItem,
}) => {
  const isOpen = openItems.includes(value);

  return (
    <div className={cfx("border-b duration-500", isOpen && "")}>
      {React.Children.map(children, (child) =>
        React.isValidElement<AccordionTriggerProps | AccordionContentProps>(
          child,
        ) &&
        (child.type === AccordionTrigger || child.type === AccordionContent)
          ? React.cloneElement(
              child as React.ReactElement<
                AccordionTriggerProps | AccordionContentProps
              >,
              {
                isOpen,
                toggleItem,
                value,
              },
            )
          : child,
      )}
    </div>
  );
};

interface AccordionTriggerProps {
  isOpen?: boolean;
  toggleItem?: (value: string) => void;
  value?: string;
  children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ isOpen, toggleItem, value, children }, ref) => (
  <button
    ref={ref}
    className={cfx(
      "flex w-full items-center justify-between space-x-8 py-4 font-medium transition-all hover:underline",
    )}
    onClick={() => toggleItem?.(value!)}
  >
    <div>{children}</div>
    <LuChevronDown
      className={cfx(
        "h-4 w-4 transition-transform duration-200",
        isOpen && "rotate-180",
      )}
    />
  </button>
));
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps {
  isOpen?: boolean;
  children: React.ReactNode;
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  isOpen,
  children,
}) => (
  <div
    className={cfx(
      "overflow-hidden text-sm transition-all",
      isOpen ? "max-h-screen" : "max-h-0",
    )}
  >
    <div className="pb-4">{isOpen && children}</div>
  </div>
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
