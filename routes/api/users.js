import {
    users_get,
    users_post,
    users_put,
    users_delete,
} from '../../controllers/api/users.js';
import { Router } from 'express';

const router = Router();

router.get('/', users_get);

router.post('/', users_post);

router.put('/:id', users_put);

router.delete('/:id', users_delete);

export default router;