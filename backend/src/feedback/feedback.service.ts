import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private repo: Repository<Feedback>
  ) {}

  async create(payload: { userName?: string; text: string; rating?: number; }) {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://ml:8000/analyze';
    let sentiment = 'neutral';
    try {
      const res = await axios.post(mlUrl, { text: payload.text }, { timeout: 5000 });
      sentiment = res.data.sentiment || 'neutral';
    } catch (err: any) {
      console.warn('ML service error, defaulting to neutral', err?.message || err);
      sentiment = 'neutral';
    }

    const fb = this.repo.create({
      userName: payload.userName,
      text: payload.text,
      rating: payload.rating,
      sentiment
    });
    return this.repo.save(fb);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async analytics() {
    const total = await this.repo.count();
    const positive = await this.repo.count({ where: { sentiment: 'positive' }});
    const negative = await this.repo.count({ where: { sentiment: 'negative' }});
    const neutral = await this.repo.count({ where: { sentiment: 'neutral' }});
    return { total, positive, negative, neutral };
  }
}
