import { StatusCodes } from 'http-status-codes';

import { ApiException } from './api.exception';

class BadRequestException extends ApiException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, 'bad_request', `${message}.`);
  }
}

export { BadRequestException };