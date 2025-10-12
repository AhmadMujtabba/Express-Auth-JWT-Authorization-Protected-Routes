import { userRepository } from "../repository/user.repository";
import { Request, Response } from "express";
import { Encrypt } from "../helper/encrypt.helper";
import { OTPUtility } from "../utility/otp.utility";
import { sendMail } from "../helper/mailer.helper";

export class userController {
  static async getAllUser(req: Request, res: Response) {
    const result = await userRepository.getAll();
    res.status(200).json(result);
  }

  static async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await userRepository.getUserById(id);
    res.status(200).json(result);
  }

  static async createUser(req: Request, res: Response) {
    let data = req.body;
    data.password = await Encrypt.hashPassword(data.password);
    const result = await userRepository.createUser(data);
    res.status(201).json(result);
  }

  static async updateUser(req: Request, res: Response) {
    if (req.body.password) {
      req.body.password = await Encrypt.hashPassword(req.body.password);
    }
    const result = await userRepository.updateUser(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(result);
  }

  static async deleteUser(req: Request, res: Response) {
    const result = await userRepository.deleteUser(Number(req.params.id));
    res.status(200).json(result);
  }

  static async generateOTP(req: Request, res: Response) {
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

  static async verifyStatusByOtp(req: Request, res: Response) {
    const { email, otp } = req.body;
    const isVerified = await userRepository.verifyStatusByOtp(
      email,
      Number(otp)
    );
    if (isVerified) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  }
}
