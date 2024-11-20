import * as React from "react";
import { cfx } from "classifyx";
import { LuGripVertical } from "react-icons/lu";

// Context for managing resizable panel state
const ResizableContext = React.createContext<any>(null);

const ResizableProvider = ({ children }: { children: React.ReactNode }) => {
  const [panels, setPanels] = React.useState<{ [key: string]: number }>({});

  const updatePanelSize = (id: string, size: number) => {
    setPanels((prev) => ({
      ...prev,
      [id]: Math.max(10, Math.min(100, size)), // Keep size between 10% and 100%
    }));
  };

  return (
    <ResizableContext.Provider value={{ panels, updatePanelSize }}>
      {children}
    </ResizableContext.Provider>
  );
};

// Resizable Panel Group
const ResizablePanelGroup = ({
  className,
  direction = "horizontal",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  direction?: "horizontal" | "vertical";
}) => {
  const isVertical = direction === "vertical";
  return (
    <div
      className={cfx(
        "flex h-full w-full",
        isVertical ? "flex-col" : "flex-row",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
ResizablePanelGroup.displayName = "ResizablePanelGroup";

// Resizable Panel
const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  {
    defaultSize?: number;
    panelId?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ className, defaultSize = 50, panelId, children, ...props }, ref) => {
  const { panels, updatePanelSize } = React.useContext(ResizableContext);
  const size = panels[panelId || ""] || defaultSize;

  React.useEffect(() => {
    if (panelId && !panels[panelId]) {
      updatePanelSize(panelId, defaultSize);
    }
  }, [panelId, defaultSize, panels, updatePanelSize]);

  const panelStyle = {
    flexBasis: `${size}%`,
  };

  return (
    <div
      ref={ref}
      className={cfx("flex-grow", className)}
      style={panelStyle}
      {...props}
    >
      {children}
    </div>
  );
});
ResizablePanel.displayName = "ResizablePanel";

// Resizable Handle
const ResizableHandle = ({
  direction = "horizontal",
  className,
  panelBeforeId,
  panelAfterId,
  ...props
}: {
  direction?: "horizontal" | "vertical";
  panelBeforeId?: string;
  panelAfterId?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const isVertical = direction === "vertical";
  const { panels, updatePanelSize } = React.useContext(ResizableContext);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const panelBeforeSize = panels[panelBeforeId || ""] || 50;
    const panelAfterSize = panels[panelAfterId || ""] || 50;

    const handleMouseMove = (event: MouseEvent) => {
      const delta = isVertical
        ? event.clientY - startY
        : event.clientX - startX;
      const totalSize = panelBeforeSize + panelAfterSize;
      const newPanelBeforeSize =
        (panelBeforeSize / totalSize) * 100 + (delta / totalSize) * 100;
      const newPanelAfterSize =
        (panelAfterSize / totalSize) * 100 - (delta / totalSize) * 100;

      if (panelBeforeId && panelAfterId) {
        updatePanelSize(panelBeforeId, newPanelBeforeSize);
        updatePanelSize(panelAfterId, newPanelAfterSize);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={cfx(
        "relative flex items-center justify-center bg-gray-200 dark:bg-[#ffffff33]",
        isVertical ? "h-px cursor-row-resize" : "w-px cursor-col-resize",
        className,
      )}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="z-10 flex items-center justify-center rounded-md border p-0.5 backdrop-blur-xl dark:border-[#ffffff33] dark:bg-[#202020]">
        <LuGripVertical
          className={cfx("size-3", isVertical ? "rotate-90" : "")}
        />
      </div>
    </div>
  );
};
ResizableHandle.displayName = "ResizableHandle";

// Resizable Container
const ResizableContainer = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cfx(
        "relative h-full w-full rounded-xl border bg-white dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
ResizableContainer.displayName = "ResizableContainer";

// Export all components wrapped in the ResizableProvider

export {
  ResizableContainer,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ResizableProvider,
};
