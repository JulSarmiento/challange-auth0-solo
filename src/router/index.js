const express = require('express');
const httpStatus = require('http-status');
const router = express.Router();
const auth = require('../../utils/auth.config');
const authRoute = require('./auth/index');

router.get('/health', (_req, res) => {
  res.status(httpStatus.OK).json({
    status: 'OK',
    message: 'Server is running',
    enviroment: process.env.ENVIROMENT || 'Not Found',
  });
})
  .use('/', auth)
  .use('/', (req, res) => {
    res.status(httpStatus.OK).json({
      status: 'OK',
      message: req.oidc.isAuthenticated() ? 'Authenticated' : 'Not Authenticated',
    });
  })
  .use('/profile', authRoute)

module.exports = router;