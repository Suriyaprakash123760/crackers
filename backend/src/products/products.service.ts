import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

// Method to count total products
async countProducts(): Promise<number> {
    return this.productModel.countDocuments();
}


    
    // Find all products with optional price filter
    async findAll(priceFilter?: number[]): Promise<Product[]> {
        let query = {};

        if (priceFilter) {
            query = {
                $or: priceFilter.map(price => ({
                    discountPrice: { $gte: price, $lte: price + 2000 }
                }))
            };
        }

        // Fetch products from DB
        const products = await this.productModel.find(query).sort({ discountPrice: 1 });

        // Return Mongoose documents directly (you can still add custom fields if needed)
        return products;
    }

    // Special method for fetching a specific set of products (e.g., promotions)
    async findSpecialProducts(priceFilter?: number[]): Promise<Product[]> {
        let query = {};

        if (priceFilter) {
            query = {
                $or: priceFilter.map(price => ({
                    discountPrice: { $gte: price, $lte: price + 2000 }
                }))
            };
        }

        // Fetch special products from DB
        const specialProducts = await this.productModel.find(query).sort({ discountPrice: 1 });

        // Return Mongoose documents directly (you can still add custom fields if needed)
        return specialProducts;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        try {
            return await createdProduct.save();
        } catch (error) {
            console.error('Error saving product:', error);
            throw error; // Rethrow error to return proper response
        }
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async updateById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        try {
          const updatedProduct = await this.productModel.findByIdAndUpdate(
            id,
            { $set: updateProductDto }, // Ensure only provided fields are updated
            { new: true, runValidators: true }
          );
          if (!updatedProduct) {
            throw new NotFoundException('Product not found');
          }
          return updatedProduct;
        } catch (error) {
          console.error('Error during product update:', error);
          throw error;
        }
      }
      
      

    async deleteById(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id);
    }
}
