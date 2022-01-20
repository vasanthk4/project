const express = require('express');
const router = express.Router();
const userControllers = require('../app/controllers/userController');
const { createAllTables } = require('../app/models/createAllTables');;

createAllTables()
router.post('/login', userControllers.login);
router.post('/register', userControllers.register);

module.exports.routes = router;