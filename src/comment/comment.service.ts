import { Comment, PrismaClient } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCommentDto } from "./comment.dto";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaClient) {}

  async createComment(comment_text: string, serviceId: number, userId: number
  ): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {
        comment_text: comment_text,
        service_id: serviceId,
        user_id: userId,
      },
    });
  }

  async findCommentById(id: number): Promise<Comment> {
    return await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
      include: {
        service: true,
        user: true,
      },
    });
  }

  async findCommentsByServiceId(serviceId: number): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: {
        service_id: serviceId,
      },
      include: {
        service: true,
        user: true,
      },
    });
  }

  async deleteCommentById(id: number): Promise<void> {
    const comment = await this.findCommentById(id);
    if (!comment) {
      throw new NotFoundException(`comment with ID ${id} not found`);
    }
    await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }

  async getAllComments(): Promise<Comment[]> {
    const results =  await this.prisma.comment.findMany(({
      where: {

      },
      include: {
        user: true,
        service: true,
      },
    }));
    if (!results || results.length === 0) {
      return [];
    }
    return results;
  }

  async changeComments(id: number, updateComment: UpdateCommentDto) {
    const comment = await this.prisma.comment.update(
      {
        where: { id: id, },
        data:  { comment_text: updateComment.comment_text },
      });
    if (!comment) {
      throw new Error('comment not found');
    }
    return await comment;

  }
}