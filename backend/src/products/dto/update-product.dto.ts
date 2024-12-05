import { IsOptional, IsString, IsNumber, IsArray, IsEnum } from 'class-validator';
import { Category } from '../schemas/product.schema';

export class UpdateProductDto {
   @IsOptional()
   @IsString()
   readonly name?: string;

   @IsOptional()
   @IsString()
   readonly company?: string;

   @IsOptional()
   @IsNumber()
   readonly basePrice?: number;

   @IsOptional()
   @IsNumber()
   readonly discountPrice?: number;

   @IsOptional()
   @IsString()
   readonly discountOffer?: string;

   @IsOptional()
   @IsNumber()
   readonly stock?: number;

   @IsOptional()
   @IsString()
   readonly image?: string;

   @IsOptional()
   @IsArray()
   @IsEnum(Category, { each: true })
   readonly category?: Category[];

   @IsOptional()
   @IsString()
   readonly description?: string;
}


