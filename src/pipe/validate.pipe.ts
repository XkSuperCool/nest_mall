import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

import { ErrorModel } from '../model/ResModel';

@Injectable()
export default class ValidatePipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      return new ErrorModel(40010, error.details[0].message);
    }
    return value;
  }
}
