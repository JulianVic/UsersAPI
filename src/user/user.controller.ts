//user.controller.ts
import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from "./user.service"
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {

    constructor(private userService : UserService){}x

    @UseGuards(AuthGuard)
    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.getUsers()
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    getUser(@Param("id", ParseIntPipe) id: number){
        return this.userService.getUser(id)
    }

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.userService.createUser(newUser)
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.userService.updateUser(id, user)
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

}
