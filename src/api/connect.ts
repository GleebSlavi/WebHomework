import { Application, Router } from 'express';
import { usersController } from './users/user-controller';
import { projectsController } from './projects/project-controlller';
import { ticketsController } from './tickets/ticket-controller';

const router = Router();

export const connectAPI = (app: Application, path: string): void => {
    router.use('/users', usersController);
    router.use('/projects', projectsController);
    router.use('/tickets', ticketsController);

    app.use(path, router);
}