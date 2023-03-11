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

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  @UseGuards(AdminGuard)
  @Get('/')
  findMany(@Query() params: any) {
    return params;
  }

  @Get('/me')
  findMy(@UserId() userId: string) {
    return userId;
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOneById(@Param('id') orderId: string) {
    return orderId;
  }

  @Post('/')
  create(@Body() body: any) {
    return body;
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
