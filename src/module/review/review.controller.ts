import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { UserEmail } from 'src/decorators/email.decorator';
import { JWTAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deletedModel = this.reviewService.delete(id);
    if (!deletedModel) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('product/:productId')
  async get(
    @Param('productId') productId: string,
    @UserEmail() email: string
  ): Promise<DocumentType<ReviewModel>[]> {
    return await this.reviewService.findByProductId(productId);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('product/:productId')
  async deleteAllReviewsByProductId(@Param('id') id: string): Promise<void> {
    return this.reviewService.deleteByProductId(id);
  }
}
