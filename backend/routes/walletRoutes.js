const express = require('express');
const { createWallet, addFundsToWallet } = require('../controllers/walletFunctionalities');
const router = express.Router();
router.post('/create', createWallet);
router.post('/addFunds', addFundsToWallet);
module.exports = router;
