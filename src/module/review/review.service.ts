import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel) private readonly model: ModelType<ReviewModel>) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.model.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.model.find({ productId: new Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string): Promise<DocumentType<any>> {
    return this.model.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}
