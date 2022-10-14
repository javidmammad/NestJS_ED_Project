import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';

@Module({
  controllers: [ReviewController],
  providers: []
})
export class ReviewModule {}
