export interface SessionOverviewData {
  website: {
    loggedInUsers: number;
    currentActivity: number;
  };
  appSessions: {
    name: string;
    sessions: number;
  }[];
}

export const mockSessionOverviewData: SessionOverviewData = {
  website: {
    loggedInUsers: 4832,
    currentActivity: 72,
  },
  appSessions: [
    {
      name: "NEET PG",
      sessions: 2842,
    },
    {
      name: "NEET SS",
      sessions: 1924,
    },
    {
      name: "FMGE",
      sessions: 1482,
    },
    {
      name: "MBBS Curriculum",
      sessions: 2316,
    },
    {
      name: "PG Residency",
      sessions: 1128,
    },
  ],
};
