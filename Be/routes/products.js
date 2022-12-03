const express = require('express');
const {addProduct, getAllProducts, deleteProduct, updateProduct} = require("../controllers/product");
const router = express.Router();
router.get('/', getAllProducts);
router.post('/add', addProduct)
router.post('delete', deleteProduct)
router.post('/update', updateProduct)
module.exports = router;
