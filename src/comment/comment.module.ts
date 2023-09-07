import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaClient } from "@prisma/client";

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, PrismaClient],
})

export class CommentModule {}