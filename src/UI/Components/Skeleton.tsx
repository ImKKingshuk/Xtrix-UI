import { cfx } from "classifyx";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cfx("animate-pulse rounded-xl bg-gray-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
