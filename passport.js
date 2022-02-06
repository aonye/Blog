
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from './models/user.js';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect Email or Password' });
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(null, false, { message: 'Incorrect Email or Password2' });
        }
        return done(null, user, { message: 'Successfully logged in' });
      });
    });
  })
);

export default passport;

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// },
//   function (email, password, cb) {
//     //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

//     return User.findOne({ email, password })
//       .then(user => {
//         if (!user) {
//           return cb(null, false, { message: 'Incorrect email or password.' });
//         }
//         return cb(null, user, { message: 'Logged In Successfully' });
//       })
//       .catch(err => cb(err));
//   }
// ));