const express = require('express');
const {
    addProduct, getAllProducts, getProductsById, deleteProduct, updateProduct, getDetailProductByProId, searchProduct,
    getAllBrandsInProducts, relatedProduct, searchProductByCatId, getStatisticDay, getStatisticMonth, getStatisticYear,
    getMaxQuantityPurchase, getMaxQuantityPurchaseDay, getMaxQuantityPurchaseMonth, getMaxQuantityPurchaseYear,
    getMinQuantityPurchaseDay, getMinQuantityPurchaseMonth, getMinQuantityPurchaseYear, getQuantityInDay,
    getQuantityInMonth, getQuantityInYear, getTotalItemSold, updateImage, addProductv2, updateProductv2, deleteProductv2
} = require("../controllers/product");
const {validationResult} = require("express-validator");
const multer = require("multer");
const category = require("../models/category");
const product = require("../models/product");
const path = require("path");
const fs = require("fs");
const router = express.Router();


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, './public/image/temp');
    },
    filename: function (req, file, cb) {
        console.log(file)
       if(file?.mimetype=='image/jpeg'){
           cb(null, file.originalname+".jpg");
       }
       else if(file?.mimetype=='image/png'){
           cb(null, file.originalname+".png");
       }
       else if(file?.mimetype=='image/webp'){
         cb(null, file.originalname+".webp");
       }
       else{
         cb(null, file.originalname);
       }

    }
});
const upload = multer({storage: storage});
//ver1
router.get('/', getAllProducts);
router.get('/brand', getAllBrandsInProducts)
router.post("/related", relatedProduct);
router.get('/:id', getProductsById)
router.get('/detail/:id', getDetailProductByProId)
router.post('/add', upload.array('files'), addProductv2)
router.post('/update',upload.array('files'), updateProductv2)
router.post('/delete', deleteProductv2)
router.post('/search/category', searchProductByCatId)
router.post('/search', searchProduct);
router.get('/statistic/day', getStatisticDay);
router.get('/statistic/month', getStatisticMonth);
router.get('/statistic/year', getStatisticYear);
router.get('/statistic/maxquantitypurchaseday', getMaxQuantityPurchaseDay);
router.get('/statistic/maxquantitypurchaseyear', getMaxQuantityPurchaseMonth);
router.get('/statistic/maxquantitypurchasemonth', getMaxQuantityPurchaseYear);
router.get('/statistic/minquantitypurchaseday', getMinQuantityPurchaseDay);
router.get('/statistic/minquantitypurchaseyear', getMinQuantityPurchaseMonth);
router.get('/statistic/minquantitypurchasemonth', getMinQuantityPurchaseYear);
router.get('/statistic/quantityinday', getQuantityInDay);
router.get('/statistic/quantityinmonth', getQuantityInMonth);
router.get('/statistic/quantityinyear', getQuantityInYear);
router.get('/statistic/soldout', getTotalItemSold);
//ver2
router.put('/v2/updateImg', updateImage)

module.exports = router;
