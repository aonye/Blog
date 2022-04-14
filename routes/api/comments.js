/* eslint-disable camelcase */
import { Router } from 'express';
import {
	post_comments_index_get,
	comment_get,
	comment_post,
	comment_put,
	comment_delete,
} from '../../controllers/api/comments.js';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', post_comments_index_get);
// get all comments for a specific post

commentRouter.get('/:commentId', comment_get);
// get specific comment

commentRouter.post('/', comment_post);

commentRouter.put('/:commentId', comment_put);

commentRouter.delete('/:commentId', comment_delete);

// // router.post('/', [
// //     body('author').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
// //     body('comment').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),

// //     (req, res, next) => {

// //         const errors = validationResult(req);

// //         let comment = new Comment(
// //             {
// //                 author: req.body.author,
// //                 comment: req.body.comment,
// //                 timestamp: new Date(),
// //             });

// //         if (!errors.isEmpty()) {
// //             //fix paths
// //             console.log(errors.array());
// //             return res.redirect('/api');
// //             //res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
// //         }

// //         comment.save(err => {
// //             if (err) { return next(err); }
// //             return res.redirect('/api/comments');
// //             //fix this
// //         });
// //     }
// // ]);

// // exports.signup_post = [
// //     body('first_name').trim().isLength({ min: 1, max: 20 }).withMessage('First name is too long').escape(),
// //     body('last_name').trim().isLength({ min: 1, max: 20 }).withMessage('Last name is too long').escape(),
// //     body('username').trim()
// //         .isLength({ min: 1, max: 30 }).withMessage('Entry is too long.')
// //         .isEmail().withMessage('Entry is not an email.')
// //         .custom((username) => {
// //             return User.findOne({ username }).then((productName) => {
// //                 if (productName) {
// //                     return Promise.reject('Username (email) is already taken.');
// //                 }
// //             });
// //         })
// //         .escape(),
// //     body('password').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars'), //don't escape (mutates pw)
// //     body('confirmpw').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars')
// //         .custom((confirmpw, { req }) => {
// //             if (confirmpw !== req.body.password) {
// //                 throw new Error('Passwords must match');
// //             }
// //             return true;
// //         }),
// //     body('membership').trim(),
// //     body('admin_status').trim().isBoolean({ loose: true }),

// //     (req, res, next) => {

// //         const errors = validationResult(req);

// //         let user = new User(
// //             {
// //                 first_name: req.body.first_name,
// //                 last_name: req.body.last_name,
// //                 username: req.body.username,
// //                 password: req.body.password,
// //             });

// //         user.membership_status = req.body.membership === process.env.SECRET ? true : false;
// //         user.admin_status = req.body.admin_status === 'True' ? true : false;

// //         if (!errors.isEmpty()) {
// //             res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
// //             return;
// //         }

// //         bcrypt.hash(user.password, 5, (err, hashedPassword) => {
// //             if (err) { return next(err) }
// //             else { //store hashpw in db, save user
// //                 user.password = hashedPassword;
// //                 user.save(err => {
// //                     if (err) { return next(err); }
// //                     req.login(user, function (err) {
// //                         if (err) { return next(err); }
// //                         return res.redirect('/messageboard');
// //                     });
// //                 });
// //             }
// //         });
// //     }
// // ];

export default commentRouter;
