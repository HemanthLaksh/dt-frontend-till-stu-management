"use client";

import { Eye, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import type {
  B2BActivationFormData,
  CollegeOption,
  PlanOption,
  PlanSequence,
  StudentOption,
  SubjectOption,
  SubscriptionOrderOption,
} from "../types/b2b-activation.types";
import StudentMultiSelect from "./StudentMultiSelect";

interface B2BActivationFormProps {
  formData: B2BActivationFormData;
  subscriptionOrders: SubscriptionOrderOption[];
  plans: PlanOption[];
  planSequences: PlanSequence[];
  colleges: CollegeOption[];
  filteredStudents: StudentOption[];
  filteredSubjects: SubjectOption[];
  studentSearch: string;
  subjectSearch: string;
  onStudentSearchChange: (value: string) => void;
  onSubjectSearchChange: (value: string) => void;
  onSubscriptionOrderChange: (value: string) => void;
  onPlanChange: (value: string) => void;
  onCollegeChange: (value: string) => void;
  onFieldChange: <K extends keyof B2BActivationFormData>(
    field: K,
    value: B2BActivationFormData[K],
  ) => void;
  onStudentToggle: (id: string) => void;
  onSelectAllStudents: () => void;
  onClearStudents: () => void;
  onSubjectToggle: (id: string) => void;
  onSelectAllSubjects: () => void;
  onClearSubjects: () => void;
  onPreview: () => void;
  onReset: () => void;
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

export default function B2BActivationForm({
  formData,
  subscriptionOrders,
  plans,
  planSequences,
  colleges,
  filteredStudents,
  filteredSubjects,
  studentSearch,
  subjectSearch,
  onStudentSearchChange,
  onSubjectSearchChange,
  onSubscriptionOrderChange,
  onPlanChange,
  onCollegeChange,
  onFieldChange,
  onStudentToggle,
  onSelectAllStudents,
  onClearStudents,
  onSubjectToggle,
  onSelectAllSubjects,
  onClearSubjects,
  onPreview,
  onReset,
}: B2BActivationFormProps) {
  const subscriptionOrderOptions = subscriptionOrders.map((order) => ({
    value: order.id,
    label: order.label,
  }));

  const planOptions = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));

  const planSequenceOptions = planSequences.map((sequence) => ({
    value: String(sequence.seqNo),
    label: `Sequence ${sequence.seqNo} — ₹${sequence.totalPrice.toLocaleString("en-IN")} — ${sequence.durationInMonths} months`,
  }));

  const collegeOptions = colleges.map((college) => ({
    value: college.id,
    label: college.name,
  }));

  return (
    <form
      className="space-y-7"
      onSubmit={(event) => {
        event.preventDefault();
        onPreview();
      }}
    >
      {/* Subscription Details */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Subscription Details
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the subscription order and access plan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Select
            label="Subscription Order *"
            value={formData.subscriptionOrderId}
            options={subscriptionOrderOptions}
            placeholder="Select subscription order"
            onChange={onSubscriptionOrderChange}
          />

          <Select
            label="Plan *"
            value={formData.planId}
            options={planOptions}
            placeholder="Select plan"
            onChange={onPlanChange}
          />

          <Select
            label="Plan Sequence *"
            value={formData.planSeqNo}
            options={planSequenceOptions}
            placeholder="Select plan sequence"
            onChange={(value) => onFieldChange("planSeqNo", value)}
            disabled={!formData.planId}
          />
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* College and Students */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            College & Students
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select an institution and the students to include.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Select
            label="College *"
            value={formData.selectedCollegeId}
            options={collegeOptions}
            placeholder={
              formData.subscriptionOrderId
                ? "Select college"
                : "Select an order first"
            }
            onChange={onCollegeChange}
            disabled={!formData.subscriptionOrderId}
          />

          <StudentMultiSelect
            students={filteredStudents}
            selectedIds={formData.selectedStudentIds}
            search={studentSearch}
            onSearchChange={onStudentSearchChange}
            onToggle={onStudentToggle}
            onSelectAll={onSelectAllStudents}
            onClear={onClearStudents}
            disabled={!formData.selectedCollegeId}
          />
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Activation Period */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Activation Period
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Set the subscription validity dates.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <DatePicker
            label="Start Date *"
            value={formData.startDate}
            onChange={(value) => onFieldChange("startDate", value)}
            maxDate={formData.endDate || undefined}
          />

          <DatePicker
            label="End Date *"
            value={formData.endDate}
            onChange={(value) => onFieldChange("endDate", value)}
            minDate={formData.startDate || undefined}
          />
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Additional Options */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Additional Options
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Optionally select subjects and add remarks.
          </p>
        </div>

        <div>
          <label htmlFor="subject-search" className={labelClass}>
            Additional Subjects
          </label>

          <input
            id="subject-search"
            type="text"
            value={subjectSearch}
            onChange={(event) => onSubjectSearchChange(event.target.value)}
            placeholder="Search subjects by name or ID"
            className={inputClass}
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={onSelectAllSubjects}
              disabled={filteredSubjects.length === 0}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
            >
              Select all filtered
            </button>

            <button
              type="button"
              onClick={onClearSubjects}
              disabled={formData.selectedSubjectIds.length === 0}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 disabled:opacity-50"
            >
              Clear subjects
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSubjects.map((subject) => {
              const checked = formData.selectedSubjectIds.includes(subject.id);

              return (
                <label
                  key={subject.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition ${
                    checked
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onSubjectToggle(subject.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />
                  {subject.name}
                </label>
              );
            })}
          </div>

          {formData.selectedSubjectIds.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              {formData.selectedSubjectIds.length} subject(s) selected
            </p>
          )}
        </div>

        <div>
          <label htmlFor="activation-remarks" className={labelClass}>
            Remarks
          </label>

          <textarea
            id="activation-remarks"
            rows={3}
            maxLength={500}
            value={formData.remarks}
            onChange={(event) => onFieldChange("remarks", event.target.value)}
            placeholder="Enter any additional notes..."
            className={`${inputClass} resize-y`}
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {formData.remarks.length}/500
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
        <Button type="button" variant="outline" onClick={onReset}>
          <RotateCcw size={16} className="mr-2" />
          Reset
        </Button>

        <Button type="submit">
          <Eye size={16} className="mr-2" />
          Review Activation
        </Button>
      </div>
    </form>
  );
}
