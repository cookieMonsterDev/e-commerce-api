import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignInInput {
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
}