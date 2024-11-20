import * as React from "react";
import { cfx } from "classifyx";

interface UserProps {
  img?: string; // URL for the user's image
  name?: string; // User's name
  username?: string; // User's username
  status?: "online" | "offline" | "away"; // User's online status
  className?: string; // Additional class names for customization
  showStatusIndicator?: boolean; // Show status indicator if true
}

const User: React.FC<UserProps> = ({
  img,
  name = "User Name",
  username = "username",
  status,
  className,
  showStatusIndicator = true,
}) => {
  return (
    <div className={cfx("flex items-center", className)}>
      {/* User Image */}
      <div className="relative">
        <img
          src={img}
          alt={name}
          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
        />
        {/* Status Indicator */}
        {showStatusIndicator && status && (
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
              status === "online"
                ? "bg-green-500"
                : status === "offline"
                  ? "bg-gray-400"
                  : "bg-yellow-400"
            }`}
            aria-label={`${name} is ${status}`}
          />
        )}
      </div>

      {/* User Info */}
      <div className="ml-3">
        <div className="text-sm font-semibold text-gray-800 dark:text-white">
          {name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          @{username}
        </div>
      </div>
    </div>
  );
};

User.displayName = "User";

export { User };
