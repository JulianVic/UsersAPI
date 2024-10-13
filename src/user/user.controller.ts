//user.controller.ts
import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserService } from "./user.service"
import { User } from './user.entity';


@Controller('user')
export class UserController {

    constructor(private userService : UserService){}
    
    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.getUsers()
    }

    @Get(":id")
    getUser(@Param("id", ParseIntPipe) id: number){
        return this.userService.getUser(id)
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.userService.createUser(newUser)
    }

    @Patch(":id")
    updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.userService.updateUser(id, user)
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

    @Post("/auth")
    authUser(@Body() user: AuthUserDto){
        return this.userService.authUser(user)
    }

}
