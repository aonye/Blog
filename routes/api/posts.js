import { Router } from 'express';
import Post from '../../models/post.js';

const router = Router();

router.get('/', async (req, res) => {
    const post = await Post.find({}).orFail(() => new Error('No Posts found'));
    return res.json(post);
});

router.post('/', async (req, res) => {
    res.send('Form submits for a new post');
});

router.put('/:id', async (req, res) => {
    res.send('Form submits to edit an existing post');
});

router.delete('/:id', async (req, res) => {
    res.send('Delete a specific post');
});

export default router;