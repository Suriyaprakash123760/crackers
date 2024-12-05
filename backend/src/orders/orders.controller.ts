import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from './orders.service';  // Fixed the import path
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  // Get a specific order by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  // Create a new order
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  // Update the status of an order
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string, 
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.updateStatus(id, updateOrderDto);  // Call updateStatus method
  }

  // Delete an order
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

// Get monthly income
@Get('analytics/monthly-income')
async getMonthlyIncome() {
  return this.orderService.getMonthlyIncome();
}

// Get today's order count
@Get('analytics/today-orders')
async getTodayOrderCount() {
  return this.orderService.getTodayOrderCount();
}

// Existing routes here...

  // Get monthly order count
  @Get('analytics/monthly-order-count')
  async getMonthlyOrderCount() {
    return this.orderService.getMonthlyOrderCount();
  }





  
}














