import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
// import { ContactModule } from './contact/contact.module'; // Single import

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), // Loads environment variables from .env

    MongooseModule.forRoot(process.env.MONGODB_URI), // MongoDB URI from .env file
    AuthModule,
    ProductsModule,
    OrdersModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
