import * as React from "react";
import { cfx } from "classifyx";
import {
  LuChevronLeft,
  LuChevronRight,
  LuMoreHorizontal,
} from "react-icons/lu";

// Pagination Wrapper
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cfx("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// Pagination Content
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cfx("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

// Pagination Item
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cfx(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// Pagination Link
type PaginationLinkProps = {
  isActive?: boolean;
  classNameActiveLink?: string;
  classNameOtherLinks?: string;
} & React.ComponentProps<"a">;

const PaginationLink = ({
  isActive,
  classNameActiveLink,
  classNameOtherLinks,
  className,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cfx(
      "flex items-center justify-center rounded-xl px-4 py-2 text-sm",
      isActive
        ? `border bg-white font-bold dark:border-[#ffffff33] dark:bg-[#202020] ${classNameActiveLink}`
        : `bg-transparent hover:bg-gray-100 dark:hover:bg-gray-500 ${classNameOtherLinks}`,
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// Pagination Previous Button
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cfx("gap-1", className)}
    {...props}
  >
    <LuChevronLeft className="h-5 w-5" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// Pagination Next Button
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cfx("gap-1", className)}
    {...props}
  >
    <span>Next</span>
    <LuChevronRight className="h-5 w-5" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// Pagination Ellipsis
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cfx(
      "flex items-center justify-center rounded-xl px-3 py-1.5 hover:outline hover:outline-gray-100 dark:outline-[#ffffff33]",
      className,
    )}
    {...props}
  >
    <LuMoreHorizontal className="h-5 w-5" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
