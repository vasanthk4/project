const express = require('express');
const router = express.Router();
const userControllers = require('../app/controllers/userController');
const { createAllTables } = require('../app/models/createAllTables');
const stockControllers = require('../app/controllers/stockControllers');
const paymentControllers = require('../app/controllers/paymentControllers');
const stockExchangeControllers = require('../app/controllers/stockExchangeControllers');
const portfolioControllers = require('../app/controllers/portfolioControllers');

createAllTables()
router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/wallet/:id', userControllers.getWallet)
router.get('/allStocks', stockControllers.getAllStocks)
router.get('/allStocksAdmin', stockControllers.getAllStocksAdmin)
router.post('/getStock', stockControllers.getStock);
router.post('/insertStock', stockControllers.insertStock);
router.post('/deleteStock', stockControllers.deleteStock)
router.post('/updateStock', stockControllers.updateStock)
router.post('/payment', paymentControllers.acceptPayment);
router.get('/paymenthistory/:id', paymentControllers.history)
router.post('/exchangestock', stockExchangeControllers.exchangeStock)
router.get('/exchangehistory/:id', stockExchangeControllers.getExchangeHistory)
router.get('/portfolio/:id', portfolioControllers.getPortfolio)
router.get('/allPayments', paymentControllers.getAllPaymentsHistory)
router.get('/allUsers', userControllers.getAllUsers)
// router.post('/portfolio/update/:id', portfolioControllers.updatePortfolio)

module.exports.routes = router;