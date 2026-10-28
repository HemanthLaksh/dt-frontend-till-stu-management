const parseDate = (value: string): number | null => {
  if (!value) {
    return null;
  }

  // Accept ISO date strings: YYYY-MM-DD
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);

  // Reject invalid dates such as 2026-02-30.
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
};

export const isValidDateRange = (fromDate: string, toDate: string): boolean => {
  const fromTimestamp = parseDate(fromDate);
  const toTimestamp = parseDate(toDate);

  if (fromTimestamp === null || toTimestamp === null) {
    return false;
  }

  return fromTimestamp <= toTimestamp;
};

export const getDateRangeError = (fromDate: string, toDate: string): string => {
  if (!fromDate) {
    return "Please select a From Date.";
  }

  if (!toDate) {
    return "Please select a To Date.";
  }

  const fromTimestamp = parseDate(fromDate);
  const toTimestamp = parseDate(toDate);

  if (fromTimestamp === null || toTimestamp === null) {
    return "Please select valid dates in YYYY-MM-DD format.";
  }

  if (fromTimestamp > toTimestamp) {
    return "To Date cannot be earlier than From Date.";
  }

  return "";
};
