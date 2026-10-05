export interface Order {
  orderID: number;
  studentID: number;
  studentName: string;
  mobileNo: string;
  email: string;
  course: string;
  planName: string;
  amount: number;
  paymentMethod: string;
  orderDate: string;
  status: "Success" | "Pending" | "Failed" | "Cancelled";
}

export interface OrderFilters {
  fromDate: string;
  toDate: string;
  course: string;
  status: string;
  search: string;
}