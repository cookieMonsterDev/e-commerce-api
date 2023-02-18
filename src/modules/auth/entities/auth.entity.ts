import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
