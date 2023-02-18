import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  surname: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
