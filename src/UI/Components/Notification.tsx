import * as React from "react";
import { cfx } from "classifyx";
import { LuX } from "react-icons/lu";

// Define the notification options
interface NotificationOptions {
  duration?: number;
  variant?: "toast" | "sooner" | "banner";
  type?: "default" | "success" | "error" | "warning";
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center";
}

interface Notification {
  id: string;
  message: string;
  options?: NotificationOptions;
}

interface NotificationContextProps {
  addNotification: (message: string, options?: NotificationOptions) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = React.createContext<
  NotificationContextProps | undefined
>(undefined);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const addNotification = React.useCallback(
    (message: string, options?: NotificationOptions) => {
      const id = `notification_${Date.now()}`;
      setNotifications((prev) => [...prev, { id, message, options }]);

      if (options?.duration) {
        setTimeout(() => removeNotification(id), options.duration);
      }
    },
    [],
  );

  const removeNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer notifications={notifications} />
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

// Notification container to manage stacking and positioning
interface NotificationContainerProps {
  notifications: Notification[];
}

const NotificationContainer = ({
  notifications,
}: NotificationContainerProps) => {
  const positionClasses = {
    "top-right": "fixed top-5 right-5",
    "top-left": "fixed top-5 left-5",
    "bottom-right": "fixed bottom-5 right-5",
    "bottom-left": "fixed bottom-5 left-5",
    center: "fixed top-5 left-1/2 -translate-x-1/2",
  };

  // Split toast and sooner notifications
  const toasts = notifications.filter((n) => n.options?.variant === "toast");
  const sooners = notifications
    .filter((n) => n.options?.variant === "sooner")
    .slice(0, 5); // Only stack 5 Sooner notifications

  return (
    <>
      {/* Toasts (Single, not stacked) */}
      {toasts.map((notification) => (
        <div
          key={notification.id}
          className={cfx(
            "z-50",
            positionClasses[notification?.options?.position || "top-right"],
          )}
        >
          <NotificationItem
            id={notification.id}
            message={notification.message}
            options={notification.options}
          />
        </div>
      ))}

      {/* Sooner (Stacked) */}
      <div
        className={cfx(
          "z-50",
          positionClasses[sooners[0]?.options?.position || "top-right"],
          "space-y-2",
        )}
      >
        {sooners.map((notification, index) => (
          <div
            key={notification.id}
            className={cfx(
              "transition-all duration-300 ease-in-out",
              `translate-y-${index * -2}`, // Move each notification up slightly (2px for each)
              `w-[calc(20rem-${index * 4}px)]`, // Reduce width slightly for each stacked notification (4px for each)
            )}
          >
            <NotificationItem
              id={notification.id}
              message={notification.message}
              options={notification.options}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// NotificationItem with customizable content and dismiss button
interface NotificationItemProps {
  id: string;
  message: string;
  options?: NotificationOptions;
}

const NotificationItem = React.forwardRef<
  HTMLDivElement,
  NotificationItemProps
>(({ id, message, options }, ref) => {
  const { removeNotification } = useNotification();

  // Base styles for different notification types
  const baseClasses =
    "px-4 py-3 w-[20rem] rounded-xl border backdrop-blur flex items-center gap-2 relative";
  const typeClasses = {
    default: "bg-gray-200 text-black",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  // Variant classes
  const variantClasses = {
    toast: "shadow-lg",
    sooner: "shadow-md",
    banner: "w-full",
  };

  const closeButton = (
    <button
      onClick={() => removeNotification(id)}
      className="absolute right-2 top-2 rounded-lg border p-1 text-black hover:bg-gray-200"
    >
      <LuX className="h-4 w-4" />
    </button>
  );

  return (
    <div
      ref={ref}
      className={cfx(
        baseClasses,
        typeClasses[options?.type || "default"],
        variantClasses[options?.variant || "toast"],
      )}
    >
      <span>{message}</span>
      {closeButton}
    </div>
  );
});

NotificationItem.displayName = "NotificationItem";

// Example usage of the notification provider
export default function Example() {
  const { addNotification } = useNotification();

  const showToast = () => {
    addNotification("This is a toast notification!", {
      variant: "toast",
      type: "success",
      duration: 3000,
      position: "top-right",
    });
  };

  const showSooner = () => {
    addNotification("This is a sooner notification!", {
      variant: "sooner",
      type: "warning",
      duration: 5000,
      position: "top-right",
    });
  };

  const showBanner = () => {
    addNotification("This is a banner notification!", {
      variant: "banner",
      type: "error",
      duration: 7000,
    });
  };

  return (
    <NotificationProvider>
      <div className="p-6">
        <button className="btn" onClick={showToast}>
          Show Toast
        </button>
        <button className="btn" onClick={showSooner}>
          Show Sooner
        </button>
        <button className="btn" onClick={showBanner}>
          Show Banner
        </button>
      </div>
    </NotificationProvider>
  );
}

export {
  NotificationContainer,
  NotificationItem,
  NotificationProvider,
  useNotification,
};
