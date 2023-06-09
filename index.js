const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const dbConnect = require('./src/dbConnect');
const { signupUser } = require('./controllers/usersController');
const cookieParser = require('cookie-parser');
require('dotenv').config({
  path: 'config/.env',
});

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/views')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/user', require('./routes/user'));

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
