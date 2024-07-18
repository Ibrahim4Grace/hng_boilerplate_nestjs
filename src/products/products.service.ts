import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    if (page < 1) {
      throw new BadRequestException('Page number must be a positive integer.');
    }

    if (limit < 1) {
      throw new BadRequestException('Limit must be a positive integer.');
    }

    const [result, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: result,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }
}
