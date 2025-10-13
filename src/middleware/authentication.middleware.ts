import { JWTHelper } from "../helper/jwt.helper";
import { Request, Response, NextFunction } from "express";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decode = JWTHelper.verifyToken(token);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.header["user"] = decode;

  next();
};
