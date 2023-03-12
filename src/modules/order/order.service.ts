import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, body: OrderDto) {
    const { productId, amount } = body;

    const cartId = await this.receiveCartId(userId);

    const totalPrice = await this.calculateTotalPrice(body);

    const order = await this.prisma.order.create({
      data: { cartId, productId, amount, totalPrice },
    });

    return order;
  }

  async findOneById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    return order;
  }

  async updateOneById(orderId: string, body: OrderDto) {
    const { productId, amount } = body;

    const totalPrice = await this.calculateTotalPrice(body);

    const order = await this.prisma.order.update({
      where: {id: orderId },
      data: { productId, amount, totalPrice },
    });

    return order
  }

  async updateMe(userId: string, body: OrderDto) {
    const { productId, amount } = body;

    const cartId = await this.receiveCartId(userId);

    const totalPrice = await this.calculateTotalPrice(body);


  }

  private async receiveCartId(userId: string) {
    const userCart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (userCart) return userCart.id;

    const newCart = await this.prisma.cart.create({
      data: { userId },
    });

    return newCart.id;
  }

  private async calculateTotalPrice(orderDto: OrderDto): Promise<number> {
    const { price, discountPercentage } = await this.prisma.product.findUnique({
      where: { id: orderDto.productId },
    });

    const priceWithDiscount = discountPercentage
      ? (price * discountPercentage) / 100
      : 0;
    const totalPrice = (price - priceWithDiscount) * orderDto.amount;

    return totalPrice;
  }
}
