"use client";

import { useState } from "react";
import {
  CreditCard,
  ChevronRight,
} from "lucide-react";

import BackButton from "@/components/ui/BackButton/BackButton";

import {
  COUPON_ATTEMPTS_COURSES,
  type CouponCourse,
} from "../constants/couponAttempts.constants";

import CouponAnalytics from "./CouponAnalytics";

export default function CouponAttempts() {
  const [selectedCourse, setSelectedCourse] =
    useState<CouponCourse | null>(null);

  const handleCourseSelect = (
    course: CouponCourse
  ) => {
    setSelectedCourse(course);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}

      <div>
        {/* <p className="text-sm font-medium text-blue-600">
          Analytics & Reports
        </p> */}

        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Coupon Attempts
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View coupon usage and analytics by course.
        </p>
      </div>

      {/* COURSE SELECTION */}

      {!selectedCourse && (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* HEADER */}

          <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Coupon Attempts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a course to view coupon analytics.
                </p>
              </div>
            </div>
          </div>

          {/* COURSE CARDS */}

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {COUPON_ATTEMPTS_COURSES.map(
              (course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() =>
                    handleCourseSelect(course)
                  }
                  className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                      <CreditCard size={21} />
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500"
                    />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    {course.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Coupon Analytics
                  </p>
                </button>
              )
            )}
          </div>
        </section>
      )}

      {/* ANALYTICS */}

      {selectedCourse && (
        <div className="space-y-4">
          {/* BACK */}

          <BackButton
            onClick={handleBack}
            label="Back to Courses"
          />

          <CouponAnalytics
            course={selectedCourse}
          />
        </div>
      )}
    </div>
  );
}