import { StatusCodes } from 'http-status-codes';

import { ApiException } from './api.exception';

class PathNotFoundException extends ApiException {
  constructor(method: string, path: string) {
    super(
      StatusCodes.NOT_FOUND,
      'path_not_found',
      `Can't find ${method.toUpperCase()} ${path} on this server.`
    );
  }
}

export { PathNotFoundException };