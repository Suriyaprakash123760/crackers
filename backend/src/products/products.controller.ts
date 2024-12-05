import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}


    @Get('count')
    async getTotalProductCount() {
        const totalProducts = await this.productService.countProducts();
        return { totalProducts };
    }


    @Get()
    async findAll(@Query('price') price?: string) {
        const priceFilter = price ? price.split(',').map(Number) : undefined;
        const products = await this.productService.findAll(priceFilter);

        // Map products to include the totalPrice field
        return products.map(product => ({
            ...product.toObject(), // Convert Mongoose doc to plain JS object
            totalPrice: product.discountPrice || product.basePrice,
        }));
    }

    @Get('special')
    async findSpecialProducts(@Query('price') price?: string) {
        const priceFilter = price ? price.split(',').map(Number) : undefined;
        const specialProducts = await this.productService.findSpecialProducts(priceFilter);

        // Map special products to include the totalPrice field
        return specialProducts.map(product => ({
            ...product.toObject(), // Convert Mongoose doc to plain JS object
            totalPrice: product.discountPrice || product.basePrice,
        }));
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
      console.log('Update Product Request:', { id, product });
      return this.productService.updateById(id, product);
    }
    


    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteById(id);
    }
}
