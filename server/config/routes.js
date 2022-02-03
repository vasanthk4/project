const express = require('express');
const router = express.Router();
const userControllers = require('../app/controllers/userController');
const { createAllTables } = require('../app/models/createAllTables');
const stockControllers = require('../app/controllers/stockControllers');
const paymentControllers = require('../app/controllers/paymentControllers');

createAllTables()
router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/wallet/:id', userControllers.getWallet)
router.get('/allStocks', stockControllers.getAllStocks)
router.post('/getStock', stockControllers.getStock);
router.post('/insertStock', stockControllers.insertStock);
router.post('/payment', paymentControllers.acceptPayment);
router.get('/paymenthistory/:id', paymentControllers.history)

module.exports.routes = router;