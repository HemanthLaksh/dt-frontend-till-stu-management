export type AddonType =
  "hard_copy_notes" | "workbook" | "flashcard" | "online_material";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type NotesAddonTab = "pending" | "addon";

export interface NotesAddon {
  id: number;
  name: string;
  description: string;
  type: AddonType;
  version: string;
  active: boolean;
}

export interface NotesAddonMapping {
  id: number;
  addonId: number;
  planId: string;
  planName: string;
  duration: number;
  title: string;
  addonType: string;
  yearOfStudy: boolean;
  isComplimentary: boolean;
  isFree: boolean;
  originalPrice: number;
  strikeThroughPrice: number;
  active: boolean;
  status: ApprovalStatus;
  rejectionRemarks: string;
  createdAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface NotesAddonFormValues {
  name: string;
  description: string;
  type: AddonType;
  version: string;
}
