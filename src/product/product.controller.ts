import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  findMany(@Query() params: any) {
    console.log(params);
    return this.productService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: number, @Body() body: any) {
    return this.productService.updateOneById(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productService.deleteOneById(id);
  }
}
