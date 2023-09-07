import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param, Patch,
  Post,
  Res,
  UseGuards
} from "@nestjs/common";
import { Comment } from '@prisma/client';
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiTags, ApiOperation,
  ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // @UseGuards(JwtAuthGuard)
  @Post(':serviceId/:userId')
  @ApiOperation({ summary: 'Создать комментарий' })
  @ApiResponse({ status: 201, description: 'комментарий успешно создан.' })
  @ApiResponse({ status: 403, description: 'комментарий не создан.' })
  @ApiResponse({ status: 404, description: 'комментарий не создан.' })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('serviceId') serviceId: number,
    @Param('userId') userId: number,
  ): Promise<Comment> {
    const comment = await this.commentService.createComment(
      createCommentDto.comment_text,
      parseInt(String(serviceId)),
      parseInt(String(userId)),
    );
    if (comment) {
      return comment;
    } else {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    }
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Найти комментарий по id' })
  // @ApiResponse({ status: 201, description: 'комментарий успешно найден.' })
  // @ApiResponse({ status: 403, description: 'комментарий не найден.' })
  // @ApiResponse({ status: 404, description: 'комментарий не найден.' })
  // async findCommentById(@Param('id') id: number): Promise<Comment> {
  //   const comment = await this.commentService.findCommentById(parseInt(String(id)));
  //   if (!comment) {
  //     throw new NotFoundException('Comment not found');
  //   }
  //   return comment;
  // }

  @Get('service/:serviceId')
  @ApiOperation({ summary: 'Найти комментарий по service_id' })
  @ApiResponse({ status: 201, description: 'комментарий успешно найден.' })
  @ApiResponse({ status: 403, description: 'комментарий не найден.' })
  @ApiResponse({ status: 404, description: 'комментарий не найден.' })
  async findCommentsByServiceId(
    @Param('serviceId') serviceId: number,
  ): Promise<Comment[]> {
    const comments = await this.commentService.findCommentsByServiceId(
      parseInt(String(serviceId)),
    );
    if (!comments) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }

  @Get('/commentsAll')
  @ApiOperation({ summary: 'Найти все комментарии' })
  @ApiResponse({ status: 201, description: 'комментарии успешно возвращены.' })
  @ApiResponse({ status: 403, description: 'комментарии не найдены.' })
  @ApiResponse({ status: 404, description: 'комментарии не найдены.' })
  async getAllUserServices(@Res() res): Promise<void> {
    const results =  await this.commentService.getAllComments();
    if (!results || results.length === 0) {
      res.json([]);
    } else {
      res.json(results);
    }
  }

  @Patch(':id')
  // @ApiBody({description: 'Комментарий'})
  @ApiOperation({ summary: 'Изменить текст комментария по id' })
  async changeComment(@Param('id') id: number,
                      @Res() res,
                      @Body() updateComment:UpdateCommentDto
  ): Promise<Comment> {
    const results =  await this.commentService.changeComments(id, updateComment);
    if (!results) {
      res.status(200).json(results);
      return await results;
    } else {
      res.json(results);

    }
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить комментарий по id' })
  @ApiResponse({ status: 201, description: 'комментарий успешно удален.' })
  @ApiResponse({ status: 403, description: 'комментарий не удален.' })
  @ApiResponse({ status: 404, description: 'комментарий не удален.' })
  async deleteCommentById(@Param('id') id: number): Promise<void> {
    await this.commentService.deleteCommentById(parseInt(String(id)));
  }
// Создать комментарий (кнопка опубликовать)
// получить комментарий по id (для sql запросов)
// получить все комментарий по service_id (для sql запросов)
// удалить комментарий (для sql запросов)
}