export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type SessionUser = {
  id: string;
  role: string;
};

export interface SendOtpResult {
  message: string;
}

export interface VerifyOtpResult {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}