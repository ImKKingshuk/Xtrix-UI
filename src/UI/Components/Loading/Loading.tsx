import * as React from "react";
import { cfx } from "classifyx";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "solid"
    | "solid2"
    | "solid3"
    | "dotted"
    | "dotted2"
    | "dotted3"
    | "dashed"
    | "dashed2"
    | "dashed3"
    | "double"
    | "double2"
    | "double3"
    | "sleek"
    | "sleek2"
    | "sleek3";
}

const variants = {
  solid: `border-4 border-t-transparent border-l-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  solid2: `border-4 border-t-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  solid3: `border-4 border-t-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  dotted: `border-4 border-dotted border-t-transparent border-l-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  dotted2: `border-4 border-dotted border-t-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  dotted3: `border-4 border-dotted border-t-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  dashed: `border-4 border-dashed border-t-transparent border-l-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  dashed2: `border-4 border-dashed border-t-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  dashed3: `border-4 border-dashed border-t-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  double: `border-4 border-double border-t-transparent border-b-transparent border-l-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  double2: `border-4 border-double border-t-transparent border-b-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  double3: `border-4 border-double border-t-transparent rounded-full h-10 w-10 border-blue-500 animate-spin`,
  sleek: `border-l-2 rounded-full h-10 w-10 border-blue-500 animate-spin`,
  sleek2: `border-l-2 border-r-2 rounded-full h-10 w-10 border-blue-500 animate-spin`,
  sleek3: `border-l-2 border-t-2 border-r-2 rounded-full h-10 w-10 border-blue-500 animate-spin`,
};

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ variant = "solid", className, ...props }, ref) => {
    return (
      <div ref={ref} className={cfx(variants[variant], className)} {...props} />
    );
  },
);

Loading.displayName = "Loading";

export { Loading };
