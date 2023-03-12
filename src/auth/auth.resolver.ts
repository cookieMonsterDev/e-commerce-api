import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.create(loginInput);
  }

  @Mutation(() => Auth)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.create(registerInput);
  }
}
