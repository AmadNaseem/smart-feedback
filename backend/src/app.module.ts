import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'toor',
      database: process.env.DATABASE_NAME || 'smart_feedback',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    FeedbackModule
  ]
})
export class AppModule {}
