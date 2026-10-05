// import { API_BASE_URL } from "./client";

// export interface Student {
//   studentID: number;
//   name: string;
//   mobileNo: string;
//   email: string;
//   college: string;
//   education: string;
//   countryCode: string;
//   profileStatus: string;
//   createdAt: string;
// }

// interface GetStudentsResponse {
//   student: Student[];
// }

// export async function getStudents(): Promise<Student[]> {
//   const response = await fetch(
//     `${API_BASE_URL}/Operations/getAllStudentDetails`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch students: ${response.status}`);
//   }

//   const data: GetStudentsResponse = await response.json();

//   return data.student;
// }