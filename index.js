const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
require('dotenv').config({
  path: 'config/.env',
});

app.use(express.static(path.join(__dirname, '/views')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
