import {
    index_get
}
    from '../../controllers/APIController.js';
import posts from './posts.js';
import comments from './comments.js';
import users from './users.js';
import login from '../app/login.js'
import { Router } from 'express';

const router = Router();

router.get('/', index_get);

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

const routes = {
    index: router,
    posts,
    comments,
    users,
    login,
};

export default routes;