import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaClient } from "@prisma/client";
import { AuthMiddleware } from "./auth.middleware";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaClient, AuthMiddleware],
})

export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET }, { path: 'user', method: RequestMethod.PUT });
  }
}