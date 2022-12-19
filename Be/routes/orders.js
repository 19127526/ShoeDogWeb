const express = require('express');
const router = express.Router();
const {addOrder,getAllOrders,deleteOrderByOrderId,completeOrderByOrderId} = require('../controllers/order.js');
router.get('/', getAllOrders)
router.post('/add', addOrder)
router.post('/complete',completeOrderByOrderId)
router.post('/delete',deleteOrderByOrderId)
module.exports = router;
