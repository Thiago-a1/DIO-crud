import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import bearerAuthenticationMiddleware from '../middlewares/bearer-authentication.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ForbiddenError('Usuario não informado!');
    }

    const jwtPayLoad = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = 'my_secret_key';

    const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);

    res.status(StatusCodes.OK).json({ token: jwt });
  } catch (error) {
    next(error);
  }
});

authorizationRoute.post('/token/validate', bearerAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK);
})

export default authorizationRoute;