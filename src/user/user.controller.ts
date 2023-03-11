import {
  Controller,
  Delete,
  Get,
  Put,
  UseGuards,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get('/')
  findMany(@Query() params: any) {
    console.log(params);
    return this.userServices.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userServices.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userServices.updateOneById(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.userServices.deleteOneById(id);
  }
}
