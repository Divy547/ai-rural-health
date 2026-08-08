import { RefreshToken } from '@prisma/client';
import { JwtPayload } from '../interfaces/jwt-payload.interface';


export interface CreateSessionOptions {
  userId: string;
  refreshToken: string;
}

export interface ValidateSessionResult {
    session: RefreshToken;
    payload: JwtPayload;
}

export interface RotateSessionResult {
  accessToken: string;
  refreshToken: string;
}