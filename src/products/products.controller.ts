import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.findAll(page, limit);
  }
}
