import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsArray()
  cartitem: Array<{ name: string; price: number; quantity: number }>;

  @IsString()
  status: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;
}
