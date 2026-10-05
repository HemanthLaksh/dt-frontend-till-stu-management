"use client";

import { X } from "lucide-react";

import type {
  TestSeriesAnalyticsTest,
} from "../types/testSeriesAnalytics.types";

interface TestSeriesDetailsModalProps {
  test: TestSeriesAnalyticsTest | null;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: string | number | null | undefined;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-slate-100 py-3 sm:grid-cols-[220px_1fr] sm:gap-4">
      <div className="text-sm font-medium text-slate-500">
        {label}
      </div>

      <div className="text-sm font-semibold text-slate-800">
        {value !== null && value !== undefined && value !== ""
          ? String(value)
          : "-"}
      </div>
    </div>
  );
}

export default function TestSeriesDetailsModal({
  test,
  onClose,
}: TestSeriesDetailsModalProps) {
  if (!test) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-series-details-title"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-blue-50 px-6 py-4">
          <div>
            <h2
              id="test-series-details-title"
              className="text-lg font-semibold text-slate-900"
            >
              Test Series Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Test paper performance and attempt details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close test series details"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <DetailRow
              label="Test Paper ID"
              value={test.testPaperID}
            />

            <DetailRow
              label="Test Paper Name"
              value={test.testPaperName}
            />

            <DetailRow
              label="Test Paper Type"
              value={test.testPaperType}
            />

            <DetailRow
              label="Finished"
              value={test.finished}
            />

            <DetailRow
              label="Test Taken At"
              value={test.testTakenAt}
            />

            <DetailRow
              label="Test Duration"
              value={test.testDuration}
            />

            <DetailRow
              label="Max Marks"
              value={test.maxMarks}
            />

            <DetailRow
              label="Scored Marks"
              value={test.scoredMarks}
            />

            <DetailRow
              label="Correct Answers"
              value={test.correctAnswers}
            />

            <DetailRow
              label="Incorrect Answers"
              value={test.incorrectAnswers}
            />

            <DetailRow
              label="Guessed Score"
              value={test.guessedScore}
            />

            <DetailRow
              label="Guessed Correct"
              value={test.guessedCorrect}
            />

            <DetailRow
              label="Guessed Incorrect"
              value={test.guessedIncorrect}
            />

            <DetailRow
              label="Test Status"
              value={test.testStatus}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}