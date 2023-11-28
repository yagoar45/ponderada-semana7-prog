import { Controller, Post, Param, Put, Delete, Get, Body, ParseIntPipe } from "@nestjs/common";
import { UserDto } from "../../business/dtos/user.dto";
import { UserService } from "../../data/services/user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created' })
    @Post('/user')
    async createUser(@Body() dto: UserDto){
        return await this.userService.createUser(dto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    @Get('/users')
    async findAllActivesUsers() {
        return await this.userService.findAllUsersByQuery();
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return the user with the specified ID' })
    @Get("/user/:id")
    async findUserById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.findUserById(id);
    }

    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated' })
    @Put('/user/:id')
    async updateUserByIdAndDto(@Body() dto: UserDto, @Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.updateUserById(dto, id);
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted' })
    @Delete('/user/:id')
    async deleteUserById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.deleteUserById(id);
    }
}