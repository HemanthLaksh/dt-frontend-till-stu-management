"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CircleUserRound,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import BackButton from "@/components/ui/BackButton/BackButton";
import Select from "@/components/ui/Select/Select";

import useActivateStudent from "../hooks/useActivateStudent";
import type { ActivationMethod } from "../types/activateStudent.types";

const ACTIVATION_OPTIONS = [
  {
    value: "studentId",
    label: "Student ID",
  },
  {
    value: "mobile",
    label: "Mobile Number",
  },
  {
    value: "email",
    label: "Email ID",
  },
];

export default function ActivateStudent() {
  const [method, setMethod] =
    useState<ActivationMethod>("studentId");

  const [studentId, setStudentId] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [validationError, setValidationError] =
    useState("");

  const {
    submitActivation,
    isLoading,
    response,
    error,
  } = useActivateStudent();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setValidationError("");

    if (method === "studentId" && !studentId.trim()) {
      setValidationError(
        "Please enter a Student ID.",
      );
      return;
    }

    if (method === "mobile" && !mobile.trim()) {
      setValidationError(
        "Please enter a Mobile Number.",
      );
      return;
    }

    if (method === "email" && !email.trim()) {
      setValidationError(
        "Please enter an Email ID.",
      );
      return;
    }

    if (
      method === "studentId" &&
      !/^\d+$/.test(studentId.trim())
    ) {
      setValidationError(
        "Student ID must contain only numbers.",
      );
      return;
    }

    if (
      method === "mobile" &&
      !/^\d{10}$/.test(mobile.trim())
    ) {
      setValidationError(
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    if (
      method === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim(),
      )
    ) {
      setValidationError(
        "Please enter a valid email address.",
      );
      return;
    }

    await submitActivation({
      studentId:
        method === "studentId"
          ? studentId
          : "",
      mobile:
        method === "mobile"
          ? mobile
          : "",
      email:
        method === "email"
          ? email
          : "",
    });
  };

  const handleMethodChange = (
    value: string,
  ) => {
    setMethod(value as ActivationMethod);

    setStudentId("");
    setMobile("");
    setEmail("");

    setValidationError("");
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Activate Student
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Activate a student account using Student ID,
          Mobile Number, or Email ID.
        </p>
      </div>

      <BackButton
        onClick={() => window.history.back()}
        label="Back"
      />

      {/* MAIN CARD */}

      <section className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}

        <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <CircleUserRound size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Student Activation
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter one of the available student
                identifiers to activate the account.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* METHOD */}

            <Select
              label="Activation Method"
              value={method}
              options={ACTIVATION_OPTIONS}
              onChange={handleMethodChange}
              className="w-full"
            />

            {/* INPUT */}

            <div>
              {method === "studentId" && (
                <>
                  <label
                    htmlFor="studentId"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Student ID
                  </label>

                  <div className="relative">
                    <UserRound
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="studentId"
                      type="text"
                      inputMode="numeric"
                      value={studentId}
                      onChange={(event) =>
                        setStudentId(
                          event.target.value,
                        )
                      }
                      placeholder="Enter Student ID"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </>
              )}

              {method === "mobile" && (
                <>
                  <label
                    htmlFor="mobile"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Mobile Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      value={mobile}
                      onChange={(event) =>
                        setMobile(
                          event.target.value,
                        )
                      }
                      placeholder="Enter Mobile Number"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </>
              )}

              {method === "email" && (
                <>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email ID
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value,
                        )
                      }
                      placeholder="Enter Email ID"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* VALIDATION ERROR */}

          {validationError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {validationError}
            </div>
          )}

          {/* API ERROR */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* API RESPONSE */}

          {response && (
            <div
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                response.status === "Y"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{response.message}</span>
            </div>
          )}

          {/* ACTIONS */}

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Activating..."
                : "Activate Student"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}