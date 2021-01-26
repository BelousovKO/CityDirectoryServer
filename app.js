const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const usersRotues = require('./routes/users');
const commentsRotues = require('./routes/comments');
const cityRoutes = require('./routes/city');

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/users', usersRotues);
app.use('/comments', commentsRotues);
app.use('/city', cityRoutes);

// Error handling
app.use((err, req, res, next) => {
  const { message } = err;
  res.json({ status: 'ERROR', message });
});

app.listen(8080);
