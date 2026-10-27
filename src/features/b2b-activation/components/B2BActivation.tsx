"use client";

import { Building2, CheckCircle2, ClipboardList } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import B2BActivationForm from "./B2BActivationForm";
import ActivationPreview from "./ActivationPreview";
import useB2BActivation from "../hooks/useB2BActivation";
import {
  MOCK_PLANS,
  MOCK_SUBSCRIPTION_ORDERS,
} from "../utils/b2b-activation.mock";

export default function B2BActivation() {
  const activation = useB2BActivation();

  const {
    formData,
    updateField,
    handleSubscriptionOrderChange,
    handlePlanChange,
    handleCollegeChange,
    toggleStudent,
    selectAllFilteredStudents,
    clearStudents,
    toggleSubject,
    selectAllFilteredSubjects,
    clearSubjects,
    resetForm,
    handlePreview,
    studentSearch,
    setStudentSearch,
    subjectSearch,
    setSubjectSearch,
    previewData,
    error,
    colleges,
    filteredStudents,
    filteredSubjects,
    planSequences,
    showPreview,
  } = activation;

  return (
    <div className="space-y-6 pb-8">
      <header className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Building2 size={24} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            B2B Activation
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure subscription access for students from partner colleges.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <ClipboardList size={18} className="text-blue-600" />
          <div>
            <p className="text-xs text-slate-500">Subscription Orders</p>
            <p className="text-sm font-semibold text-slate-800">
              {MOCK_SUBSCRIPTION_ORDERS.length} demo options
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <div>
            <p className="text-xs text-slate-500">Available Plans</p>
            <p className="text-sm font-semibold text-slate-800">
              {MOCK_PLANS.length} demo plans
            </p>
          </div>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Activation Configuration
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Complete the required fields to review the activation.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Demo Mode
          </span>
        </div>

        <B2BActivationForm
          formData={formData}
          subscriptionOrders={MOCK_SUBSCRIPTION_ORDERS}
          plans={MOCK_PLANS}
          planSequences={planSequences}
          colleges={colleges}
          filteredStudents={filteredStudents}
          filteredSubjects={filteredSubjects}
          studentSearch={studentSearch}
          subjectSearch={subjectSearch}
          onStudentSearchChange={setStudentSearch}
          onSubjectSearchChange={setSubjectSearch}
          onSubscriptionOrderChange={handleSubscriptionOrderChange}
          onPlanChange={handlePlanChange}
          onCollegeChange={handleCollegeChange}
          onFieldChange={updateField}
          onStudentToggle={toggleStudent}
          onSelectAllStudents={selectAllFilteredStudents}
          onClearStudents={clearStudents}
          onSubjectToggle={toggleSubject}
          onSelectAllSubjects={selectAllFilteredSubjects}
          onClearSubjects={clearSubjects}
          onPreview={handlePreview}
          onReset={resetForm}
        />

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
      </Card>

      {showPreview && previewData && (
        <ActivationPreview
          data={previewData}
          onEdit={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onClose={resetForm}
        />
      )}

      <p className="text-xs text-slate-500">
        This screen uses sample data only. No student subscriptions are created
        or modified.
      </p>
    </div>
  );
}
