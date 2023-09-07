import { Injectable } from '@nestjs/common';
import { Request, Response } from "express";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHeader():string {
    return 'Hello World!';
  }

  public async renderHeader(request: Request, response: Response) {
    response.render('partials/header', { header: 'My Website' });
  }
}
