import { Router } from 'express';
import UserController from '../controllers/user';

import * as filter from '../middleware/security';

let UserRouter = Router();

UserRouter.get('/', filter.adminFilter, UserController.list);
UserRouter.get('/:id', filter.adminFilter, UserController.get);
UserRouter.post('/', filter.adminFilter, UserController.post);
UserRouter.put('/:id', filter.adminFilter, UserController.put);
UserRouter.delete('/:id', filter.adminFilter, UserController.delete);

export default UserRouter;