const express = require('express');
const router = express.Router();
const {getAllCategories, addCategory, deleteCategory, updateCategory} = require('../controllers/category.js');
router.get('/', getAllCategories);
router.post('/add', addCategory)
router.post('delete', deleteCategory)
router.post('/update', updateCategory)
module.exports = router;
