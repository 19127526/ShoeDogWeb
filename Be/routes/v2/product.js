const {getProductsByCatIdPagination, getProductsByCatIdPaginationNew} = require("../../controllers/v2/product");
const express = require("express");

const router = express.Router();

router.get('/:catId', getProductsByCatIdPagination);
module.exports = router;