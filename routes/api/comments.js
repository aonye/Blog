import { Router } from 'express';
import Comment from '../../models/comment.js';

const router = Router();

router.get('/', async (req, res) => {
    const comment = await Comment.find({}).orFail(() => new Error('No Comments found'));
    return res.json(comment);
});

router.post('/', async (req, res) => {
    res.send('New commit submit');
});

router.put('/:id', async (req, res) => {
    res.send('Edit current comment');
});

router.delete('/:id', async (req, res) => {
    res.send('Delete current comment');
});

export default router;