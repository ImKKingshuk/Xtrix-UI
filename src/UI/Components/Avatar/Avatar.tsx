import * as React from "react";
import { cfx } from "classifyx";

const Avatar = React.forwardRef<
  HTMLDivElement,
  { className?: string; size?: string; children: React.ReactNode }
>(({ className, size = "h-10 w-10", children }, ref) => (
  <div
    ref={ref}
    className={cfx(
      `relative flex shrink-0 overflow-hidden rounded-full ${size}`,
      className,
    )}
  >
    {children}
  </div>
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  { src: string; alt: string; className?: string }
>(({ src, alt, className }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={cfx(
      "aspect-square h-full w-full object-cover duration-300 hover:scale-110",
      className,
    )}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  { className?: string; fallbackText: string }
>(({ className, fallbackText }, ref) => (
  <div
    ref={ref}
    className={cfx(
      "bg-muted flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
  >
    {fallbackText}
  </div>
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
