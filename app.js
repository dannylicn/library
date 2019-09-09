const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('css', express.static(path.join(__dirname, '/public/css/')));
app.use('js', express.static(path.join(__dirname, '/public/js/')));

app.set('views', './views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
});


app.listen(3000, () => {
  debug(`it is listening ${chalk.green('3000')}`);
});
