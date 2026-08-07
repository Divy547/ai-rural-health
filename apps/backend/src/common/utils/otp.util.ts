/**
 * Generates a secure numeric OTP.
 *
 * @param length Number of digits (minimum 4)
 * @returns OTP as a string
 */

import { randomInt } from "crypto";


export function generateNumericOtp(length = 6): string {
    if (!Number.isInteger(length) || length < 4) {
        throw new Error('OTP length must be an integer greater than or equal to 4.');
    }

    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    return randomInt(min, max).toString();
}

/**
 * Returns the expiry time for an OTP.
 *
 * @param minutes Expiry duration in minutes
 */
export function getOtpExpiry(minutes: number): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
}

/**
 * Checks whether an OTP has expired.
 */
export function isOtpExpired(expiresAt: Date): boolean {
    return expiresAt.getTime() <= Date.now();
}