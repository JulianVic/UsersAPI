//auth-user.dto.ts
import { IsNotEmpty } from "class-validator";

export class AuthUserDto{
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
}