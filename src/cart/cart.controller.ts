import {
  Body,
  Request,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Render,
  Res,
  UseGuards
} from "@nestjs/common";
import { User_Service } from '@prisma/client';
import { CartService } from "./cart.service";
import { ApiBearerAuth, ApiTags, ApiOperation,
  ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateServiceDto } from "../service/service.dto";
import { CreateCartDto } from "./cart.dto";
import { AuthMiddleware } from "../user/auth.middleware";
import { User } from "../user/user.decorator";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
// Создать строку в корзине (кнопка добавить в корзину)
  @Post(':user_id')
  @ApiOperation({ summary: 'Создать добавление в корзину' })
  @ApiResponse({ status: 201, description: 'Услуга успешно добавлена в корзину.' })
  @ApiResponse({ status: 404, description: 'Услуга уже добавлена или не найдена.' })
  @ApiBody({ type: CreateCartDto, description: 'Данные для создания элемента в корзине' })
  async addItemToCart(@Param('user_id') userId: number,
                      @Body('service_id') service_id: number,
                      @Res() res,
  ): Promise<User_Service> {
    const result = this.cartService.addItemToCart(parseInt(String(userId)), parseInt(String(service_id)));
    if (result) {
      res.status(201);
      return result;
    } else {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    }
  }

// получить элемент в корзине по id (для sql запросов)
//   @Get(':id')
//   @ApiOperation({ summary: 'Получить услугу из корзины по id' })
//   @ApiResponse({ status: 200, description: 'Услуга успешно получена.' })
//   @ApiResponse({ status: 404, description: 'Услуга не получена или не найдена в корзине.' })
//   async getCartItemById(@Param('id') id: number): Promise<User_Service> {
//     return await this.cartService.getCartItemById(parseInt(String(id)));
//   }

// получить все элементы в корзине по user_id (для sql запросов)
  @Get('services/:userId')
  // @Use(AuthMiddleware)
  @ApiOperation({ summary: 'Получить всю корзину для одного пользователя' })
  @ApiResponse({ status: 200, description: 'Корзина пользователя успешно получена.' })
  @ApiResponse({ status: 404, description: 'В корзине пользователя ничего нет.' })
  async getCartItemsByUserId(@Param('userId') userId: number, @Res() res): Promise<void> {
    console.log('userId:',{userId});
    const resData = await this.cartService.getCartItemsByUserId(parseInt(String(userId)));
    if (!resData || resData.length === 0) {
      res.json([]);
    } else {
      res.json(resData);
    }
  }


  @Get('/cartAll')
  @ApiOperation({ summary: 'Получить все корзины' })
  @ApiResponse({ status: 200, description: 'Корзины успешно получены.' })
  @ApiResponse({ status: 404, description: 'Пользователи не добавляли ничего в корзины.' })

  async getAllUserServices(@Res() res): Promise<void> {
    const results =  await this.cartService.getAllUserServices();
    if (!results || results.length === 0) {
      res.json([]);
    } else {
      res.json(results);
    }
  }
// удалить строку в корзине по id (кнопка удалить)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить услугу из корзины' })
  @ApiResponse({ status: 200, description: 'Услуга успешно удалена из корзины.' })
  @ApiResponse({ status: 404, description: 'Услуга не удалена или не найдена в корзине.' })
  @ApiResponse({ status: 505, description: 'Ошибка сервера, такой id не найден.' })
  async removeFromCart(@Param('id') id: number): Promise<void> {
    await this.cartService.removeFromCart(parseInt(String(id)));
  }
}