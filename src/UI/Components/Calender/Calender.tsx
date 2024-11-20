import * as React from "react";
import { cfx } from "classifyx"; // cfx for class merging
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface CalendarProps {
  className?: string;
  classNameCurrentDate?: string;
  classNameCurrentMonth?: string;
  classNameCurrentYear?: string;
  classNameOtherDate?: string;
  classNameCalenderDate?: string;
  classNameMonthYear?: string;
  classNameDayNames?: string;
  buttonNext?: string;
  buttonPrevious?: string;
  buttonNextIcon?: React.ReactNode;
  buttonPreviousIcon?: React.ReactNode;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Array(31)
    .fill(null)
    .map((_, index) => new Date(year, month, index + 1))
    .filter((date) => date.getMonth() === month);
}

function Calendar({
  className,
  classNameOtherDate,
  classNameCurrentDate,
  classNameCurrentMonth,
  classNameCurrentYear,
  classNameCalenderDate,
  classNameMonthYear,
  classNameDayNames,
  buttonNext,
  buttonPrevious,
  buttonNextIcon,
  buttonPreviousIcon,
  selectedDate,
  onDateChange,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(
    selectedDate || new Date(),
  );
  const [month, setMonth] = React.useState(currentDate.getMonth());
  const [year, setYear] = React.useState(currentDate.getFullYear());
  const [viewMode, setViewMode] = React.useState<"date" | "month" | "year">(
    "date",
  );

  const daysInMonth = getDaysInMonth(year, month);

  const handlePrevMonth = () => {
    if (viewMode === "date") {
      setMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (month === 0) setYear(year - 1);
    } else if (viewMode === "year") {
      setYear(year - 30); // show previous set of 12 years
    }
  };

  const handleNextMonth = () => {
    if (viewMode === "date") {
      setMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (month === 11) setYear(year + 1);
    } else if (viewMode === "year") {
      setYear(year + 30); // show next set of 12 years
    }
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    if (onDateChange) onDateChange(date);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setMonth(monthIndex);
    setViewMode("date");
  };

  const handleYearSelect = (yearSelected: number) => {
    setYear(yearSelected);
    setViewMode("date");
  };

  const goToToday = () => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setCurrentDate(today);
    setViewMode("date");
  };

  const renderDaysOfWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="mx-auto grid grid-cols-7 gap-3 text-center">
        {days.map((day) => (
          <div
            key={day}
            className={cfx(
              "rounded-xl px-2 text-center font-medium",
              classNameDayNames,
            )}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDaysInMonth = () => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const emptyDays = new Array(firstDayOfMonth).fill(null);

    return (
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}
        {daysInMonth.map((day) => {
          const isSelected =
            selectedDate?.toDateString() === day.toDateString();
          const isToday = new Date().toDateString() === day.toDateString();

          return (
            <button
              key={day.toDateString()}
              onClick={() => handleDateSelect(day)}
              className={cfx(
                "m-[2px] rounded-xl p-2 text-center duration-300 hover:outline hover:outline-blue-500",
                isSelected
                  ? `dark:bg-bg-blue-500 bg-blue-500 font-bold tracking-[1.5px] text-white dark:border-none ${classNameCurrentDate}`
                  : `hover:bg-gray-200 dark:hover:bg-black ${classNameOtherDate}`,
                isToday && !isSelected ? "border border-blue-500" : "",
                classNameCalenderDate,
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    );
  };

  // Handle Month and Year Views
  const renderMonthView = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div className="grid grid-cols-3 gap-3">
        {months.map((monthName, index) => (
          <button
            key={monthName}
            onClick={() => handleMonthSelect(index)}
            className="rounded-xl p-2 text-center hover:bg-gray-200 hover:outline hover:outline-blue-500 dark:hover:bg-black"
          >
            {monthName}
          </button>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const yearsRange = Array.from({ length: 30 }, (_, i) => year - 6 + i);

    return (
      <div className="grid grid-cols-5 gap-3">
        {yearsRange.map((yearOption) => (
          <button
            key={yearOption}
            onClick={() => handleYearSelect(yearOption)}
            className="rounded-xl px-2 py-1 text-center hover:bg-gray-200 hover:outline hover:outline-blue-500 dark:hover:bg-black"
          >
            {yearOption}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cfx(
        "w-[22rem] rounded-[16px] border bg-white p-4 shadow-sm dark:border-[#ffffff33] dark:bg-[#202020]",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className={cfx(
            "rounded-xl border p-1 hover:bg-gray-100 dark:border-[#ffffff33] dark:hover:bg-black/50",
            buttonPrevious,
          )}
          aria-label="Previous"
        >
          {buttonPreviousIcon ?? <LuChevronLeft className="h-6 w-6" />}
        </button>

        {/* Month and Year Selector with Clickable Switch */}
        <div
          className={cfx(
            "flex items-center justify-between gap-2 rounded-2xl",
            classNameMonthYear,
          )}
        >
          <span
            onClick={() => setViewMode("month")}
            className={cfx(
              "cursor-pointer rounded-xl px-2 py-1 hover:bg-gray-100 dark:hover:bg-black/50",
              classNameCurrentMonth,
            )}
          >
            {new Date(year, month).toLocaleString("default", { month: "long" })}
          </span>
          <span>|</span>
          <span
            onClick={() => setViewMode("year")}
            className={cfx(
              "cursor-pointer rounded-xl px-2 py-1 hover:bg-gray-100 dark:hover:bg-black/50",
              classNameCurrentYear,
            )}
          >
            {year}
          </span>
        </div>

        {/* Show "Go to Today" button only in month or year view */}
        {(viewMode === "month" || viewMode === "year") && (
          <button
            onClick={goToToday}
            className={cfx(
              "rounded-xl bg-blue-500 px-2 py-1 text-sm text-white",
              classNameCurrentDate,
            )}
            aria-label="Go To Today"
          >
            Today
          </button>
        )}

        <button
          onClick={handleNextMonth}
          className={cfx(
            "rounded-xl border p-1 hover:bg-gray-100 dark:border-[#ffffff33] dark:hover:bg-black/50",
            buttonNext,
          )}
          aria-label="Next"
        >
          {buttonNextIcon ?? <LuChevronRight className="h-6 w-6" />}
        </button>
      </div>

      {/* Render Date, Month, or Year Views */}
      {viewMode === "date" && (
        <>
          {renderDaysOfWeek()}
          {renderDaysInMonth()}
        </>
      )}
      {viewMode === "month" && renderMonthView()}
      {viewMode === "year" && renderYearView()}
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
