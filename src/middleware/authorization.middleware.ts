import { Request, Response, NextFunction } from "express";
import { userRole } from "../enum/constant.enum";
import { userRepository } from "../repository/user.repository";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.header["user"].id;
  const user = await userRepository.getUserById(id);
  const userrole = user?.role;
  if (userrole !== userRole.ADMIN) {
    return res.status(403).json({ message: "Forbidden" });
  } else {
    next();
  }
};
