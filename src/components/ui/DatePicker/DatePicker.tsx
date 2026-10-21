"use client";

import { useEffect, useMemo, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";

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

  maxDate?: string;

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

function toDateString(date: Date): string {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = parseDate(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getCalendarDays(month: Date): Date[] {
  const year = month.getFullYear();

  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);

  const startDay = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const days: Date[] = [];

  const previousMonthDays = new Date(year, monthIndex, 0).getDate();

  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, monthIndex - 1, previousMonthDays - i));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, monthIndex, day));
  }

  let nextDay = 1;

  while (days.length < 42) {
    days.push(new Date(year, monthIndex + 1, nextDay++));
  }

  return days;
}

function isDateAllowed(
  dateString: string,
  minDate?: string,
  maxDate?: string,
): boolean {
  return (
    !(minDate && dateString < minDate) && !(maxDate && dateString > maxDate)
  );
}

export default function DatePicker({
  label,

  value,

  onChange,

  minDate,

  maxDate,

  disabled = false,
}: DatePickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const calendarRef = useRef<HTMLDivElement | null>(null);

  const datePickerId = useId();

  const previousScrollY = useRef(0);

  const wasOpened = useRef(false);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const todayString = toDateString(new Date());

  const initialDate = value
    ? parseDate(value)
    : minDate
      ? parseDate(minDate)
      : new Date();

  const [open, setOpen] = useState(false);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
    width: 340,
    maxHeight: 500,
  });

  const [visibleMonth, setVisibleMonth] = useState(getMonthStart(initialDate));

  const [calendarView, setCalendarView] = useState<CalendarView>("days");

  const [yearPage, setYearPage] = useState(
    Math.floor(initialDate.getFullYear() / 12) * 12,
  );

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const currentMonth = visibleMonth.getMonth();

  const currentYear = visibleMonth.getFullYear();

  const minBound = minDate ? parseDate(minDate) : null;

  const maxBound = maxDate ? parseDate(maxDate) : null;

  const monthIsAllowed = (year: number, monthIndex: number) => {
    const monthStart = toDateString(new Date(year, monthIndex, 1));

    const monthEnd = toDateString(new Date(year, monthIndex + 1, 0));

    return (
      !(minDate && monthEnd < minDate) && !(maxDate && monthStart > maxDate)
    );
  };

  const yearIsAllowed = (year: number) => {
    const yearStart = `${year}-01-01`;

    const yearEnd = `${year}-12-31`;

    return !(minDate && yearEnd < minDate) && !(maxDate && yearStart > maxDate);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);

      setCalendarView("days");
    }, 180);
  };

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPortalReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedContainer = containerRef.current?.contains(target) ?? false;
      const clickedCalendar = calendarRef.current?.contains(target) ?? false;
      if (!clickedContainer && !clickedCalendar) closeCalendar();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  // Position only the popup above the page content using a portal. The field itself
  // remains in the normal layout/stacking context so nearby controls stay clickable.
  useEffect(() => {
    if (!open) {
      if (!wasOpened.current) return;
      wasOpened.current = false;

      const startPosition = window.scrollY;
      const targetPosition = previousScrollY.current;
      const distance = targetPosition - startPosition;

      if (Math.abs(distance) < 2) {
        window.scrollTo(0, targetPosition);
        return;
      }

      const duration = 350;
      const startTime = performance.now();
      let animationFrame = 0;
      const animateBack = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased =
          progress < 0.5
            ? 4 * progress ** 3
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startPosition + distance * eased);
        if (progress < 1) animationFrame = requestAnimationFrame(animateBack);
        else window.scrollTo(0, targetPosition);
      };
      animationFrame = requestAnimationFrame(animateBack);
      return () => cancelAnimationFrame(animationFrame);
    }

    if (!wasOpened.current) {
      previousScrollY.current = window.scrollY;
      wasOpened.current = true;
    }

    let frame = 0;
    const updatePosition = () => {
      const trigger = containerRef.current;
      const calendar = calendarRef.current;
      if (!trigger || !calendar) return;

      const triggerRect = trigger.getBoundingClientRect();
      const viewportPadding = 12;
      const gap = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const width = Math.min(340, viewportWidth - viewportPadding * 2);
      const left = Math.max(
        viewportPadding,
        Math.min(triggerRect.left, viewportWidth - width - viewportPadding),
      );
      const naturalHeight = calendar.scrollHeight;
      const availableBelow =
        viewportHeight - triggerRect.bottom - gap - viewportPadding;
      const availableAbove = triggerRect.top - gap - viewportPadding;
      const shouldOpenAbove =
        availableBelow < Math.min(naturalHeight, 420) &&
        availableAbove > availableBelow;
      const maxHeight = Math.max(
        160,
        Math.min(
          viewportHeight - viewportPadding * 2,
          shouldOpenAbove ? availableAbove : availableBelow,
        ),
      );
      const top = shouldOpenAbove
        ? Math.max(
            viewportPadding,
            triggerRect.top - gap - Math.min(naturalHeight, maxHeight),
          )
        : triggerRect.bottom + gap;

      setOpenAbove(shouldOpenAbove);
      setPopupPosition({ top, left, width, maxHeight });
    };

    frame = requestAnimationFrame(() => requestAnimationFrame(updatePosition));
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, calendarView, visibleMonth, yearPage]);

  // Keep the visible month synchronized with the selected value and current bounds.

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const selected = value
        ? parseDate(value)
        : minDate
          ? parseDate(minDate)
          : new Date();

      const clamped =
        minDate && toDateString(selected) < minDate
          ? parseDate(minDate)
          : maxDate && toDateString(selected) > maxDate
            ? parseDate(maxDate)
            : selected;

      setVisibleMonth(getMonthStart(clamped));
      setYearPage(Math.floor(clamped.getFullYear() / 12) * 12);
    });

    return () => cancelAnimationFrame(frame);
  }, [value, minDate, maxDate]);

  const handleOpen = () => {
    if (disabled) return;

    if (open) {
      closeCalendar();

      return;
    }

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    setOpen(true);

    setCalendarView("days");

    requestAnimationFrame(() =>
      requestAnimationFrame(() => setCalendarVisible(true)),
    );
  };

  const handleDateSelect = (date: Date) => {
    const dateString = toDateString(date);

    if (!isDateAllowed(dateString, minDate, maxDate)) return;

    onChange(dateString);

    closeCalendar();
  };

  const goToPreviousMonth = () => {
    if (minBound) {
      const previous = new Date(currentYear, currentMonth - 1, 1);

      if (
        previous.getFullYear() < minBound.getFullYear() ||
        (previous.getFullYear() === minBound.getFullYear() &&
          previous.getMonth() < minBound.getMonth())
      )
        return;
    }

    setVisibleMonth(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    if (maxBound) {
      const next = new Date(currentYear, currentMonth + 1, 1);

      if (
        next.getFullYear() > maxBound.getFullYear() ||
        (next.getFullYear() === maxBound.getFullYear() &&
          next.getMonth() > maxBound.getMonth())
      )
        return;
    }

    setVisibleMonth(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (!monthIsAllowed(currentYear, monthIndex)) return;

    setVisibleMonth(new Date(currentYear, monthIndex, 1));

    setCalendarView("days");
  };

  const handleYearSelect = (year: number) => {
    if (!yearIsAllowed(year)) return;

    const allowedMonth = Array.from({ length: 12 }, (_, i) => i).find((month) =>
      monthIsAllowed(year, month),
    );

    if (allowedMonth === undefined) return;

    const targetMonth = monthIsAllowed(year, currentMonth)
      ? currentMonth
      : allowedMonth;

    setVisibleMonth(new Date(year, targetMonth, 1));

    setYearPage(Math.floor(year / 12) * 12);

    setCalendarView("months");
  };

  const goToPreviousYears = () => {
    const firstAllowedYear = minBound?.getFullYear();

    if (
      firstAllowedYear !== undefined &&
      yearPage - 1 < firstAllowedYear &&
      yearPage <= firstAllowedYear
    )
      return;

    setYearPage((current) => current - 12);
  };

  const goToNextYears = () => {
    const lastAllowedYear = maxBound?.getFullYear();

    if (
      lastAllowedYear !== undefined &&
      yearPage + 12 > lastAllowedYear &&
      yearPage + 11 >= lastAllowedYear
    )
      return;

    setYearPage((current) => current + 12);
  };

  const goToToday = () => {
    if (!isDateAllowed(todayString, minDate, maxDate)) return;

    const today = new Date();

    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));

    setYearPage(Math.floor(today.getFullYear() / 12) * 12);

    onChange(todayString);

    closeCalendar();
  };

  const clearDate = () => {
    onChange("");

    closeCalendar();
  };

  const years = Array.from({ length: 12 }, (_, index) => yearPage + index);

  const previousMonthDisabled = Boolean(
    minBound &&
    (currentYear < minBound.getFullYear() ||
      (currentYear === minBound.getFullYear() &&
        currentMonth <= minBound.getMonth())),
  );

  const nextMonthDisabled = Boolean(
    maxBound &&
    (currentYear > maxBound.getFullYear() ||
      (currentYear === maxBound.getFullYear() &&
        currentMonth >= maxBound.getMonth())),
  );

  const previousYearsDisabled = Boolean(
    minBound && yearPage <= Math.floor(minBound.getFullYear() / 12) * 12,
  );

  const nextYearsDisabled = Boolean(
    maxBound &&
    yearPage + 11 >= Math.floor(maxBound.getFullYear() / 12) * 12 + 11,
  );

  const todayAllowed = isDateAllowed(todayString, minDate, maxDate);

  return (
    <div ref={containerRef} className="relative w-full">
      <label
        htmlFor={datePickerId}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div
        onClick={(event) => {
          const target = event.target as HTMLElement;

          if (target.closest("button")) return;

          handleOpen();
        }}

        className={`flex min-h-[44px] w-full items-center justify-between rounded-lg border bg-white px-3.5 py-2.5 text-left transition-all ${open ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-300 hover:border-slate-400"} ${disabled ? "cursor-not-allowed bg-slate-100 opacity-70" : "cursor-pointer"}`}
      >
        <button
          id={datePickerId}
          type="button"
          disabled={disabled}
          onClick={handleOpen}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none"
        >
          <CalendarDays
            size={19}
            className={
              value ? "shrink-0 text-blue-600" : "shrink-0 text-slate-400"
            }
          />

          <span
            className={
              value
                ? "select-none text-sm font-medium text-slate-800"
                : "select-none text-sm text-slate-400"
            }
          >
            {value ? formatDate(value) : "Select date"}
          </span>
        </button>

        <div className="flex items-center gap-1">
          {value && !disabled && (
            <button
              type="button"
              aria-label="Clear date"
              onClick={clearDate}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          )}

          <button
            type="button"
            disabled={disabled}
            onClick={handleOpen}
            aria-label={open ? "Close date picker" : "Open date picker"}
            className="flex items-center justify-center rounded-md p-1 outline-none"
          >
            <ChevronDown
              size={18}
              className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {open &&
        !disabled &&
        portalReady &&
        createPortal(
          <div
            ref={calendarRef}
            role="dialog"
            aria-label={`${label} calendar`}
            style={{
              position: "fixed",
              top: popupPosition.top,
              left: popupPosition.left,
              width: popupPosition.width,
              maxHeight: popupPosition.maxHeight,
              zIndex: 10000,
            }}
            className={`overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white shadow-2xl transform-gpu transition-all duration-200 ease-out ${calendarVisible ? "translate-y-0 scale-100 opacity-100" : openAbove ? "translate-y-2 scale-[0.98] opacity-0" : "-translate-y-2 scale-[0.98] opacity-0"}`}
          >
            {calendarView === "days" && (
              <>
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={previousMonthDisabled}
                      onClick={goToPreviousMonth}
                      aria-label="Previous month"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={19} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalendarView("months")}
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
                      disabled={nextMonthDisabled}
                      onClick={goToNextMonth}
                      aria-label="Next month"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight size={19} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 px-4 pt-4">
                  {WEEK_DAYS.map((day) => (
                    <div
                      key={day}
                      className="flex h-8 items-center justify-center text-[11px] font-bold tracking-wide text-slate-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 px-4 pb-4">
                  {calendarDays.map((date) => {
                    const dateString = toDateString(date);

                    const isCurrentMonth =
                      date.getMonth() === currentMonth &&
                      date.getFullYear() === currentYear;

                    const isSelected = value === dateString;

                    const isToday = dateString === todayString;

                    const outsideRange = !isDateAllowed(
                      dateString,
                      minDate,
                      maxDate,
                    );

                    return (
                      <button
                        key={dateString}
                        type="button"
                        disabled={outsideRange}
                        onClick={() => handleDateSelect(date)}
                        aria-pressed={isSelected}
                        className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all ${isSelected ? "bg-blue-600 font-semibold text-white shadow-md shadow-blue-200" : isToday ? "bg-blue-50 font-semibold text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100" : isCurrentMonth ? "text-slate-700 hover:bg-blue-50 hover:text-blue-700" : "text-slate-300 hover:bg-slate-50"} ${outsideRange ? "cursor-not-allowed opacity-30 hover:bg-transparent" : ""}`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

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
                    disabled={!todayAllowed}
                    onClick={goToToday}
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Today
                  </button>
                </div>
              </>
            )}

            {calendarView === "months" && (
              <>
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCalendarView("days")}
                      aria-label="Back to calendar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      <ChevronLeft size={19} />
                    </button>

                    <button
                      type="button"
                      disabled={!years.some(yearIsAllowed)}
                      onClick={() => setCalendarView("years")}
                      className="rounded-lg px-3 py-1.5 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50 disabled:opacity-30"
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
                  {MONTHS.map((month, index) => {
                    const isSelected = index === currentMonth;

                    const allowed = monthIsAllowed(currentYear, index);

                    return (
                      <button
                        key={month}
                        type="button"
                        disabled={!allowed}
                        onClick={() => handleMonthSelect(index)}
                        className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"} ${!allowed ? "cursor-not-allowed opacity-30" : ""}`}
                      >
                        {SHORT_MONTHS[index]}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 px-4 py-3">
                  <button
                    type="button"
                    disabled={!todayAllowed}
                    onClick={goToToday}
                    className="w-full rounded-lg py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Today
                  </button>
                </div>
              </>
            )}

            {calendarView === "years" && (
              <>
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={previousYearsDisabled}
                      onClick={goToPreviousYears}
                      aria-label="Previous years"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={19} />
                    </button>

                    <span className="text-base font-semibold text-slate-900">
                      {yearPage} – {yearPage + 11}
                    </span>

                    <button
                      type="button"
                      disabled={nextYearsDisabled}
                      onClick={goToNextYears}
                      aria-label="Next years"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight size={19} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-5">
                  {years.map((year) => {
                    const isSelected = year === currentYear;

                    const isCurrentYear = year === new Date().getFullYear();

                    const allowed = yearIsAllowed(year);

                    return (
                      <button
                        key={year}
                        type="button"
                        disabled={!allowed}
                        onClick={() => handleYearSelect(year)}
                        className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-200" : isCurrentYear ? "bg-blue-50 font-semibold text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"} ${!allowed ? "cursor-not-allowed opacity-30" : ""}`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 px-4 py-3">
                  <button
                    type="button"
                    disabled={!todayAllowed}
                    onClick={goToToday}
                    className="w-full rounded-lg py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Today
                  </button>
                </div>
              </>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
