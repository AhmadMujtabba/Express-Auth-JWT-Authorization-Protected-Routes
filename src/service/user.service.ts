import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(user: User): Promise<User> {
    const newuser = this.userRepository.create(user);
    await this.userRepository.save(newuser);
    return newuser;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (user == null) return null;
    this.userRepository.merge(user, userData);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (user == null) return null;
    this.userRepository.delete({ id });
    await this.userRepository.save(user);
    return user;
  }

  async generateOTP(
    email: string,
    otp: number,
    otp_expiry: Date
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    console.log(user, email);
    if (user == null) return null;
    user.otp = otp;
    user.otp_expiry = otp_expiry;
    await this.userRepository.save(user);
    return user;
  }

  async verifyStatusByOtp(email: string, otp: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    if (user == null) return false;
    if (user.otp === otp && user.otp_expiry > new Date()) {
      console.log(
        typeof (user.otp_expiry < new Date()),
        user.otp === otp && user.otp_expiry < new Date()
      );
      user.verification_status = true;
      user.otp = null;
      user.otp_expiry = null;
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }
}
