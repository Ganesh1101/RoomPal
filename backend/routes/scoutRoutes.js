const express = require('express');
const { ScoutRegister, getAllScouts }   = require('../controllers/scoutController');
const router = express.Router();
router.post('/create',ScoutRegister);
router.get('/getall',getAllScouts);
module.exports = router;