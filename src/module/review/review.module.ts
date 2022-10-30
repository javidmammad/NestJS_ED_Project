import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewController } from './review.controller';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review'
        }
      }
    ])
  ]
})
export class ReviewModule {}
