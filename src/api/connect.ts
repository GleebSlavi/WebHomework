import { Application, Router } from 'express';
import { usersController } from './users/user-controller';

const router = Router();

export const connectAPI = (app: Application, path: string): void => {
    router.use('/users', usersController);

    app.use(path, router);
}