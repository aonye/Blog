import { Router } from 'express';
import {
    users_get,
    users_post,
    users_put,
    users_delete,
} from '../../controllers/api/users.js';

const userRouter = Router();

userRouter.get('/', users_get);

userRouter.post('/', users_post);

userRouter.put('/:id', users_put);

userRouter.delete('/:id', users_delete);

export default userRouter;