const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const UserDetails = require('./src/models/user');

const app = express();

passport.use(new LocalStrategy(
  ((username, password, done) => {
    UserDetails.findOne({
      username,
    }, (err, user) => {
      if (err) {
        console.log(err);
        return done(err);
      }

      if (!user) {
        console.log('fail');
        return done(null, false);
      }

      // eslint-disable-next-line eqeqeq
      if (user.password != password) {
        console.log('password not match');
        return done(null, false);
      }
      return done(null, user);
    });
  }),
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('css', express.static(path.join(__dirname, '/public/css/')));
app.use('js', express.static(path.join(__dirname, '/public/js/')));
app.use(session({ secret: 'dog' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserDetails.findById(id, (err, user) => {
    done(err, user);
  });
});


app.set('views', './views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/success', (req, res) => {
  res.send('success');
});

app.get('/fail', (req, res) => {
  res.send('fail');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/fail',
  failureFlash: false,
}));


app.listen(3000, () => {
  debug(`it is listening ${chalk.green('3000')}`);
});
