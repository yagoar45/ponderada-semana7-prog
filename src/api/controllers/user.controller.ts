import { Controller, Post, Param, Put, Delete, Get, Body, ParseIntPipe } from "@nestjs/common";
import { UserDto } from "src/business/dtos/user.dto";
import { UserService } from "src/data/services/user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('/user')
    async createUser(@Body() dto: UserDto){
        return await this.userService.createUser(dto);
    }

    @Get('/users/active')
    async findAllActivesUsers() {
        return await this.userService.findAllUsersByQuery();
    }

    @Get('/users/noactive')
    async findAllNoActivesUsers() {
        return await this.userService.findAllUsersByQuery(null);
    }

    @Get("/user/:id")
    async findUserById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.findUserById(id);
    }

    @Put('/user/:id')
    async updateUserByIdAndDto(@Body() dto: UserDto, @Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.updateUserById(dto, id);
    }

    @Delete('/user/:id')
    async deleteUserById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.deleteUserById(id);
    }
}