const express = require('express');
const { UserController } = require('../controller/UserController');
console.log(UserController);
const router = express.Router();

router.post('/users', UserController.postUser)

module.exports = { router };
