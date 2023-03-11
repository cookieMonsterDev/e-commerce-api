import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  vendorId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
