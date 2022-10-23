var express = require('express');
var router = express.Router();
const authController = require("../controllers/auth-controller")

/* GET users listing. */
router.post('/register', authController.register);

module.exports = router;
