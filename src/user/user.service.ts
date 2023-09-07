import { User as PrismaUser } from "@prisma/client";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./user.dto";
import { UserRO } from "./user.interface";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { SECRET } from "../config";
import { validate } from "class-validator";
const jwt = require('jsonwebtoken');


@Injectable()
export class UserService {

  constructor(private prisma: PrismaClient) {}

  async createUser(dto: CreateUserDto): Promise<UserRO> {
    const {username, password} = dto;

    // check uniqueness of username/email
    const qb = await this.prisma.user.findUnique({ where: { username: username } });
    if (qb) {
      const errors = { username: 'Username must be unique.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);

    }

    const errors = await validate(dto);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    }

    // create new user
    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        password: password
      }
    });

    return this.buildUserRO(newUser);

  }

  private buildUserRO(user: PrismaUser) {
    const userRO = {
      user_id: user.id,
      username: user.username,
      token: this.generateJWT(user),
    };

    return {user: userRO};
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };

  async getUserById1(id: number): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        bookings: true,
        comments: true,
        services: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь с таким id не найден.');
    }
    return user;
  }
  async findById(id: number): Promise<UserRO>{
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
  }

  async findUserByUsername(username: string): Promise<PrismaUser | null> {
    return await this.prisma.user.findFirst({
      where: {
        username: username
      }
    });
  }
  //
  // async createUser(userDto: CreateUserDto): Promise<PrismaUser> {
  //   return await this.prisma.user.create({
  //     data: {
  //       username: userDto.username,
  //       password: userDto.password,
  //     },
  //   });
  // }

  // async findOne(userDto: CreateUserDto): Promise<PrismaUser> {
  //   throw new NotImplementedException()
  // }
  // async findAll(userDto: CreateUserDto): Promise<PrismaUser> {
  //   throw new NotImplementedException()
  // }

  // async update(userDto: CreateUserDto): Promise<PrismaUser> {
  //   throw new NotImplementedException()
  // }

  // async delete(userDto: CreateUserDto): Promise<PrismaUser> {
  //   throw new NotImplementedException()
  // }
  //
  // async findById(userDto: CreateUserDto): Promise<PrismaUser> {
  //   throw new NotImplementedException()
  // }
  //
  // async findByUsername(userDto: CreateUserDto): Promise<PrismaUser> {
  //   throw new NotImplementedException()
  // }

  async getUserByUsername(username: string): Promise<PrismaUser> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }
    return user;
  }



  async deleteUser(userId: number) : Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findOne({username, password}: CreateUserDto): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({
      where : {username: username}
    });
    if (!user) {
      return null;
    }
    if (user.password === password) {
      return user;
    }

    return null;
  }
}
