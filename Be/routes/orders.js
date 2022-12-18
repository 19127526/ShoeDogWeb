const express = require('express');
const router = express.Router();
const {addOrder,getAllOrders,deleteOrderByOrderId} = require('../controllers/order.js');
router.get('/', getAllOrders)
router.post('/add', addOrder)
router.post('/delete',deleteOrderByOrderId)
module.exports = router;
