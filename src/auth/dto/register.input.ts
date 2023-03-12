import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { UserRoles } from '@prisma/client';

registerEnumType(UserRoles, {
  name: 'UserRoles',
});

@InputType()
export class RegisterInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(64)
  fistName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(64)
  lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

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
  password: string;

  @Field(() => UserRoles, { defaultValue: 'CLIENT' })
  @IsOptional()
  @IsString()
  role: UserRoles;
}
