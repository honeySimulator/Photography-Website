import { UserService } from "./user.service";
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Res, UsePipes } from "@nestjs/common";
import { User as PrismaUser } from '@prisma/client';

import {
  ApiBearerAuth, ApiTags,
  ApiOperation,
  ApiResponse, ApiBody, ApiParam
} from "@nestjs/swagger";
import { CreateUserDto } from "./user.dto";
import { ValidationPipe } from "../shared/pipes/validation.pipe";
import { UserRO } from "./user.interface";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@ApiBearerAuth()
@ApiTags('user')

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
// Создать пользователя (кнопка зарегистрироваться)
// получить пользователя по id (для sql запросов)
// получить пользователя по username (кнопка вход)
// удалить пользователя (кнопка удалить)


  // Создать пользователя
  // @Post()
  // @ApiOperation({ summary: 'Create user' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async createUser(@Body() data: {username: string;
  //                  password: string}
  // ): Promise<PrismaUser>{
  //   const { username, password } = data;
  //   console.log(`Controller: Creating user with username: ${username} and password: ${password}`);
  //   return await this.userService.createUser({username, password});
  //   // return res.json(user);
  // }
  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан.' })
  @ApiResponse({ status: 403, description: 'Я вам запрещаю создавать пользователя.' })
  @ApiResponse({ status: 404, description: 'Пользователь с таким username уже существует .' })
  @ApiBody({ description: 'User object', type: CreateUserDto })
  async createUser(@Body('user') createUserDto: CreateUserDto, @Res() res) {
    const user = await this.userService.createUser(createUserDto);
    res.status(201).json({ user });
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно вошел.' })
  @ApiResponse({ status: 401, description: 'Пользователь не найден 401.' })
  @ApiResponse({ status: 403, description: 'Ошибка входа 403.' })
  @ApiResponse({ status: 404, description: 'Ошибка входа 404.' })
  @ApiBody({ description: 'User object', type: CreateUserDto })
  async login(@Body('user') createUserDto: CreateUserDto, @Res() res,): Promise<void> {
    const _user = await this.userService.findOne(createUserDto);

    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);

    const token = await this.userService.generateJWT(_user);
    const username = _user.username;
    const user_id = _user.id;
    const is_admin = _user.is_admin
    const user = {token, username, user_id, is_admin};
    res.status(200).json({ user });
  }


  // Получить пользователя
  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по id'})
  @ApiResponse({ status: 200, description: 'Пользователь успешно найден.' })
  @ApiResponse({ status: 403, description: 'Пользователь не найден.' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
  async getUserById(@Param('id') id: number, @Res() res): Promise<PrismaUser> {
    let user = await this.userService.getUserById1(parseInt(String(id)));
    res.status(200).json({ user });
    return user;
  }

  // Получить пользователя
  @Get('username/:username')
  @ApiOperation({ summary: 'Получить пользователя по username' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно найден.' })
  @ApiResponse({ status: 403, description: 'Пользователь не найден.' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
  async getUserByUsername(@Param('username') username: string): Promise<PrismaUser> {
    return await this.userService.getUserByUsername(username);
  }



  // Удалить пользователя
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по id', operationId:  'getUserById', description: 'description'})
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален.' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно удален.' })
  @ApiResponse({ status: 403, description: 'Пользователь не найден.' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(parseInt(String(id)));
  }
}
