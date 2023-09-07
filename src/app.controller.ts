import {
  CallHandler,
  Controller,
  ExecutionContext,
  Get,
  Injectable,
  NestInterceptor,
  Render, Req,
  Res
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Response } from 'express';
import {concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const endTime = Date.now();
        const responseTime = `${endTime/1000 - startTime/1000}ms`;
        console.log(`Response time: ${responseTime}`);
        // response.setHeader('X-Response-Time', responseTime);
        response.locals.responseTime = parseFloat(responseTime).toFixed(2);
        // console.log('response.locals:', response.locals); // Добавлено для отладки
      }),
      concatMap(() => of(undefined))
    );
  }
}


@Controller()
export class AppController {
  @Get()
  @Render('index')
  async getIndex(@Res() response: Response): Promise<{ responseTime: number | string }> {
    const responseTime = response.locals.responseTime;
    // console.log(`Load time: ${responseTime}`);
    return { responseTime };
  }

  @Get('/index')
  @Render('index')
  getIndexPage(@Res() res) {
    const serverResponseTime = res.locals.serverResponseTime;
    return { serverResponseTime };
  }
  @Get('/loginPage')
  @Render('loginPage')
  loginPage(@Res() res) {
    return { title: 'Страница входа' };
  }

  @Get('/signupPage')
  @Render('signupPage')
  signupPage(@Res() res) {
    return { title: 'Страница регистрации' };
  }

  @Get('/reviews')
  @Render('reviews')
  reviews(@Res() res) {
    return { title: 'Страница с отзывами' };
  }

  @Get('/page')
  @Render('page')
  getPage() {
    return { title: 'Страница 2' };
  }
  @Get('/gallery')
  @Render('gallery')
  getGallery() {
    return { title: 'Галерея цветов' };
  }

  @Get('/cart')
  @Render('cart')
  getCart() {
    return { title: 'Корзина' };
  }

  @Get('/orders')
  @Render('orders')
  getOrders() {
    return { title: 'Бронирования пользователя' };
  }
  @Get('/allOrders')
  @Render('allOrders')
  allOrders() {
    return { title: 'Администрирование заказов' };
  }
}
