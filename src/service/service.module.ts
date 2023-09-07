import { Module } from "@nestjs/common";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";
import { PrismaClient } from "@prisma/client";


@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [ServiceService,PrismaClient],
})

export class ServiceModule {}