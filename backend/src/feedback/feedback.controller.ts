import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return this.svc.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics')
  async analytics() {
    return this.svc.analytics();
  }
}
