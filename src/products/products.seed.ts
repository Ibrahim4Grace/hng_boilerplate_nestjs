import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsSeed {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async run() {
    const products = [
      { name: 'Product 1', price: 10.0, category: 'Category A' },
      { name: 'Product 2', price: 20.0, category: 'Category B' },
      { name: 'Product 3', price: 30.0, category: 'Category A' },
    ];

    for (const product of products) {
      const newProduct = this.productRepository.create(product);
      await this.productRepository.save(newProduct);
    }
  }
}
