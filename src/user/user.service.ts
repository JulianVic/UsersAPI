//user.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { generateRandomPassword, hashPassword } from "src/utils/password.utils";
import { validateEmail } from "src/utils/email.validator";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) throw new NotFoundException("The requested user was not found");

    return userFound;
  }

  async createUser(user: CreateUserDto) {
    if (!validateEmail(user.email)) throw new BadRequestException("The email format is invalid");

    const isEmailAvailable = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (isEmailAvailable) throw new ConflictException("Email is already registered.");

    const generatedPassword = generateRandomPassword(12);
    const hashedPassword = await hashPassword(generatedPassword);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    
    const savedUser = await this.userRepository.save(newUser)

    delete savedUser.password

    console.log(generatedPassword)
    return savedUser; 
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) throw new NotFoundException("The requested user was not found");

    if (user.email) {
      if (!validateEmail(user.email)) throw new BadRequestException("The email format is invalid");

      const isEmailAvailable = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (isEmailAvailable) throw new ConflictException("Email is already registered.");
    }

    if(user.password){
      user.password = await hashPassword(user.password)
    }

    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) throw new NotFoundException("The requested user was not found");

    return this.userRepository.delete({ id });
  }
}
