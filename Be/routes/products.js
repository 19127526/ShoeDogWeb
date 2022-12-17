const express = require('express');
const {addProduct, getAllProducts,getProductsById, deleteProduct, updateProduct,getDetailProductByProId, searchProduct,
  getAllBrandsInProducts,relatedProduct,searchProductByCatId
} = require("../controllers/product");
const router = express.Router();
router.get('/', getAllProducts);
router.get('/brand',getAllBrandsInProducts)
router.post("/related",relatedProduct);
router.get('/:id',getProductsById)
router.get('/detail/:id',getDetailProductByProId)
router.post('/add', addProduct)
router.post('/delete', deleteProduct)
router.post('/update', updateProduct)
router.post('/search/category',searchProductByCatId)
router.post('/search',searchProduct);
module.exports = router;
