import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarouselDocument = Document & Carousel;

/**
 * 1: PC
 * 2: Mobile
 * 3: 小程序
 */
export  type CarouselType = 1 | 2 | 3;

@Schema()
export class Carousel {
  @Prop({
    required: true
  })
  title: string;

  @Prop({
    required: true
  })
  url: string

  @Prop({
    required: true
  })
  type: CarouselType

  @Prop({
    default: 0
  })
  sort: number

  @Prop({
    default: Date.now()
  })
  create_time: number
}

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
