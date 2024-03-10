const express = require('express');
const router = express.Router();
const {getParentCategory, editParentCategory, addParentCategory, removeParentCategory} = require('../controllers/parentcategories');
const verifyToken = require("../middlewares/authorToken");

router.post('/', verifyToken, addParentCategory)
router.get('/', getParentCategory)
router.put('/:parentId',verifyToken, editParentCategory)
router.delete('/:parentId', verifyToken, removeParentCategory)

module.exports = router;
