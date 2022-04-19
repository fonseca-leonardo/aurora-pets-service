import errorMessages from '@constants/errorMessages';
import ServerError from '@shared/errors/ServerError';
import { NextFunction, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction) => {
  const { authData } = request;

  if (!authData) {
    throw new ServerError(errorMessages.NOT_ALLOWED, 401);
  }

  if (!authData.organizationId) {
    throw new ServerError(errorMessages.NOT_ALLOWED, 401);
  }

  return next();
};
