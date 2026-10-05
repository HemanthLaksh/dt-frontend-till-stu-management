export interface AppError {
  code: string;
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}