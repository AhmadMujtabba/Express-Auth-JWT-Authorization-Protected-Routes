import * as express from "express";
import { userController } from "../controller/user.controller";
export const verificationRoute = express.Router();

verificationRoute.post("/generate-otp", userController.generateOTP);
verificationRoute.post("/verify-otp", userController.verifyStatusByOtp);
