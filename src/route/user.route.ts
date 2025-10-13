import * as express from "express";
import { userController } from "../controller/user.controller";
export const userRoute = express.Router();

userRoute.get("/", userController.getAllUser);
userRoute.get("/:id", userController.getUserById);
userRoute.post("/", userController.createUser);
userRoute.put("/:id", userController.updateUser);
userRoute.delete("/:id", userController.deleteUser);
