import * as React from "react";
import { cfx } from "classifyx";
import { LuX } from "react-icons/lu";

// Define different Sonner types
interface SonnerOptions {
  duration?: number;
  variant?: "default" | "success" | "error" | "warning";
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center-top"
    | "center-bottom"
    | "center-left"
    | "center-right";
}

interface Sonner {
  id: string;
  message: string;
  options?: SonnerOptions;
}

interface SonnerContextProps {
  addSonner: (message: string, options?: SonnerOptions) => void;
  removeSonner: (id: string) => void;
}

const SonnerContext = React.createContext<SonnerContextProps | undefined>(
  undefined,
);

const SonnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [Sonners, setSonners] = React.useState<Sonner[]>([]);

  const addSonner = React.useCallback(
    (message: string, options?: SonnerOptions) => {
      const id = `Sonner_${Date.now()}`;
      setSonners((prev) => {
        const updatedSonners = [...prev, { id, message, options }];
        return updatedSonners.slice(-5); // Only keep the last 5 notifications
      });

      if (options?.duration) {
        setTimeout(() => removeSonner(id), options.duration);
      }
    },
    [],
  );

  const removeSonner = React.useCallback((id: string) => {
    setSonners((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <SonnerContext.Provider value={{ addSonner, removeSonner }}>
      {children}
      <SonnerContainer Sonners={Sonners} />
    </SonnerContext.Provider>
  );
};

const useSonner = () => {
  const context = React.useContext(SonnerContext);
  if (!context) {
    throw new Error("useSonner must be used within SonnerProvider");
  }
  return context;
};

// Sonner container to manage stacking and positioning
interface SonnerContainerProps {
  Sonners: Sonner[];
}

const SonnerContainer = ({ Sonners }: SonnerContainerProps) => {
  const positionClasses = {
    "top-right": "fixed top-5 right-5",
    "top-left": "fixed top-5 left-5",
    "bottom-right": "fixed bottom-5 right-5",
    "bottom-left": "fixed bottom-5 left-5",
    "center-top": "fixed top-5 left-1/2 -translate-x-1/2",
    "center-bottom": "fixed bottom-5 left-1/2 -translate-x-1/2",
    "center-left": "fixed left-5 top-1/2 -translate-x-1/2",
    "center-right": "fixed right-5 top-1/2 -translate-x-1/2",
  };

  return (
    <>
      {Sonners.map((Sonner, index) => {
        const positionClass =
          positionClasses[Sonner?.options?.position || "top-right"];
        const topOffset = index * 8; // Stack each notification with a top offset
        const widthAdjustment = index * 8; // Adjust width for stacked notifications

        return (
          <div
            key={Sonner.id}
            className={cfx(
              `z-50 ${positionClass} mx-auto items-center transition-all duration-300 ease-in-out`,
              `transform -translate-y-${topOffset}px`,
            )}
            style={{ width: `calc(20rem - ${widthAdjustment}px)` }} // Adjust the width dynamically
          >
            <SonnerItem
              id={Sonner.id}
              message={Sonner.message}
              options={Sonner.options}
            />
          </div>
        );
      })}
    </>
  );
};

// SonnerItem with customizable content and dismiss button
interface SonnerItemProps {
  id: string;
  message: string;
  options?: SonnerOptions;
}

const SonnerItem = React.forwardRef<HTMLDivElement, SonnerItemProps>(
  ({ id, message, options }, ref) => {
    const { removeSonner } = useSonner();

    const variantClasses = {
      default: "bg-white text-black ",
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-black",
    };

    const closeButton = (
      <button
        onClick={() => removeSonner(id)}
        className="absolute right-1 top-1 rounded-lg p-1 text-black hover:bg-gray-200"
      >
        <LuX className="h-4 w-4" />
      </button>
    );

    return (
      <div
        ref={ref}
        className={cfx(
          "relative my-2 flex items-center gap-3 rounded-lg border px-4 py-3 backdrop-blur",
          variantClasses[options?.variant || "default"],
        )}
      >
        <span>{message}</span>
        {closeButton}
      </div>
    );
  },
);

SonnerItem.displayName = "SonnerItem";

export { SonnerProvider, useSonner };
