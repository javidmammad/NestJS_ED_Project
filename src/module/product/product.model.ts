import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base, TimeStamps {}

class ProductCharacteristic {
  @prop()
  name: string;

  @prop()
  value: string;
}

export class ProductModel {
  @prop()
  image: string;

  @prop()
  title: string;

  @prop()
  price: number;

  @prop()
  oldPrice: number;

  @prop()
  credit: number;

  @prop()
  calculatedRating: number;

  @prop()
  description: string;

  @prop()
  advantages: string;

  @prop()
  disadvantages: string;

  @prop({ type: () => [String] })
  categories: string[];

  @prop({ type: () => [String] })
  tags: string[];

  @prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}
