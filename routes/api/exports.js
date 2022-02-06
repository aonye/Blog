import { body, validationResult } from 'express-validator';
import Comment from '../../models/comment.js';

function x(req, res, next) {
    console.log(req.body, 'adfadfafds');
    let comment = new Comment(
        {
            author: req.body.author,
            comment: req.body.comment,
            timestamp: new Date(),
        });

    comment.save(err => {
        if (err) { return next(err); }
        return res.redirect('/');
    });
}

export default x;