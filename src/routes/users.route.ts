import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{
    userName: 'Thiago'
  }];

  res.status(StatusCodes.OK).send({ users });
});

usersRoute.get('/users/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;

  res.status(StatusCodes.OK).send({ id });
});

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  res.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put('users/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;

  res.status(StatusCodes.OK).send({ id });
});

usersRoute.delete('users/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;

  res.status(StatusCodes.OK);
});

export default usersRoute;