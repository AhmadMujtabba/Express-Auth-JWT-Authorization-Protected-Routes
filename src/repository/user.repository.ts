import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";
import { AppDataSource } from "../config/data-source";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);
