import { Controller, Post, Body, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private svc: FeedbackService) {}

  @Post()
  async create(@Body() body: { userName?: string; text: string; rating?: number }) {
    if (!body?.text) {
      throw new Error('text is required');
    }
    return this.svc.create(body);
  }

  @Get()
  async list() {
    return this.svc.findAll();
  }

  @Get('analytics')
  async analytics() {
    return this.svc.analytics();
  }
}
