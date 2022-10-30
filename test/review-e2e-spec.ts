import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/module/root/app.module';
import { CreateReviewDto } from 'src/module/review/dto/create-review.dto';
import { Types } from 'mongoose';
import * as request from 'supertest';

const TEST_DTO: CreateReviewDto = {
  name: 'test',
  title: 'testTitle',
  description: 'test description',
  rating: 5,
  productId: new Types.ObjectId().toHexString()
};
describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let createdID: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async (): Promise<void | undefined> =>
    request(app.getHttpServer())
      .post('/review/create')
      .send(TEST_DTO)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdID = body._id;
        expect(createdID).toBeDefined();
      }));
});
