const express = require('express');
const {addProduct, getAllProducts,getProductsById, deleteProduct, updateProduct,getDetailProductByProId, searchProduct,
  getAllBrandsInProducts,relatedProduct,searchProductByCatId, getStatisticDay, getStatisticMonth, getStatisticYear,
  getMaxQuantityPurchase, getMaxQuantityPurchaseDay, getMaxQuantityPurchaseMonth, getMaxQuantityPurchaseYear,
  getMinQuantityPurchaseDay, getMinQuantityPurchaseMonth, getMinQuantityPurchaseYear, getQuantityInDay,
  getQuantityInMonth, getQuantityInYear,getTotalItemSold, updateImage
} = require("../controllers/product");
const {validationResult} = require("express-validator");

const setupContentType = (req, res, next) => {
  req.headers['content-type'] = 'multipart/form-data';
  next();
}
const router = express.Router();
//ver1
router.get('/', getAllProducts);
router.get('/brand',getAllBrandsInProducts)
router.post("/related",relatedProduct);
router.get('/:id',getProductsById)
router.get('/detail/:id',getDetailProductByProId)
router.post('/add', setupContentType,addProduct)
router.post('/delete', deleteProduct)
router.post('/update', updateProduct)
router.post('/search/category',searchProductByCatId)
router.post('/search',searchProduct);
router.get('/statistic/day',getStatisticDay);
router.get('/statistic/month',getStatisticMonth);
router.get('/statistic/year',getStatisticYear);
router.get('/statistic/maxquantitypurchaseday',getMaxQuantityPurchaseDay);
router.get('/statistic/maxquantitypurchaseyear',getMaxQuantityPurchaseMonth);
router.get('/statistic/maxquantitypurchasemonth',getMaxQuantityPurchaseYear);
router.get('/statistic/minquantitypurchaseday',getMinQuantityPurchaseDay);
router.get('/statistic/minquantitypurchaseyear',getMinQuantityPurchaseMonth);
router.get('/statistic/minquantitypurchasemonth',getMinQuantityPurchaseYear);
router.get('/statistic/quantityinday',getQuantityInDay);
router.get('/statistic/quantityinmonth',getQuantityInMonth);
router.get('/statistic/quantityinyear',getQuantityInYear);
router.get('/statistic/soldout',getTotalItemSold);
//ver2
router.put('/v2/updateImg', updateImage)
module.exports = router;
