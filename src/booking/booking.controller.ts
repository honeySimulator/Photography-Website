import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Booking } from '@prisma/client';
import { BookingService } from "./booking.service";
import { ApiBearerAuth, ApiTags, ApiOperation,
  ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateCartDto } from "../cart/cart.dto";
import { CreateBookingDto } from "./booking.dto";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@ApiBearerAuth()
@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}


  @Post()
  @ApiOperation({ summary: 'Создать бронирование (кнопка забронировать)' })
  @ApiResponse({ status: 201, description: 'Услуга успешно забронирована.' })
  @ApiResponse({ status: 404, description: 'Услуга забронирована или не найдена.' })
  @ApiBody({ type: CreateBookingDto, description: 'Данные для создания бронирования' })
  async createBooking(
    @Body('user_id') userId: number,
    @Body('service_id') serviceId: number,
    @Body('booking_date') bookingDate: string,
    @Res() res
  ): Promise<Booking> {
    const result = this.bookingService.createBooking(parseInt(String(userId)), parseInt(String(serviceId)), bookingDate);
    if (result) {
      return res.status(201).json(result);
    } else {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: ' получить элемент в бронировании по id' })
  @ApiResponse({ status: 200, description: 'Бронирование успешно найдено.' })
  @ApiResponse({ status: 404, description: 'Бронирования нет или не найдено.' })
  async getBookingsByUserId(@Param('userId') userId: number, @Res() res): Promise<void> {
    console.log('userId:',{userId});
    const resData = await this.bookingService.getBookingsByUserId(parseInt(String(userId)));
    if (!resData || resData.length === 0) {
      res.json([]);
    } else {
      res.json(resData);
    }
  }

  @Get('/bookingAll')
  @ApiOperation({ summary: 'Получить все бронирования' })
  @ApiResponse({ status: 200, description: ' успешно получены.' })
  @ApiResponse({ status: 404, description: 'Пользователи ничего не бронировали.' })

  async getAllUserServices(@Res() res): Promise<void> {
    const results =  await this.bookingService.getAllBookings();
    if (!results || results.length === 0) {
      res.json([]);
    } else {
      res.json(results);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '  получить все элементы в бронировании по id' })
  @ApiResponse({ status: 200, description: 'Бронирование успешно найдено.' })
  @ApiResponse({ status: 404, description: 'Бронирования нет или не найдено.' })
  async getBookingById(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.getBookingById(parseInt(String(id)));
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить бронирование' })
  @ApiResponse({ status: 200, description: 'бронирование успешно удалена .' })
  @ApiResponse({ status: 404, description: 'бронирование не удалена или не найдена .' })
  @ApiResponse({ status: 505, description: 'Ошибка сервера, такой id не найден.' })
  async removeFromCart(@Param('id') id: number, @Res() response: Response): Promise<void> {
    await this.bookingService.removeFromBooking(parseInt(String(id)));
  }

}