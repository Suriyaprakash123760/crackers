import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    phoneNumber: string; // New field for phone number

    @Prop({ required: false })
    address: string; // New field for address

    @Prop({ default: 'user', enum: ['user', 'admin'] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
