const express = require('express');
const dotenv = require('dotenv');
const boom = require('@hapi/boom');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middlewares/errorHandler');
const dbConectionTest = require('./utils/dbConectionTest');
const loggerMiddleware = require('./middlewares/logger');

dotenv.config();

const app = express();

dbConectionTest();

const PORT = process.env.PORT || '3030';

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);
app.use('*', (req, res, next) => next(boom.notFound()));

app.use(errorHandler);

module.exports = app;
