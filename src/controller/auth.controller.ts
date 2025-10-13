import { userRepository } from "../repository/user.repository";
import { Request, Response } from "express";
import { JWTHelper } from "../helper/jwt.helper";
import { Encrypt } from "../helper/encrypt.helper";
import { OTPUtility } from "../utility/otp.utility";
import { sendMail } from "../helper/mailer.helper";

export class authController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userRepository.getUserByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await Encrypt.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = JWTHelper.generateToken({ id: user.id });
    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    } else {
      return res.status(200).json({ token });
    }
  }

  static async forgetpass(req: Request, res: Response) {
    const { email } = req.body;
    const otp = OTPUtility.generateOTP();
    const result = await userRepository.generateOTP(
      email,
      otp,
      new Date(Date.now() + 3 * 60000)
    );
    if (result) {
      await sendMail(email, "Your OTP Code", `Your OTP code is ${otp}`);
    }
    res.status(200).json(result);
  }

  static async resetpass(req: Request, res: Response) {
    const { email, otp } = req.body;

    const isVerified = await userRepository.verifyStatusByOtp(
      email,
      Number(otp)
    );
    if (isVerified) {
      const updated = await userRepository.getUserByEmail(email);
      if (updated) {
        let password = await Encrypt.hashPassword(req.body.password);
        const data = await userRepository.updateUser(updated.id, { password });
        res.status(200).json(data);
      }
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  }
}
