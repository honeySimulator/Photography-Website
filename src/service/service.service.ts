import { Comment, Prisma, Service, User as PrismaUser } from "@prisma/client";
import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaClient) {}

  async createService(
    name: string,
    description: string,
    price: number,
  ): Promise<Service> {
    return await this.prisma.service.create({
      data: {
        name: name,
        description: description,
        price: price,
      },
    });
  }

  async deleteService(id: number): Promise<Service> {
    const service = await this.getServiceById(id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return await this.prisma.service.delete({
      where: {
        id: id,
      },
    });
  }

  async getServiceById(id: number): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: {
        id: parseInt(String(id)),
      },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async getAllService(): Promise<Service[]> {
    const results =  await this.prisma.service.findMany(({
      where: {

      },
      include: {
        bookings: true,
        comments: true,
      },
    }));
    if (!results || results.length === 0) {
      return [];
    }
    return results;
  }
}