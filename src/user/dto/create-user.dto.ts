//create-user.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    email: string
}