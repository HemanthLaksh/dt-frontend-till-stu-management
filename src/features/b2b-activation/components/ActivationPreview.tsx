"use client";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Users,
  X,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import type { B2BActivationPreview as PreviewData } from "../types/b2b-activation.types";

interface ActivationPreviewProps {
  data: PreviewData;
  onEdit: () => void;
  onClose: () => void;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}

export default function ActivationPreview({
  data,
  onEdit,
  onClose,
}: ActivationPreviewProps) {
  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900">
              Activation Review
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review the configuration below before proceeding.
            </p>
          </div>

          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Preview Only
          </span>
        </div>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <ClipboardList size={17} className="text-blue-600" />
            Subscription Details
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Subscription Order" value={data.subscriptionOrder} />
            <Detail label="Plan" value={data.plan} />
            <Detail label="Plan Sequence" value={data.planSequence} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <CalendarDays size={17} className="text-blue-600" />
            Activation Period
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Detail label="Start Date" value={data.startDate} />
            <Detail label="End Date" value={data.endDate} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <GraduationCap size={17} className="text-blue-600" />
            College
          </h3>

          <Detail label="Selected College" value={data.college} />
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Users size={17} className="text-blue-600" />
            Selected Students
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              {data.students.length}
            </span>
          </h3>

          {data.students.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[1fr_1fr] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500">
                <span>Student</span>
                <span>Student ID / Mobile</span>
              </div>

              <div className="divide-y divide-slate-100">
                {data.students.map((student) => (
                  <div
                    key={student.id}
                    className="grid grid-cols-[1fr_1fr] gap-3 px-4 py-3"
                  >
                    <span className="break-words text-sm font-medium text-slate-800">
                      {student.name}
                    </span>
                    <span className="break-words text-xs text-slate-500">
                      {student.id}
                      <span className="block mt-1">{student.mobile}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No students selected.</p>
          )}
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Additional Subjects
          </h3>

          {data.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.subjects.map((subject) => (
                <span
                  key={subject.id}
                  className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm text-blue-700"
                >
                  {subject.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No additional subjects selected.
            </p>
          )}
        </section>

        {data.remarks && (
          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-800">
              Remarks
            </h3>
            <p className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
              {data.remarks}
            </p>
          </section>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
          <Button variant="outline" onClick={onEdit}>
            Edit Details
          </Button>

          <Button variant="outline" onClick={onClose}>
            <X size={16} className="mr-2" />
            Close & Reset
          </Button>
        </div>

        <p className="rounded-lg bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
          This is a preview using dummy data. No B2B activation has been
          submitted, and no student access has been changed.
        </p>
      </div>
    </Card>
  );
}
