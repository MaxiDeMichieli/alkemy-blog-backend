const express = require('express');
const logger = require('morgan');

const postsRouter = require('./routes/posts');

const app = express();
const PORT = '3030';

app.listen(PORT);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);

module.exports = app;
