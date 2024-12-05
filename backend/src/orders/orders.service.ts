import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

  // Get all orders
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  // Get a specific order by ID
  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  // Update the status of an order by ID
  async updateStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { status: updateOrderDto.status },
      { new: true },
    ).exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  // Delete an order by ID
  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async getMonthlyIncome(): Promise<{ month: number; income: number }[]> {
    // Aggregate income by month
    const incomeData = await this.orderModel.aggregate([
      {
        $group: {
          _id: { $month: '$date' },
          totalIncome: { $sum: '$amount' },
        },
      },
      {
        $project: {
          month: '$_id',
          income: '$totalIncome',
          _id: 0,
        },
      },
    ]);

    // Create a full year array with zero income for missing months
    const fullYearIncome = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
    }));

    // Map existing data into the full year array
    incomeData.forEach(({ month, income }) => {
      fullYearIncome[month - 1].income = income;
    });

    return fullYearIncome;
  }

  // Get today's order count
  async getTodayOrderCount(): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const count = await this.orderModel
      .find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .countDocuments();
    return count;
  }


async getMonthlyCompletedOrders(): Promise<{ month: number; completedCount: number }[]> {
  // Aggregate completed orders by month
  const completedOrdersData = await this.orderModel.aggregate([
    {
      $match: { status: 'completed' }, // Filter for completed orders
    },
    {
      $group: {
        _id: { $month: '$date' }, // Group by month
        completedCount: { $sum: 1 }, // Count the orders
      },
    },
    {
      $project: {
        month: '$_id', // Rename _id to month
        completedCount: '$completedCount',
        _id: 0, // Remove _id field
      },
    },
  ]);

  // Create a full year array with zero completed orders for missing months
  const fullYearCompletedOrders = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    completedCount: 0,
  }));

  // Map existing data into the full year array
  completedOrdersData.forEach(({ month, completedCount }) => {
    fullYearCompletedOrders[month - 1].completedCount = completedCount;
  });

  return fullYearCompletedOrders;
}


async getMonthlyOrderCount(): Promise<{ month: number; orderCount: number }[]> {
  // Aggregate orders by month
  const monthlyOrderData = await this.orderModel.aggregate([
    {
      $group: {
        _id: { $month: '$date' }, // Group by month
        orderCount: { $sum: 1 },   // Count the orders
      },
    },
    {
      $project: {
        month: '$_id', // Rename _id to month
        orderCount: '$orderCount',
        _id: 0,        // Remove _id field
      },
    },
    {
      $sort: { month: 1 }, // Sort by month in ascending order
    },
  ]);

  // Create a full year array with zero orders for missing months
  const fullYearOrderCount = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    orderCount: 0,
  }));

  // Map existing data into the full year array
  monthlyOrderData.forEach(({ month, orderCount }) => {
    fullYearOrderCount[month - 1].orderCount = orderCount;
  });

  return fullYearOrderCount;
}

}
