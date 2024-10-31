import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { AuthUserDto } from "./dto/auth-user.dto";
import { comparePassword } from "src/utils/password.utils";
import { validateEmail } from "src/utils/email.validator";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async authUser(user: AuthUserDto) {
    if (!validateEmail(user.email)) throw new BadRequestException("The email format is invalid");

    const userFound = await this.userRepository.findOne({ 
      where: {
        email: user.email,
      },
    });

    if (!userFound)
      throw new NotFoundException("The requested user was not found");

    const payload = {
        sub: userFound.id,
        name: userFound.name,
    }

    const result = await comparePassword(user.password, userFound.password);

    if(!result) throw new UnauthorizedException("Invalid credentials")

    return {
        access_token: await this.jwtService.signAsync(payload)
     }
  }
}
