const express = require('express');
const router = express.Router();
const {loginByUserAndPassword} = require('../controllers/auth');
router.post('/login', loginByUserAndPassword)
module.exports = router;
