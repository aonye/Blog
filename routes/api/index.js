/* eslint-disable camelcase */
import { Router } from 'express';
import passport from '../../passport.js';
import { index_get } from '../../controllers/api/index.js';
import postRouter from './posts.js';
import userRouter from './users.js';
import loginRouter from './login.js';

const APIRouter = Router();

APIRouter.use(
	'/users',
	passport.authenticate('jwt', { session: false }),
	userRouter,
);

// Route level auth
APIRouter.use('/posts', postRouter);
APIRouter.use('/login', loginRouter);

APIRouter.get('/', index_get);

export default APIRouter;

// app.post('/api/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//       if(err) {
//         res.sendStatus(403);
//       } else {
//         res.json({
//           message: 'Post created...',
//           authData
//         });
//       }
//     });
//   });

//   app.post('/api/login', (req, res) => {
//     // Mock user
//     const user = {
//       id: 1,
//       username: 'brad',
//       email: 'brad@gmail.com'
//     }

//     jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
//       res.json({
//         token
//       });
//     });
//   });

//   // FORMAT OF TOKEN
//   // Authorization: Bearer <access_token>

//   // Verify Token
//   function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//       // Split at the space
//       const bearer = bearerHeader.split(' ');
//       // Get token from array
//       const bearerToken = bearer[1];
//       // Set the token
//       req.token = bearerToken;
//       // Next middleware
//       next();
//     } else {
//       // Forbidden
//       res.sendStatus(403);
//     }

//   }
