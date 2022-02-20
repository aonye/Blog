import { Router } from 'express';
import {
    posts_index_get,
    post_get,
    post_post,
    posts_put,
    posts_delete,
} from '../../controllers/api/posts.js';
import commentRouter from './comments.js';

const postRouter = Router();
postRouter.use('/:postId/comments', commentRouter);

postRouter.get('/', posts_index_get);

postRouter.get('/:postId', post_get);

postRouter.post('/', post_post);

postRouter.put('/:postId', async (req, res) => {
    res.send('Form submits to edit an existing post');
});

postRouter.delete('/:postId', posts_delete);

export default postRouter;