import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/products (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/products?page=1&limit=10').expect(200);

    expect(response.body).toMatchObject({
      data: expect.any(Array),
      totalItems: expect.any(Number),
      totalPages: expect.any(Number),
      currentPage: expect.any(String),
    });

    // Optionally, you can also add a check to ensure `data` array is not empty
    expect(response.body.data.length).toBeGreaterThan(0);

    // Ensure the structure of data items
    response.body.data.forEach((product: any) => {
      expect(product).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        category: expect.any(String),
      });
    });
  });
});
