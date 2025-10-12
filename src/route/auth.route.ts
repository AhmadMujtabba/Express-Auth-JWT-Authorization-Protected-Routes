import * as express from "express";
import { authController } from "../controller/auth.controller";
export const authRoute = express.Router();

authRoute.post("/login", authController.login);
