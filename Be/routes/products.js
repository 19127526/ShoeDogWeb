const express = require('express');
const {addProduct, getAllProducts,getProductsById, deleteProduct, updateProduct,getDetailProductByProId, searchProduct,
  getAllBrandsInProducts,relatedProduct,searchProductByCatId, getStatisticDay, getStatisticMonth, getStatisticYear
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
router.get('/statistic/day',getStatisticDay);
router.get('/statistic/month',getStatisticMonth);
router.get('/statistic/year',getStatisticYear);
// router.get('/statistic/maxquantitypurchase',getMaxQuantityPurchase);
// router.get('/statistic/minquantitypurchase',getMinQuantityPurchase);
// router.get('/statistic/inventoryinday',getInventoryInDay);
module.exports = router;
