import { StatusCodes } from 'http-status-codes';

import { ApiException } from './api.exception';

class UnauthorizedException extends ApiException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'unauthorized', `Failed to authenticate.`);
  }
}

export { UnauthorizedException };