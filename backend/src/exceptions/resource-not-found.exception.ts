import { StatusCodes } from 'http-status-codes';

import { ApiException } from './api.exception';

class ResourceNotFoundException extends ApiException {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, 'resource_not_found', `${message}.`);
  }
}

export { ResourceNotFoundException };