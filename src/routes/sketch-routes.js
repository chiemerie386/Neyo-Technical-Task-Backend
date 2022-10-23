var express = require('express');
var router = express.Router();
const sketchController = require("../controllers/sketch-controller")
const authorizeUser = require("../middlewares/auth")

router.use(authorizeUser)
router.get('/getsketch/:sketchId',  sketchController.getSketch);
router.get('/getSketch',  sketchController.getSketch);
router.post('/create', sketchController.createSketch);


module.exports = router;
