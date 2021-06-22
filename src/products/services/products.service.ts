import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {

  private counterId = 1
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem Ipsum - product service 1 ✨',
      price: 1111,
      image: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
      stock: 1,
    },
  ]

  findAll() {
    return this.products
  }

  findOne(id: number) {

    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found 😈`);
    }

    return product
  }

  create(payload: CreateProductDto) {
    console.log(payload)
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    }
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id)
    const index = this.products.findIndex((item) => item.id === id)

    this.products[index] = {
      ...product,
      ...payload,
    }

    return this.products[index]
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found 😈`)
    }

    this.products.splice(index, 1)
    return true
  }

}
