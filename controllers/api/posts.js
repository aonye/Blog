import { body, validationResult } from 'express-validator';
import User from '../../models/user.js';
import Post from '../../models/post.js';

export const posts_get = async (req, res) => {
    const post = await Post.find({}).orFail(() => new Error('No Posts found'));
    return res.json(post);
};

export const posts_post = [
    body('author').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),
    body('post').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('published').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('comments').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),

    async (req, res, next) => {

        const errors = validationResult(req);

        let tempAuth = await User.findOne({}).orFail(() => new Error('No author found for post'));

        let post = new Post(
            {
                author: tempAuth,
                title: req.body.title,
                timestamp: new Date(),
                post: req.body.post,
                published: req.body.published,
                comments: [],
            });

        if (!errors.isEmpty()) {
            //fix paths
            console.log(errors.array());
            return res.redirect('/api');
            //res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
        }

        post.save(err => {
            if (err) { return next(err); }
            return res.redirect('/api/posts');
            //fix this
        });
    }
];

export const posts_put = [];

export const posts_delete = [];