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
import { AdminGuard, JwtAuthGuard } from '../auth/guards';
import { UserId } from './decorators/userId.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @UseGuards(AdminGuard)
  @Get('/')
  findMany(@Query() params: any) {
    return this.userServices.findMany();
  }

  @Get('/me')
  findMe(@UserId() id: string) {
    return this.userServices.findOneById(id);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userServices.findOneById(id);
  }

  @Put('/me')
  updateMe(@UserId() id: string, @Body() body: UpdateUserDto) {
    return this.userServices.updateOneById(id, body);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateOneById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServices.updateOneById(id, body);
  }

  @Delete('/me')
  deleteMe(@UserId() id: string) {
    return this.userServices.deleteOneById(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.userServices.deleteOneById(id);
  }
}
