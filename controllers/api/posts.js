import { body, validationResult } from 'express-validator';
import User from '../../models/user.js';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';
import comment from '../../models/comment.js';

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

export const posts_index_get = async (req, res) => { // only return true
    const post = await Post.find({ published: 'true' });
    return post === null
        ? res.status(400).json({ error: 'Cannot find posts' })
        : post.length === 0
            ? res.status(404).json({ error: 'No posts found' })
            : res.json(post);
};

export const post_get = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    return post ? res.json(post) : res.status(404).json({ error: 'Post not found' });
};

export const post_post = [
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),
    body('post').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('published').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),

    async (req, res) => {

        const errors = validationResult(req);

        const post = new Post({
            author: authorSample,
            title: req.body.title,
            timestamp: new Date(),
            post: req.body.post,
            published: req.body.published === 'true' ? true : false,
            comments: commentSample,
        });

        if (!errors.isEmpty()) {
            return res.status(404).json(errors.array());
        }

        commentSample.save();
        post.save((err) => {
            if (err) { return res.status(400).json({ error: 'Error saving post' }); }
            return res.status(200).json({ msg: 'Post successfully saved' });
        });
    }
];

export const posts_put = [];

export const posts_delete = async (req, res, next) => {
    // Post.findByIdAndDelete(req.params.id, (err) => {
    //     if (err) {
    //         return err;
    //     };
    //     return res.status(200);
    // })
    const post = await Post.findByIdAndDelete(req.params.postId);
    return post ? res.json('successfully deleted') : res.status(400).json('sdffd');
    while (post.comments.length > 0) {
        console.log(post.comments.length);
        const comment = post.comments.shift();
        Comment.findByIdAndDelete(comment.id, (err, res) => {
            if (err) { return next(err); }
        });
    }
    console.log('out here');
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