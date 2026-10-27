"use client";

import { LoaderCircle } from "lucide-react";

interface ModuleLoadingProps {
  moduleName: string;
}

export default function ModuleLoading({ moduleName }: ModuleLoadingProps) {
  return (
    <div
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <LoaderCircle
          size={36}
          className="animate-spin text-blue-600"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Loading {moduleName}
        </h2>

        <p className="text-sm text-slate-500">
          Please wait while we prepare your content...
        </p>
      </div>
    </div>
  );
}
