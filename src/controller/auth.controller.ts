import { userRepository } from "../repository/user.repository";
import { Request, Response } from "express";
import { JWTHelper } from "../helper/jwt.helper";
import { Encrypt } from "../helper/encrypt.helper";

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
}
