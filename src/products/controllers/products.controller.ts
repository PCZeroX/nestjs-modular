import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from './../../common/parse-int.pipe';
import { ProductsService } from './../services/products.service';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products 🦄' })
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter 🔥`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
