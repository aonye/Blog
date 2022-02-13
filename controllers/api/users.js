import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';

/* USERS */
export const users_get = async (req, res) => {
    const user = await User.find({}).orFail(() => new Error('No Users found'));
    return res.json(user);
};

export const users_post = [
    body('username').trim()
        .isEmail().withMessage('Entry is not an email.')
        .isLength({ min: 1, max: 30 }).withMessage('Entry is too long.')
        .custom((username) => {
            return User.findOne({ username }).then((res) => { //check if name is already taken
                if (res) {
                    console.log('already taken')
                    return Promise.reject('Username (email) is already taken.');
                }
            });
        })
        .escape(),
    body('password').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars'), //don't escape (mutates pw)
    body('confirmpw').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars')
        .custom((confirmpw, { req }) => {
            if (confirmpw !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),

    async (req, res, next) => {

        const errors = validationResult(req);

        let user = new User(
            {
                username: req.body.username,
                password: req.body.password,
            });

        if (!errors.isEmpty()) {
            console.log(errors);
            //res.render('userpage', { user, errors: errors.array() });
            res.json({ errors: errors.array() });
            return;
        }

        bcrypt.hash(user.password, 5, (err, hashedPassword) => {
            if (err) { return next(err) }
            else { //store hashpw in db, save user
                user.password = hashedPassword;
                user.save(err => {
                    if (err) { return next(err); }
                    return res.redirect('/api/');
                });
            }
        });
    }
];

export const users_put = [
    body('username').trim()
        .isLength({ min: 1, max: 30 }).withMessage('Entry is too long.')
        .isEmail().withMessage('Entry is not an email.')
        .custom((username, { req }) => {
            return User.findById(req.params.id).then((user) => { // check if the name is unchanged
                if (user.username === username) {
                    console.log('same name')
                    return Promise.resolve();
                } else {
                    return User.findOne({ username }).then((res) => { //check if name is already taken
                        if (res) {
                            console.log('already taken')
                            return Promise.reject('Username (email) is already taken.');
                        }
                    });
                }
            });
        })
        .escape(),
    body('password').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars'), //don't escape (mutates pw)
    body('confirmpw').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars')
        .custom((confirmpw, { req }) => {
            if (confirmpw !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),

    async (req, res, next) => {

        const errors = validationResult(req);

        let user = new User(
            {
                username: req.body.username,
                password: req.body.password,
                _id: req.params.id,
            });

        if (!errors.isEmpty()) {
            // console.log(errors);
            //res.render('userpage', { user, errors: errors.array() });
            res.json({ errors: errors.array() });
            return;
        }

        //user.username = user.username + 'b';
        //console.log(user.username);

        const result = await User.findOne({ 'username': req.body.username });
        if (result) {
            throw new Error('User already exists');
        }
        bcrypt.hash(user.password, 5, (err, hashedPassword) => {
            if (err) { return next(err) }
            else { //store hashpw in db, save user
                user.password = hashedPassword;
                User.findByIdAndUpdate(req.params.id, user, {}, (err, result) => {
                    if (err) { return next(err); }
                    return res.redirect('/api');
                });
            }
        });
    }
];

export const users_delete = async (req, res, next) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/api')
    });
};