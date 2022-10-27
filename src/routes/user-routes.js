var express = require('express');
var router = express.Router();
const userController = require("../controllers/user-controller")
const authorizeUser = require("../middlewares/auth")

router.use(authorizeUser)
router.get('/getuser/:userId',  userController.getUser);
router.get('/getuser',  userController.getUser);

module.exports = router;
