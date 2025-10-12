import * as JsonWebKey from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

export class JWTHelper {
  static generateToken(payload: object): string {
    return JsonWebKey.sign(payload, JWT_SECRET, { expiresIn: "3m" });
  }

  static verifyToken(token: string): any {
    try {
      return JsonWebKey.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}
