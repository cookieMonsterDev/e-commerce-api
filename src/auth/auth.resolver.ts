import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto';
import { Auth } from './entities/auth.entitiy';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Auth)
  login(@Args('loginInput') _loginInput: LoginInput, @Context() context: any) {
    return this.authService.login(context.req.user);
  }

  @Mutation(() => Auth)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
