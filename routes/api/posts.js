import {
    posts_get
} from '../../controllers/APIController.js';
import { Router } from 'express';

const router = Router();

router.get('/', posts_get);

router.post('/', async (req, res) => {
    res.send('Form submits for a new post');
});

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

router.delete('/:id', async (req, res) => {
    res.send('Delete a specific post');
});

export default router;