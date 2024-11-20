import * as React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { cfx } from "classifyx";

type CarouselProps = {
  orientation?: "horizontal" | "vertical";
};

type CarouselContextProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  // Get the full width or height of one item (depending on orientation)
  const getScrollAmount = () => {
    if (!containerRef.current) return 0;
    return orientation === "horizontal"
      ? containerRef.current.clientWidth
      : containerRef.current.clientHeight;
  };

  // Handle the next scroll
  const scrollNext = React.useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      top: orientation === "vertical" ? getScrollAmount() : 0,
      left: orientation === "horizontal" ? getScrollAmount() : 0,
      behavior: "smooth",
    });
  }, [orientation]);

  // Handle the previous scroll
  const scrollPrev = React.useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      top: orientation === "vertical" ? -getScrollAmount() : 0,
      left: orientation === "horizontal" ? -getScrollAmount() : 0,
      behavior: "smooth",
    });
  }, [orientation]);

  // Update scroll state (whether next/prev buttons should be enabled)
  const updateScrollState = React.useCallback(() => {
    if (!containerRef.current) return;
    const {
      scrollLeft,
      scrollTop,
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight,
    } = containerRef.current;

    setCanScrollPrev(
      orientation === "horizontal" ? scrollLeft > 0 : scrollTop > 0,
    );
    setCanScrollNext(
      orientation === "horizontal"
        ? scrollLeft + clientWidth < scrollWidth
        : scrollTop + clientHeight < scrollHeight,
    );
  }, [orientation]);

  // Attach event listeners to update the scroll state on scroll
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState]);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollNext, scrollPrev],
  );

  return (
    <CarouselContext.Provider
      value={{
        containerRef,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cfx("relative p-4", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

// CarouselContent Component
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { containerRef, orientation } = useCarousel();

  return (
    <div
      ref={containerRef}
      className={cfx(
        "overflow-hidden",
        orientation === "horizontal" ? "w-full" : "h-full",
      )}
    >
      <div
        ref={ref}
        className={cfx(
          "flex transition-transform duration-300 ease-in-out",
          orientation === "horizontal" ? "flex-row" : "h-full flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// CarouselItem Component
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cfx(
        "shrink-0 grow-0 justify-center",
        orientation === "horizontal" ? "w-full" : "h-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CarouselItem.displayName = "CarouselItem";

// CarouselPrevious Component
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      className={cfx(
        "absolute z-10 rounded-full border p-2 backdrop-blur-lg hover:bg-gray-100 dark:border-[#ffffff33] hover:dark:bg-[#202020]",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {children ?? <LuChevronLeft className="size-6" />}
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

// CarouselNext Component
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      className={cfx(
        "absolute z-10 rounded-full border p-2 backdrop-blur-lg hover:bg-gray-100 dark:border-[#ffffff33] hover:dark:bg-[#202020]",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {children ?? <LuChevronRight className="size-6" />}
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
