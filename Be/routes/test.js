const express = require("express");
const {test, test1} = require("../controllers/product");

const router = express.Router();
router.post('/a', test)
router.post('/b',test1)
module.exports = router;
