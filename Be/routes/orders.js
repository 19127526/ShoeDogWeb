const express = require('express');
const router = express.Router();
const {addOrder,getAllOrders} = require('../controllers/order.js');
router.get('/', getAllOrders)
router.post('/add', addOrder)
module.exports = router;
