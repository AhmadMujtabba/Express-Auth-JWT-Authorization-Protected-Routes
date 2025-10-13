import * as express from "express";
import { authController } from "../controller/auth.controller";
export const authRoute = express.Router();
import { authentication } from "../middleware/authentication.middleware";

authRoute.post("/login", authentication, authController.login);
authRoute.post("/forgotpassword", authentication, authController.forgetpass);
authRoute.post("/resetpassword", authentication, authController.resetpass); 
