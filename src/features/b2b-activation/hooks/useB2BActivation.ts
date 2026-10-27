"use client";

import { useMemo, useState } from "react";
import {
  MOCK_COLLEGES_BY_ORDER,
  MOCK_PLANS,
  MOCK_STUDENTS_BY_COLLEGE,
  MOCK_SUBJECTS,
  MOCK_SUBSCRIPTION_ORDERS,
} from "../utils/b2b-activation.mock";
import type {
  B2BActivationFormData,
  B2BActivationPreview,
} from "../types/b2b-activation.types";

const initialFormData: B2BActivationFormData = {
  subscriptionOrderId: "",
  planId: "",
  planSeqNo: "",
  startDate: "",
  endDate: "",
  remarks: "",
  selectedCollegeId: "",
  selectedStudentIds: [],
  selectedSubjectIds: [],
};

export default function useB2BActivation() {
  const [formData, setFormData] =
    useState<B2BActivationFormData>(initialFormData);
  const [studentSearch, setStudentSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const colleges = useMemo(
    () => MOCK_COLLEGES_BY_ORDER[formData.subscriptionOrderId] ?? [],
    [formData.subscriptionOrderId],
  );

  const students = useMemo(
    () => MOCK_STUDENTS_BY_COLLEGE[formData.selectedCollegeId] ?? [],
    [formData.selectedCollegeId],
  );

  const plan = MOCK_PLANS.find((item) => item.id === formData.planId);

  const planSequences = plan?.sequences ?? [];

  const filteredStudents = useMemo(() => {
    const search = studentSearch.trim().toLowerCase();

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(search) ||
        student.mobile.includes(search) ||
        student.id.toLowerCase().includes(search),
    );
  }, [students, studentSearch]);

  const filteredSubjects = useMemo(() => {
    const search = subjectSearch.trim().toLowerCase();

    return MOCK_SUBJECTS.filter(
      (subject) =>
        subject.name.toLowerCase().includes(search) ||
        subject.id.includes(search),
    );
  }, [subjectSearch]);

  const updateField = <K extends keyof B2BActivationFormData>(
    field: K,
    value: B2BActivationFormData[K],
  ) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setError("");
    setShowPreview(false);
  };

  const handleSubscriptionOrderChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      subscriptionOrderId: value,
      selectedCollegeId: "",
      selectedStudentIds: [],
    }));
    setStudentSearch("");
    setError("");
    setShowPreview(false);
  };

  const handlePlanChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      planId: value,
      planSeqNo: "",
    }));
    setError("");
    setShowPreview(false);
  };

  const handleCollegeChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      selectedCollegeId: value,
      selectedStudentIds: [],
    }));
    setStudentSearch("");
    setError("");
    setShowPreview(false);
  };

  const toggleStudent = (id: string) => {
    setFormData((previous) => ({
      ...previous,
      selectedStudentIds: previous.selectedStudentIds.includes(id)
        ? previous.selectedStudentIds.filter((item) => item !== id)
        : [...previous.selectedStudentIds, id],
    }));
    setError("");
    setShowPreview(false);
  };

  const selectAllFilteredStudents = () => {
    const ids = filteredStudents.map((student) => student.id);

    setFormData((previous) => ({
      ...previous,
      selectedStudentIds: [
        ...new Set([...previous.selectedStudentIds, ...ids]),
      ],
    }));
    setShowPreview(false);
  };

  const clearStudents = () => {
    setFormData((previous) => ({ ...previous, selectedStudentIds: [] }));
    setShowPreview(false);
  };

  const toggleSubject = (id: string) => {
    setFormData((previous) => ({
      ...previous,
      selectedSubjectIds: previous.selectedSubjectIds.includes(id)
        ? previous.selectedSubjectIds.filter((item) => item !== id)
        : [...previous.selectedSubjectIds, id],
    }));
    setShowPreview(false);
  };

  const selectAllFilteredSubjects = () => {
    const ids = filteredSubjects.map((subject) => subject.id);

    setFormData((previous) => ({
      ...previous,
      selectedSubjectIds: [
        ...new Set([...previous.selectedSubjectIds, ...ids]),
      ],
    }));
    setShowPreview(false);
  };

  const clearSubjects = () => {
    setFormData((previous) => ({ ...previous, selectedSubjectIds: [] }));
    setShowPreview(false);
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
    setStudentSearch("");
    setSubjectSearch("");
    setShowStudentDropdown(false);
    setShowSubjectDropdown(false);
    setShowPreview(false);
    setError("");
  };

  const handlePreview = () => {
    if (!formData.subscriptionOrderId) {
      setError("Please select a subscription order.");
      return;
    }
    if (!formData.planId) {
      setError("Please select a plan.");
      return;
    }
    if (!formData.planSeqNo) {
      setError("Please select a plan sequence.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    if (formData.endDate < formData.startDate) {
      setError("End date cannot be earlier than start date.");
      return;
    }
    if (!formData.selectedCollegeId) {
      setError("Please select a college.");
      return;
    }
    if (formData.selectedStudentIds.length === 0) {
      setError("Please select at least one student.");
      return;
    }

    setError("");
    setShowPreview(true);
  };

  const previewData: B2BActivationPreview | null = useMemo(() => {
    if (!showPreview) return null;

    return {
      subscriptionOrder:
        MOCK_SUBSCRIPTION_ORDERS.find(
          (item) => item.id === formData.subscriptionOrderId,
        )?.label ?? "",
      plan: plan?.name ?? "",
      planSequence: planSequences.find(
        (item) => String(item.seqNo) === formData.planSeqNo,
      )
        ? `Sequence ${formData.planSeqNo}`
        : "",
      startDate: formData.startDate,
      endDate: formData.endDate,
      college:
        colleges.find((item) => item.id === formData.selectedCollegeId)?.name ??
        "",
      students: students.filter((student) =>
        formData.selectedStudentIds.includes(student.id),
      ),
      subjects: MOCK_SUBJECTS.filter((subject) =>
        formData.selectedSubjectIds.includes(subject.id),
      ),
      remarks: formData.remarks,
    };
  }, [showPreview, formData, plan, planSequences, colleges, students]);

  return {
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
    showStudentDropdown,
    setShowStudentDropdown,
    showSubjectDropdown,
    setShowSubjectDropdown,
    showPreview,
    previewData,
    error,
    colleges,
    students,
    filteredStudents,
    filteredSubjects,
    planSequences,
    selectedPlan: plan,
  };
}
