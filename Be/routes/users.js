var express = require('express');
var router = express.Router();
const { userValidationResult, validateUserSignIn, validateUserSignUp} = require('../middlewares/user');
const { userSignIn, signOut, createUser} = require('../controllers/user');
const {isAuth} = require("../middlewares/auth");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*router.post('/create', validateUserSignUp, userValidationResult, createUser);
router.post('/signin', validateUserSignIn, userValidationResult, userSignIn);
router.get('/signout', isAuth, signOut);*/
module.exports = router;
