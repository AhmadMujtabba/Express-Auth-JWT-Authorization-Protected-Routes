import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
const salt = Number(process.env.BCRYPT_SALT);
export class Encrypt {
  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
