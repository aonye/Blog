import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from './models/user.js';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = passportLocal.Strategy;

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET,
		},
		async (jwtPayload, cb) => {
			// find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			return User.findById(jwtPayload.id)
				.then((user) => {
					return cb(null, user);
				})
				.catch((err) => {
					return cb(err);
				});
		},
	),
);

// passport.use(
// 	new LocalStrategy((username, password, done) => {
// 		User.findOne({ username }, (err, user) => {
// 			if (err) return done(err);
// 			if (!user)
// 				return done(null, false, {
// 					message: 'Incorrect Email or Password',
// 				});
// 			bcrypt.compare(password, user.password, (err, res) => {
// 				if (err) {
// 					return done(null, false, {
// 						message: 'Incorrect Email or Password2',
// 					});
// 				}
// 				return done(null, user, { message: 'Successfully logged in' });
// 			});
// 		});
// 	}),
// );
passport.use(
	new LocalStrategy(
		{
			username: 'email',
			password: 'password',
		},
		async function (email, password, cb) {
			console.log(email, password);
			return User.findOne({ email, password })
				.then((user) => {
					if (!user) {
						return cb(null, false, {
							message: 'Incorrect email or password.',
						});
					}
					return cb(null, user, {
						message: 'Logged In Successfully',
					});
				})
				.catch((err) => cb(err));
		},
	),
);

export default passport;
