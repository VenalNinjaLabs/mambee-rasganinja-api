import {
    Router
} from 'express';
import RasgadaController from '../controllers/rasgada';

import * as filter from '../middleware/security';

let RasgadaRouter = Router();

RasgadaRouter.get('/', RasgadaController.list);
RasgadaRouter.get('/:id', RasgadaController.get);
RasgadaRouter.post('/', RasgadaController.post);
RasgadaRouter.put('/:id/up', RasgadaController.voteUp);
RasgadaRouter.put('/:id/down', RasgadaController.voteDown);
RasgadaRouter.delete('/:id', filter.adminFilter, RasgadaController.delete);

export default RasgadaRouter;