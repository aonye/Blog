import {
    posts_get,
    posts_post,
    posts_put,
    posts_delete
} from '../../controllers/api/posts.js';
import { Router } from 'express';

const router = Router();

router.get('/', posts_get);

router.post('/', posts_post);

// let PostSchema = new Schema(
//     {
//         author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//         title: { type: String, required: true, maxlength: 30 },
//         timestamp: { type: Date, required: true },
//         post: { type: String, required: true, maxlength: 10000 },
//         published: { type: Boolean },
//         comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
//     }
// );

router.put('/:id', async (req, res) => {
    res.send('Form submits to edit an existing post');
});

router.delete('/:id', posts_delete);

export default router;