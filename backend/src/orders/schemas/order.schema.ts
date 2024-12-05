import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cartitem: Array<{ name: string; price: number; quantity: number }>;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
