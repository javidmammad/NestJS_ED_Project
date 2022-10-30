import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelVCategory {
  Courses,
  Services,
  Books,
  Products
}

class HhData {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

class TopPageAdvantage {
  @prop()
  title: string;

  @prop()
  description: string;
}

export interface TopPageModel extends Base, TimeStamps {}

export class TopPageModel {
  @prop({ enum: TopLevelVCategory })
  firstCategory: TopLevelVCategory;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  categories: string;

  @prop({ type: () => HhData })
  hh?: HhData;

  @prop({ type: () => [TopPageAdvantage] })
  advantages: Array<TopPageAdvantage>;

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: Array<string>;
}
