const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const boom = require('@hapi/boom');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const verifyBoom = require('./middlewares/verifyBoom');
const errorHandler = require('./middlewares/errorHandler');
const dbConectionTest = require('./utils/dbConectionTest');

dotenv.config();

const app = express();

dbConectionTest();

const PORT = process.env.PORT || '3030';

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);
app.use('*', (req, res, next) => next(boom.notFound()));

app.use(verifyBoom);
app.use(errorHandler);

module.exports = app;
