"use client";

import { X } from "lucide-react";

import type {
  VideoDownloadDetails,
} from "../types/videosDownloadAnalytics.types";

interface VideoDownloadDetailsModalProps {
  video: VideoDownloadDetails | null;
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

export default function VideoDownloadDetailsModal({
  video,
  onClose,
}: VideoDownloadDetailsModalProps) {
  if (!video) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-download-details"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-blue-50 px-6 py-4">
          <div>
            <h2
              id="video-download-details"
              className="text-lg font-semibold text-slate-900"
            >
              Video Download Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Details of the downloaded video
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close video download details"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <DetailRow
              label="Video Sequence No."
              value={video.videoSeqNo}
            />

            <DetailRow
              label="Video Subject"
              value={video.videoSubject}
            />

            <DetailRow
              label="Video Topic"
              value={video.videoTopic}
            />

            <DetailRow
              label="Video Sub Topic"
              value={video.videoSubTopic}
            />

            <DetailRow
              label="Video Name"
              value={video.videoName}
            />

            <DetailRow
              label="Video Status"
              value={video.videoStatus}
            />

            <DetailRow
              label="Video Downloaded At"
              value={video.videoDownloadedAt}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}