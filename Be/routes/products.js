const express = require('express');
const {addProduct, getAllProducts,getProductsById, deleteProduct, updateProduct} = require("../controllers/product");
const router = express.Router();
router.get('/', getAllProducts);
router.get('/:id',getProductsById)
router.post('/add', addProduct)
router.post('delete', deleteProduct)
router.post('/update', updateProduct)
module.exports = router;
