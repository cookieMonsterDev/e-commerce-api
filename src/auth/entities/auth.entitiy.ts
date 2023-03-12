import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => User)
  user;

  @Field(() => String)
  token;
}
