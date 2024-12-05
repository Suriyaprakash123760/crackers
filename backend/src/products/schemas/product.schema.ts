import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
    SPARKLERS = 'sparklers',
    FLOWER_POST = 'flower post',
    GROUND_CHAKKERS = 'ground chakkers',
    NAVEL_FIREWORKS = 'navel fireworks',
    ONE_SOUND_CRACKERS = 'one sound crackers',
    BIJILI = 'bijili',
    BOMBS = 'bombs',
    REFFORT = 'reffort',
    MAGIC_CRACKERS = 'magic crackers',
    ROKERS = 'rokers',
    SMOKE = 'smoke',
    PAPER = 'paper',
    FANCY_FIRE_WORKS = 'fancy fire works',
    PIPE_SKY_SHOT = 'pipe sky shot',
    MULTICOLOUR_SHOTS = 'multicolour shots',
    GIFT_BOXES = 'gift boxes',
    ROLL_COPS = 'roll cops',
    NEW_YEAR_SPECIALS = 'new year specials',
    KidColletions='kidcolletions'
}

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    basePrice: number;

    @Prop({ required: true })
    discountPrice: number;

    @Prop({ required: true })
    discountOffer: string;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    image: string;

    @Prop({ type: [String], enum: Category, required: true })
    category: Category[];

    @Prop()
    description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
