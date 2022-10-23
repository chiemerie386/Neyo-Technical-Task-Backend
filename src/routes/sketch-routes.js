var express = require('express');
var router = express.Router();
const sketchController = require("../controllers/sketch-controller")

/* GET users listing. */
router.get('/getsketch/:sketchId', sketchController.getSketch);
router.get('/getSketch', sketchController.getSketch);
router.post('/create', sketchController.createSketch);


module.exports = router;
