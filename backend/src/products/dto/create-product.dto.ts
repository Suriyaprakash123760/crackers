import { Category } from '../schemas/product.schema';
import { IsString, IsNumber, IsArray, IsEnum, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    company: string;

    @IsNumber()
    basePrice: number;

    @IsNumber()
    discountPrice: number;

    @IsString()
    discountOffer: string;

    @IsNumber()
    stock: number;

    @IsString()
    image: string;

    @IsArray()
    @IsEnum(Category, { each: true })
    category: Category[];

    @IsOptional()
    @IsString()
    description?: string;
}
