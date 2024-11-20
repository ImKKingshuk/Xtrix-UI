import * as React from "react";
import { cfx } from "classifyx";
import { LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";

// Select Trigger (Button to open/close the dropdown)
const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, children, ...props }, ref) => {
  const { isOpen, toggleOpen } = useSelectContext();

  return (
    <button
      ref={ref}
      onClick={toggleOpen}
      className={cfx(
        "flex h-10 w-[10rem] items-center justify-between rounded-2xl border bg-white px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
      {...props}
    >
      {children}
      {isOpen ? (
        <LuChevronUp className="h-4 w-4" />
      ) : (
        <LuChevronDown className="h-4 w-4" />
      )}
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

// Select Value (Displays selected value or placeholder)
const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { selectedValue } = useSelectContext();
  return <span className="">{selectedValue || placeholder}</span>;
};
SelectValue.displayName = "SelectValue";

// Select Content (Dropdown list)
const SelectContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useSelectContext();
  return isOpen ? (
    <ul
      ref={ref}
      className={cfx(
        "absolute z-50 mt-1 max-h-60 w-[10rem] overflow-auto rounded-2xl border bg-white shadow-sm dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  ) : null;
});
SelectContent.displayName = "SelectContent";

// Select Item (Individual option)
const SelectItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li"> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const { selectedValue, selectValue } = useSelectContext();
  const isSelected = selectedValue === value;

  return (
    <li
      ref={ref}
      className={cfx(
        "relative flex cursor-pointer select-none items-center rounded-xl py-1.5 pl-8 text-sm outline-none hover:bg-gray-200 dark:hover:bg-black",
        isSelected && " ",
        className,
      )}
      onClick={() => selectValue(value)}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <LuCheck className="h-5 w-5 text-blue-500" />
        </span>
      )}
      {children}
    </li>
  );
});
SelectItem.displayName = "SelectItem";

// Select Label (Group label for options)
const SelectLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cfx("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

// Select Group (Group of items)
const SelectGroup = ({ children, className }: React.ComponentProps<"div">) => (
  <div className={cfx("pt-1", className)}>{children}</div>
);
SelectGroup.displayName = "SelectGroup";

// Select Context for managing state and value
type SelectContextProps = {
  selectedValue: string | null;
  selectValue: (value: string) => void;
  isOpen: boolean;
  toggleOpen: () => void;
};

const SelectContext = React.createContext<SelectContextProps | undefined>(
  undefined,
);

const useSelectContext = () => {
  const context = React.useContext<SelectContextProps | undefined>(
    SelectContext,
  );
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
};

// SelectProvider Component (Handles the state for Select)
const Select = ({ children }: React.ComponentProps<"div">) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const selectValue = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false); // Close on selection
  };

  return (
    <SelectContext.Provider
      value={{ selectedValue, selectValue, isOpen, toggleOpen }}
    >
      {children}
    </SelectContext.Provider>
  );
};

Select.displayName = "Select";

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
};
