const express = require('express');
const {addProduct, getAllProducts,getProductsById, deleteProduct, updateProduct,getDetailProductByProId, searchProduct,
  getAllBrandsInProducts,relatedProduct,searchProductByCatId, getStatisticDay, getStatisticMonth, getStatisticYear,
  getMaxQuantityPurchase, getMaxQuantityPurchaseDay, getMaxQuantityPurchaseMonth, getMaxQuantityPurchaseYear,
  getMinQuantityPurchaseDay, getMinQuantityPurchaseMonth, getMinQuantityPurchaseYear,getTotalItemSold
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
router.get('/statistic/soldout',getTotalItemSold);
router.get('/statistic/maxquantitypurchaseday',getMaxQuantityPurchaseDay);
router.get('/statistic/maxquantitypurchaseyear',getMaxQuantityPurchaseMonth);
router.get('/statistic/maxquantitypurchasemonth',getMaxQuantityPurchaseYear);
router.get('/statistic/minquantitypurchaseday',getMinQuantityPurchaseDay);
router.get('/statistic/minquantitypurchaseyear',getMinQuantityPurchaseMonth);
router.get('/statistic/minquantitypurchasemonth',getMinQuantityPurchaseYear);
module.exports = router;
