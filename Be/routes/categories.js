const express = require('express');
const router = express.Router();
const {getAllCategories, addCategory, deleteCategory, updateCategory} = require('../controllers/category.js');
const verifyToken = require("../middlewares/authorToken");
router.get('/', getAllCategories);
router.post('/', verifyToken, addCategory)
router.delete('/:id', verifyToken, deleteCategory)
router.put('/:id', verifyToken, updateCategory)
module.exports = router;
