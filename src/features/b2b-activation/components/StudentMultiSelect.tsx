"use client";

import { Check, ChevronDown, Search, Users, X } from "lucide-react";
import { useState } from "react";
import type { StudentOption } from "../types/b2b-activation.types";

interface StudentMultiSelectProps {
  students: StudentOption[];
  selectedIds: string[];
  search: string;
  onSearchChange: (value: string) => void;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export default function StudentMultiSelect({
  students,
  selectedIds,
  search,
  onSearchChange,
  onToggle,
  onSelectAll,
  onClear,
  disabled = false,
}: StudentMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedStudents = students.filter((student) =>
    selectedIds.includes(student.id),
  );

  const allFilteredSelected =
    students.length > 0 &&
    students.every((student) => selectedIds.includes(student.id));

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Select Students <span className="text-red-500">*</span>
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm transition hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Users size={17} className="shrink-0 text-slate-400" />
          <span className="truncate text-slate-700">
            {selectedIds.length > 0
              ? `${selectedIds.length} student${selectedIds.length === 1 ? "" : "s"} selected`
              : "Select students"}
          </span>
        </span>

        <ChevronDown
          size={17}
          className={`shrink-0 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {selectedStudents.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedStudents.map((student) => (
            <span
              key={student.id}
              className="inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
            >
              {student.name}
              <button
                type="button"
                aria-label={`Remove ${student.name}`}
                onClick={() => onToggle(student.id)}
                className="rounded p-0.5 hover:bg-blue-100"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && !disabled && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by name, mobile or student ID"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={onSelectAll}
                disabled={students.length === 0 || allFilteredSelected}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                Select all filtered
              </button>

              <button
                type="button"
                onClick={onClear}
                disabled={selectedIds.length === 0}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                Clear selection
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            {students.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-slate-500">
                No students found.
              </p>
            ) : (
              students.map((student) => {
                const selected = selectedIds.includes(student.id);

                return (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => onToggle(student.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-slate-50"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {selected && <Check size={12} />}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {student.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {student.id} · {student.mobile}
                      </span>
                    </span>
                  </button>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2.5">
            <span className="text-xs text-slate-500">
              {selectedIds.length} selected
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
