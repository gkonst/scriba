'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/me/password', auth.isAuthenticated(), controller.changePassword);
router.post('/', controller.create);

module.exports = router;
