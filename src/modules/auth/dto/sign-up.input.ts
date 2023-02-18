import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class SignUpInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;
}
