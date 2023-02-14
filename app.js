const express = require('express');
const app = express();
const errorHandler = require('./src/middlewares/error.middleware');
const indexRouter = require('./src/router/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use(errorHandler);

module.exports = app;
