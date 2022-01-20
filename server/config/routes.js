const express = require('express');
const router = express.Router();
const userControllers = require('../app/controllers/userController');
const { createAllTables } = require('../app/models/createAllTables');
const stockControllers = require('../app/controllers/stockControllers');

createAllTables()
router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/allStocks', stockControllers.getAllStocks)
router.post('/getStock', stockControllers.getStock);
router.post('/insertStock', stockControllers.insertStock);

module.exports.routes = router;