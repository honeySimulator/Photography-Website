import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { PrismaClient } from "@prisma/client";

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, PrismaClient],
})

export class BookingModule {}