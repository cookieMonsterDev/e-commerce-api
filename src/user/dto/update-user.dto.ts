import { UserRoles } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  fistName: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  @Matches(RegExp(`^${Object.values(UserRoles).join('|')}$`), {
    message: 'there is no such role',
  })
  role: UserRoles;

  @IsOptional()
  @IsNumber()
  vendorId: number;
}
