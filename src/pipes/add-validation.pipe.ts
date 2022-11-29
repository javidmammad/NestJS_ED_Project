import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ID_VALIDATION_ERROR } from './add-validation.constants';

Injectable();
export class IdValidationPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return id;
    }

    if (!isValidObjectId(id)) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }

    return id;
  }
}
