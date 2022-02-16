import { body, validationResult } from 'express-validator';
import Comment from '../../models/comment.js';
import User from '../../models/user.js';

export const comments_get = async (req, res) => {
    const comment = await Comment.find({}).orFail(() => new Error('No Comments found'));
    return res.json(comment);
};

export const comments_post = [ //test this
    //body('author').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('text').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        const mockAuthor = new User({
            username: 'test username',
            password: 'test password'
        });

        let comment = new Comment(
            {
                // author: req.body.author,
                author: mockAuthor,
                text: req.body.text,
                timestamp: new Date(),
            });

        if (!errors.isEmpty()) {
            //fix paths
            console.log(errors.array());
            return res.redirect('/api');
            //res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
        }

        comment.save(err => {
            if (err) { return next(err); }
            return res.status(200).json({ msg: 'success' });
            //fix this
        });
    }
];

export const comments_put = [ //test this
    //body('author').trim().isLength({ min: 1, max: 20 }).withMessage('Author is too long').escape(),
    body('text').trim().isLength({ min: 1, max: 200 }).withMessage('Comment is too long').escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        const mockAuthor = new User({
            username: 'test username',
            password: 'test password'
        });

        let comment = new Comment(
            {
                // author: req.body.author,
                author: mockAuthor,
                text: req.body.text,
                timestamp: new Date(),
            });

        if (!errors.isEmpty()) {
            //fix paths
            console.log(errors.array());
            return res.redirect('/api');
            //res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
        }

        comment.save(err => {
            if (err) { return next(err); }
            return res.status(200).json({ msg: 'success' });
            //fix this
        });
    }
];

export const comments_delete = async (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ msg: 'error' });
        }
        return res.status(200).json({ msg: 'deleted' });
    });
};