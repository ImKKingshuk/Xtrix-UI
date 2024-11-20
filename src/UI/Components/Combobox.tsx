import * as React from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuSearch,
  LuCheck,
  LuCheckCheck,
} from "react-icons/lu";
import { cfx } from "classifyx";
import { FaDotCircle } from "react-icons/fa";
// Create a SearchContext to manage the search input and selected item
const SearchContext = React.createContext<{
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  searchValue: "",
  setSearchValue: () => {},
  open: false,
  setOpen: () => {},
  selected: null,
  setSelected: () => {},
});

// Main Search Component
const Combobox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    placeholder?: string;
  }
>(({ placeholder = "Search...", className, children, ...props }, ref) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        open,
        setOpen,
        selected,
        setSelected,
      }}
    >
      <div
        ref={ref}
        className={cfx("relative w-[14rem]", className)}
        {...props}
      >
        {children}
      </div>
    </SearchContext.Provider>
  );
});
Combobox.displayName = "Combobox";

// Search Input Component
const ComboboxSearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { searchValue, setSearchValue, setOpen } =
    React.useContext(SearchContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setOpen(true); // Open the dropdown when typing
  };

  return (
    <div className="flex items-center gap-2 divide-x divide-[#323741] rounded-2xl border p-3 backdrop-blur-lg dark:divide-white dark:border-[#ffffff33]">
      <LuSearch className="text-[#323741] dark:text-white" />
      <input
        ref={ref}
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className={cfx(
          "w-full truncate bg-transparent px-2 text-sm outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
});
ComboboxSearchInput.displayName = "ComboboxSearchInput";
// Search Input Component
const ComboboxLabel = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cfx("truncate rounded-2xl p-3 text-center text-sm", className)}
    >
      {children}
    </div>
  );
});
ComboboxLabel.displayName = "ComboboxLabel";

// Search Dropdown Container (Shows search results)
const ComboboxDropdown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open } = React.useContext(SearchContext);

  return (
    <div
      ref={ref}
      className={cfx(
        open ? "space-y-2 p-3" : "hidden",
        "absolute z-10 mt-2 w-full rounded-[20px] border backdrop-blur-lg dark:border-[#ffffff33]",
        className,
      )}
      {...props}
    />
  );
});
ComboboxDropdown.displayName = "ComboboxDropdown";

// Search Item (Each selectable option in the dropdown)
const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number;
    label: string;
    variant?: "default" | "doublecheck" | "circle";
    classNameItemSelected?: string;
    classNameItemOther?: string;
  }
>(
  (
    {
      index,
      children,
      classNameItemSelected,
      classNameItemOther,
      variant = "default",
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const { selected, setSelected } = React.useContext(SearchContext);

    const handleSelect = () => {
      setSelected(index);
    };

    // Conditional classes for different variants
    const variantClasses = {
      default: "rounded-sm ",
      doublecheck: "rounded-full ", // For rounded checkbox
      circle: "rounded-full  border dark:border-[#ffffff33] ", // For radio-like checkbox
    };

    // Conditional rendering of icons based on variant
    const renderIcon = () => {
      if (selected) {
        if (variant === "circle") {
          return <FaDotCircle className="h-5 w-5" />;
        } else if (variant === "doublecheck") {
          return <LuCheckCheck className="h-5 w-5 -rotate-45" />;
        }
        return <LuCheck className="h-5 w-5 -rotate-45" />;
      }
      return null;
    };
    return (
      <div
        ref={ref}
        onClick={handleSelect}
        className={cfx(
          "flex cursor-pointer items-center rounded-[18px] border p-3 transition-colors dark:border-[#ffffff33]",
          selected === index
            ? `bg-[#0071ff] text-white ${classNameItemSelected}`
            : ` ${classNameItemOther}`,
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        <div
          className={cfx(
            "flex h-6 w-6 rotate-45 items-center justify-center rounded-lg",
            selected === index
              ? "bg-white text-[#0071ff]"
              : "dark:border-[#ffffff33]-gray-400 border dark:border-[#ffffff33]",
          )}
        >
          {selected === index && [children ?? renderIcon()]}
        </div>
        <span className="ml-3">{label}</span>
      </div>
    );
  },
);
ComboboxItem.displayName = "ComboboxItem";

// Toggle Button (To open/close the dropdown)
const ComboboxDropdownToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SearchContext);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      ref={ref}
      onClick={handleToggle}
      className={cfx(
        "absolute -bottom-5 left-1/2 z-50 flex h-8 w-8 -translate-x-1/2 transform cursor-pointer items-center justify-center rounded-xl bg-blue-500 backdrop-blur-md hover:bg-opacity-80",
        className,
      )}
      {...props}
    >
      {open ? (
        <LuChevronUp className="size-5 animate-bounce text-white" />
      ) : (
        <LuChevronDown className="size-5 animate-bounce text-white" />
      )}
    </div>
  );
});
ComboboxDropdownToggle.displayName = "ComboboxDropdownToggle";

// Export components
export {
  Combobox,
  ComboboxLabel,
  ComboboxSearchInput,
  ComboboxDropdown,
  ComboboxItem,
  ComboboxDropdownToggle,
};
