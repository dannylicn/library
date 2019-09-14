const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'passowrd',
    },
    (username, password, done) => {
      console.log(username);
      console.log(password);
      return done(null, { username });
      //     User.findOne({ username: username }, function (err, user) {
      //         if (err) { return done(err); }
      //         if (!user) {
      //             return done(null, false, { message: 'Incorrect username.' });
      //         }
      //         if (!user.validPassword(password)) {
      //             return done(null, false, { message: 'Incorrect password.' });
      //         }
      //         return done(null, user);
      //     });
    },
  ));
};
