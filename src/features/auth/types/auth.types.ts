export interface AdminUser {
  adminID: number;
  name: string;
  adminEmail: string;
  mobileNo: string;
  adminStatus: string;
  adminRole: string;
  lastSignInDateTime?: string;
  firstTimeLoggedIn?: string;
  createUser?: string;
  dateCreated?: string;
  changeUser?: string;
  dateUpdated?: string;
  moduleList?: Array<{
    moduleName: string;
  }>;
}

export interface AuthState {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  otpPending: boolean;
}

export interface LoginCredentials {
  userID: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message?: string;
  admin?: AdminUser[];
}

export interface VerifyOtpRequest {
  adminID: number;
  otp: string;
}

export interface VerifyOtpResponse {
  status: string;
  message?: string;
}