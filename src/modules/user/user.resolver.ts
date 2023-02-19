import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TokenGuard } from '../auth/common/guards/token.guard';
import { UseGuards } from '@nestjs/common';
import { OnlySameUserByIdAllowed } from '../auth/common/guards/sameByIdUser.guard';
import { UseInterceptors } from '@nestjs/common/decorators';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}


  @Query(() => [User])
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(TokenGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Query(() => User)
  findOne(@Args('userId') userId: number) {
    return this.userService.findOne(userId);
  }
}
