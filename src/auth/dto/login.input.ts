import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/(?=.*?[A-Z])/, {
    message: 'password must have at least 1 upper case letter',
  })
  @Matches(/(?=.*?[a-z])/, {
    message: 'password must have at least 1 lower case letter',
  })
  @Matches(/(?=.*?[0-9])/, {
    message: 'password must have at least 1 number',
  })
  @Matches(/(?=.*?[#?!@$%^_&*-])/, {
    message: 'password must have at least 1 special character',
  })
  @Matches(/^\S*$/, {
    message: 'password must have no spaces',
  })
  password;
}
