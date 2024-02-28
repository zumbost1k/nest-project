import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  nessages;
  constructor(responce) {
    super(responce, HttpStatus.BAD_REQUEST);
    this.message = responce;
  }
}
