import * as React from "react";
import { cfx } from "classifyx";
import { LuArrowRight } from "react-icons/lu";

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ children, className }, ref) => (
  <div ref={ref} className={cfx("grid w-full grid-cols-3 gap-4", className)}>
    {children}
  </div>
));
BentoGrid.displayName = "BentoGrid";

const BentoCard = React.forwardRef<
  HTMLDivElement,
  {
    name?: string;
    className?: string;
    background?: React.ReactNode;
    Icon?: React.ReactNode;
    description?: string;
    href?: string;
    cta?: string;
  }
>(({ name, className, background, Icon, description, href, cta }, ref) => (
  <div
    ref={ref}
    key={name}
    className={cfx(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",

      "bg-white shadow-md dark:border dark:border-neutral-600 dark:bg-black",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cfx(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <a
        href={href}
        className="pointer-events-auto flex items-center text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
      >
        {cta}
        <LuArrowRight className="ml-2 size-4" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
));
BentoCard.displayName = "BentoCard";

export { BentoCard, BentoGrid };
