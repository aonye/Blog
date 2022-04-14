/* eslint-disable camelcase */
import { Router } from 'express';
import {
	posts_index_get,
	post_get,
	post_post,
	post_put,
	post_delete,
} from '../../controllers/api/posts.js';
import commentRouter from './comments.js';

const postRouter = Router();
postRouter.use('/:postId/comments', commentRouter);

postRouter.get('/', posts_index_get);

postRouter.get('/:postId', post_get);

postRouter.post('/', post_post);

postRouter.put('/:postId', post_put);

postRouter.delete('/:postId', post_delete);

export default postRouter;
