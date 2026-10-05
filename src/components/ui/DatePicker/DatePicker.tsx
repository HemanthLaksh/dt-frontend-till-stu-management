"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  disabled?: boolean;
}

type CalendarView = "days" | "months" | "years";

const WEEK_DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

const MONTHS = [
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

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* =========================================
   DATE HELPERS
========================================= */

function formatDate(dateString: string) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTodayString() {
  return toDateString(new Date());
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function parseDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

/* =========================================
   CALENDAR DAYS
========================================= */

function getCalendarDays(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);

  const startDay = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(
    year,
    monthIndex + 1,
    0,
  ).getDate();

  const previousMonthDays = new Date(
    year,
    monthIndex,
    0,
  ).getDate();

  const days: Date[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push(
      new Date(
        year,
        monthIndex - 1,
        previousMonthDays - i,
      ),
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      new Date(
        year,
        monthIndex,
        day,
      ),
    );
  }

  let nextDay = 1;

  while (days.length < 42) {
    days.push(
      new Date(
        year,
        monthIndex + 1,
        nextDay,
      ),
    );

    nextDay++;
  }

  return days;
}

/* =========================================
   COMPONENT
========================================= */

export default function DatePicker({
  label,
  value,
  onChange,
  minDate,
  disabled = false,
}: DatePickerProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const calendarRef =
    useRef<HTMLDivElement | null>(null);

  const previousScrollY =
    useRef(0);

  const wasOpened =
    useRef(false);

  const closeTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const initialDate = value
    ? parseDate(value)
    : new Date();

  const [open, setOpen] =
    useState(false);

  const [calendarVisible, setCalendarVisible] =
    useState(false);

  const [visibleMonth, setVisibleMonth] =
    useState(
      getMonthStart(initialDate),
    );

  const [calendarView, setCalendarView] =
    useState<CalendarView>("days");

  const [yearPage, setYearPage] =
    useState(
      Math.floor(
        initialDate.getFullYear() / 12,
      ) * 12,
    );

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );

  /* =========================================
     CLOSE CALENDAR
  ========================================= */

  const closeCalendar = () => {
    setCalendarVisible(false);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      setCalendarView("days");
    }, 180);
  };

  /* =========================================
     CLEANUP
  ========================================= */

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  /* =========================================
     CLOSE WHEN CLICKING OUTSIDE
  ========================================= */

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        closeCalendar();
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, [open]);

  /* =========================================
     AUTO SCROLL + RESTORE SCROLL
  ========================================= */

  useEffect(() => {
    if (open) {
      if (!wasOpened.current) {
        previousScrollY.current =
          window.scrollY;

        wasOpened.current = true;
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const calendar =
            calendarRef.current;

          if (!calendar) return;

          const rect =
            calendar.getBoundingClientRect();

          const viewportHeight =
            window.innerHeight;

          const topPadding = 24;
          const bottomPadding = 24;

          if (
            rect.bottom >
            viewportHeight - bottomPadding
          ) {
            const scrollAmount =
              rect.bottom -
              viewportHeight +
              bottomPadding;

            window.scrollBy({
              top: scrollAmount,
              behavior: "smooth",
            });

            return;
          }

          if (rect.top < topPadding) {
            const scrollAmount =
              rect.top - topPadding;

            window.scrollBy({
              top: scrollAmount,
              behavior: "smooth",
            });
          }
        });
      });

      return;
    }

    if (!wasOpened.current) return;

    wasOpened.current = false;

    const startPosition =
      window.scrollY;

    const targetPosition =
      previousScrollY.current;

    const distance =
      targetPosition - startPosition;

    if (Math.abs(distance) < 2) {
      window.scrollTo(
        0,
        targetPosition,
      );

      return;
    }

    const duration = 500;
    const startTime = performance.now();

    const easeInOutCubic = (
      progress: number,
    ) => {
      return progress < 0.5
        ? 4 *
            progress *
            progress *
            progress
        : 1 -
            Math.pow(
              -2 * progress + 2,
              3,
            ) /
              2;
    };

    let animationFrame: number;

    const animateBack = (
      currentTime: number,
    ) => {
      const elapsed =
        currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1,
      );

      const easedProgress =
        easeInOutCubic(progress);

      const currentPosition =
        startPosition +
        distance * easedProgress;

      window.scrollTo(
        0,
        currentPosition,
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(
            animateBack,
          );
      } else {
        window.scrollTo(
          0,
          targetPosition,
        );
      }
    };

    animationFrame =
      requestAnimationFrame(
        animateBack,
      );

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );
    };
  }, [open]);

  /* =========================================
     SYNC WITH VALUE
  ========================================= */

  useEffect(() => {
    if (!value) return;

    const selectedDate =
      parseDate(value);

    setVisibleMonth(
      getMonthStart(selectedDate),
    );

    setYearPage(
      Math.floor(
        selectedDate.getFullYear() / 12,
      ) * 12,
    );
  }, [value]);

  /* =========================================
     OPEN / CLOSE PICKER
  ========================================= */

  const handleOpen = () => {
    if (disabled) return;

    if (open) {
      closeCalendar();
      return;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    setOpen(true);
    setCalendarView("days");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCalendarVisible(true);
      });
    });
  };

  /* =========================================
     DATE SELECT
  ========================================= */

  const handleDateSelect = (
    date: Date,
  ) => {
    const dateString =
      toDateString(date);

    if (
      minDate &&
      dateString < minDate
    ) {
      return;
    }

    onChange(dateString);

    closeCalendar();
  };

  /* =========================================
     PREVIOUS MONTH
  ========================================= */

  const goToPreviousMonth = () => {
    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1,
        ),
    );
  };

  /* =========================================
     NEXT MONTH
  ========================================= */

  const goToNextMonth = () => {
    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1,
        ),
    );
  };

  /* =========================================
     SELECT MONTH
  ========================================= */

  const handleMonthSelect = (
    monthIndex: number,
  ) => {
    setVisibleMonth(
      new Date(
        visibleMonth.getFullYear(),
        monthIndex,
        1,
      ),
    );

    setCalendarView("days");
  };

  /* =========================================
     SELECT YEAR
  ========================================= */

  const handleYearSelect = (
    year: number,
  ) => {
    setVisibleMonth(
      new Date(
        year,
        visibleMonth.getMonth(),
        1,
      ),
    );

    setYearPage(
      Math.floor(year / 12) * 12,
    );

    setCalendarView("months");
  };

  /* =========================================
     YEAR NAVIGATION
  ========================================= */

  const goToPreviousYears = () => {
    setYearPage(
      (current) => current - 12,
    );
  };

  const goToNextYears = () => {
    setYearPage(
      (current) => current + 12,
    );
  };

  /* =========================================
     TODAY
  ========================================= */

  const goToToday = () => {
    const today = new Date();

    const todayString =
      getTodayString();

    if (
      minDate &&
      todayString < minDate
    ) {
      return;
    }

    setVisibleMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    );

    setYearPage(
      Math.floor(
        today.getFullYear() / 12,
      ) * 12,
    );

    onChange(todayString);

    closeCalendar();
  };

  /* =========================================
     CLEAR
  ========================================= */

  const clearDate = () => {
    onChange("");

    closeCalendar();
  };

  /* =========================================
     CURRENT MONTH / YEAR
  ========================================= */

  const currentMonth =
    visibleMonth.getMonth();

  const currentYear =
    visibleMonth.getFullYear();

  /* =========================================
     YEAR LIST
  ========================================= */

  const years = Array.from(
    { length: 12 },
    (_, index) =>
      yearPage + index,
  );

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      {/* LABEL */}

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* INPUT */}

      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className={`flex min-h-[44px] w-full items-center justify-between rounded-lg border bg-white px-3.5 py-2.5 text-left transition-all ${
          open
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-slate-300 hover:border-slate-400"
        } ${
          disabled
            ? "cursor-not-allowed bg-slate-100 opacity-70"
            : "cursor-pointer"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <CalendarDays
            size={19}
            className={
              value
                ? "shrink-0 text-blue-600"
                : "shrink-0 text-slate-400"
            }
          />

          <span
            className={
              value
                ? "text-sm font-medium text-slate-800"
                : "text-sm text-slate-400"
            }
          >
            {value
              ? formatDate(value)
              : "Select date"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation();
                clearDate();
              }}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                  clearDate();
                }
              }}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={15} />
            </span>
          )}

          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform duration-200 ${
              open
                ? "rotate-180"
                : ""
            }`}
          />
        </div>
      </button>

      {/* =========================================
          CALENDAR POPUP
      ========================================= */}

      {open && !disabled && (
        <div
          ref={calendarRef}
          className={`
            absolute
            left-0
            top-full
            z-50
            mt-2
            w-[340px]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            transform-gpu
            transition-all
            duration-200
            ease-out
            ${
              calendarVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-2 scale-[0.98] opacity-0"
            }
          `}
        >
          {/* =====================================
              DAYS VIEW
          ===================================== */}

          {calendarView === "days" && (
            <>
              {/* HEADER */}

              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={
                      goToPreviousMonth
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCalendarView(
                        "months",
                      )
                    }
                    className="group rounded-lg px-3 py-1.5 text-center transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-base font-semibold text-slate-900">
                        {MONTHS[currentMonth]}
                      </span>

                      <ChevronDown
                        size={15}
                        className="text-slate-400 transition-colors group-hover:text-slate-600"
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-500">
                      {currentYear}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={
                      goToNextMonth
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>

              {/* WEEK DAYS */}

              <div className="grid grid-cols-7 px-4 pt-4">
                {WEEK_DAYS.map(
                  (day) => (
                    <div
                      key={day}
                      className="flex h-8 items-center justify-center text-[11px] font-bold tracking-wide text-slate-400"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* DAYS */}

              <div className="grid grid-cols-7 gap-y-1 px-4 pb-4">
                {calendarDays.map(
                  (date) => {
                    const dateString =
                      toDateString(date);

                    const isCurrentMonth =
                      date.getMonth() ===
                        currentMonth &&
                      date.getFullYear() ===
                        currentYear;

                    const isSelected =
                      value === dateString;

                    const isToday =
                      dateString ===
                      getTodayString();

                    const isBeforeMinDate =
                      Boolean(
                        minDate &&
                          dateString <
                            minDate,
                      );

                    return (
                      <button
                        key={dateString}
                        type="button"
                        disabled={
                          isBeforeMinDate
                        }
                        onClick={() =>
                          handleDateSelect(
                            date,
                          )
                        }
                        className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all ${
                          isSelected
                            ? "bg-blue-600 font-semibold text-white shadow-md shadow-blue-200"
                            : isToday
                              ? "bg-blue-50 font-semibold text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100"
                              : isCurrentMonth
                                ? "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                                : "text-slate-300 hover:bg-slate-50"
                        } ${
                          isBeforeMinDate
                            ? "cursor-not-allowed opacity-30 hover:bg-transparent"
                            : ""
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  },
                )}
              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={clearDate}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Today
                </button>
              </div>
            </>
          )}

          {/* =====================================
              MONTH VIEW
          ===================================== */}

          {calendarView === "months" && (
            <>
              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarView(
                        "days",
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCalendarView(
                        "years",
                      )
                    }
                    className="rounded-lg px-3 py-1.5 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                  >
                    {currentYear}

                    <ChevronDown
                      size={15}
                      className="ml-1 inline-block text-slate-400"
                    />
                  </button>

                  <div className="w-9" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-5">
                {MONTHS.map(
                  (month, index) => {
                    const isSelected =
                      index === currentMonth;

                    return (
                      <button
                        key={month}
                        type="button"
                        onClick={() =>
                          handleMonthSelect(
                            index,
                          )
                        }
                        className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        {SHORT_MONTHS[index]}
                      </button>
                    );
                  },
                )}
              </div>

              <div className="border-t border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={goToToday}
                  className="w-full rounded-lg py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Today
                </button>
              </div>
            </>
          )}

          {/* =====================================
              YEAR VIEW
          ===================================== */}

          {calendarView === "years" && (
            <>
              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={
                      goToPreviousYears
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <span className="text-base font-semibold text-slate-900">
                    {yearPage} – {yearPage + 11}
                  </span>

                  <button
                    type="button"
                    onClick={
                      goToNextYears
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-5">
                {years.map((year) => {
                  const isSelected =
                    year === currentYear;

                  const isCurrentYear =
                    year ===
                    new Date().getFullYear();

                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() =>
                        handleYearSelect(
                          year,
                        )
                      }
                      className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : isCurrentYear
                            ? "bg-blue-50 font-semibold text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100"
                            : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={goToToday}
                  className="w-full rounded-lg py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Today
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}