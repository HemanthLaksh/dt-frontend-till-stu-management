export interface DashboardStudentDetails {
  pendingStudents: string;
  activeStudentsCreatedThisMonth: string;
  activeStudentsCreatedSinceOneMonth: string;
  activeStudents: string;
  inactiveStudents: string;
  deletedStudents: string;

  ios: string;
  android: string;
  websiteCount: string;

  count2021: string;

  neetPGCount: string;
  neetSSCount: string;

  neetPG: string;
  neetSS: string;

  appActiveNeetPGCount: string;
  appActiveNeetSSCount: string;

  neetSS2020SignUps: string;
  neetSS2021SignUps: string;

  fmgeCount2021: string;
  fmgeTotalSignUps: string;
  fmgeLoggedIn: string;
  appActiveFMGECount: string;
  fmge2021SignUpCount: string;

  t2023NEETPG: string;
  t2023NEETSS: string;
  t2023FMGE: string;
  pgResidecncy2020SignUps: string;
  t2023PGResidency: string;

  c12024: string;
  c22024: string;
  c32024: string;
  c42024: string;
  c52024: string;
}

export interface DashboardResponse {
  studentDetails: DashboardStudentDetails;
  status: string;
  message: string;
}