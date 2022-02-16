import { body, validationResult } from 'express-validator';
import User from '../../models/user.js';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';
import post from '../../models/post.js';

// TEST VARS, MODELS, COMMENTS

const authorSample = new User({
    username: 'test username',
    password: 'test password'
});

const commentAuthor = new User({
    username: 'friend1',
    password: 'friendpw'
});

const commentSample = new Comment({
    author: commentAuthor,
    text: 'lopre ipsum',
    timestamp: new Date(),
});

export const posts_get = async (req, res) => {
    const post = await Post.find({}).orFail(() => new Error('No Posts found'));
    return res.json(post);
};

export const posts_post = [
    //body('author').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),
    body('post').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('published').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    //body('comments').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),

    async (req, res, next) => {

        const errors = validationResult(req);

        let post = new Post(
            {
                author: authorSample,
                title: req.body.title,
                timestamp: new Date(),
                post: req.body.post,
                published: req.body.published === 'true' ? true : false,
                comments: commentSample,
            });

        if (!errors.isEmpty()) {
            //fix paths
            console.log(errors.array());
            return res.redirect('/api');
            //res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
        }

        post.save(err => {
            if (err) { return next(err); }
            return res.status(200).json('Successfully posted');
            //fix this
        });
    }
];

export const posts_put = [];

export const posts_delete = async (req, res) => {
    // Post.findByIdAndDelete(req.params.id, (err) => {
    //     if (err) {
    //         return err;
    //     };
    //     return res.status(200);
    // })
    Post.findById(req.params.id)
        .populate({
            path: 'comments',
        })
        .exec();
    console.log(post);
    //find all the comments associated with the post and delete them
    return res.json(post);
    // Comment.findByIdAndRemove(req.params.id, (err) => {
    //     if (err) {
    //         return res.status(500).json({ msg: 'error' });
    //     }
    //     return res.status(200).json({ msg: 'deleted' });
    // });
    // const post = await Post.find({}).orFail(() => new Error('No Posts found'));
    // return res.json(post);
};