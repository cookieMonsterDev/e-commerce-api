import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string) {
    const cart = await this.prisma.cart.create({
      data: { userId },
    });

    return cart;
  }

  async findOneById(cartId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: true,
      },
    });

    return cart
  }
}
