import * as express from "express";
import { authController } from "../controller/auth.controller";
export const authRoute = express.Router();
import { authentication } from "../middleware/authentication.middleware";
import { authorization } from "../middleware/authorization.middleware";

authRoute.post("/login", authController.login);
authRoute.post("/forgotpassword", authentication, authController.forgetpass);
authRoute.post("/resetpassword", authentication, authController.resetpass);
authRoute.get(
  "/profile",
  authentication,
  authorization,
  authController.getProfile
);
