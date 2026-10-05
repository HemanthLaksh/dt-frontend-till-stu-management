import { useCallback, useState } from "react";

import {
  getNeetPGStudents,
  getNeetSSStudents,
  getStudentsByStateCollege,
} from "../services/studentService";
import type {
  NeetPGStudent,
  NeetSSStudent,
  StateCollegeRequest,
  StateCollegeStudent,
} from "../types/student.types";

const mockStateCollegeStudents: StateCollegeStudent[] = [
  {
    studentID: 10001,
    name: "Rahul Sharma",
    mobileNo: "9876543210",
    email: "rahul.sharma@example.com",
    college: "Sample Medical College",
    education: "NEET PG",
    countryCode: "+91",
    profileStatus: "Active",
    createdAt: "24-Sep-2026",
  },
];

const mockNeetSSStudents: NeetSSStudent[] = [
  {
    name: "Priya Kumar",
    email: "priya.kumar@example.com",
    mobile: "9876543211",
    code: "NSS001",
    speciality1: "Cardiology",
    speciality2: "Neurology",
    designation: "Doctor",
    subscriptionInterested: "Yes",
    platform: "Web",
    state: "Telangana",
    city: "Hyderabad",
    college: "Sample Medical College",
    createdAt: "24-Sep-2026",
  },
];

const mockNeetPGStudents: NeetPGStudent[] = [
  {
    name: "Arjun Reddy",
    email: "arjun.reddy@example.com",
    mobile: "9876543212",
    education: "MBBS",
    state: "Telangana",
    college: "Sample Medical College",
    createdAt: "24-Sep-2026",
  },
];

interface UseStudentsOptions {
  mock?: boolean;
}

export function useStudents({ mock = false }: UseStudentsOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stateCollegeStudents, setStateCollegeStudents] = useState<StateCollegeStudent[]>([]);
  const [neetSSStudents, setNeetSSStudents] = useState<NeetSSStudent[]>([]);
  const [neetPGStudents, setNeetPGStudents] = useState<NeetPGStudent[]>([]);

  const run = useCallback(async (request: () => Promise<void>) => {
    try {
      setLoading(true);
      setError("");
      await request();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load student details.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStateCollegeStudents = useCallback(
    async (request: StateCollegeRequest) => {
      await run(async () => {
        const data = mock
          ? mockStateCollegeStudents
          : await getStudentsByStateCollege(request);

        setStateCollegeStudents(data);
        setNeetSSStudents([]);
        setNeetPGStudents([]);
      });
    },
    [mock, run],
  );

  const fetchNeetSSStudents = useCallback(async () => {
    await run(async () => {
      const data = mock ? mockNeetSSStudents : await getNeetSSStudents();
      setNeetSSStudents(data);
      setStateCollegeStudents([]);
      setNeetPGStudents([]);
    });
  }, [mock, run]);

  const fetchNeetPGStudents = useCallback(async () => {
    await run(async () => {
      const data = mock ? mockNeetPGStudents : await getNeetPGStudents();
      setNeetPGStudents(data);
      setStateCollegeStudents([]);
      setNeetSSStudents([]);
    });
  }, [mock, run]);

  const resetResults = useCallback(() => {
    setError("");
    setStateCollegeStudents([]);
    setNeetSSStudents([]);
    setNeetPGStudents([]);
  }, []);

  return {
    loading,
    error,
    stateCollegeStudents,
    neetSSStudents,
    neetPGStudents,
    fetchStateCollegeStudents,
    fetchNeetSSStudents,
    fetchNeetPGStudents,
    resetResults,
  };
}
