import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ReviewModel } from '../review/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, createProductDto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, createProductDto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category
          }
        },
        {
          $sort: {
            _id: 1
          }
        },
        {
          $limit: dto.limit
        },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'review'
          }
        },
        {
          $addFields: {
            reviewCount: { $size: '$review' },
            reviewAvg: { $avg: '$review.rating' }
          }
        }
      ])
      .exec() as Promise<
      (ProductModel & { review: ReviewModel[]; reviewCount: number; reviewAvg: number })[]
    >;
  }
}
