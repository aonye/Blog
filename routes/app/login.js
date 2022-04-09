import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	res.json('login');
});

// router.post('/', async (req, res) => {
//     res.send('Form submit to create a new user');
// });

// router.put('/:id', async (req, res) => {
//     res.send('Form submits to edit a current user');
// });

// router.delete('/:id', async (req, res) => {
//     res.send('Delete account for current user');
// });

export default router;
