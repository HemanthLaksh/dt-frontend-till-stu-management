import {
  fetchOperationsDashboard,
  type OperationsDashboardData,
} from "./dashboardService";

import { mockRegistrationOverviewResponse } from "../utils/registrationOverviewMock";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_REGISTRATION_MOCK === "true";

export async function fetchRegistrationOverview(): Promise<OperationsDashboardData> {
  if (USE_MOCK_DATA) {
    return mockRegistrationOverviewResponse;
  }

  return fetchOperationsDashboard();
}
