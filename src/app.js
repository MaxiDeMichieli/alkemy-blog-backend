const express = require('express');
const logger = require('morgan');
const postsRouter = require('./routes/posts');
const verifyBoom = require('./middlewares/verifyBoom');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = '3030';

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);

app.use(verifyBoom);
app.use(errorHandler);

module.exports = app;
