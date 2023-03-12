import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UserRoles } from '@prisma/client';

registerEnumType(UserRoles, {
  name: 'UserRoles',
});

@ObjectType()
export class User {
  @Field(() => String)
  id;

  @Field(() => String, { nullable: true })
  fistName;

  @Field(() => String, { nullable: true })
  lastName;

  @Field(() => String)
  email;

  @Field(() => UserRoles)
  role;

  @Field(() => Date)
  createdAt;

  @Field(() => Date)
  updatedAt;
}
