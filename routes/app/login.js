import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../../passport.js';
import 'dotenv/config';

const router = express.Router();

router.get('/', (req, res) => {
	res.json('Test Login');
});

/* POST login. */
router.post('/', (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user: user,
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err);
			}
			const userInfo = {
				id: user._id.toString(),
			};
			const token = jwt.sign(userInfo, process.env.SECRET, {
				expiresIn: '1d',
			});
			return res.json({ token });
		});
	})(req, res);
});

export default router;
