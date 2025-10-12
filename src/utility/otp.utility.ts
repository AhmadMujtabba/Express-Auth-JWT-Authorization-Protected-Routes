export class OTPUtility {
  static generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  static isOTPExpired(otpExpiry: Date): boolean {
    return new Date() > otpExpiry;
  }
}
