import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { Service } from '@prisma/client';
import { ServiceService } from "./service.service";
import { ApiBearerAuth, ApiTags, ApiOperation,
  ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateUserDto } from "../user/user.dto";
import { CreateServiceDto } from "./service.dto";

@ApiBearerAuth()
@ApiTags('service')

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Создать услугу' })
  @ApiResponse({ status: 201, description: 'Услуга успешно создана.' })
  @ApiResponse({ status: 403, description: 'Услуга уже существует или не найдена.' })
  @ApiResponse({ status: 404, description: 'Услуга уже существует или не найдена.' })
  @ApiBody({ type: CreateServiceDto, description: 'Данные для создания новой услуги' })
  async createService(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return await this.serviceService.createService(name, description, price);
  }

  @Get(':id')
  @ApiOperation({ summary: 'получить услугу по id' })
  @ApiResponse({ status: 200, description: 'Услуга успешно найдена.' })
  @ApiResponse({ status: 403, description: 'Услуга уже существует или не найдена.' })
  @ApiResponse({ status: 404, description: 'Услуга уже существует или не найдена.' })
  async getServiceById(@Param('id') id: number): Promise<Service> {
    return await this.serviceService.getServiceById(id);
  }

  @Get('/servicesAll')
  @ApiOperation({ summary: 'получить все услуги' })
  @ApiResponse({ status: 200, description: 'Услуги успешно найдены.' })
  @ApiResponse({ status: 403, description: 'Услуги не найдены.' })
  @ApiResponse({ status: 404, description: 'Услуги не найдены.' })
  async getAllUserServices(@Res() res): Promise<void> {
    const results =  await this.serviceService.getAllService();
    if (!results || results.length === 0) {
      res.json([]);
    } else {
      res.json(results);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'удалить услугу по id' })
  @ApiResponse({ status: 200, description: 'Услуга успешно удалена.' })
  @ApiResponse({ status: 403, description: 'Услуга не удалена или не найдена.' })
  @ApiResponse({ status: 404, description: 'Услуга уже существует или не найдена.' })
  async deleteService(@Param('id') id: number) {
    return await this.serviceService.deleteService(parseInt(String(id)));
  }
}