import { body, validationResult } from 'express-validator';
import Comment from '../../models/comment.js';
import Post from '../../models/post.js';
import User from '../../models/user.js';

export const post_comments_index_get = async (req, res) => {
    const post = await Post.findById(req.params.postId)
        .populate('comments')
    return post ? res.json(post.comments) : res.status(404).json({ error: 'Post not found' });
};

export const comment_get = async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);
    return comment ? res.json(comment) : res.status(404).json({ error: 'Comment not found' });
};

export const comment_post = [ //test this
    body('text').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),

    async (req, res, next) => {

        const errors = validationResult(req);

        //in real scenario, get user from cookies
        const mockAuthor = new User({
            username: 'test comment -- username',
            password: 'test comment -- password'
        });

        const comment = new Comment({
            author: mockAuthor,
            text: req.body.text,
            timestamp: new Date(),
        });

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const post = await Post.findById(req.params.postId)
            .orFail(() => new Error('Post not found'));

        comment.save((err) => { // save new comment to db
            if (err) { return next(err); }
            post.comments.push(comment); // add comment to post
            post.save((err) => { // update post in db
                if (err) { return next(err); }
                return res.status(200).json({ msg: 'Success. Comment saved to post' });
            });
        });
    }
];

export const comment_put = [ //test this
    body('text').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),

    async (req, res, next) => {

        const errors = validationResult(req);

        //validation check if the author id of comment matches the user id

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const comment = await Comment.findById(req.params.commentId);

        if (comment) {
            comment.text = req.body.text;
            comment.save((err) => {
                if (err) { return next(err); }
                return res.status(200).json({ msg: 'Success. Comment updated' });
            });
        } else {
            return res.status(404).json({ error: 'Comment not found' });
        }
    }
];

export const comment_delete = async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);
    const post = await Post.findById(req.params.postId).populate('comments');
    if (comment && post) {
        const index = post.comments.map((item) => item.id).indexOf(comment.id);
        post.comments = post.comments.slice(0, index).concat(post.comments.slice(index + 1));
        post.save((err) => {
            if (err) {
                return res.status(400).json({ error: 'Error saving post' });
            }
            return res.status(200).json({ msg: 'Comment deleted. Post updated' });
        });
    }
    else {
        return res.json('Comment, Post not found');
    }
};