export type NotesOrderStatus = "New" | "Couriered" | "Delivered";

export interface NotesOrderAddress {
  addressLine?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export interface NotesOrder {
  notesOrderId: number;
  amount: number;
  studentId: number;
  studentName: string;
  mobileNo: string;
  notes: string;
  subjects: string;
  courierTrackingNo: string;
  paymentOrderId: string;
  college: string;
  education: string;
  addressState: string;
  address: NotesOrderAddress;
  invoiceURL?: string | null;
}

export interface NotesOrderCourse {
  id: number;
  name: string;
  shortName: string;
}

export interface NotesOrderFilters {
  courseId: number;
  status: NotesOrderStatus;
}