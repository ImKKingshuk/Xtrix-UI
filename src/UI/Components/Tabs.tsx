import * as React from "react";
import { cfx } from "classifyx";

// Tabs Root Component
const Tabs = ({
  className,
  children,
  defaultValue,
  ...props
}: React.ComponentProps<"div"> & { defaultValue?: string }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className={cfx("", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Check if the child is TabsList or TabsContent
          if (child.type === TabsList) {
            // Pass activeTab and onTabChange to TabsList
            return React.cloneElement(
              child as React.ReactElement<TabsListProps>,
              {
                activeTab,
                onTabChange: handleTabChange,
              },
            );
          } else if (child.type === TabsContent) {
            // Pass activeTab to TabsContent
            return React.cloneElement(
              child as React.ReactElement<TabsContentProps>,
              {
                activeTab,
              },
            );
          }
        }
        return child;
      })}
    </div>
  );
};

// Tabs List Component
interface TabsListProps extends React.ComponentProps<"div"> {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, activeTab, onTabChange, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cfx(
        "inline-flex h-10 items-center justify-center rounded-3xl border bg-white p-1 dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: activeTab === child.props.value,
            onClick: () => onTabChange && onTabChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  ),
);
TabsList.displayName = "TabsList";

// Tabs Trigger Component
interface TabsTriggerProps extends React.ComponentProps<"button"> {
  value: string;
  classNameActiveTab?: string;
  classNameOtherTab?: string;
  isActive?: boolean;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      className,
      classNameActiveTab,
      classNameOtherTab,
      isActive,
      value,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cfx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? `bg-blue-500 text-white ${classNameActiveTab}`
          : `hover:bg-gray-100 dark:hover:bg-black/50 ${classNameOtherTab}`,
        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = "TabsTrigger";

// Tabs Content Component
interface TabsContentProps extends React.ComponentProps<"div"> {
  value: string;
  activeTab?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeTab, children, ...props }, ref) => {
    if (activeTab !== value) return null; // Only render the content of the active tab

    return (
      <div ref={ref} className={cfx("mt-4", className)} {...props}>
        {children}
      </div>
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
