import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  async findOneById(productId: number) {
    const product = await this.prisma.product.findFirst({
      where: { id: productId },
    });

    return product;
  }

  async create(body: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: { ...body },
    });

    return product;
  }

  async updateOneById(productId: number, body: any) {
    const product = await this.prisma.product.update({
      where: { id: productId },
      data: { ...body },
    });

    return product;
  }

  async deleteOneById(productId: number) {
    const product = await this.prisma.product.delete({
      where: { id: productId },
    });

    return { message: `User ${product.id} has been deleted` };
  }
}
