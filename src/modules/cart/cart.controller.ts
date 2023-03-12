import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, JwtAuthGuard } from '../auth/guards';
import { UserId } from '../user/decorators/userId.decorator';
import { CartService } from './cart.service';

@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AdminGuard)
  @Get('/')
  findMany(@Query() params: any) {
    return params;
  }

  @Get('/me')
  findMy(@UserId() userId: string) {
    return userId;
  }

  // @UseGuards(AdminGuard)
  @Get(':id')
  findOneById(@Param('id') cartId: string) {
    return this.cartService.findOneById(cartId);
  }

  @Post('/')
  create(@UserId() userId: string) {
    return this.cartService.create(userId);
  }

  @Put('me/:id')
  updateMyById(@UserId() userId: string, @Param('id') orderId: string) {
    return [userId, orderId];
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateOneById(@Param('id') orderId: string) {
    return orderId;
  }

  @Delete('me/id')
  deleteMeById(@UserId() userId: string, @Param('id') orderId: string) {
    return [userId, orderId];
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteOneById(@Param('id') orderId: string) {
    return orderId;
  }
}
