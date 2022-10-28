var express = require('express');
var router = express.Router();
const authController = require("../controllers/auth-controller")
const validation = require('../middlewares/joi-validation')
const {registerSchema, loginSchema} = require('../middlewares/validation-schemas/auth-schemas')

router.post('/register', validation(registerSchema), authController.register);
router.post('/login', validation(loginSchema), authController.login);


module.exports = router;
