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
import { OrderDto } from './order.dto';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

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
  findOneById(@Param('id') orderId: string) {
    return this.orderService.findOneById(orderId);
  }

  // Here need decorator to check if user has cart
  @Post('/')
  create(@UserId() userId: string,  @Body() body: OrderDto) {
    return this.orderService.create(userId, body);
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
