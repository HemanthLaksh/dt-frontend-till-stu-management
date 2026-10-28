import legacyPortalClient from "@/services/api/legacyClient";
import type {
  NeetPGStudent,
  NeetSSStudent,
  StateCollegeRequest,
  StateCollegeStudent,
} from "../types/student.types";

function parseCells(row: Element): string[] {
  return Array.from(row.querySelectorAll("td")).map((cell) =>
    (cell.textContent ?? "").replace(/\s+/g, " ").trim(),
  );
}

function parseRows(html: string): string[][] {
  if (typeof DOMParser === "undefined") return [];
  const document = new DOMParser().parseFromString(html, "text/html");
  return Array.from(document.querySelectorAll("tbody tr, tr"))
    .map(parseCells)
    .filter((cells) => cells.length > 0);
}

function assertLegacyHtml(html: string): string {
  if (!html || !html.includes("<")) {
    throw new Error("The student service returned an unexpected response.");
  }
  return html;
}

export async function getStudentsByStateCollege(
  request: StateCollegeRequest,
): Promise<StateCollegeStudent[]> {
  const form = new URLSearchParams();
  form.set("state", request.state);
  form.set("college", request.college);
  form.set("courseid", request.courseId);

  const response = await legacyPortalClient.post<string>(
    "/curl_getstudentsbystatecollege.php",
    form,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "text",
    },
  );

  const rows = parseRows(assertLegacyHtml(response.data));

  return rows.map((cells) => ({
    studentID: cells[1] ?? "",
    name: cells[2] ?? "",
    mobileNo: cells[3] ?? "",
    email: cells[4] ?? "",
    college: cells[5] ?? "",
    education: cells[6] ?? "",
    countryCode: cells[7] ?? "",
    profileStatus: cells[8] ?? "",
    createdAt: cells[9] ?? "",
  }));
}

export async function getNeetSSStudents(): Promise<NeetSSStudent[]> {
  const response = await legacyPortalClient.post<string>(
    "/curl_getneetss.php",
    new URLSearchParams(),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "text",
    },
  );

  const rows = parseRows(assertLegacyHtml(response.data));

  return rows.map((cells) => ({
    name: cells[1] ?? "",
    email: cells[2] ?? "",
    mobile: cells[3] ?? "",
    code: cells[4] ?? "",
    speciality1: cells[5] ?? "",
    speciality2: cells[6] ?? "",
    designation: cells[7] ?? "",
    subscriptionInterested: cells[8] ?? "",
    platform: cells[9] ?? "",
    state: cells[10] ?? "",
    city: cells[11] ?? "",
    college: cells[12] ?? "",
    createdAt: cells[13] ?? "",
  }));
}

export async function getNeetPGStudents(): Promise<NeetPGStudent[]> {
  const response = await legacyPortalClient.post<string>(
    "/curl_getneetpg.php",
    new URLSearchParams(),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "text",
    },
  );

  const rows = parseRows(assertLegacyHtml(response.data));

  return rows.map((cells) => ({
    name: cells[1] ?? "",
    email: cells[2] ?? "",
    mobile: cells[3] ?? "",
    education: cells[4] ?? "",
    state: cells[5] ?? "",
    college: cells[6] ?? "",
    createdAt: cells[7] ?? "",
  }));
}
