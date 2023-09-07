import { User_Service } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaClient) {}

  async addItemToCart(userId: number, serviceId: number): Promise<User_Service> {
    return await this.prisma.user_Service.create({
      data: {
        user_id: userId,
        service_id: serviceId,
      },
    });
  }

  async removeFromCart(id: number): Promise<void> {
    const result = await this.prisma.user_Service.delete({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException('User_Service with id ${id} not found.');
    }
  }

  async getCartItemById(id: number): Promise<User_Service | null> {
    const result = await this.prisma.user_Service.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException('User_Service with id ${id} not found.');
    }
    return result;
  }

  async getCartItemsByUserId(userId: number): Promise<User_Service[]> {
    const results = await this.prisma.user_Service.findMany({
      where: { user_id: userId } ,
      include: {
        user: true,
        service: true,
      },
    });
    return results;
  }

  async getAllUserServices(): Promise<User_Service[]> {
    const results =  await this.prisma.user_Service.findMany({
      // where: {},
      include: {
      user: true,
        service: true,
    },});
    if (!results || results.length === 0) {
      return [];
    }
    return results;
  }

}