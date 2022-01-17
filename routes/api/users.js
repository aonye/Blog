import { Router } from 'express';
import User from '../../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
    const user = await User.find({}).orFail(() => new Error('No Users found'));
    return res.json(user);
});

router.post('/', async (req, res) => {
    res.send('Form submit to create a new user');
});

router.put('/:id', async (req, res) => {
    res.send('Form submits to edit a current user');
});

router.delete('/:id', async (req, res) => {
    res.send('Delete account for current user');
});

export default router;