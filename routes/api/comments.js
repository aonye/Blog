import { Router } from 'express';
import Comment from '../../models/comment.js';
import x from './exports.js';
const router = Router();

router.get('/', async (req, res) => {
    const comment = await Comment.find({}).orFail(() => new Error('No Comments found'));
    return res.json(comment);
});

console.log(x);

router.post('/', x);



// exports.signup_post = [
//     body('first_name').trim().isLength({ min: 1, max: 20 }).withMessage('First name is too long').escape(),
//     body('last_name').trim().isLength({ min: 1, max: 20 }).withMessage('Last name is too long').escape(),
//     body('username').trim()
//         .isLength({ min: 1, max: 30 }).withMessage('Entry is too long.')
//         .isEmail().withMessage('Entry is not an email.')
//         .custom((username) => {
//             return User.findOne({ username }).then((productName) => {
//                 if (productName) {
//                     return Promise.reject('Username (email) is already taken.');
//                 }
//             });
//         })
//         .escape(),
//     body('password').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars'), //don't escape (mutates pw)
//     body('confirmpw').trim().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 chars')
//         .custom((confirmpw, { req }) => {
//             if (confirmpw !== req.body.password) {
//                 throw new Error('Passwords must match');
//             }
//             return true;
//         }),
//     body('membership').trim(),
//     body('admin_status').trim().isBoolean({ loose: true }),

//     (req, res, next) => {

//         const errors = validationResult(req);

//         let user = new User(
//             {
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 username: req.body.username,
//                 password: req.body.password,
//             });

//         user.membership_status = req.body.membership === process.env.SECRET ? true : false;
//         user.admin_status = req.body.admin_status === 'True' ? true : false;

//         if (!errors.isEmpty()) {
//             res.render('signup', { user, admin_result: req.body.admin_status, errors: errors.array() });
//             return;
//         }

//         bcrypt.hash(user.password, 5, (err, hashedPassword) => {
//             if (err) { return next(err) }
//             else { //store hashpw in db, save user
//                 user.password = hashedPassword;
//                 user.save(err => {
//                     if (err) { return next(err); }
//                     req.login(user, function (err) {
//                         if (err) { return next(err); }
//                         return res.redirect('/messageboard');
//                     });
//                 });
//             }
//         });
//     }
// ];

router.put('/:id', async (req, res) => {
    res.send('Edit current comment');
});

router.delete('/:id', async (req, res) => {
    res.send('Delete current comment');
});

export default router;