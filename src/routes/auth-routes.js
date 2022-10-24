var express = require('express');
const { valid } = require('joi');
var router = express.Router();
const authController = require("../controllers/auth-controller")
const validation = require('../middlewares/joi-validation')
const {registerSchema, loginSchema} = require('../middlewares/validation-schemas/auth-schemas')

router.post('/register', validation(registerSchema), authController.register);
router.post('/login', validation(loginSchema), authController.login);

module.exports = router;
