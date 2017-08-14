import { Router } from 'express';
import AuthController from '../controllers/auth';

import * as middleware from '../middleware';

let AuthRouter = Router();

AuthRouter.post('/', AuthController.auth);

export default AuthRouter;