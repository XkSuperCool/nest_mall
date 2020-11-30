import { CarouselType } from '../schema/carousel.schema';

export interface ICarousel {
  title: string
  url: string
  type: CarouselType
  sort?: number
}
