import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Carousel, CarouselDocument } from '../schema/carousel.schema';
import { ICarousel } from '../interface/carousel.interface';

@Injectable()
export class CarouselService {
  constructor(@InjectModel(Carousel.name) private readonly module: Model<CarouselDocument>) {}

  addCarousel(data: ICarousel) {
    return new this.module(data).save();
  }

  deleteCarouselById(id: Schema.Types.ObjectId) {
    return this.module.deleteOne({ _id: id });
  }
}
