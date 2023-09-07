import { Prisma, Booking, User_Service } from "@prisma/client";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CartService } from "src/cart/cart.service";
import { response } from "express";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaClient) {}

  async createBooking(userId: number, serviceId: number, bookingDate: string,
  ){
    // Create booking
    console.log('userId', userId)
    console.log('serviceId', serviceId)
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const service = await this.prisma.service.findUnique({ where: { id: serviceId } });
    if (!user || !service) {
      throw new HttpException({ message: 'User or service not found' }, HttpStatus.NOT_FOUND);
    }
    const booking = await this.prisma.booking.create({
      data: {
        booking_date: bookingDate,
        user: { connect: { id: userId } },
        service: { connect: { id: serviceId } },
      },
    });

    // Delete User_Service entries
    await this.prisma.user_Service.deleteMany({
      where: { user_id: userId },
    });
    return booking;
  }

  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    const bookings = await this.prisma.booking.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
        service: true,
      },
    });
    return bookings;
  }

  async getBookingsByServiceId(serviceId: number): Promise<Booking[]> {
    const bookings = await this.prisma.booking.findMany({
      where: {
        service_id: serviceId,
      },
    });
    if (!bookings || bookings.length === 0) {
      throw new NotFoundException(`No bookings found for service with id ${serviceId}`);
    }
    return bookings;
  }

  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: id,
      },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }

  async removeFromBooking(id: number): Promise<void> {
    const result = await this.prisma.booking.delete({
      where: { id: id },
    });
    if (!result) {
      response.status(404)
      throw new NotFoundException('booking with id ${id} not found.');
    } else {
      response.status(200)

    }
  }

  async getAllBookings(): Promise<Booking[]> {
    const results =  await this.prisma.booking.findMany({
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