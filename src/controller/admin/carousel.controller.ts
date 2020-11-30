import { Controller, Delete, Query, Post, Body } from '@nestjs/common';
import { CarouselService } from '../../service/carousel.service';
import { Types } from 'mongoose';
import { ErrorModel, SuccessModel } from '../../model/ResModel';
import { ICarousel } from '../../interface/carousel.interface';
import { carouseIdError, createCarouseError } from '../../model/errorInfo';

@Controller('/carousel')
export class Carousel {
  constructor(private readonly service: CarouselService) {}

  // 创建轮播图
  @Post('create')
  async assCarouse(@Body() body: ICarousel) {
    const result = await this.service.addCarousel(body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel(createCarouseError.status, createCarouseError.msg);
    }
  }

  // 删除轮播图
  @Delete('delete')
  async deleteCarouse(@Query('id') id) {
    id = Types.ObjectId(id);
    const result = await this.service.deleteCarouselById(id);
    if (result.ok) {
      return new SuccessModel('ok');
    } else {
      return new ErrorModel(carouseIdError.status, carouseIdError.msg);
    }
  }
}

