export enum TopLevelVCategory {
  Courses,
  Services,
  Books,
  Products
}

export class TopPageModel {
  firstCategory: TopLevelVCategory;
  secondCategory: string;
  title: string;
  categories: string;
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages: Array<{
    title: string;
    description: string;
  }>;
  seoText: string;
  tags: Array<string>;
  tagsTitle: string;
}
