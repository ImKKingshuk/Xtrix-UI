import * as React from "react";
import { cfx } from "classifyx";

// Context for managing Slider state
interface SliderContextType {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const SliderContext = React.createContext<SliderContextType | null>(null);

const useSlider = () => {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};

// SliderProvider Component to manage state
const SliderProvider: React.FC<{
  children: React.ReactNode;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}> = ({ children, defaultValue = 25, min = 0, max = 100, step = 1 }) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <SliderContext.Provider value={{ value, setValue, min, max, step }}>
      <SliderStyles />
      {children}
    </SliderContext.Provider>
  );
};

// Helper function to calculate step based on mouse/touch movement
const calculateStepValue = (
  e: React.MouseEvent | React.TouchEvent,
  min: number,
  max: number,
  step: number,
  sliderWidth: number,
  sliderLeft: number,
) => {
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const percentage = (clientX - sliderLeft) / sliderWidth;
  const unroundedValue = min + percentage * (max - min);
  const steppedValue = Math.round(unroundedValue / step) * step;
  return Math.min(max, Math.max(min, steppedValue));
};

// Slider Component
interface SliderProps {
  className?: string;
  classNameSteps?: string;
  classNameRange?: string;
  classNameThumb?: string;
  variant?: "default" | "no-thumb" | "stepped";
}

const Slider: React.FC<SliderProps> = ({
  className,
  classNameSteps,
  classNameRange,
  classNameThumb,
  variant = "default",
}) => {
  const { value, setValue, min, max, step } = useSlider();
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value)); // This updates the slider value.
  };

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const sliderWidth = slider.clientWidth;
    const sliderLeft = slider.getBoundingClientRect().left;

    const updateValue = (event: React.MouseEvent | React.TouchEvent) => {
      const newValue = calculateStepValue(
        event,
        min,
        max,
        step,
        sliderWidth,
        sliderLeft,
      );
      setValue(newValue);
    };

    const handleMove = (event: MouseEvent | TouchEvent) =>
      updateValue(event as any);
    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleUp);

    updateValue(e);
  };

  // Calculate the percentage width of the slider's filled track.
  const percentageFilled = ((value - min) / (max - min)) * 100;

  return (
    <div className={cfx("relative flex w-full items-center")} ref={sliderRef}>
      <div
        className={cfx(
          "relative h-5 w-full grow overflow-hidden rounded-full bg-gray-200",
          className,
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div
          className={cfx(
            "absolute h-full bg-blue-600 transition-all duration-200 ease-in-out",
            classNameRange,
          )}
          style={{ width: `${percentageFilled}%` }}
        />
        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
        />
      </div>

      {variant !== "no-thumb" && (
        <div
          className={cfx(
            "absolute z-10 size-5 cursor-pointer rounded-full border-4 border-blue-500 bg-white",
            classNameThumb,
          )}
          style={{
            left: `calc(${percentageFilled}% - 4px)`,
            transform: "translateX(-50%)",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        />
      )}

      {variant === "stepped" && (
        <div className="absolute inset-0 flex items-center justify-between">
          {Array.from({ length: Math.floor((max - min) / step) + 1 }).map(
            (_, index) => (
              <div
                key={index}
                className={cfx(
                  "mx-1 size-3 rounded bg-gray-300",
                  classNameSteps,
                )}
                style={{
                  left: `calc(${(index / ((max - min) / step)) * 100}% - 1px)`,
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

const SliderStyles = () => (
  <style>{`
    /* Hide the default slider thumb on WebKit browsers */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      background: transparent;
    }
    /* Hide the default slider thumb on Firefox */
    input[type="range"]::-moz-range-thumb {
      visibility: hidden;
    }
    /* Hide the default slider thumb on Microsoft Edge */
    input[type="range"]::-ms-thumb {
      appearance: none;
    }
  `}</style>
);

export { SliderProvider, Slider };
