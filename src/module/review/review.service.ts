import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { isValidObjectId, Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel) private readonly model: ModelType<ReviewModel>) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return await this.model.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    const isValid = isValidObjectId(productId);
    if (!isValid) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.model
      .find({ productId: new Types.ObjectId(productId) })
      .exec()
      .catch(() => {
        throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
      });
  }

  async deleteByProductId(productId: string): Promise<DocumentType<any>> {
    return await this.model.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}
