import * as React from "react";
import { cfx } from "classifyx";

interface ToastContextProps {
  addToast: (message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextProps | undefined>(
  undefined,
);

interface ToastProviderProps {
  children: React.ReactNode;
  className?: string;
}

interface ToastOptions {
  duration?: number; // Duration in milliseconds
  variant?: "default" | "success" | "error" | "warning";
}

let ToastId = 0;

const ToastProvider = ({ children, className }: ToastProviderProps) => {
  const [Toasts, setToasts] = React.useState<
    Array<{ id: string; message: string; options?: ToastOptions }>
  >([]);

  const addToast = React.useCallback(
    (message: string, options?: ToastOptions) => {
      const id = `Toast_${ToastId++}`;
      setToasts((prev) => [...prev, { id, message, options }]);

      if (options?.duration) {
        setTimeout(() => removeToast(id), options.duration);
      }
    },
    [],
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((Toast) => Toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer Toasts={Toasts} className={className} />
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Container to hold notifications
interface ToastContainerProps {
  Toasts: Array<{ id: string; message: string; options?: ToastOptions }>;
  className?: string;
}

const ToastContainer = ({ Toasts, className }: ToastContainerProps) => {
  return (
    <div
      className={cfx(
        "fixed right-5 top-5 z-50 flex flex-col space-y-2",
        className,
      )}
    >
      {Toasts.map((Toast) => (
        <ToastNotification
          key={Toast.id}
          id={Toast.id}
          message={Toast.message}
          options={Toast.options}
        />
      ))}
    </div>
  );
};

// Toast Notification Component
interface ToastNotificationProps {
  id: string;
  message: string;
  options?: ToastOptions;
  className?: string;
}

const ToastNotification = ({
  id,
  message,
  options,
  className,
}: ToastNotificationProps) => {
  const { removeToast } = useToast();

  const baseClasses =
    "px-4 py-2 rounded shadow-md transition-transform transform-gpu ease-out duration-300";
  const variantClasses = {
    default: "bg-white text-black",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
  };

  return (
    <div
      className={cfx(
        baseClasses,
        variantClasses[options?.variant || "default"],
        "cursor-pointer hover:opacity-90",
        className,
      )}
      onClick={() => removeToast(id)}
    >
      {message}
    </div>
  );
};

export {
  ToastContainer,
  ToastContext,
  ToastNotification,
  ToastProvider,
  useToast,
};
