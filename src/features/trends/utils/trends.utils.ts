export const isValidDateRange = (
  fromDate: string,
  toDate: string,
): boolean => {
  if (!fromDate || !toDate) {
    return false;
  }

  return fromDate <= toDate;
};

export const getDateRangeError = (
  fromDate: string,
  toDate: string,
): string => {
  if (!fromDate) {
    return "Please select a From Date.";
  }

  if (!toDate) {
    return "Please select a To Date.";
  }

  if (fromDate > toDate) {
    return "To Date cannot be earlier than From Date.";
  }

  return "";
};