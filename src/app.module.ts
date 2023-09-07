import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimingInterceptor  } from './app.controller';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { ServiceModule } from "./service/service.module";
import { CommentModule } from "./comment/comment.module";
import { CartModule } from "./cart/cart.module";
import { BookingModule } from "./booking/booking.module"; // импортируем TimingInterceptor


@Module({
  imports: [UserModule, ServiceModule,
    CommentModule, CartModule, BookingModule],
  controllers: [AppController],
  providers: [AppService,
    {
    provide: APP_INTERCEPTOR,
    useClass: TimingInterceptor,
  },
  ],
})
export class AppModule {}
